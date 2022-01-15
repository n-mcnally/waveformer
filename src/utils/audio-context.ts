type AudioContextInstance = typeof window.AudioContext;

/**
 * Creates an instance of the window `AudioContext`.
 */
export function createAudioContext(): AudioContext {
  let Context: AudioContextInstance;

  if (window.AudioContext) {
    Context = window.AudioContext;
  } else if ('webkitAudioContext' in window) {
    Context = (window as any).webkitAudioContext;
  } else {
    throw new Error('Failed to create an `AudioContext` instance.');
  }

  return new Context();
}
