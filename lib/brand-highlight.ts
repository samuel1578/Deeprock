export const defaultBrandHighlights = [
  'Deep Rock Mining Limited',
  'Deep Rock Mining Ltd.',
  'Deep Rock Mining Ltd',
  'Deep Rock Co. Ltd.',
  'Deep Rock Co. Ltd',
  "Deep Rock's",
  'Deep Rock’s',
  'Deep Rock',
] as const

export function createHighlightPattern(
  highlights: readonly string[],
): RegExp {
  const escaped = [...highlights]
    .sort((a, b) => b.length - a.length)
    .map((item) => item.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'))

  return new RegExp(`(${escaped.join('|')})`, 'gi')
}
