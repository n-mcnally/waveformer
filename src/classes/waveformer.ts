import { createAudioContext } from '../utils/audio-context';

const defaultConfig: WaveformerConfig = {
  color: '#666',
  barWidth: 6,
  barGap: 0.4,
  height: 906,
  width: 132,
};

export interface WaveformerConfig {
  color?: string;
  barGap?: number;
  barWidth?: number;
  height?: number;
  width?: number;
}

export class Waveformer {
  canvas?: HTMLCanvasElement;
  context?: AudioContext;
  config: WaveformerConfig;

  constructor(config?: WaveformerConfig) {
    this.context = createAudioContext();

    // override any default properties
    this.config = { ...defaultConfig, ...(config || {}) };
  }
}
