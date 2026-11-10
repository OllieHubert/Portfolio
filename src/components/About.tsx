export function About() {
  return (
    <section className="section" id="about">
      <div className="section-inner">
        <p className="section-label">Player One</p>
        <h2 className="section-title">About Oliver</h2>
        <div className="about-grid">
          <div className="about-copy">
            <p>
              I am a senior joint Computer Science and Mathematics major at
              Harvey Mudd College. I like shipping things friends actually use —
              tournament pools with live scoring, bike rides that respect your
              climb preference, and date-night restaurant matching with cosine
              similarity.
            </p>
            <p>
              Lately I have been deep in geospatial work with KoBold Metals
              through the Harvey Mudd Clinic: turning old and new geological
              survey maps into machine-readable layers through georeferencing,
              digitization, and a cost-conscious headless pipeline.
            </p>
            <p>
              Outside class I bounce between product polish, databases, and the
              math underneath — ranking functions, vector spaces, and spatial
              transforms that make the UI feel inevitable.
            </p>
          </div>
          <div className="stat-rail" aria-label="Highlights">
            <div className="stat">
              <strong>30+ active users</strong>
              <span>on Bopa del Bundo through tournament week</span>
            </div>
            <div className="stat">
              <strong>Full-stack builds</strong>
              <span>React front ends, APIs, Postgres / Supabase, live data</span>
            </div>
            <div className="stat">
              <strong>Math-forward UX</strong>
              <span>cosine similarity, isochrones, elevation-aware ranking</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
