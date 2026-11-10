export type Restaurant = {
  id: string
  name: string
  cuisine: string
  price: string
  neighborhood: string
  blurb: string
  emoji: string
  /** Feature vector: [romance, adventurous, spicy, quiet, value, walkable] */
  vector: number[]
}

export const FEATURE_LABELS = [
  'romance',
  'adventurous',
  'spicy',
  'quiet',
  'value',
  'walkable',
] as const

export const restaurants: Restaurant[] = [
  {
    id: 'neon-noodles',
    name: 'Neon Noodles',
    cuisine: 'Ramen',
    price: '$$',
    neighborhood: 'Arts District',
    blurb: 'Late-night bowls, soft neon, and a counter built for two.',
    emoji: '🍜',
    vector: [0.55, 0.7, 0.65, 0.35, 0.7, 0.8],
  },
  {
    id: 'orbit-oyster',
    name: 'Orbit Oyster Bar',
    cuisine: 'Seafood',
    price: '$$$',
    neighborhood: 'Harbor Row',
    blurb: 'Ice towers, candlelight, and a tiny dance floor after dessert.',
    emoji: '🦪',
    vector: [0.9, 0.45, 0.2, 0.55, 0.3, 0.5],
  },
  {
    id: 'pixel-pizza',
    name: 'Pixel Pie Co.',
    cuisine: 'Pizza',
    price: '$',
    neighborhood: 'Campus Edge',
    blurb: 'Square slices, arcade cabinets, and shareable garlic knots.',
    emoji: '🍕',
    vector: [0.35, 0.55, 0.4, 0.25, 0.95, 0.9],
  },
  {
    id: 'coral-curry',
    name: 'Coral Curry Lab',
    cuisine: 'Thai',
    price: '$$',
    neighborhood: 'West Market',
    blurb: 'Heat dials from mild to brave, with jasmine rice clouds.',
    emoji: '🍛',
    vector: [0.5, 0.85, 0.95, 0.4, 0.65, 0.6],
  },
  {
    id: 'signal-sushi',
    name: 'Signal Sushi',
    cuisine: 'Japanese',
    price: '$$$',
    neighborhood: 'Midtown',
    blurb: 'Quiet omakase energy without the stiff dress code.',
    emoji: '🍣',
    vector: [0.8, 0.6, 0.35, 0.85, 0.35, 0.45],
  },
  {
    id: 'glitch-tacos',
    name: 'Glitch Tacos',
    cuisine: 'Mexican',
    price: '$',
    neighborhood: 'Riverwalk',
    blurb: 'Al pastor on a spit, lime in the air, picnic tables outside.',
    emoji: '🌮',
    vector: [0.4, 0.75, 0.7, 0.2, 0.9, 0.85],
  },
  {
    id: 'velvet-vegan',
    name: 'Velvet Vegan',
    cuisine: 'Plant-based',
    price: '$$',
    neighborhood: 'Garden District',
    blurb: 'Soft lighting, herb gardens, and desserts that steal the show.',
    emoji: '🥗',
    vector: [0.75, 0.5, 0.25, 0.8, 0.55, 0.7],
  },
  {
    id: 'turbo-tapas',
    name: 'Turbo Tapas',
    cuisine: 'Spanish',
    price: '$$',
    neighborhood: 'Old Town',
    blurb: 'Small plates, big laughs, perfect for first-date pacing.',
    emoji: '🥘',
    vector: [0.7, 0.65, 0.45, 0.45, 0.6, 0.75],
  },
]

export function cosineSimilarity(a: number[], b: number[]): number {
  let dot = 0
  let na = 0
  let nb = 0
  for (let i = 0; i < a.length; i++) {
    dot += a[i] * b[i]
    na += a[i] * a[i]
    nb += b[i] * b[i]
  }
  if (na === 0 || nb === 0) return 0
  return dot / (Math.sqrt(na) * Math.sqrt(nb))
}

export function averageVector(vectors: number[][]): number[] {
  if (vectors.length === 0) return Array(FEATURE_LABELS.length).fill(0)
  const dim = vectors[0].length
  const out = Array(dim).fill(0)
  for (const v of vectors) {
    for (let i = 0; i < dim; i++) out[i] += v[i]
  }
  return out.map((n) => n / vectors.length)
}
