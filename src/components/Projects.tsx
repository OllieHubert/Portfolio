import { RestaurantDemo } from './RestaurantDemo'

export function Projects() {
  return (
    <section className="section" id="projects">
      <div className="section-inner">
        <p className="section-label">Level Select</p>
        <h2 className="section-title">Projects</h2>
        <p className="section-lead">
          Product stories only — no source dumps here. Each build mixes a clear
          user loop with a little math under the hood.
        </p>

        <div className="project-stack">
          <article className="project">
            <div className="project-copy">
              <div className="project-meta">
                <span className="chip lime">work in progress</span>
                <span className="chip">Mapbox APIs</span>
                <span className="chip magenta">elevation ranking</span>
              </div>
              <h3>Bike Route Generation</h3>
              <p>
                Preference-aware cycling route planner: drop a start, set target
                distance and climb vibe, then generate ranked out-and-back or
                loop rides on real roads.
              </p>
              <ul>
                <li>
                  Linked Mapbox API calls for cycling isochrones, directions,
                  terrain elevation, and basemaps — plus geocoding for home and
                  search
                </li>
                <li>
                  Candidate routes sampled from the reachable ring, then scored
                  against distance and elevation preference
                </li>
                <li>
                  Saved rides, sharing, FIT/GPX uploads with heart-rate and power
                  charts, and a 3D fly-through simulation for the chosen line
                </li>
                <li>Still shipping features — the routing core is already fun to ride</li>
              </ul>
            </div>
            <div>
              <figure className="shot-frame">
                <img
                  src="/images/bike-route-mock.jpg"
                  alt="Bike route generation app mockup showing isochrone and ranked routes on a dark map"
                />
              </figure>
              <p className="shot-caption">
                Isochrone reach + ranked routes tuned to how hard you want to climb.
              </p>
            </div>
          </article>

          <article className="project reverse">
            <div className="project-copy">
              <div className="project-meta">
                <span className="chip">World Cup pool</span>
                <span className="chip magenta">30+ active users</span>
                <span className="chip lime">live results</span>
              </div>
              <h3>Bopa del Bundo</h3>
              <p>
                A friends-and-family FIFA World Cup betting pool with auth,
                onboarding, group-stage rankings, knockout scorelines, and a
                shared leaderboard that updates as real match results land.
              </p>
              <ul>
                <li>
                  React front end with a Postgres-backed backend for profiles,
                  picks, and scoring
                </li>
                <li>
                  Tournament data pulled live so standings and results stay in
                  sync without babysitting spreadsheets
                </li>
                <li>
                  Config-driven lock windows and a custom points engine —
                  group order, advancers, knockout winners, exact scores, and a
                  champion bonus
                </li>
                <li>
                  Compare views after lock so the whole pool can see who called
                  what, plus rapid bug fixes while 30+ people stayed active
                  through the tournament
                </li>
              </ul>
            </div>
            <div>
              <div className="shot-pair two">
                <figure className="shot-frame">
                  <img
                    src="/images/bopa-leaderboard.jpg"
                    alt="Bopa del Bundo leaderboard mockup with player rankings and champion picks"
                  />
                </figure>
                <figure className="shot-frame">
                  <img
                    src="/images/bopa-group-picks.jpg"
                    alt="Bopa del Bundo group stage picks mockup with ranked teams"
                  />
                </figure>
              </div>
              <p className="shot-caption">
                Leaderboard + group picks — retro pool energy, serious scoring.
              </p>
            </div>
          </article>

          <article className="project">
            <div className="project-copy">
              <div className="project-meta">
                <span className="chip">dating / dining</span>
                <span className="chip orange">cosine similarity</span>
                <span className="chip">synthetic data</span>
              </div>
              <h3>Date Night Restaurant Finder</h3>
              <p>
                A swipe-left / swipe-right restaurant picker for couples and
                first dates. Each place lives as a multidimensional feature
                vector — romance, heat, quiet, value, walkability — and liked
                spots shape a shared taste profile.
              </p>
              <ul>
                <li>
                  Cosine similarity in vector space ranks the next restaurant
                  you might both enjoy
                </li>
                <li>
                  Built and tested against synthetic restaurant data so the
                  matching loop could be tuned without scraping the world
                </li>
                <li>
                  Try the mini demo below — same idea, playful UI, no login
                  required
                </li>
              </ul>
            </div>
            <div>
              <RestaurantDemo />
            </div>
          </article>
        </div>
      </div>
    </section>
  )
}
