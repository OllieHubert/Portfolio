import { DigitizeLegendShow } from './DigitizeLegendShow'
import { GeorefGcpShow } from './GeorefGcpShow'

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
          </div>

          <div className="pipeline" aria-label="Pipeline stages">
            <div className="pipe-step">
              <span className="n">01</span>
              <div>
                <strong>Georeference</strong>
                <span>
                  Tie pixels on a scan to real-world coordinates with GCPs so
                  the sheet sits correctly on a basemap.
                </span>
              </div>
            </div>
            <div className="pipe-step">
              <span className="n">02</span>
              <div>
                <strong>Digitize</strong>
                <span>
                  Trace rock units, contacts, and faults into clean vector
                  layers — guided by the map legend.
                </span>
              </div>
            </div>
            <div className="pipe-step">
              <span className="n">03</span>
              <div>
                <strong>Automate headless</strong>
                <span>
                  Run it cost-effectively at scale — architecture designed to
                  stay cheap while maps keep flowing.
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="clinic-demos">
          <GeorefGcpShow />
          <DigitizeLegendShow />
        </div>

        <p className="shot-caption clinic-credit">
          Georef demo: USGS Historical Topographic Map Collection (public
          domain) — San Francisco North 1947. Digitize demo: open Québec SIGÉOM
          imagery. Educational overlays are illustrative; clinic source stays
          private.
        </p>
      </div>
    </section>
  )
}
