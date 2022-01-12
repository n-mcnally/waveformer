export class WaveformerCanvas {
  canvas: HTMLCanvasElement;
  context: CanvasRenderingContext2D;

  constructor(color = '#666', height = 906, width = 132) {
    this.canvas = document.createElement('canvas');

    const context = this.canvas.getContext('2d');

    if (!context) {
      throw new Error('Failed to create a `WaveformerCanvas` instance.');
    }

    this.context = context;

    this.canvas.width = width;
    this.canvas.height = height;
  }
}
