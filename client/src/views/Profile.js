import axios from "axios"
import { useNavigate, useParams } from "react-router-dom"
import { useEffect } from "react"
import Match from "../components/Match"

function Profile({ info, error, setError, setRegion, setInfo, matchHistory, getMatchHistory }) {
    const profileIcon = "http://ddragon.leagueoflegends.com/cdn/13.1.1/img/profileicon/"
    const navigate = useNavigate()
    let { code } = useParams()
    let { username } = useParams()
    function getInfo() {
        setError("")
        setRegion(code)
        axios.get(`http://127.0.0.1:5000/user/${code}/${username}`).then(response => {
            setInfo(response.data)
            getMatchHistory(code, username, response.data.puuid)
        }).catch(error => {
            setError(error.response.data.status.message)
            navigate(`/error/${error.response.status}`)
        })
        console.log("fire once")
    }
    useEffect(() => {
        if(info === "") {
            getInfo()
        } else if(info && matchHistory.length === 0) {
            getMatchHistory(code, username, info.puuid)
        }
    }, []);

    function check() {
        console.log(matchHistory.length)
    }
    return (
        
        <div className="profile">
            <div className="summoner">
                <div className="profile-icon">
                    <img src={`${profileIcon}${info.profileIconId}.png`} alt={info.profileIconId} />
                    <div className="profile-level">
                        <span>{info.summonerLevel}</span>
                    </div>
                </div>
                <div className="profile-name">
                    <span>{info.name}</span>
                    <button onClick={getInfo}>Update</button>
                </div>
            </div>
            {matchHistory.length !== 0?
            <div className="match-history">
                {matchHistory.map((match, index) => {
                    return <Match matchId={match} name={info.name} region={code} key={index} />
                })}
            </div>
            : <div className="match-history">No match history found</div>
            }
        </div>
        
    )
}

export default Profile