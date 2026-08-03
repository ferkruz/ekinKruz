export class ContactMapPointerController {
  private readonly onPointerMove = (event: PointerEvent): void => {
    const rect = this.host.getBoundingClientRect();
    if (rect.width <= 0 || rect.height <= 0) return;

    const nx = ((event.clientX - rect.left) / rect.width) * 2 - 1;
    const ny = -(((event.clientY - rect.top) / rect.height) * 2 - 1);
    this.onMove(Math.max(-1, Math.min(1, nx)), Math.max(-1, Math.min(1, ny)));
  };

  private readonly onPointerLeave = (): void => {
    this.onMove(0, 0);
  };

  constructor(
    private readonly host: HTMLElement,
    private readonly onMove: (nx: number, ny: number) => void,
  ) {}

  connect(): void {
    this.host.addEventListener('pointermove', this.onPointerMove, { passive: true });
    this.host.addEventListener('pointerleave', this.onPointerLeave);
  }

  disconnect(): void {
    this.host.removeEventListener('pointermove', this.onPointerMove);
    this.host.removeEventListener('pointerleave', this.onPointerLeave);
  }
}
