import React, { useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Home.css";

function Home() {
  const navigate = useNavigate();
  const [q, setQ] = useState("");

  const services = useMemo(
    () => [
      {
        title: "Passport Application",
        desc: "Submit a passport request and receive status updates securely.",
        to: "/apply",
        icon: "🛂",
      },
      {
        title: "National ID (NIN)",
        desc: "Apply for your National Identification Number with guided steps.",
        to: "/apply",
        icon: "🪪",
      },
      {
        title: "Voter’s Card",
        desc: "Register, submit documents, and track approval updates easily.",
        to: "/apply",
        icon: "🗳️",
      },
      {
        title: "Track Application",
        desc: "Check real-time status using your tracking number.",
        to: "/status",
        icon: "🔎",
      },
    ],
    []
  );

  const news = useMemo(
    () => [
      {
        tag: "Digital Government",
        title: "FG expands online access to citizen services nationwide",
        meta: "Updates • Today",
        desc: "Improved online workflows reduce processing delays and enhance transparency.",
      },
      {
        tag: "Identity Management",
        title: "NIN integration strengthens verification across services",
        meta: "Public Notice • This week",
        desc: "A unified verification system enhances security and reduces duplication.",
      },
      {
        tag: "Elections",
        title: "Voter registration support extended in selected regions",
        meta: "Announcement • This month",
        desc: "New support centers and online guidance help citizens complete applications.",
      },
    ],
    []
  );

  const onSearch = (e) => {
    e.preventDefault();
    const query = q.trim().toLowerCase();

    if (!query) return;

    // Simple smart routing (can be improved later)
    if (query.includes("track") || query.includes("status")) return navigate("/status");
    if (query.includes("feedback")) return navigate("/feedback");

    // Default: apply page
    navigate("/apply");
  };

  return (
    <div className="home">
      {/* HERO */}
      <section className="heroG">
        <div className="heroOverlay" />
        <div className="container heroContent">
          <div className="heroLeft">
            <div className="heroBadge">
              <span className="dot" />
              Official Nigeria e-Government Services
            </div>

            <h1 className="heroTitle">
              Access government services online — faster, simpler, and secure.
            </h1>

            <p className="heroSubtitle">
              Apply for Passport, NIN, and Voter’s Card. Track your application status and receive updates on one portal.
            </p>

            <form className="heroSearch" onSubmit={onSearch}>
              <label className="srOnly" htmlFor="serviceSearch">Find a service</label>
              <input
                id="serviceSearch"
                className="searchInput"
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Find a service (e.g., passport, NIN, track status)"
              />
              <button className="btn btn-primary searchBtn" type="submit">
                Find a Service
              </button>
            </form>

            <div className="heroCtas">
              <Link to="/apply" className="btn btn-secondary">
                Start Application
              </Link>
              <Link to="/status" className="btn btn-outline">
                Check Status
              </Link>
            </div>

            <div className="heroMini">
              <div className="miniCard">
                <div className="miniTop">
                  <span className="miniIcon">✅</span>
                  <span className="miniTitle">Verified workflow</span>
                </div>
                <p className="miniText">Structured steps and validation to reduce errors.</p>
              </div>

              <div className="miniCard">
                <div className="miniTop">
                  <span className="miniIcon">🔒</span>
                  <span className="miniTitle">Secure access</span>
                </div>
                <p className="miniText">JWT-based authentication and role-based admin controls.</p>
              </div>
            </div>
          </div>

          <div className="heroRight" aria-hidden="true">
            <div className="heroPanel">
              <div className="panelHead">
                <div className="panelTitle">Quick Actions</div>
                <div className="panelSub">Most used services</div>
              </div>

              <div className="quickGrid">
                {services.map((s) => (
                  <Link key={s.title} to={s.to} className="quickTile">
                    <div className="quickIcon">{s.icon}</div>
                    <div className="quickText">
                      <div className="quickTitle">{s.title}</div>
                      <div className="quickDesc">{s.desc}</div>
                    </div>
                    <div className="quickArrow">→</div>
                  </Link>
                ))}
              </div>

              <div className="panelFooter">
                <div className="trust">
                  <span className="trustDot" />
                  Service availability: <strong>Online</strong>
                </div>
                <Link to="/feedback" className="panelLink">Give Feedback</Link>
              </div>
            </div>
          </div>
        </div>

        {/* Flag accent like Ghana portal style */}
        <div className="flagBar" aria-hidden="true">
          <div className="g" />
          <div className="w" />
          <div className="g" />
        </div>
      </section>

      {/* SERVICES */}
      <section className="section">
        <div className="container">
          <div className="sectionHead">
            <h2>Featured Services</h2>
            <p>Select a service to begin your application or track progress.</p>
          </div>

          <div className="serviceGrid">
            {services.map((s) => (
              <div className="serviceCard card" key={s.title}>
                <div className="serviceIcon">{s.icon}</div>
                <h3 className="serviceTitle">{s.title}</h3>
                <p className="serviceDesc">{s.desc}</p>
                <div className="serviceActions">
                  <Link className="btn btn-primary btn-sm" to={s.to}>Open</Link>
                  <Link className="btn btn-outline btn-sm" to="/status">Track</Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* UPDATES */}
      <section className="section alt">
        <div className="container">
          <div className="sectionHead">
            <h2>Latest Updates</h2>
            <p>Announcements and improvements to public digital services.</p>
          </div>

          <div className="newsGrid">
            {news.map((n) => (
              <article className="newsCard card" key={n.title}>
                <div className="newsTag">{n.tag}</div>
                <h3 className="newsTitle">{n.title}</h3>
                <div className="newsMeta">{n.meta}</div>
                <p className="newsDesc">{n.desc}</p>
                <div className="newsFooter">
                  <span className="badge">Public</span>
                  <a className="newsLink" href="#" onClick={(e) => e.preventDefault()}>
                    Read more →
                  </a>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* CTA STRIP */}
      <section className="ctaStrip">
        <div className="container ctaInner">
          <div>
            <h2 className="ctaTitle">Already applied?</h2>
            <p className="ctaText">Use your tracking number to check progress in seconds.</p>
          </div>
          <Link to="/status" className="btn btn-primary">Track Now</Link>
        </div>
      </section>
    </div>
  );
}

export default Home;
