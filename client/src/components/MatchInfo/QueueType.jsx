import moment from 'moment'

function QueueType({ type, creation, win, duration }) {
    function gameDuration(duration) {
        let hours = Math.floor(duration / 60 / 60);
        let minutes = Math.floor(duration / 60) - hours * 60;
        let seconds = duration % 60;

        return `${minutes}m ${seconds}s`;
    }
    return (
    <div className="queue-type">
        <div id="game-type" style={{ fontWeight: "bold"}}>
            {type}
        </div>
        <div id="time-stamp">
            <div>
                {moment(creation).fromNow()}
            </div>
        </div>
        <div id="game-details">
            <div id="win" style={{ fontWeight: "bold"}}>
                {win ? "Victory": "Defeat"}
            </div>
            <div id="duration">
                {gameDuration(duration)}
            </div>
        </div>

    </div>
    )
}

export default QueueType