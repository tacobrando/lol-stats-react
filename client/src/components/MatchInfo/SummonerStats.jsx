
function SummonerStats({ summoner, spells, runes, playerTeam, enemyTeam, duration, items }) {
    const championIcon = `http://ddragon.leagueoflegends.com/cdn/13.1.1/img/champion/${summoner.championName}.png`
    const spellIcon = "http://ddragon.leagueoflegends.com/cdn/13.1.1/img/spell/"
    const runeIcon = "https://ddragon.leagueoflegends.com/cdn/img/"
    const itemIcon = "http://ddragon.leagueoflegends.com/cdn/13.1.1/img/item/"

    function minionParse(minions, duration) {
        let hours = Math.floor(duration / 60 / 60);
        let minutes = Math.floor(duration / 60) - hours * 60;
        let result = minions / minutes
        return Math.floor(result * 10) / 10
    }

    function kdaParse(kills, assists, deaths) {
        let kda = ((kills + assists)/deaths).toFixed(2)
        if(kda === "Infinity") {
            return "Perfect"
        }
        return kda
    }

    return (
        <div className="summoner-stats">
            <div style={{display: "flex"}}>
                <div className="summoner-champion">
                    <div className="icon">
                        <img src={championIcon} height="48" width="48" alt={summoner.championName} />
                        <span>
                            {summoner.champLevel}
                        </span>
                    </div>
                    <div className="spells">
                        <div className="spell">
                            <div style={{position: "relative"}}>
                                <img src={`${spellIcon}${spells[0]}`} alt={spells[0]} />
                            </div>
                        </div>
                        <div className="spell">
                            <div style={{position: "relative"}}>
                                <img height="22" src={`${spellIcon}${spells[1]}`} alt={spells[1]} />
                            </div>
                        </div>
                    </div>
                    <div className="runes">
                        <div className="rune">
                            <div style={{position: "relative"}}>
                                <img height="22" src={`${runeIcon}${runes[0].icon}`} alt={runes[0].key} />
                            </div>
                        </div>
                        <div className="rune">
                            <div style={{position: "relative"}}>
                                <img height="22" src={`${runeIcon}${runes[1].icon}`} alt={runes[1].key} />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="score">
                    <div className="kda">
                        <span>{summoner.kills}</span> / <span id="deaths">{summoner.deaths}</span> / <span>{summoner.assists}</span>
                    </div>
                    <div className="ratio">
                        <span>{kdaParse(summoner.kills, summoner.assists, summoner.deaths)}</span> KDA
                    </div>
                </div>
                <div className="stats">
                    <div className="participation-kills">
                        <div style={{position: "relative", color: "red"}}>
                            P/Kill {(((summoner.kills + summoner.assists)/playerTeam.objectives.champion.kills)*100).toFixed(0)}%
                        </div>
                    </div>
                    <div className="wards">Control Ward {summoner.detectorWardsPlaced}</div>
                    <div className="creep-score">
                        <div style={{position: "relative"}}>
                            CS {summoner.totalMinionsKilled} ({minionParse(summoner.totalMinionsKilled, duration)})
                        </div>
                    </div>
                </div>
            </div>
            <div style={{display: "flex", alignItems: "center", marginTop: "8px", height: "22px"}}>
                <div className="items">
                    <ul>
                    {items.map((item, index) => {
                        if(item.id !== undefined) {
                            return (
                                <li key={index}>
                                    <div style={{position: "relative"}}>
                                        <img width="22" height="22" src={`${itemIcon}${item.id}.png`} alt={item.name}></img>
                                    </div>
                                </li>
                            )
                        } else {
                            return (
                                <li key={index}>
                                    <div 
                                    style={
                                        {
                                            position: "relative", 
                                            width: "22px", 
                                            height: "22px", 
                                            background: "black",
                                            borderRadius: "4px",
                                            opacity: "0.3" 
                                        }
                                    }>
                                        
                                    </div>
                                </li>
                            )
                        }
                    })}
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default SummonerStats