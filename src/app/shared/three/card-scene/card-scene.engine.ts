import {
  BufferGeometry,
  Color,
  Float32BufferAttribute,
  Group,
  PerspectiveCamera,
  Points,
  PointsMaterial,
  Scene,
  Vector2,
  WebGLRenderer,
} from 'three';

export interface CardSceneOptions {
  canvas: HTMLCanvasElement;
  reducedMotion: boolean;
  accent?: 'signal' | 'trust';
}

/**
 * Full-card particle field — no geometric mesh, only points.
 */
export class CardSceneEngine {
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
  private interactive = false;

  constructor(options: CardSceneOptions) {
    this.reducedMotion = options.reducedMotion;
    const accent = options.accent === 'trust' ? 0x5b7cff : 0x2ee6d6;

    this.camera = new PerspectiveCamera(48, 1, 0.1, 40);
    this.camera.position.set(0, 0, 4.2);

    this.renderer = new WebGLRenderer({
      canvas: options.canvas,
      antialias: false,
      alpha: true,
      powerPreference: 'low-power',
    });
    this.renderer.setClearColor(0x000000, 0);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.25));

    this.buildField(accent);
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

  setInteractive(active: boolean): void {
    this.interactive = active;
    if (!active) this.pointer.set(0, 0);
  }

  setPointer(nx: number, ny: number): void {
    if (this.reducedMotion || !this.interactive) return;
    this.pointer.set(nx, ny);
  }

  resize(width: number, height: number): void {
    if (width <= 0 || height <= 0) return;
    this.camera.aspect = width / height;
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
      if (Array.isArray(mesh.material)) mesh.material.forEach((m) => m.dispose());
      else mesh.material?.dispose();
    });
    this.renderer.dispose();
  }

  private buildField(accent: number): void {
    const primary = new Color(accent);
    const secondary = new Color(accent === 0x5b7cff ? 0x2ee6d6 : 0x5b7cff);
    const count = this.reducedMotion ? 90 : 220;
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);

    // Spread across a wide shallow volume so points fill the card frame
    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 7.2;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 4.4;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 2.4;

      const tint = Math.random() > 0.55 ? primary : secondary;
      colors[i * 3] = tint.r;
      colors[i * 3 + 1] = tint.g;
      colors[i * 3 + 2] = tint.b;
    }

    const geometry = new BufferGeometry();
    geometry.setAttribute('position', new Float32BufferAttribute(positions, 3));
    geometry.setAttribute('color', new Float32BufferAttribute(colors, 3));

    this.root.add(
      new Points(
        geometry,
        new PointsMaterial({
          size: 0.038,
          transparent: true,
          opacity: 0.72,
          sizeAttenuation: true,
          depthWrite: false,
          vertexColors: true,
        }),
      ),
    );
  }

  private tick = (): void => {
    if (!this.running || this.disposed) return;
    this.frameId = requestAnimationFrame(this.tick);

    const t = (performance.now() - this.startTime) / 1000;

    if (this.reducedMotion) {
      this.root.rotation.y = t * 0.02;
    } else {
      this.targetRot.x = this.pointer.y * 0.22;
      this.targetRot.y = this.pointer.x * 0.28;
      this.root.rotation.x += (this.targetRot.x - this.root.rotation.x) * 0.05;
      this.root.rotation.y += (this.targetRot.y + t * 0.08 - this.root.rotation.y) * 0.05;
      const breath = 1 + Math.sin(t * 0.85) * 0.025;
      this.root.scale.setScalar(breath);
    }

    this.renderer.render(this.scene, this.camera);
  };
}
