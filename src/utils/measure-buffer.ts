export function measureBuffer(position: number, length: number, data: Float32Array) {
  let sum = 0.0;

  for (let i = position; i <= position + length - 1; i++) {
    sum += Math.pow(data[i], 2);
  }

  return Math.sqrt(sum / data.length);
}
