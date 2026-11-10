export function Clinic() {
  return (
    <section className="section" id="clinic">
      <div className="section-inner">
        <p className="section-label">Clinic Mode</p>
        <h2 className="section-title">KoBold Metals × Harvey Mudd</h2>
        <p className="section-lead">
          Year-long clinic work georeferencing and digitizing geological survey
          maps — old paper sheets and newer scans — so exploration teams can
          query geology as data, not just pictures.
        </p>

        <div className="clinic-layout">
          <div>
            <figure className="shot-frame">
              <img
                src="/images/georef-digitize-example.jpg"
                alt="Diagram showing a scanned geologic map georeferenced onto a basemap and digitized into vector layers"
              />
            </figure>
            <p className="shot-caption">
              Example workflow: scan → georeference → digitize. Illustrative,
              not clinic source material.
            </p>

            <div className="pipeline" aria-label="Pipeline stages">
              <div className="pipe-step">
                <span className="n">01</span>
                <div>
                  <strong>Georeference</strong>
                  <span>
                    Tie pixels on a skewed survey scan to real-world
                    coordinates with control points so the map sits correctly on
                    Earth.
                  </span>
                </div>
              </div>
              <div className="pipe-step">
                <span className="n">02</span>
                <div>
                  <strong>Digitize</strong>
                  <span>
                    Trace rock units, contacts, and faults into clean vector
                    layers — geometry you can style, query, and combine with
                    other geospatial data.
                  </span>
                </div>
              </div>
              <div className="pipe-step">
                <span className="n">03</span>
                <div>
                  <strong>Automate headless</strong>
                  <span>
                    Move the heavy lifting into a headless pipeline designed for
                    cost — architecture and orchestration that scale without
                    lighting money on fire.
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="about-copy">
            <p>
              Geological maps are packed with signal, but a flat scan is not a
              database. Georeferencing answers “where is this on the planet?”
              Digitization answers “what are the shapes and labels as structured
              features?”
            </p>
            <p>
              My focus on the clinic team is the pipeline story: designing an
              automated, headless system that can take maps through those steps
              with a thrifty architecture — fewer idle GPUs, clearer stages, and
              a path from prototype notebooks to something that can run
              unattended.
            </p>
            <p>
              The payoff is practical: mineral exploration and science teams get
              searchable geology instead of folders of PDFs, and the process
              stays cheap enough to run across large map collections.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
