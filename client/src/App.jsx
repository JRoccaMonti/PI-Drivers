import React from 'react';
import { Route,Routes} from 'react-router-dom';
import { DriverRegistration, LandingPage, HomePage , DetailPage ,Nav} from "./components/index";
import './App.css';

function App() {


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
