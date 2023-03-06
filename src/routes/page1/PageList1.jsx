import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import CounterDisplay from './CounterDisplay';


const PageList1 = () => {
    const counters = useSelector(state => state.counters.counters)
    const user = useSelector(state => state.auth.user)



    return (
    <>
    <div className="d-flex justify-content-between align-items-center">
        <h3>Vos IMC enregistrés <i className="bi bi-arrow-down-right-square"></i></h3>
        {user && <Link to={`/counters/add?mode=add`} className="btn btn-light"><i className="bi bi-cloud-plus"></i> Add</Link>}
    </div>
    <hr />
    {counters.length === 0 ?
    <p>Il n'y a pas d'IMC enregistrés...</p> : 
    [...counters].sort((a, b) => a.id.localeCompare(b.id)).map(a => <CounterDisplay key={a.id} counterId={a.id} />)}
    </>
)
}

export default PageList1;