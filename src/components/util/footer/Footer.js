// src/components/Footer.js
import React from 'react';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-developer">
          <p>Developed by&nbsp;
            <a href="https://github.com/jarierca" target="_blank" rel="noopener noreferrer">
              jarierca
            </a>
          </p>
        </div>
        <div className="footer-links">
          <div className="footer-col">
            <p>
              <a href="https://github.com/jarierca/daily-toolset" target="_blank" rel="noopener noreferrer">
                Source Code on GitHub
              </a>
            </p>
          </div>
          <div className="footer-col">
            <p>
              <a href="https://opensource.org/licenses/GPL-3.0" target="_blank" rel="noopener noreferrer">
                GPL-3.0 License
              </a>
            </p>
          </div>
          <div className="footer-col">
            <p>
              <a href="https://github.com/jarierca/daily-toolset" target="_blank" rel="noopener noreferrer">
                Privacy Policy
              </a>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

