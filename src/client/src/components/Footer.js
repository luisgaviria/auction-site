import React, { useState, useEffect } from "react";

const Footer = () => {
  const [showFooter, setShowFooter] = useState(false);

  useEffect(() => {
    const handleLoad = () => setShowFooter(true);
    window.addEventListener("load", handleLoad);

    return () => window.removeEventListener("load", handleLoad);
  }, []);

  if (!showFooter) return null; // Render nothing until footer is ready

  return (
    <footer id="colophon" className="container site-footer">
      <div className="top" />
      <hr />
      <div className="left-right">
        <div className="left text-footer-links">
          <div className="footer-menu widget_block">
            <div className="footer-menu-title">Social</div>
            <ul>
              {/* <li className="li-footer">
                <a href="#" target="_blank" rel="noreferrer noopener">
                  Instagram
                </a>
              </li> */}
              {/* <li className="li-footer">
                <a href="#" target="_blank" rel="noreferrer noopener">
                  Twitter
                </a>
              </li> */}
              <li className="li-footer">
                <a href="#" target="_blank" rel="noreferrer noopener">
                  LinkedIn
                </a>
              </li>
              <li className="li-footer">
                <a
                  href="https://www.facebook.com/profile.php?id=100094138875070"
                  target="_blank"
                  rel="noreferrer noopener"
                >
                  Facebook
                </a>
              </li>
            </ul>
          </div>
          <div className="footer-menu widget_block">
            <div className="footer-menu-title">Info</div>
            <ul>
              <li className="li-footer">
                <a href="/about/">About</a>
              </li>
              <li className="li-footer">
                <a href="https://www.bostonharmonyhomes.com">
                  Properties on the Market
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="right text-footer-links">
          <div className="footer-menu widget_block">
            <div className="menu-title-phone">Phone Number</div>
            <div className="wp-widget-group__inner-blocks">
              <a className="tel" href="tel:+15087627639">
                508-762-7639
              </a>
              <br />
              <a href="mailto:luis.aptx@gmail.com" style={{ color: "#151515" }}>
                Email
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
export default Footer;
