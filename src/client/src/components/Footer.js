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
            <div>
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
              <div className="li-footer">
                <a
                  className="tel"
                  href="#"
                  target="_blank"
                  rel="noreferrer noopener"
                >
                  LinkedIn
                </a>
              </div>
              <div className="li-footer">
                <a
                  className="tel"
                  href="https://www.facebook.com/profile.php?id=100094138875070"
                  target="_blank"
                  rel="noreferrer noopener"
                >
                  Facebook
                </a>
              </div>
            </div>
          </div>
          <div className="footer-menu widget_block">
            <div className="footer-menu-title">Info</div>
            <div>
              <div className="li-footer">
                <a className="tel" href="/about/">
                  About
                </a>
              </div>
              {/* <div className="li-footer"> */}
              <a className="tel" href="https://www.bostonharmonyhomes.com">
                Properties on the Market
              </a>
              {/* </div> */}
            </div>
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
