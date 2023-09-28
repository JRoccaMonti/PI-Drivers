import React, { useEffect } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import { DriverRegistration, LandingPage, HomePage, DetailPage, Nav } from "./components/index";
import './App.css';

function App() {
  const navigate = useNavigate();

  // Redirige a la página principal ("/") al recargar la página
  useEffect(() => {
      navigate('/');
  }, []);

  return (
    <>
      <div className='app'>
        <Nav />
        <Routes>
          <Route path='/' element={<LandingPage />} />
          <Route path='/register' element={<DriverRegistration />} />
          <Route path='/home' element={<HomePage />} />
          <Route path='/detail/:id' element={<DetailPage />} />
        </Routes>
      </div>
    </>
  )
}

export default App;