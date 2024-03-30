export function getRandomInt(min: number, max: number): number {
  return Math.random() * (max - min) + min;
}

export function degToRad(n: number): number {
  return n * Math.PI / 180;
}