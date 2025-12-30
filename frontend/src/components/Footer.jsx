import React from "react";
import "./Footer.css";

function Footer() {
  return (
    <footer className="site-footer">
      <div className="container footer-inner">
        <div className="footer-left">
          <div className="footer-title">Nigeria e-Government Portal</div>
          <div className="footer-sub">
            A digital platform for applying and tracking essential government documents.
          </div>
        </div>

        <div className="footer-links" aria-label="Footer links">
          <a href="#" className="footer-link">Help Center</a>
          <a href="#" className="footer-link">Privacy Policy</a>
          <a href="#" className="footer-link">Terms of Service</a>
        </div>
      </div>

      <div className="container footer-bottom">
        <span>© {new Date().getFullYear()} Nigeria e-Government Services. All rights reserved.</span>
        <span className="footer-dot" aria-hidden="true">•</span>
        <span>Built for academic/thesis demonstration</span>
      </div>
    </footer>
  );
}

export default Footer;
