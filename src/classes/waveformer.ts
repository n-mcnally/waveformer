import { createAudioContext, resumeAudioContext } from '../utils/audio-context';
import { measureBuffer } from '../utils/measure-buffer';
import { WaveformerRenderer } from './renderer';

const defaultConfig: WaveformerConfig = {
  color: '#666',
  barWidth: 6,
  barGap: 0.4,
  height: 906,
  width: 132,
};

export interface WaveformerConfig {
  color: string;
  barGap: number;
  barWidth: number;
  height: number;
  width: number;
}

export class Waveformer {
  audioContext: AudioContext;
  renderer: WaveformerRenderer;
  config: WaveformerConfig;

  constructor(config?: Partial<WaveformerConfig>) {
    this.config = { ...defaultConfig, ...(config || {}) };

    this.audioContext = createAudioContext();

    this.renderer = new WaveformerRenderer(this.config);
  }

  async convertFileToImageData(file: File): Promise<ImageData> {
    const audioBuffer = await this.convertFileToAudioBuffer(file);

    this.renderer.drawWaveform(this.parseAudioBuffer(audioBuffer));

    const imageData = this.renderer.getImageData();

    this.renderer.clear();

    return imageData;
  }

  async convertFileToDataUrl(file: File): Promise<string> {
    const audioBuffer = await this.convertFileToAudioBuffer(file);

    this.renderer.drawWaveform(this.parseAudioBuffer(audioBuffer));

    const dataUrl = this.renderer.getDataUrl();

    this.renderer.clear();

    return dataUrl;
  }

  private convertFileToAudioBuffer(file: File): Promise<AudioBuffer> {
    resumeAudioContext(this.audioContext);

    return new Promise(resolve => {
      const reader = new FileReader();

      reader.onload = event => {
        this.audioContext.decodeAudioData(
          event.target?.result as ArrayBuffer,
          buffer => resolve(buffer)
        );
      };

      reader.readAsArrayBuffer(file);
    });
  }

  private parseAudioBuffer(audioBuffer: AudioBuffer): [number, number][] {
    const buffer = audioBuffer.getChannelData(0);

    const sections = this.config.width;
    const length = Math.floor(buffer.length / sections);
    const maxHeight = this.config.height;

    const values = [];

    for (let i = 0; i < sections; i += this.config.barWidth) {
      values.push(measureBuffer(i * length, length, buffer) * 10_000);
    }

    const bars: [number, number][] = [];

    for (let i = 0; i < sections; i += this.config.barWidth) {
      const scale = maxHeight / Math.max(...values);

      const value = measureBuffer(i * length, length, buffer) * 10_000;

      const scaledValue = value * scale + 1;

      bars.push([i, scaledValue]);
    }

    return bars;
  }

  close(): void {
    this.audioContext.close();
  }
}
