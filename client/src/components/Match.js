import './MatchInfo/matchCard.css'
import axios from 'axios'
import { useEffect, useState } from 'react'
import QueueType from './MatchInfo/QueueType'
import SummonerStats from './MatchInfo/SummonerStats'
import Participants from './MatchInfo/Participants'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronDown } from '@fortawesome/free-solid-svg-icons'

function Match({ matchId, region, name }) {
    const Queues = require("../json/queues.json")
    const Summoners = require("../json/summoners.json")
    const Runes = require("../json/runes.json")
    const Items = require("../json/items.json")

    const [match, setMatch] = useState("")
    const [summoner, setSummoner] = useState("")
    const [playerTeam, setPlayerTeam] = useState("")
    const [enemyTeam, setEnemyTeam] = useState("")
    const [teams, setTeams] = useState([])
    const [players, setPlayers] = useState("")
    const [items, setItems] = useState([])
    const [spells, setSpells] = useState([])
    const [runes, setRunes] = useState([])


    function getMatch() {
        axios.get(`${region}/match/${matchId}`).then(response => {
            let data = response.data.info
            let gameType = getMatchType(
                { 
                    id: data.queueId, 
                    type: "queue", 
                    name: "queueId"
                })
            let teamId = getTeamId(data.participants)
            let gameStatus = getGameStatus(data.teams, teamId)

            data.gameType = gameType
            data.teamId = teamId
            data.win = gameStatus

            let player = getSummonerInfo(data.participants)

            let spellOne = getSpells(player.summoner1Id)
            let spellTwo = getSpells(player.summoner2Id)

            let runeOne = getRunes(player.perks.styles[0].style)
            let runeTwo = getRunes(player.perks.styles[1].style)

            getItems(player)

            setSpells([spellOne,spellTwo])
            setRunes([runeOne, runeTwo])

            getTeamInfo(data.teams, teamId)
            getTeams(data.participants)

            setPlayers(data.participants)
            setSummoner(player)
            setMatch(data)

            delete data.participants
            delete data.teams
        })
    }

    function getTeams(teams) {
        let sortOrder = ["TOP", "JUNGLE", "MIDDLE", "BOTTOM", "UTILITY"]
        let arrOne = []
        let arrTwo = []
        for(let i = 0; i < teams.length; i++) { 
            if(teams[i].teamId === 100) {
                arrOne.push(teams[i])
            } else if (teams[i].teamId === 200) {
                arrTwo.push(teams[i])
            }
        }
        arrOne.sort((a, b) => {
           return sortOrder.indexOf(a.teamPosition) - sortOrder.indexOf(b.teamPosition)
        })
        arrTwo.sort((a, b) => {
            return sortOrder.indexOf(a.teamPosition) - sortOrder.indexOf(b.teamPosition)
         })

        setTeams([arrOne, arrTwo])
    }
    function getItems(player) {
        let arr = []
        let keys = Object.keys(Items.data)
        if(player !== undefined) {
            for(let i = 0; i <= keys.length; i++) {
                if(Items.data[player[`item${i}`]]) {
                    arr.push({ 
                        id: player[`item${i}`],
                        name: Items.data[player[`item${i}`]].name
                    })    
                } else if(player[`item${i}`] === 0) {
                    arr.push({
                        id: Items.data[player[`item${i}`]],
                        name: null
                    })
                }
            }
        }
        setItems(arr)
    }

    function getTeamInfo(team, teamId) {
        for(let i = 0; i < 2; i++) {
            if(team[i].teamId === teamId) {
                setPlayerTeam(team[i])
            } else {
                setEnemyTeam(team[i])
            }
        }
    }

    function getSpells(id) {
        setSpells([])
        let spells = Object.keys(Summoners.data)

        for(let i = 0; i < spells.length; i++) {
            if(parseInt(Summoners.data[spells[i]].key) === parseInt(id)) {
                return Summoners.data[spells[i]].image.full
            }
        }
        return ""
    }

    function getRunes(id) {
        setRunes([])
        for(let i = 0; i < Runes.length; i++) {
            if(Runes[i].id === id) {
                return {
                    key: Runes[i].key,
                    icon: Runes[i].icon
                }
            }
        }
    }

    function getSummonerInfo(data) {
        for(let i = 0; i < data.length; i++) {
            if(data[i].summonerName === name) {
                return data[i]
            }
        }
    }

    function getGameStatus(teams, teamId) {
        for(let i  = 0; i < 2; i++) {
            if(teams[i].teamId === teamId) {
                return teams[i].win
            }
        }
    }

    function getTeamId(participants) {
        for(let i = 0; i < 10; i++) {
            if(participants[i].summonerName === name) {
                return participants[i].teamId
            }
        }
    }

    function getMatchType(data) {
        for(let i = 0; i < Queues.length; i++) {
            if(Queues[i][data.name] === data.id) {
                return Queues[i].description
            }
        }
        return null
    }
    
    function toggleDetails() {
        alert("To be added")
    }

    useEffect(() => {
        getMatch()
    }, [])
    return (
        <div className={`match ${match.win ? "victory" : "defeat"}`}>
                <div className="match-container">
                    <QueueType 
                        type={match.gameType}
                        creation={match.gameCreation}
                        win={match.win}
                        duration={match.gameDuration}
                    />
                    {spells.length === 2 &&
                        <SummonerStats 
                            playerTeam={playerTeam}
                            enemyTeam={enemyTeam}
                            spells={spells}
                            runes={runes}
                            summoner={summoner} 
                            duration={match.gameDuration}
                            items={items}
                        />
                    }
                    <Participants 
                        playerTeam={playerTeam} 
                        enemyTeam={enemyTeam} 
                        players={players}
                        teams={teams}
                    />
                </div>
                <div className="action">
                    <button onClick={toggleDetails} className={`detail ${match.win ? "btnVictory" : "btnDefeat"}`}>
                        {/* <img src={downSVG} width="24" height="24" alt="More" /> */}
                        <FontAwesomeIcon width="24" height="24" icon={faChevronDown} />
                    </button>
                </div>
        </div>
    )
}

export default Match