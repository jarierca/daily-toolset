// src/pages/NotFoundPage.js
import React from 'react';
import { Link } from 'react-router-dom';

const NotFoundPage = () => {
  return (
    <div className="container">
      <h1>404 - Page Not Found</h1>
      <p>
        <Link to="/">Back to the main page</Link>
      </p>
    </div>
  );
};

export default NotFoundPage;

