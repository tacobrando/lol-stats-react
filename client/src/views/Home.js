import './Views.css'
import Search from '../components/Search'

function Home({ input, setInput, regions, error, setError, region, setRegion, setInfo, getMatchHistory }) {
    return (
        <div className="home">
            <h1>Welcome</h1>
            <Search
                input={input} 
                setInfo={setInfo}
                setInput={setInput}
                regions={regions}
                region={region}
                error={error}
                setError={setError}
                setRegion={setRegion}
                getMatchHistory={getMatchHistory}
            />
        </div>
    )
}

export default Home