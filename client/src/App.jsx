import { useState,useEffect } from 'react'
import { getTeams } from './Redux/actions';
import { useDispatch, useSelector } from 'react-redux';
import { DriverRegistration } from "./components/index";
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
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <div>
        <DriverRegistration />
      </div>
    </>
  )
}

export default App
