import { useEffect, useMemo, useState } from 'react'

type LegendItem = {
  id: string
  code: string
  name: string
  color: string
  path: string
}

/** Stylized units inspired by Québec geological provinces / regional legend coding. */
const LEGEND: LegendItem[] = [
  {
    id: 'superior',
    code: 'S',
    name: 'Superior Province',
    color: '#d4a017',
    path: 'M72 86 L210 70 L248 118 L236 188 L150 210 L78 168 Z',
  },
  {
    id: 'abitibi',
    code: 'S·volc',
    name: 'Abitibi greenstone belt',
    color: '#2f9e44',
    path: 'M118 124 L198 112 L220 148 L186 176 L128 168 Z',
  },
  {
    id: 'grenville',
    code: 'G',
    name: 'Grenville Province',
    color: '#c44dff',
    path: 'M248 118 L340 96 L372 170 L330 214 L236 188 Z',
  },
  {
    id: 'appalachian',
    code: 'A',
    name: 'Appalachian Province',
    color: '#3d8bfd',
    path: 'M340 170 L410 150 L430 210 L380 240 L330 214 Z',
  },
  {
    id: 'fault',
    code: 'FR',
    name: 'Regional fault',
    color: '#ff2e97',
    path: 'M96 150 L250 132 L360 188',
  },
]

const STEPS = [
  {
    title: 'Read the legend',
    body: 'Each color/code on a Québec survey sheet means a rock unit, structure, or contact — not decoration.',
    reveal: 0,
  },
  {
    title: 'Trace by legend color',
    body: 'Digitizing follows the legend: paint polygons and lines that match unit boundaries on the sheet.',
    reveal: 2,
  },
  {
    title: 'Build vector layers',
    body: 'Contacts become polylines, units become polygons, faults stay structural — all with attributes.',
    reveal: 4,
  },
  {
    title: 'Queryable geology',
    body: 'Now the map is data: filter by province code, style by age, overlay with other SIGÉOM layers.',
    reveal: 5,
  },
] as const

export function DigitizeLegendShow() {
  const [step, setStep] = useState(0)
  const [playing, setPlaying] = useState(true)
  const [activeLegend, setActiveLegend] = useState(0)

  useEffect(() => {
    if (!playing) return
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduced) return
    const id = window.setInterval(() => {
      setStep((s) => (s + 1) % STEPS.length)
    }, 3500)
    return () => window.clearInterval(id)
  }, [playing])

  useEffect(() => {
    setActiveLegend(Math.min(step, LEGEND.length - 1))
  }, [step])

  const label = useMemo(() => STEPS[step], [step])
  const revealCount = label.reveal

  return (
    <div className="geo-show digitize-show" aria-label="Legend-based digitization slideshow">
      <div className="geo-show-top">
        <div>
          <h4>Digitize from the legend</h4>
          <p>
            Using an Abitibi-region extract from the open{' '}
            <strong>SIGÉOM interactive map</strong>. Colors drive what gets
            traced.
          </p>
        </div>
        <div className="geo-show-controls">
          <button
            type="button"
            className="btn btn-ghost"
            onClick={() => setPlaying((p) => !p)}
          >
            {playing ? 'Pause' : 'Play'}
          </button>
        </div>
      </div>

      <div className="digitize-layout">
        <div className={`digitize-stage step-${step}`}>
          <img
            src="/images/quebec/abitibi.jpg"
            alt="SIGÉOM interactive map extract over the Abitibi region of Québec"
            className="digitize-base"
          />
          <svg
            className="digitize-overlay"
            viewBox="0 0 480 280"
            role="presentation"
          >
            {LEGEND.map((item, i) => {
              const visible = i < revealCount
              const isLine = item.id === 'fault'
              if (!visible) return null
              return isLine ? (
                <path
                  key={item.id}
                  d={item.path}
                  className={`dig-line${activeLegend === i ? ' hot' : ''}`}
                  stroke={item.color}
                  fill="none"
                />
              ) : (
                <path
                  key={item.id}
                  d={item.path}
                  className={`dig-poly${activeLegend === i ? ' hot' : ''}`}
                  fill={item.color}
                  stroke={item.color}
                />
              )
            })}
          </svg>
          {step >= 2 && (
            <div className="attr-card">
              <strong>{LEGEND[Math.min(activeLegend, LEGEND.length - 1)].code}</strong>
              <span>{LEGEND[Math.min(activeLegend, LEGEND.length - 1)].name}</span>
              <em>vector · attributed</em>
            </div>
          )}
        </div>

        <aside className="legend-panel" aria-label="Geological legend">
          <p className="legend-title">Legend (demo)</p>
          <ul>
            {LEGEND.map((item, i) => (
              <li
                key={item.id}
                className={i === activeLegend ? 'active' : ''}
                onMouseEnter={() => {
                  setPlaying(false)
                  setActiveLegend(i)
                }}
              >
                <span className="swatch" style={{ background: item.color }} />
                <span className="code">{item.code}</span>
                <span className="name">{item.name}</span>
              </li>
            ))}
          </ul>
          <p className="legend-note">
            Codes mirror Québec map conventions (S, G, A, …). Overlay shapes are
            illustrative traces for teaching the workflow.
          </p>
        </aside>
      </div>

      <div className="geo-caption">
        <p className="geo-step-index">
          Step {step + 1} / {STEPS.length}
        </p>
        <h5>{label.title}</h5>
        <p>{label.body}</p>
      </div>

      <div className="geo-dots" role="tablist" aria-label="Digitization steps">
        {STEPS.map((s, i) => (
          <button
            key={s.title}
            type="button"
            role="tab"
            aria-selected={i === step}
            className={i === step ? 'on' : ''}
            onClick={() => {
              setPlaying(false)
              setStep(i)
            }}
          />
        ))}
      </div>
    </div>
  )
}
