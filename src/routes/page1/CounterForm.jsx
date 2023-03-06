import { useDispatch, useSelector} from "react-redux"
import { useNavigate, useParams, useSearchParams } from "react-router-dom"
import { useRef } from "react"
import { addCounter, deleteCounter, editCounter } from "./countersSlice";


const CounterForm = () => {
    const [searchParams] = useSearchParams()
    const mode = searchParams.get('mode')
    const {counterId} = useParams()
    const counter = useSelector(state => state.counters.counters).find(c => c.id === counterId)

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const dueDateRef = useRef();
    const heightRef = useRef();
    const weightRef = useRef();
    const ageRef = useRef();

    const submitFormHandler = async (e) => {
    e.preventDefault()

    if (mode === 'delete') {
        await dispatch(deleteCounter(counterId))
    } else {

    
    const dueDate = dueDateRef.current.value;
    const height = +heightRef.current.value;
    const weight = +weightRef.current.value;
    const age = +ageRef.current.value;

    dueDateRef.current.value = "";
    heightRef.current.value =  "" ;
    weightRef.current.value =  "" ;
    ageRef.current.value =  "" ;

    const counterValues= {
        dueDate,
        height,
        weight,
        age
    }

    if (mode === 'add') {
        await dispatch(addCounter(counterValues))
    } else if (mode === 'edit') {
        await dispatch(editCounter({id: counterId, ...counterValues}))
    }
    }

navigate(`/counters`)
}
    return (
        <form onSubmit={submitFormHandler}>
        <div className="mb-3">
        <label htmlFor="start" className="form-label">Date:</label>
        <input 
        className="form-control"
        type="date" 
        id="start" 
        name="start-today"
        value={counter?.dueDate}
        ref={dueDateRef}
        min="2023-03-06" max="2050-12-31"
        required={mode !== 'delete'} disabled={mode === 'delete'}/>
        </div>
        <div className="mb-3">
            <label htmlFor="height" className="form-label"> Taille (cm):</label>
            <input
            className="form-control"
            type="number"
            id="height"
            name="height"
            value={counter?.height}
            ref={heightRef}
            required={mode !== 'delete'} disabled={mode === 'delete'}/>
            
        </div>
        <div className="mb-3">
            <label htmlFor="weight" className="form-label"> Poids (kg):</label>
            <input
            className="form-control"
            type="number"
            id="weight"
            name="weight"
            value={counter?.weight}
            ref={weightRef}
            required={mode !== 'delete'} disabled={mode === 'delete'}/>
        </div>
        <div className="mb-3">
            <label htmlFor="age " className="form-label">Age:</label>
            <input
            className="form-control"
            type="number"
            id="age"
            name="age"
            value={counter?.age}
            ref={ageRef}
            required={mode !== 'delete'} disabled={mode === 'delete'}/>
        </div>
        <div className="text-end">
        <button className={`btn btn-${mode === 'delete' ? 'danger' : mode === 'edit' ? 'warning' : 'light'}`}>
            <i className={`bi bi-${mode === 'delete' ? 'trash' : mode === 'edit' ? 'pencil-square' : 'plus-circle'}`}></i> {mode === 'delete' ? 'Confirm' : mode === 'edit' ? 'Edit' : 'Add'}
        </button>
        </div>
        </form>
    );
    };

export default CounterForm;
