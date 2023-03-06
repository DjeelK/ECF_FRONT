import { useRef } from "react"
import { useDispatch } from "react-redux"
import { useNavigate, useSearchParams } from "react-router-dom"
import { signIn, signUp } from "./authSlice"

const SignForm = () => {
const [searchParams] = useSearchParams()
const mode = searchParams.get('mode')

const emailRef = useRef()
const passwordRef = useRef()

const dispatch = useDispatch()
const navigate = useNavigate()

const submitFormHandler = (e) => {
    e.preventDefault()

    const email = emailRef.current.value
    const password = passwordRef.current.value

    emailRef.current.value = ""
    passwordRef.current.value = ""

    const credentials = {
    email,
    password,
    returnSecureToken: true
    }

    if (mode === 'Sign In') {
    dispatch(signIn(credentials))
    } else if (mode === 'Sign Up') {
    dispatch(signUp(credentials))
    }
    
    navigate(`/`)
    

}

return (
    <>
    <h3>{mode}</h3>
    <form onSubmit={submitFormHandler}>
    <div className="mb-3">
        <label htmlFor="email" className="form-label">Email: </label>
        <input type="email" id="email" required ref={emailRef} className="form-control" />
        </div>
        <div className="mb-3">
        <label htmlFor="password" className="form-label">Password: </label>
        <input type="password" id="password" required ref={passwordRef} className="form-control" />
        </div>
        <div className="text-end">
        <button className="btn btn-outline-light"><i className="bi bi-send"></i>{mode}</button>
        </div>
    </form>
    </>
)
}

export default SignForm
