import {
  AdditiveBlending,
  AmbientLight,
  BufferGeometry,
  Color,
  DirectionalLight,
  DoubleSide,
  EdgesGeometry,
  Float32BufferAttribute,
  Group,
  LineBasicMaterial,
  LineSegments,
  Mesh,
  MeshBasicMaterial,
  MeshPhysicalMaterial,
  PerspectiveCamera,
  PointLight,
  Points,
  PointsMaterial,
  Scene,
  Vector2,
  WebGLRenderer,
} from 'three';

export interface AboutDiamondEngineOptions {
  readonly canvas: HTMLCanvasElement;
  readonly reducedMotion: boolean;
  readonly valueCount: number;
  readonly onValueChange: (index: number) => void;
}

export class AboutDiamondEngine {
  private readonly scene = new Scene();
  private readonly camera: PerspectiveCamera;
  private readonly renderer: WebGLRenderer;
  private readonly root = new Group();
  private readonly diamond: Mesh<BufferGeometry, MeshPhysicalMaterial>;
  private readonly diamondMaterial: MeshPhysicalMaterial;
  private readonly glints: Array<Mesh<BufferGeometry, MeshBasicMaterial>> = [];
  private readonly pointLight = new PointLight(0x2ee6d6, 1.8, 8);
  private readonly rimLight = new DirectionalLight(0xbfdfff, 1.15);
  private readonly pointer = new Vector2(0, 0);
  private readonly targetRotation = new Vector2(0, 0);
  private readonly reducedMotion: boolean;
  private readonly valueCount: number;
  private readonly onValueChange: (index: number) => void;

  private frameId = 0;
  private running = false;
  private disposed = false;
  private startTime = 0;
  private activeValue = 0;

  constructor(options: AboutDiamondEngineOptions) {
    this.reducedMotion = options.reducedMotion;
    this.valueCount = Math.max(options.valueCount, 1);
    this.onValueChange = options.onValueChange;

    this.camera = new PerspectiveCamera(42, 1, 0.1, 80);
    this.camera.position.set(0, 0.1, 4.75);

    this.renderer = new WebGLRenderer({
      canvas: options.canvas,
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance',
    });
    this.renderer.setClearColor(0x000000, 0);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.5));

    this.diamondMaterial = new MeshPhysicalMaterial({
      color: new Color(0xc6fffb),
      emissive: new Color(0x1a8f86),
      emissiveIntensity: 0.1,
      metalness: 0.02,
      roughness: 0.075,
      transmission: 0.14,
      thickness: 0.46,
      ior: 1.7,
      transparent: true,
      opacity: 0.88,
      reflectivity: 0.68,
      clearcoat: 0.96,
      clearcoatRoughness: 0.1,
      depthWrite: true,
    });

    this.diamond = new Mesh(this.createDiamondGeometry(), this.diamondMaterial);
    this.buildLights();
    this.buildDiamond();
    this.buildEnergyField();
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
    this.camera.position.z = width < 560 ? 5.35 : 4.75;
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

  private buildLights(): void {
    this.scene.add(new AmbientLight(0x8fc7ff, 0.4));

    const key = new DirectionalLight(0xe8edf5, 1.45);
    key.position.set(2.4, 3.4, 4.2);
    this.scene.add(key);

    const fill = new DirectionalLight(0x5b7cff, 0.42);
    fill.position.set(-3.2, -0.8, 2.8);
    this.scene.add(fill);

    this.pointLight.position.set(-1.2, 0.4, 2.5);
    this.scene.add(this.pointLight);

    this.rimLight.position.set(-2.8, 2.2, -2.6);
    this.rimLight.intensity = 1.32;
    this.scene.add(this.rimLight);
  }

  private buildDiamond(): void {
    this.root.rotation.set(0.2, -0.54, -0.1);

    const innerGeometry = this.createDiamondGeometry();
    innerGeometry.scale(0.66, 0.66, 0.66);
    const inner = new Mesh(
      innerGeometry,
      new MeshBasicMaterial({
        color: 0x5b7cff,
        transparent: true,
        opacity: 0.045,
        depthWrite: false,
      }),
    );

    const edges = new LineSegments(
      new EdgesGeometry(this.diamond.geometry),
      new LineBasicMaterial({
        color: 0xd6fffb,
        transparent: true,
        opacity: 0.56,
      }),
    );

    const outerGeometry = this.createDiamondGeometry();
    outerGeometry.scale(1.14, 1.1, 1.14);
    const outerEdges = new LineSegments(
      new EdgesGeometry(outerGeometry),
      new LineBasicMaterial({
        color: 0x2ee6d6,
        transparent: true,
        opacity: 0.18,
      }),
    );
    outerGeometry.dispose();

    this.root.add(inner, this.diamond, edges, outerEdges);
    this.buildFacetGlints();
  }

  private buildFacetGlints(): void {
    const facets: ReadonlyArray<{
      readonly points: ReadonlyArray<[number, number, number]>;
      readonly color: number;
    }> = [
      {
        points: [
          [-0.1, 0.58, 0.44],
          [0.38, 0.5, 0.12],
          [0.08, 0.05, 0.78],
        ],
        color: 0xe8edf5,
      },
      {
        points: [
          [0.45, 0.48, 0.05],
          [0.78, 0.04, -0.12],
          [0.18, 0.6, -0.38],
        ],
        color: 0x2ee6d6,
      },
      {
        points: [
          [-0.42, 0.5, 0.08],
          [-0.78, 0.02, -0.1],
          [-0.16, 0.58, -0.4],
        ],
        color: 0x5b7cff,
      },
      {
        points: [
          [-0.72, -0.02, 0.1],
          [-0.15, -0.78, 0.32],
          [0.02, 0.02, 0.76],
        ],
        color: 0xe8edf5,
      },
      {
        points: [
          [0.72, -0.03, 0.12],
          [0.18, -0.8, 0.3],
          [0.04, 0.02, 0.76],
        ],
        color: 0x2ee6d6,
      },
      {
        points: [
          [-0.14, 0.52, -0.43],
          [0.22, -0.76, -0.22],
          [-0.22, -0.7, -0.2],
        ],
        color: 0x5b7cff,
      },
    ];

    facets.forEach((facet) => {
      const geometry = new BufferGeometry();
      geometry.setAttribute(
        'position',
        new Float32BufferAttribute(facet.points.flatMap(([x, y, z]) => [x, y, z]), 3),
      );
      geometry.computeVertexNormals();

      const glint = new Mesh(
        geometry,
        new MeshBasicMaterial({
          color: facet.color,
          transparent: true,
          opacity: 0,
          side: DoubleSide,
          depthWrite: false,
          blending: AdditiveBlending,
        }),
      );

      this.glints.push(glint);
      this.root.add(glint);
    });
  }

  private buildEnergyField(): void {
    const count = this.reducedMotion ? 54 : 128;
    const positions = new Float32Array(count * 3);

    for (let i = 0; i < count; i++) {
      const angle = Math.random() * Math.PI * 2;
      const radius = 1.55 + Math.random() * 1.45;
      const height = (Math.random() - 0.5) * 2.9;
      positions[i * 3] = Math.cos(angle) * radius;
      positions[i * 3 + 1] = height;
      positions[i * 3 + 2] = Math.sin(angle) * radius * 0.72;
    }

    const pointsGeometry = new BufferGeometry();
    pointsGeometry.setAttribute('position', new Float32BufferAttribute(positions, 3));
    this.root.add(
      new Points(
        pointsGeometry,
        new PointsMaterial({
          color: 0x2ee6d6,
          size: 0.022,
          transparent: true,
          opacity: 0.48,
          sizeAttenuation: true,
          depthWrite: false,
        }),
      ),
    );

    const linkPositions: number[] = [];
    const linkCount = this.reducedMotion ? 14 : 32;
    for (let i = 0; i < linkCount; i++) {
      const a = Math.floor(Math.random() * count) * 3;
      const b = Math.floor(Math.random() * count) * 3;
      const distance = Math.hypot(
        positions[a] - positions[b],
        positions[a + 1] - positions[b + 1],
        positions[a + 2] - positions[b + 2],
      );

      if (distance > 0.7 && distance < 1.65) {
        linkPositions.push(
          positions[a],
          positions[a + 1],
          positions[a + 2],
          positions[b],
          positions[b + 1],
          positions[b + 2],
        );
      }
    }

    if (!linkPositions.length) return;

    const linksGeometry = new BufferGeometry();
    linksGeometry.setAttribute('position', new Float32BufferAttribute(linkPositions, 3));
    this.root.add(
      new LineSegments(
        linksGeometry,
        new LineBasicMaterial({
          color: 0x5b7cff,
          transparent: true,
          opacity: 0.18,
        }),
      ),
    );
  }

  private createDiamondGeometry(): BufferGeometry {
    const positions: number[] = [];
    const table: ReadonlyArray<[number, number, number]> = [
      [0, 0.68, 0.42],
      [0.42, 0.68, 0],
      [0, 0.68, -0.42],
      [-0.42, 0.68, 0],
    ];
    const girdle: ReadonlyArray<[number, number, number]> = [
      [0, 0, 0.98],
      [0.76, 0, 0.52],
      [1.08, 0, 0],
      [0.76, 0, -0.52],
      [0, 0, -0.98],
      [-0.76, 0, -0.52],
      [-1.08, 0, 0],
      [-0.76, 0, 0.52],
    ];
    const tip: [number, number, number] = [0, -1.24, 0];

    const addTriangle = (
      a: readonly [number, number, number],
      b: readonly [number, number, number],
      c: readonly [number, number, number],
    ): void => {
      positions.push(...a, ...b, ...c);
    };

    addTriangle(table[0], table[1], table[2]);
    addTriangle(table[0], table[2], table[3]);

    for (let i = 0; i < girdle.length; i++) {
      addTriangle(table[Math.floor(i / 2)], girdle[i], girdle[(i + 1) % girdle.length]);
      addTriangle(tip, girdle[(i + 1) % girdle.length], girdle[i]);
    }

    const geometry = new BufferGeometry();
    geometry.setAttribute('position', new Float32BufferAttribute(positions, 3));
    geometry.computeVertexNormals();
    return geometry;
  }

  private tick = (): void => {
    if (!this.running || this.disposed) return;
    this.frameId = requestAnimationFrame(this.tick);

    const t = (performance.now() - this.startTime) / 1000;
    const valueDuration = 3.4;
    const nextValue = Math.floor(t / valueDuration) % this.valueCount;
    const valueProgress = (t % valueDuration) / valueDuration;
    const flash = Math.max(0, 1 - Math.abs(valueProgress - 0.16) / 0.16);

    if (nextValue !== this.activeValue) {
      this.activeValue = nextValue;
      this.onValueChange(nextValue);
    }

    if (this.reducedMotion) {
      this.root.rotation.y = -0.54 + t * 0.025;
    } else {
      this.targetRotation.x = this.pointer.y * 0.2;
      this.targetRotation.y = this.pointer.x * 0.34;
      this.root.rotation.x += (0.2 + this.targetRotation.x - this.root.rotation.x) * 0.05;
      this.root.rotation.y += (-0.54 + this.targetRotation.y + t * 0.16 - this.root.rotation.y) * 0.05;
      this.root.rotation.z += (-0.1 + this.pointer.x * 0.08 - this.root.rotation.z) * 0.04;
      this.root.position.y = Math.sin(t * 0.72) * 0.08;
      this.root.scale.setScalar(1 + Math.sin(t * 0.88) * 0.024 + flash * 0.014);
    }

    this.glints.forEach((glint, index) => {
      const active = index === nextValue;
      glint.material.opacity += ((active ? 0.44 * flash : 0.012) - glint.material.opacity) * 0.12;
      glint.scale.setScalar(1 + (active ? flash * 0.05 : 0));
    });

    this.pointLight.position.x += (this.pointer.x * 1.6 - this.pointLight.position.x) * 0.055;
    this.pointLight.position.y += (0.4 + this.pointer.y * 0.9 - this.pointLight.position.y) * 0.055;
    this.pointLight.intensity = 1.9 + Math.sin(t * 1.1) * 0.14 + flash * 0.62;
    this.rimLight.intensity = 1.28 + flash * 0.28;
    this.diamondMaterial.emissiveIntensity = 0.1 + Math.sin(t * 0.9) * 0.025 + flash * 0.16;
    this.diamondMaterial.opacity = 0.84 + flash * 0.06;

    this.renderer.render(this.scene, this.camera);
  };
}
