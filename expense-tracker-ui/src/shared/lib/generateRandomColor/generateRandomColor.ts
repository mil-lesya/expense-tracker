export function generateRandomColor (): string {
  let color = '#';
  for (let i = 0; i < 3; i++) {
    // Генерируем компоненты RGB, каждый в диапазоне от 32 до 223.
    // Это исключает очень темные (<32) и очень светлые (>223) значения.
    const component = Math.floor(Math.random() * (223 - 32) + 32);
    const componentHex = component.toString(16);
    color += componentHex.length === 1 ? '0' + componentHex : componentHex;
  }
  return color;
}
