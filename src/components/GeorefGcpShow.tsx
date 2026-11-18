import { useEffect, useMemo, useState } from 'react'

const STEPS = [
  {
    title: 'Unreferenced San Francisco sheet',
    body: 'A USGS topo scan is just pixels until we tie it to real places on a map of the United States.',
  },
  {
    title: 'Pick ground control points',
    body: 'Each GCP pairs a corner on the sheet with the matching Bay Area location on the US basemap.',
  },
  {
    title: 'Solve the warp',
    body: 'Those GCP pairs drive the transform — the sheet stretches so pixel space matches map space.',
  },
  {
    title: 'Locked over San Francisco',
    body: 'The topo now sits on the Bay Area. Same GCP workflow we use for geological survey sheets.',
  },
] as const

const GCPS = [
  { id: 'A', sheetStyle: { left: '10%', top: '12%' }, coord: '37.875°N 122.500°W' },
  { id: 'B', sheetStyle: { left: '88%', top: '12%' }, coord: '37.875°N 122.375°W' },
  { id: 'C', sheetStyle: { left: '10%', top: '86%' }, coord: '37.750°N 122.500°W' },
  { id: 'D', sheetStyle: { left: '88%', top: '86%' }, coord: '37.750°N 122.375°W' },
] as const

export function GeorefGcpShow() {
  const [step, setStep] = useState(0)
  const [playing, setPlaying] = useState(true)
  const [gcpCount, setGcpCount] = useState(0)

  useEffect(() => {
    if (!playing) return
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduced) return
    const id = window.setInterval(() => {
      setStep((s) => (s + 1) % STEPS.length)
    }, 3400)
    return () => window.clearInterval(id)
  }, [playing])

  useEffect(() => {
    if (step === 0) {
      setGcpCount(0)
      return
    }
    if (step === 1) {
      setGcpCount(0)
      let n = 0
      const id = window.setInterval(() => {
        n += 1
        setGcpCount(n)
        if (n >= GCPS.length) window.clearInterval(id)
      }, 450)
      return () => window.clearInterval(id)
    }
    setGcpCount(GCPS.length)
  }, [step])

  const label = useMemo(() => STEPS[step], [step])

  return (
    <div
      className="geo-show"
      aria-label="Georeferencing slideshow placing a San Francisco USGS topo on a US map with GCPs"
    >
      <div className="geo-show-top">
        <div>
          <h4>Georeference with GCPs</h4>
          <p>
            Public-domain <strong>USGS San Francisco North (1947)</strong> placed
            onto a United States basemap using ground control points.
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

      <div className={`geo-stage us-stage step-${step}`}>
        <div className="us-basemap" aria-hidden="true">
          <img
            src="/images/georef/us-states.jpg"
            alt=""
            className="us-img"
          />
          <span className="us-label">United States</span>

          <div className="sf-target">
            <span className="sf-ring" />
            <span className="sf-pin">SF</span>
            {GCPS.map((gcp, i) => (
              <span
                key={`map-${gcp.id}`}
                className={`gcp map-gcp gcp-${gcp.id.toLowerCase()}${i < gcpCount ? ' show' : ''}`}
              >
                {gcp.id}
              </span>
            ))}
            <div className="sf-settled">
              <img
                src="/images/georef/sf-topo.jpg"
                alt="Georeferenced San Francisco USGS topo over the Bay Area"
              />
            </div>
          </div>
        </div>

        <div className="scan-layer sf-scan" aria-hidden="true">
          <img
            src="/images/georef/sf-topo.jpg"
            alt=""
            className="scan-img"
          />
          <span className="scan-label">USGS SF North · 1947 · 1:24,000</span>
          {GCPS.map((gcp, i) => (
            <span
              key={`sheet-${gcp.id}`}
              className={`gcp sheet-gcp${i < gcpCount ? ' show' : ''}`}
              style={gcp.sheetStyle}
            >
              {gcp.id}
            </span>
          ))}
        </div>

        <div className={`gcp-beams${step === 2 ? ' on' : ''}`} aria-hidden="true">
          {GCPS.map((gcp, i) =>
            i < gcpCount ? <span key={`beam-${gcp.id}`} className={`beam beam-${gcp.id.toLowerCase()}`} /> : null,
          )}
        </div>

        <div className="coord-readout" aria-hidden="true">
          <span>GCPs · {Math.min(gcpCount, 4)} / 4</span>
          <span>{step >= 2 ? 'warp from GCP pairs' : 'awaiting ties'}</span>
          <span>Bay Area · NAD27 → WGS84 story</span>
        </div>
      </div>

      {step >= 1 && gcpCount > 0 && (
        <ul className="gcp-table" aria-label="Ground control point pairs">
          {GCPS.slice(0, gcpCount).map((gcp) => (
            <li key={gcp.id}>
              <strong>{gcp.id}</strong>
              <span>sheet corner ⇄ SF basemap</span>
              <em>{gcp.coord}</em>
            </li>
          ))}
        </ul>
      )}

      <div className="geo-caption">
        <p className="geo-step-index">
          Step {step + 1} / {STEPS.length}
        </p>
        <h5>{label.title}</h5>
        <p>{label.body}</p>
      </div>

      <div className="geo-dots" role="tablist" aria-label="Georeference steps">
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
