type Mods = Record<string, boolean | string>;

export function classNames (
  cls: string,
  mods: Mods = {},
  additionals: string[] = []
): string {
  return [
    cls,
    ...additionals.filter(Boolean),
    ...Object.entries(mods)
      .filter(([_, value]) => Boolean(value))
      .map(([className]) => className)
  ].join(' ');
}
