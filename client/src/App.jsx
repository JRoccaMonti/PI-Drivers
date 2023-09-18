import React, { useState, useEffect } from 'react';
import { Route,Routes, useLocation, useNavigate } from 'react-router-dom';
import { getTeams, getDrivers } from './Redux/actions';
import { useDispatch, useSelector } from 'react-redux';
import { DriverRegistration, LandingPage, HomePage , DetailPage ,Nav} from "./components/index";
import './App.css';

function App() {

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getTeams());
    dispatch(getDrivers());     
  }, []);

  return (
    <>
      <div className='app'>
      <Nav />
        <Routes>
          <Route path='/' element={<LandingPage/>}/>
          <Route path='/register' element={<DriverRegistration/>}/>
          <Route path='/home' element={<HomePage/>}/>
          <Route path='/detail/:id' element={<DetailPage/>}/>            
        </Routes>
      </div>
    </>
  )
}

export default App
