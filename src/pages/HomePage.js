// src/pages/HomePage.js
import React from 'react';
import { Link } from 'react-router-dom';
import links from '../data/links';
import './HomePage.css';

const HomePage = () => {
  return (
    <div className="container">
      <h1 className="mb-4">Welcome to our application</h1>
      <div className="grid-container">
        {links.map((category, index) => (
          <div key={index} className="category-container">
            <h2 className="my-3">
              <Link className="title my-3" to={category.links ? category.links[0].to : category.to} >
                {category.label}
              </Link>
            </h2>
            <div className="link-grid">
              {category.links ? (
                category.links.slice(1).map((link, subIndex) => (
                  <Link
                    key={subIndex}
                    to={link.to}
                    className="btn btn-outline-secondary"
                  >
                    {link.label}
                  </Link>
                ))
              ) : null}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomePage;

