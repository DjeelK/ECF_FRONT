import { useSelector} from "react-redux";
import { Link } from "react-router-dom";

const CounterDisplay = (props) => {
    const user = useSelector(state => state.auth.user)
    const counter = useSelector(state => state.counters.counters).find(c => c.id === props.counter.id)

    return (
        <div className="m-3 border border-dark p-3 d-flex align-items-center rounded">
        <ul>
            <li>Date: <b>{counter.date}</b></li>
            <li>Votre poids: <b>{counter.height}</b></li>
            <li>Votre taille: <b>{counter.weight}</b></li>
            <li>Votre âge: <b>{counter.age}</b></li>
        </ul>
        {user && <Link to={`/counters/edit/${props.counterId}?mode=edit`} className="btn btn-outline-warning ms-auto"><i className="bi bi-pencil-square"></i></Link>}
        {user && <Link to={`/counters/delete/${props.counterId}?mode=delete`} className="btn btn-outline-danger ms-2"><i className="bi bi-trash"></i></Link>}
        </div>
    )
}

export default CounterDisplay