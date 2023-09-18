import React from 'react';
import { Link } from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux';

function LandingPage() {

  return (
    <div className="landing-page">
      <h1>Bienvenido a Mi Aplicación</h1>
      <p>Esta es una landing page de ejemplo.</p>
      <Link to="/home">
        <button>Ir a Inicio</button>
      </Link>
    </div>
  );
}

export default LandingPage;
