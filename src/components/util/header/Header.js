import React, { useEffect } from 'react';
import { Link } from "react-router-dom";
import "./Header.css";
import links from '../../../data/links';

const Header = ({ toggleTheme, theme }) => {

  useEffect(() => {
    document.body.className = theme;
  }, [theme]);

  return (
    <header className="menu-wrapper">
      <div className="menu-bar">
        <Link to="/" className="logo" title="Home" aria-label="home">
          <h3>Daily ToolSet</h3>
        </Link>
        <nav>
          <ul className="navigation hide">
            {links.map((link) => (
              <li key={link.label}>
                {link.links ? (
                  <>
                    <Link to={link.links[0].to} className="nav-link">
                      {link.label}
                    </Link>
                    {link.links.length > 1 && (
                      <div className="dropdown-wrapper">
                        <div className="dropdown">
                          <ul className="list-items-with-description">
                            {link.links.slice(1).map((sublink) => (
                              <li key={sublink.to}>
                                <div className="item-title">
                                  <Link to={sublink.to} className="nav-link">
                                    {sublink.svg}
                                    <h3>{sublink.label}</h3>
                                  </Link>
                                </div>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    )}
                  </>
                ) : (
                  <Link to={link.to} className="nav-link">
                    {link.label}
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </nav>
      </div>

      <div className="action-buttons hide">
        <Link to="#" onClick={toggleTheme} className="theme-toggle" title="Toggle theme">
          {theme === 'light' ? "🌙" : "☀️"}
        </Link>
      </div>
      <div aria-label="Open menu" className="burger-menu"></div>
    </header>
  );
};

export default Header;

