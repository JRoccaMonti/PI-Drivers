import React, { useState, useEffect } from 'react';
import { Route,Routes, useLocation, useNavigate } from 'react-router-dom';
import { getTeams } from './Redux/actions';
import { useDispatch, useSelector } from 'react-redux';
import { DriverRegistration, LandingPage, HomePage , DetailPage} from "./components/index";
import './App.css';

function App() {
  const [count, setCount] = useState(0);

  const dispatch = useDispatch();

  const teams = useSelector(state => state.teams);

  useEffect(() => {
    dispatch(getTeams());    
  }, []);

  return (
    <>
      <div className='app'>
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
