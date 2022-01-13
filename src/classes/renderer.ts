import { WaveformerConfig } from './waveformer';

export class WaveformerRenderer {
  canvas: HTMLCanvasElement;
  context: CanvasRenderingContext2D;

  constructor(private config: WaveformerConfig) {
    this.canvas = document.createElement('canvas');

    const context = this.canvas.getContext('2d');

    if (!context) {
      throw new Error('Failed to create a `WaveformerCanvas` instance.');
    }

    this.context = context;
    this.canvas.width = config.width;
    this.canvas.height = config.height;
  }

  drawWaveform(bars: [number, number][]): void {
    bars.forEach(([index, size]) => {
      this.context.fillStyle = this.config.color;

      let width = this.config.barWidth;

      if (this.config.barGap) {
        width *= Math.abs(1 - this.config.barGap);
      }

      const x = index + width / 2;
      const y = this.config.height - size;

      this.context.fillRect(x, y, width, size);
    });
  }

  getDataUrl(type = 'image/png', quality = 1.0): string {
    return this.canvas.toDataURL(type, quality);
  }

  getImageData(): ImageData {
    return this.context.getImageData(
      0,
      0,
      this.canvas.width,
      this.canvas.height
    );
  }

  clear(): void {
    this.context.clearRect(0, 0, this.config.width, this.config.height);
  }
}
