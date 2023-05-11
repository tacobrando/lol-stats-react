import { useParams } from "react-router-dom"

function Team({team}) {
    const championIcon = 'http://ddragon.leagueoflegends.com/cdn/13.1.1/img/champion/'

    const { code } = useParams()
    const { username } = useParams()
    return (
        <ul>
            {team.map((player, index) => (
                <li key={index}>
                    <div className="championIcon" style={{position: "relative"}}>
                        <img 
                            src={`${championIcon}${player.championName}.png`} 
                            width="16"
                            height="16"
                            alt={player.championName} 
                        />
                    </div>
                    <div className="championName">
                        <a 
                            href={`/${code}/${player.summonerName}`} 
                            className={player.summonerName.toLowerCase() === username.toLowerCase() ? "bold": ""}
                        >
                            {player.summonerName}
                        </a>
                    </div>
                </li>
            ))}
        </ul>
    )
}

export default Team