import React, { useState } from "react";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

const Header = () => {
  const [isMenuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setMenuOpen(false);
  };

  const links = [
    { to: "/", label: "Home" },
    { to: "/indentity", label: "Identity" },
    { to: "/text/text-comparator", label: "Text Comparator" },
    { to: "/text/character-counter", label: "Character Counter" },
    { to: "/text/text-converter", label: "Text Converter" },
    { to: "/text/find-and-replace", label: "Find and Replace" },
    { to: "/text/code-generator", label: "Code Generator" },
    { to: "/validator/json-validator", label: "JSON Validator" },
    { to: "/validator/xml-validator", label: "XML Validator" },
    { to: "/security/password-generator", label: "Password Generator" },
    { to: "/encode/base64", label: "Base64 Encoder/Decoder" },
    { to: "/encode/url", label: "URL Encoder/Decoder" },
    { to: "/encode/xml", label: "XML Encoder/Decoder" },
    { to: "/raffle/coinflip", label: "Coin Flip" },
    { to: "/raffle/random-draw", label: "Random Draw" },
  ];

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <button
        className="navbar-toggler"
        type="button"
        onClick={toggleMenu}>
        <span className="navbar-toggler-icon"></span>
      </button>

      <div className={`collapse navbar-collapse ${isMenuOpen ? "show" : ""}`}>
        <ul className="navbar-nav">
          {links.map((link) => (
            <li key={link.to} className="nav-item">
              <Link
                to={link.to}
                className="nav-link"
                onClick={closeMenu}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
};

export default Header;
