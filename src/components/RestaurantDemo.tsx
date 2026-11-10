import { useMemo, useState } from 'react'
import {
  averageVector,
  cosineSimilarity,
  restaurants,
  type Restaurant,
} from '../data/restaurants'

type Phase = 'swipe' | 'result'

export function RestaurantDemo() {
  const deck = useMemo(() => [...restaurants], [])
  const [index, setIndex] = useState(0)
  const [liked, setLiked] = useState<Restaurant[]>([])
  const [phase, setPhase] = useState<Phase>('swipe')
  const [fly, setFly] = useState<'left' | 'right' | null>(null)

  const current = deck[index]

  const recommendation = useMemo(() => {
    const taste =
      liked.length > 0
        ? averageVector(liked.map((r) => r.vector))
        : [0.7, 0.55, 0.4, 0.55, 0.6, 0.7]
    const remaining = deck.filter((r) => !liked.some((l) => l.id === r.id))
    const pool = remaining.length > 0 ? remaining : deck
    let best = pool[0]
    let bestScore = -1
    for (const r of pool) {
      const score = cosineSimilarity(taste, r.vector)
      if (score > bestScore) {
        best = r
        bestScore = score
      }
    }
    return { restaurant: best, score: bestScore, taste }
  }, [deck, liked])

  const advance = (like: boolean) => {
    if (!current || fly) return
    setFly(like ? 'right' : 'left')
    window.setTimeout(() => {
      const nextLiked = like ? [...liked, current] : liked
      setLiked(nextLiked)
      const nextIndex = index + 1
      setFly(null)
      // Finish after 3 likes, or when the deck is exhausted.
      if (nextLiked.length >= 3 || nextIndex >= deck.length) {
        setPhase('result')
        return
      }
      setIndex(nextIndex)
    }, 260)
  }

  const reset = () => {
    setIndex(0)
    setLiked([])
    setPhase('swipe')
    setFly(null)
  }

  return (
    <div className="demo-shell" aria-label="Restaurant matching demo">
      <div className="demo-header">
        <div>
          <h4>Date Night Matcher</h4>
          <p>
            Swipe a few spots. Under the hood, liked places become a taste
            vector — then cosine similarity picks the match.
          </p>
        </div>
        <button className="btn btn-ghost" type="button" onClick={reset}>
          Reset
        </button>
      </div>

      <div className="demo-stage">
        {phase === 'swipe' && current && (
          <article
            className={`swipe-card${fly === 'left' ? ' fly-left' : ''}${fly === 'right' ? ' fly-right' : ''}`}
          >
            <div className="swipe-emoji" aria-hidden="true">
              {current.emoji}
            </div>
            <h5>{current.name}</h5>
            <p className="swipe-meta">
              {current.cuisine} · {current.price} · {current.neighborhood}
            </p>
            <p>{current.blurb}</p>
            <div className="vector-pills" aria-label="Feature highlights">
              <span>romance {(current.vector[0] * 100) | 0}</span>
              <span>spice {(current.vector[2] * 100) | 0}</span>
              <span>quiet {(current.vector[3] * 100) | 0}</span>
            </div>
          </article>
        )}

        {phase === 'result' && recommendation && (
          <div className="demo-result">
            <div className="emoji" aria-hidden="true">
              {recommendation.restaurant.emoji}
            </div>
            <h5>Tonight: {recommendation.restaurant.name}</h5>
            <p>
              Based on {liked.length || 1} liked place
              {(liked.length || 1) === 1 ? '' : 's'}, your taste vector is closest
              to this restaurant in the synthetic feature space.
            </p>
            <p className="score-line">
              cosine similarity {(recommendation.score * 100).toFixed(1)}%
            </p>
            <p>
              {recommendation.restaurant.cuisine} · {recommendation.restaurant.price}{' '}
              · {recommendation.restaurant.neighborhood}
            </p>
          </div>
        )}
      </div>

      {phase === 'swipe' && (
        <div className="demo-controls">
          <button
            className="demo-btn no"
            type="button"
            aria-label="Pass"
            disabled={!!fly}
            onClick={() => advance(false)}
          >
            ✕
          </button>
          <button
            className="demo-btn yes"
            type="button"
            aria-label="Like"
            disabled={!!fly}
            onClick={() => advance(true)}
          >
            ♥
          </button>
        </div>
      )}
    </div>
  )
}
