import { useParams } from "react-router-dom";

function Error({ error }) {
    const { status } = useParams()
    return (
        <div className="error">
            {error}
        </div>
    )
}

export default Error