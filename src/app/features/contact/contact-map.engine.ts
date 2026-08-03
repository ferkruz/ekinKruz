import {
  AdditiveBlending,
  AmbientLight,
  BufferGeometry,
  Color,
  Float32BufferAttribute,
  Group,
  Line,
  LineBasicMaterial,
  LineSegments,
  Mesh,
  MeshBasicMaterial,
  PerspectiveCamera,
  Points,
  PointsMaterial,
  Scene,
  SphereGeometry,
  Vector2,
  Vector3,
  WebGLRenderer,
} from 'three';

export interface ContactMapEngineOptions {
  readonly canvas: HTMLCanvasElement;
  readonly reducedMotion: boolean;
}

interface Marker {
  readonly label: string;
  readonly lat: number;
  readonly lon: number;
}

const MARKERS: readonly Marker[] = [
  { label: 'Norte de España', lat: 43.1, lon: -4.2 },
  { label: 'Estados Unidos', lat: 39.5, lon: -98.3 },
  { label: 'Argentina', lat: -34.6, lon: -64.0 },
  { label: 'Alemania', lat: 51.2, lon: 10.4 },
];

export class ContactMapEngine {
  private readonly scene = new Scene();
  private readonly camera: PerspectiveCamera;
  private readonly renderer: WebGLRenderer;
  private readonly root = new Group();
  private readonly pointer = new Vector2(0, 0);
  private readonly targetRotation = new Vector2(0, 0);
  private readonly markerHalos: Array<Mesh<SphereGeometry, MeshBasicMaterial>> = [];
  private readonly connectionMaterials: LineBasicMaterial[] = [];
  private readonly reducedMotion: boolean;

  private frameId = 0;
  private running = false;
  private disposed = false;
  private startTime = 0;

  constructor(options: ContactMapEngineOptions) {
    this.reducedMotion = options.reducedMotion;

    this.camera = new PerspectiveCamera(42, 1, 0.1, 80);
    this.camera.position.set(0, 0.08, 5.25);

    this.renderer = new WebGLRenderer({
      canvas: options.canvas,
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance',
    });
    this.renderer.setClearColor(0x000000, 0);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.5));

    this.scene.add(new AmbientLight(0x8fc7ff, 0.42));
    this.root.rotation.set(0.18, -0.72, -0.08);
    this.buildGlobeGrid();
    this.buildCoastlineOutlines();
    this.buildWorld();
    this.buildMarkers();
    this.buildAtmosphere();
    this.scene.add(this.root);
  }

  start(): void {
    if (this.disposed || this.running) return;
    this.running = true;
    this.startTime = performance.now();
    this.tick();
  }

  stop(): void {
    this.running = false;
    if (this.frameId) {
      cancelAnimationFrame(this.frameId);
      this.frameId = 0;
    }
  }

  setPointer(nx: number, ny: number): void {
    if (this.reducedMotion) return;
    this.pointer.set(nx, ny);
  }

  resize(width: number, height: number): void {
    if (width <= 0 || height <= 0) return;
    this.camera.aspect = width / height;
    this.camera.position.z = width < 560 ? 5.9 : 5.25;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(width, height, false);
  }

  dispose(): void {
    this.stop();
    this.disposed = true;

    this.scene.traverse((obj) => {
      const mesh = obj as {
        geometry?: { dispose: () => void };
        material?: { dispose: () => void } | Array<{ dispose: () => void }>;
      };

      mesh.geometry?.dispose();
      if (Array.isArray(mesh.material)) mesh.material.forEach((material) => material.dispose());
      else mesh.material?.dispose();
    });

    this.renderer.dispose();
  }

  private buildGlobeGrid(): void {
    const gridPositions: number[] = [];
    const radius = 1.38;
    const lonSegments = 72;
    const latSegments = 48;

    for (let lat = -60; lat <= 60; lat += 20) {
      for (let step = 0; step < lonSegments; step++) {
        const lonA = -180 + (360 / lonSegments) * step;
        const lonB = -180 + (360 / lonSegments) * (step + 1);
        const a = this.latLonToVector(lat, lonA, radius);
        const b = this.latLonToVector(lat, lonB, radius);
        gridPositions.push(a.x, a.y, a.z, b.x, b.y, b.z);
      }
    }

    for (let lon = -150; lon <= 180; lon += 30) {
      for (let step = 0; step < latSegments; step++) {
        const latA = -78 + (156 / latSegments) * step;
        const latB = -78 + (156 / latSegments) * (step + 1);
        const a = this.latLonToVector(latA, lon, radius);
        const b = this.latLonToVector(latB, lon, radius);
        gridPositions.push(a.x, a.y, a.z, b.x, b.y, b.z);
      }
    }

    const gridGeometry = new BufferGeometry();
    gridGeometry.setAttribute('position', new Float32BufferAttribute(gridPositions, 3));
    this.root.add(
      new LineSegments(
        gridGeometry,
        new LineBasicMaterial({
          color: 0xbfdfff,
          transparent: true,
          opacity: 0.105,
          depthWrite: false,
        }),
      ),
    );

    const equatorPositions: number[] = [];
    for (let step = 0; step < lonSegments; step++) {
      const lonA = -180 + (360 / lonSegments) * step;
      const lonB = -180 + (360 / lonSegments) * (step + 1);
      const a = this.latLonToVector(0, lonA, radius + 0.01);
      const b = this.latLonToVector(0, lonB, radius + 0.01);
      equatorPositions.push(a.x, a.y, a.z, b.x, b.y, b.z);
    }

    const equatorGeometry = new BufferGeometry();
    equatorGeometry.setAttribute('position', new Float32BufferAttribute(equatorPositions, 3));
    this.root.add(
      new LineSegments(
        equatorGeometry,
        new LineBasicMaterial({
          color: 0x2ee6d6,
          transparent: true,
          opacity: 0.22,
          depthWrite: false,
        }),
      ),
    );
  }

  private buildCoastlineOutlines(): void {
    const coastlines: ReadonlyArray<ReadonlyArray<[number, number]>> = [
      [
        [58, -134],
        [50, -124],
        [42, -124],
        [33, -117],
        [25, -101],
        [18, -88],
        [25, -80],
        [35, -76],
        [45, -66],
        [53, -58],
        [60, -72],
        [66, -96],
        [62, -118],
        [58, -134],
      ],
      [
        [12, -79],
        [6, -74],
        [-3, -80],
        [-16, -76],
        [-33, -72],
        [-52, -70],
        [-55, -62],
        [-42, -55],
        [-25, -48],
        [-8, -35],
        [4, -50],
        [10, -62],
        [12, -79],
      ],
      [
        [37, -9],
        [44, -8],
        [51, -4],
        [58, 8],
        [60, 24],
        [52, 31],
        [44, 29],
        [37, 22],
        [36, 10],
        [37, -9],
      ],
      [
        [35, -8],
        [31, 10],
        [20, 24],
        [8, 34],
        [-10, 38],
        [-27, 31],
        [-35, 20],
        [-28, 10],
        [-12, 2],
        [8, -10],
        [24, -16],
        [35, -8],
      ],
      [
        [58, 42],
        [55, 70],
        [50, 92],
        [58, 122],
        [46, 140],
        [30, 121],
        [22, 104],
        [8, 99],
        [5, 77],
        [20, 62],
        [34, 46],
        [58, 42],
      ],
      [
        [-12, 112],
        [-22, 116],
        [-34, 124],
        [-39, 142],
        [-28, 153],
        [-16, 146],
        [-12, 132],
        [-12, 112],
      ],
    ];

    coastlines.forEach((coastline, index) => {
      const geometry = new BufferGeometry();
      geometry.setAttribute(
        'position',
        new Float32BufferAttribute(
          coastline.flatMap(([lat, lon]) => {
            const point = this.latLonToVector(lat, lon, 1.455);
            return [point.x, point.y, point.z];
          }),
          3,
        ),
      );

      this.root.add(
        new Line(
          geometry,
          new LineBasicMaterial({
            color: index % 2 ? 0xbfdfff : 0x2ee6d6,
            transparent: true,
            opacity: index % 2 ? 0.18 : 0.24,
            depthWrite: false,
          }),
        ),
      );
    });
  }

  private buildWorld(): void {
    const nodes = this.createWorldNodes();
    const positions = new Float32Array(nodes.length * 3);
    nodes.forEach((node, index) => {
      const point = this.latLonToVector(node[0], node[1], 1.48);
      positions[index * 3] = point.x;
      positions[index * 3 + 1] = point.y;
      positions[index * 3 + 2] = point.z;
    });

    const nodeGeometry = new BufferGeometry();
    nodeGeometry.setAttribute('position', new Float32BufferAttribute(positions, 3));
    this.root.add(
      new Points(
        nodeGeometry,
        new PointsMaterial({
          color: 0x2ee6d6,
          size: 0.032,
          transparent: true,
          opacity: 0.82,
          sizeAttenuation: true,
          depthWrite: false,
        }),
      ),
    );

    const linePositions: number[] = [];
    for (let i = 0; i < nodes.length - 1; i++) {
      if (i % 7 === 0) continue;
      const a = this.latLonToVector(nodes[i][0], nodes[i][1], 1.48);
      const b = this.latLonToVector(nodes[i + 1][0], nodes[i + 1][1], 1.48);
      if (a.distanceTo(b) < 0.7) linePositions.push(a.x, a.y, a.z, b.x, b.y, b.z);
    }

    const linesGeometry = new BufferGeometry();
    linesGeometry.setAttribute('position', new Float32BufferAttribute(linePositions, 3));
    this.root.add(
      new LineSegments(
        linesGeometry,
        new LineBasicMaterial({
          color: 0x5b7cff,
          transparent: true,
          opacity: 0.24,
        }),
      ),
    );
  }

  private buildMarkers(): void {
    const coreGeometry = new SphereGeometry(0.045, 14, 14);
    const haloGeometry = new SphereGeometry(0.12, 18, 18);
    const markerPositions = MARKERS.map((marker) => this.latLonToVector(marker.lat, marker.lon, 1.58));

    markerPositions.forEach((position, index) => {
      const marker = new Group();
      const core = new Mesh(
        coreGeometry.clone(),
        new MeshBasicMaterial({
          color: index % 2 ? 0x5b7cff : 0x2ee6d6,
          transparent: true,
          opacity: 0.96,
          depthWrite: false,
        }),
      );
      const halo = new Mesh(
        haloGeometry.clone(),
        new MeshBasicMaterial({
          color: index % 2 ? 0x5b7cff : 0x2ee6d6,
          transparent: true,
          opacity: 0.2,
          depthWrite: false,
          blending: AdditiveBlending,
        }),
      );

      marker.position.copy(position);
      marker.add(core, halo);
      this.markerHalos.push(halo);
      this.root.add(marker);
    });

    const routes: ReadonlyArray<[number, number]> = [
      [0, 1],
      [0, 2],
      [0, 3],
      [1, 2],
    ];

    routes.forEach(([from, to], index) => {
      const material = new LineBasicMaterial({
        color: index % 2 ? 0x5b7cff : 0x2ee6d6,
        transparent: true,
        opacity: 0.18,
      });
      const routeGeometry = new BufferGeometry();
      routeGeometry.setAttribute(
        'position',
        new Float32BufferAttribute(
          this.createArc(markerPositions[from], markerPositions[to], 1.66).flatMap((point) => [
            point.x,
            point.y,
            point.z,
          ]),
          3,
        ),
      );

      this.connectionMaterials.push(material);
      this.root.add(new Line(routeGeometry, material));
    });

    coreGeometry.dispose();
    haloGeometry.dispose();
  }

  private buildAtmosphere(): void {
    const count = this.reducedMotion ? 70 : 150;
    const positions = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const point = this.latLonToVector(Math.random() * 180 - 90, Math.random() * 360 - 180, 1.8 + Math.random() * 0.5);
      positions[i * 3] = point.x;
      positions[i * 3 + 1] = point.y;
      positions[i * 3 + 2] = point.z;
    }

    const geometry = new BufferGeometry();
    geometry.setAttribute('position', new Float32BufferAttribute(positions, 3));
    this.root.add(
      new Points(
        geometry,
        new PointsMaterial({
          color: 0xe8edf5,
          size: 0.012,
          transparent: true,
          opacity: 0.3,
          sizeAttenuation: true,
          depthWrite: false,
        }),
      ),
    );
  }

  private createWorldNodes(): ReadonlyArray<[number, number]> {
    const regions: ReadonlyArray<{
      readonly lat: readonly [number, number];
      readonly lon: readonly [number, number];
      readonly rows: number;
      readonly cols: number;
    }> = [
      { lat: [28, 58], lon: [-125, -68], rows: 5, cols: 8 },
      { lat: [-55, 12], lon: [-82, -35], rows: 7, cols: 5 },
      { lat: [36, 64], lon: [-10, 32], rows: 5, cols: 7 },
      { lat: [-35, 28], lon: [-18, 48], rows: 7, cols: 6 },
      { lat: [8, 58], lon: [45, 142], rows: 7, cols: 9 },
      { lat: [-38, -12], lon: [112, 154], rows: 4, cols: 5 },
    ];

    return regions.flatMap((region) => {
      const nodes: Array<[number, number]> = [];
      for (let row = 0; row < region.rows; row++) {
        for (let col = 0; col < region.cols; col++) {
          const latProgress = region.rows === 1 ? 0 : row / (region.rows - 1);
          const lonProgress = region.cols === 1 ? 0 : col / (region.cols - 1);
          const lat = region.lat[0] + (region.lat[1] - region.lat[0]) * latProgress;
          const lon = region.lon[0] + (region.lon[1] - region.lon[0]) * lonProgress;
          nodes.push([lat + Math.sin(col + row) * 1.8, lon + Math.cos(row * 1.7 + col) * 2.2]);
        }
      }
      return nodes;
    });
  }

  private createArc(from: Vector3, to: Vector3, radius: number): Vector3[] {
    const points: Vector3[] = [];
    for (let i = 0; i <= 28; i++) {
      const progress = i / 28;
      const point = from.clone().lerp(to, progress).normalize().multiplyScalar(radius);
      const lift = Math.sin(progress * Math.PI) * 0.24;
      points.push(point.normalize().multiplyScalar(radius + lift));
    }
    return points;
  }

  private latLonToVector(lat: number, lon: number, radius: number): Vector3 {
    const phi = (90 - lat) * (Math.PI / 180);
    const theta = (lon + 180) * (Math.PI / 180);
    return new Vector3(
      -radius * Math.sin(phi) * Math.cos(theta),
      radius * Math.cos(phi),
      radius * Math.sin(phi) * Math.sin(theta),
    );
  }

  private tick = (): void => {
    if (!this.running || this.disposed) return;
    this.frameId = requestAnimationFrame(this.tick);

    const t = (performance.now() - this.startTime) / 1000;

    if (this.reducedMotion) {
      this.root.rotation.y = -0.72 + t * 0.018;
    } else {
      this.targetRotation.x = this.pointer.y * 0.22;
      this.targetRotation.y = this.pointer.x * 0.34;
      this.root.rotation.x += (0.18 + this.targetRotation.x - this.root.rotation.x) * 0.045;
      this.root.rotation.y += (-0.72 + this.targetRotation.y + t * 0.09 - this.root.rotation.y) * 0.045;
      this.root.rotation.z += (-0.08 + this.pointer.x * 0.05 - this.root.rotation.z) * 0.04;
      this.root.position.y = Math.sin(t * 0.66) * 0.06;
      this.root.scale.setScalar(1 + Math.sin(t * 0.82) * 0.018);
    }

    this.markerHalos.forEach((halo, index) => {
      const pulse = Math.max(0, Math.sin(t * 1.35 - index * 1.15));
      halo.scale.setScalar(1 + pulse * 0.65);
      halo.material.opacity = 0.12 + pulse * 0.22;
    });

    this.connectionMaterials.forEach((material, index) => {
      material.opacity = 0.14 + (Math.sin(t * 0.85 - index * 0.8) + 1) * 0.085;
    });

    this.renderer.render(this.scene, this.camera);
  };
}
