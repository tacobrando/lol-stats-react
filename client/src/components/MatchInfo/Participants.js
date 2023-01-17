import './matchCard.css'
import Team from "./Team"

function Participants({ players, playerTeam, enemyTeam, teams }) {
    return (
        <div className="participants">
            {teams.length === 2 &&
            <>
                <Team team={teams[0]} />
                <Team team={teams[1]} />
            </>
            }
        </div>
    )
}
export default Participants