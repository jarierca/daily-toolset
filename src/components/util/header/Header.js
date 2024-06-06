import React, { useEffect } from 'react';
import { Link } from "react-router-dom";
import "./Header.css";

const Header = ({ toggleTheme, theme }) => {
  const links = [
    { label: "Text", links: [
      { to: "/text", label: "Text Tools", svg: '' },
      { to: "/text/comparator", label: "Text Comparator", svg: '' },
      { to: "/text/character-counter", label: "Character Counter", svg: '' },
      { to: "/text/converter", label: "Text Converter", svg: '' },
      { to: "/text/find-and-replace", label: "Find & Replace", svg: '' },
      { to: "/text/code-generator", label: "Code Generator", svg: '' }
    ]},
    { label: "Validator", links: [
      { to: "/validator", label: "Validator Tools", svg: '' },
      { to: "/validator/json", label: "JSON", svg: '' },
      { to: "/validator/xml", label: "XML", svg: '' }
    ]},
    { label: "Security", links: [
      { to: "/security", label: "Security Tools", svg: '' },
      { to: "/security/password-generator", label: "Password Generator", svg: '' }
    ]},
    { label: "Encode", links: [
      { to: "/encode", label: "Encode Tools", svg: '' },
      { to: "/encode/base64", label: "Base64", svg: '' },
      { to: "/encode/url", label: "URL", svg: '' },
      { to: "/encode/xml", label: "XML", svg: '' }
    ]},
    { label: "Raffle", links: [
      { to: "/raffle", label: "Raffle Tools", svg: '' },
      { to: "/raffle/coinflip", label: "Coin Flip", svg: '' },
      { to: "/raffle/random-draw", label: "Random Draw", svg: '' }
    ]},
    { label: "Indentity", links: [{ to: "/indentity", label: "Identity", svg: '' }] },
    { label: "Keyboard", links: [
      { to: "/kbd", label: "Keyboard Tools", svg: '' },
      { to: "/kbd/test", label: "Keyboard Test", svg: '' },
      { to: "/kbd/type", label: "Typing Test", svg: '' }
    ]},
    { label: "To Do List", to: "/toDoList", svg: '' }
  ];

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

