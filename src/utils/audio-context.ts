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

/**
 * If an audio context is created `onLoad` it will have to be resumed
 * before it can be used. Must be called after a user gesture, eg `onClick`.
 *
 * See: https://developers.google.com/web/updates/2017/09/autoplay-policy-changes
 */
export function resumeAudioContext(context: AudioContext): void {
  if (context.state === 'closed') {
    throw new Error('Unable to resume a closed `AudioContext`.');
  }

  context.resume();

  if (context.state !== 'running') {
    throw new Error(
      'Failed to resume `AudioContext`, have you waited for the user gesture.'
    );
  }
}
