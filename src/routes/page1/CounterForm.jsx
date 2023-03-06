import { useDispatch, useSelector} from "react-redux"
import { useNavigate, useParams, useSearchParams } from "react-router-dom"
import { useRef } from "react"
import { addCounter, deleteCounter, editCounter } from "./CountersSlice";

const CounterForm = () => {
    const [searchParams] = useSearchParams()
    const mode = searchParams.get('mode')
    const {counterId} = useParams()
    const counter = useSelector(state => state.counters.counters).find(c => c.id === counterId)

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const dateRef = useRef();
    const heightRef = useRef();
    const weightRef = useRef();
    const ageRef = useRef();

    const submitFormHandler = async (e) => {
    e.preventDefault()

    if (mode === 'delete') {
        await dispatch(deleteCounter(counterId))
    } else {

    const date = +dateRef.current.value;
    const height = +heightRef.current.value;
    const weight = +weightRef.current.value;
    const age = +ageRef.current.value;

    dateRef.current.value = "";
    heightRef.current.value =  "" ;
    weightRef.current.value =  "" ;
    ageRef.current.value =  "" ;

    const counterValues= {
        date,
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
        <label htmlFor="start">Date:</label>
        <input 
        type="date" 
        id="start" 
        name="start-today"
        value={counter?.date}
        min="2023-03-06" max="2050-12-31"
        required={mode !== 'delete'} disabled={mode === 'delete'}/>
        </div>
        <div className="mb-3">
            <label htmlFor="height"> Taille (cm):</label>
            <input
            type="number"
            id="height"
            name="height"
            value={counter?.height}
            required={mode !== 'delete'} disabled={mode === 'delete'}/>
            
        </div>
        <div className="mb-3">
            <label htmlFor="weight"> Poids (kg):</label>
            <input
            type="number"
            id="weight"
            name="weight"
            value={counter?.weight}
            required={mode !== 'delete'} disabled={mode === 'delete'}/>
        </div>
        <div className="mb-3">
            <label htmlFor="age">Age:</label>
            <input
            type="number"
            id="age"
            name="age"
            value={counter?.age}
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