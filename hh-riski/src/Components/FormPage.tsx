import { Link } from "react-router-dom";
import { useCurrentUser } from "../context/UserContext"

const FormPage = () => {

    const { user, clearUser } = useCurrentUser();
    return (
        <>
            <div>
                {user && <p>Logged in as {user.username}</p>}
                {user && <button onClick={clearUser}>Logout</button> }
            </div>
            <div>
                <Link to="/">Home</Link>
                <Link to="/user">User Page</Link>
            </div>
            <div>
                <h1>Form Page</h1>
            </div>
        </>
    )
}

export default FormPage