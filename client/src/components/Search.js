
import './Components.css'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
function Search({ input, regions, region, setRegion, setInput, setError, setInfo, getMatchHistory }) {
  const navigate = useNavigate()

  function inputChange(event) {
    setInput(event.target.value)
  }

  function regionChange(event) {
    setRegion(event.target.value)
  }

  function searchHandler(event) {
    event.preventDefault()
    setError("")
    if(region === 'null') {
        return alert("Please select a region")
    }
    axios.get(`http://127.0.0.1:5000/user/${region}/${input}`).then((response) => {
        setInfo(response.data)
        getMatchHistory(region, input, response.data.puuid)
        navigate(`/${region}/${input}`)
        return 
    }).catch((error) => {
        setError(error.response.data.status.message)
        navigate(`/error/${error.response.status}`)
        return 
    })
    console.log("search fire once")
  }
  return (
    <form id="search" onSubmit={searchHandler}>
        <input 
            id="username"
            required
            type="text" 
            value={input}
            onChange={inputChange}
            placeholder="Search..." 
        />
        <select 
            required
            id="regions" 
            className="height-36px" 
            value={region}
            onChange={regionChange} 
            name="regions"
        >
            <option disabled value="null">Region</option>
            {regions.map((region, index) => (
                <option 
                    key={index} 
                    value={region}>
                        {region}
                </option>
            ))}
        </select>
        <input 
            id="search-btn" 
            className="height-36px " 
            type="submit" 
        />
    </form>
  )
}

export default Search
