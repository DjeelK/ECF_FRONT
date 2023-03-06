import { useSelector } from "react-redux"
import { Navigate } from "react-router-dom"

const ProtectedRoute = (props) => {
const user = useSelector(state => state.auth.user)

if (!user) {
    return <Navigate to={`/auth?mode=Sign+In`} />
} else {
    return (
    <>
        {props.children}
    </>
    )
}
}

export default ProtectedRoute