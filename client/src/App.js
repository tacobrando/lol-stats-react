import './App.css';
import { useState, useEffect } from 'react'
import axios from "axios"

import Home from './views/Home'
import Profile from './views/Profile'
import Error from './views/Error'

import Search from './components/Search'
import { Route, Routes, useLocation, Link } from 'react-router-dom'

function App() {
  const location = useLocation()
  const regions = [
    "BR",
    "EUN",
    "EUW",
    "JP",
    "KR",
    "LAN",
    "LAS",
    "NA",
    "OCE",
    "TUR",
    "RUS",
    "PHI",
    "SG",
    "THA",
    "TW",
    "VN",
  ]
  const initialRegionState = localStorage.getItem("region") || null

  const [info, setInfo] = useState("");
  const [matchHistory, setMatchHistory] = useState([])
  const [input, setInput] = useState("");
  const [error, setError] = useState("")
  const [region, setRegion] = useState(initialRegionState)

  function getMatchHistory(code,username, puuid) {
    setMatchHistory([])
    axios.get(`http://127.0.0.1:5000/user/${code}/${username}/match-history/${puuid}`).then(response => {
        setMatchHistory(response.data)
    }).catch(error => {
        console.log(error)
    })
}

  useEffect(() => {
    localStorage.setItem("region", region)
  }, [region])


  return (
    <div id="app">
      <nav>
        {location.pathname === '/' ?
        <div></div>
        :<div className="nav">
          <Link to="/">Home</Link>
          <Search 
            input={input} 
            setInput={setInput}
            regions={regions}
            region={region}
            setRegion={setRegion}
            error={error}
            setError={setError}
            info={info}
            setInfo={setInfo}
            getMatchHistory={getMatchHistory}
          /> 
          </div>
        }
      </nav>
      <Routes>
        <Route 
          path="/" 
          element={
          <Home 
            info={info}
            setInfo={setInfo}
            input={input} 
            setInput={setInput}
            regions={regions}
            region={region}
            setRegion={setRegion}
            error={error}
            setError={setError}
            getMatchHistory={getMatchHistory}
          />}
        />
        <Route 
          path="/:code/:username"
          element={<Profile 
            info={info}
            region={region}
            matchHistory={matchHistory}
            error={error}
            setInfo={setInfo}
            setRegion={setRegion}
            getMatchHistory={getMatchHistory}
            setError={setError}
          />}
        >
        </Route>
        <Route 
          path="/error/:status"
          element={<Error 
            error={error}
          />}
        ></Route>
      </Routes>
    </div>
  );
}

export default App;
