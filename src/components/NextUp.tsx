export function NextUp() {
  return (
    <section className="section" id="next">
      <div className="section-inner">
        <p className="section-label">Continue?</p>
        <h2 className="section-title">Next up</h2>
        <div className="next-panel">
          <div className="project-meta">
            <span className="chip">fusion course</span>
            <span className="chip magenta">visualization</span>
            <span className="chip lime">tokamak</span>
          </div>
          <h3
            style={{
              margin: '0.85rem 0 0',
              fontFamily: 'var(--font-brand)',
              fontSize: 'clamp(0.8rem, 1.8vw, 1.05rem)',
              lineHeight: 1.45,
            }}
          >
            Particle trajectories in fusion reactors
          </h3>
          <p>
            Upcoming coursework project: visualizing particle motion inside a
            tokamak and other fusion reactor geometries. Think magnetic
            confinement as something you can see — orbits, drifts, and the
            geometry that keeps a plasma together — bridging simulation output
            with a clear visual story for a professor-led fusion course.
          </p>
        </div>
      </div>
    </section>
  )
}
