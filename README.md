![An example image](example.png)

# Waveformer

A library for creating waveform images from audio files in the browser.

### Configuration

---

Optional configuration values can be passed when creating an instance.

```ts
color?: string; // #666
barGap?: number; // 0.4
barWidth?: number; // 6
height?: number; // 936
width?: number; // 132
```

### Usage

---

```ts
const waveformer = new Waveformer({
  /** ...configuration */
});

// get result as a data url
const dataUrl = waveformer.convertFileToDataUrl(file, 'image/jpeg', 0.9);
// ..or get raw pixel data
const imageData = waveformer.convertFileToImageData(file);
```

### Notes

---

- Instance must be instantiated after first user event or gesture.
- Uses browser `Canvas` and `AudioContext` API's.

### License

---

[MIT](https://oss.ninja/mit)
