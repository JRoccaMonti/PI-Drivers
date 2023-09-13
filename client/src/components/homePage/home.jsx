import React from 'react';
import { Link } from 'react-router-dom';

function HomePage() {
  return (
    <div className="landing-page">
      <p>Esta es una home page de ejemplo.</p>
      <Link to="/register">
        <button>Ir al registro</button>
      </Link>
    </div>
  );
}

export default HomePage;