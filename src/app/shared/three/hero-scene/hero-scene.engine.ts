import {
  AmbientLight,
  BufferAttribute,
  BufferGeometry,
  Color,
  Float32BufferAttribute,
  Group,
  IcosahedronGeometry,
  LineBasicMaterial,
  LineSegments,
  Mesh,
  MeshBasicMaterial,
  PerspectiveCamera,
  Points,
  PointsMaterial,
  Scene,
  Vector2,
  WebGLRenderer,
  WireframeGeometry,
} from 'three';

export interface HeroSceneOptions {
  canvas: HTMLCanvasElement;
  reducedMotion: boolean;
}

/**
 * Pure Three.js engine for the EKIN KRUZ hero.
 * Obsidian Signal: abstract lattice that breathes and follows the pointer.
 */
export class HeroSceneEngine {
  private readonly scene = new Scene();
  private readonly camera: PerspectiveCamera;
  private readonly renderer: WebGLRenderer;
  private readonly root = new Group();
  private readonly pointer = new Vector2(0, 0);
  private readonly targetRot = new Vector2(0, 0);
  private readonly reducedMotion: boolean;

  private frameId = 0;
  private running = false;
  private disposed = false;
  private startTime = 0;
  private width = 1;
  private height = 1;

  constructor(options: HeroSceneOptions) {
    this.reducedMotion = options.reducedMotion;

    this.camera = new PerspectiveCamera(42, 1, 0.1, 100);
    this.camera.position.set(0, 0.15, 5.2);

    this.renderer = new WebGLRenderer({
      canvas: options.canvas,
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance',
    });
    this.renderer.setClearColor(0x000000, 0);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.5));

    this.scene.add(new AmbientLight(0x5b7cff, 0.35));
    this.buildLattice();
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
    this.width = width;
    this.height = height;
    this.camera.aspect = width / height;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(width, height, false);
  }

  dispose(): void {
    this.stop();
    this.disposed = true;

    this.scene.traverse((obj) => {
      const mesh = obj as Mesh;
      if (mesh.geometry) mesh.geometry.dispose();
      const material = mesh.material;
      if (Array.isArray(material)) {
        material.forEach((m) => m.dispose());
      } else if (material) {
        material.dispose();
      }
    });

    this.renderer.dispose();
  }

  private buildLattice(): void {
    const signal = new Color(0x2ee6d6);
    const trust = new Color(0x5b7cff);

    // Core wireframe — architectural signal
    const coreGeo = new IcosahedronGeometry(1.35, 1);
    const coreWire = new WireframeGeometry(coreGeo);
    const core = new LineSegments(
      coreWire,
      new LineBasicMaterial({
        color: signal,
        transparent: true,
        opacity: 0.55,
      }),
    );
    coreGeo.dispose();
    this.root.add(core);

    // Inner solid — soft volume
    const inner = new Mesh(
      new IcosahedronGeometry(0.72, 1),
      new MeshBasicMaterial({
        color: trust,
        transparent: true,
        opacity: 0.08,
      }),
    );
    this.root.add(inner);

    // Outer particle shell
    const count = this.reducedMotion ? 180 : 420;
    const positions = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const r = 1.85 + Math.random() * 1.1;
      const theta = Math.acos(2 * Math.random() - 1);
      const phi = Math.random() * Math.PI * 2;
      positions[i * 3] = r * Math.sin(theta) * Math.cos(phi);
      positions[i * 3 + 1] = r * Math.sin(theta) * Math.sin(phi);
      positions[i * 3 + 2] = r * Math.cos(theta);
    }

    const pointsGeo = new BufferGeometry();
    pointsGeo.setAttribute('position', new Float32BufferAttribute(positions, 3));
    const points = new Points(
      pointsGeo,
      new PointsMaterial({
        color: signal,
        size: 0.028,
        transparent: true,
        opacity: 0.75,
        sizeAttenuation: true,
        depthWrite: false,
      }),
    );
    this.root.add(points);

    // Connection lines between a subset of points (network metaphor)
    const linkCount = this.reducedMotion ? 40 : 90;
    const linkPositions: number[] = [];
    for (let i = 0; i < linkCount; i++) {
      const a = Math.floor(Math.random() * count) * 3;
      const b = Math.floor(Math.random() * count) * 3;
      const dx = positions[a] - positions[b];
      const dy = positions[a + 1] - positions[b + 1];
      const dz = positions[a + 2] - positions[b + 2];
      const dist = Math.hypot(dx, dy, dz);
      if (dist > 0.55 && dist < 1.35) {
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

    if (linkPositions.length) {
      const linksGeo = new BufferGeometry();
      linksGeo.setAttribute('position', new BufferAttribute(new Float32Array(linkPositions), 3));
      const links = new LineSegments(
        linksGeo,
        new LineBasicMaterial({
          color: trust,
          transparent: true,
          opacity: 0.22,
        }),
      );
      this.root.add(links);
    }

    this.root.rotation.x = 0.35;
    this.root.rotation.y = -0.4;
  }

  private tick = (): void => {
    if (!this.running || this.disposed) return;
    this.frameId = requestAnimationFrame(this.tick);

    const t = (performance.now() - this.startTime) / 1000;

    if (this.reducedMotion) {
      this.root.rotation.y = -0.4 + t * 0.02;
    } else {
      this.targetRot.x = this.pointer.y * 0.35;
      this.targetRot.y = this.pointer.x * 0.55;
      this.root.rotation.x += (0.35 + this.targetRot.x - this.root.rotation.x) * 0.045;
      this.root.rotation.y += (-0.4 + this.targetRot.y + t * 0.12 - this.root.rotation.y) * 0.045;

      const breath = 1 + Math.sin(t * 0.9) * 0.035;
      this.root.scale.setScalar(breath);
    }

    this.renderer.render(this.scene, this.camera);
  };
}
