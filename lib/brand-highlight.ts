export const defaultBrandHighlights = [
  'DeepRock Mining Limited',
  'DeepRock Mining Ltd.',
  'DeepRock Mining Ltd',
  'DeepRock Co. Ltd.',
  'DeepRock Co. Ltd',
  "DeepRock's",
  'DeepRock’s',
  'DeepRock',
] as const


export function createHighlightPattern(
  highlights: readonly string[],
): RegExp {
  const escaped = [...highlights]
    .sort((a, b) => b.length - a.length)
    .map((item) => item.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'))

  return new RegExp(`(${escaped.join('|')})`, 'gi')
}
