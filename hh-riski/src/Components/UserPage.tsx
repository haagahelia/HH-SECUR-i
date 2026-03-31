import { Link } from "react-router-dom";
import { useCurrentUser } from "../context/UserContext";

import Navbar from "./Layout/Navbar";
import { useState } from "react";

const UserPage = () => {
    const { user, setUserById, clearUser, testUsers } = useCurrentUser();
    const [selectedLanguage, setSelectedLanguage] = useState<"fi" | "en">("fi");
    return (
        <>
      <Navbar language={selectedLanguage} />

      <div>
        {user && <p>Logged in as {user.username}</p>}
        {user && <button onClick={clearUser}>Logout</button>}
      </div>

      <div>
        <h1>User Page</h1>
      </div>
            <div>
                <select onChange={e => setUserById(e.target.value)}>
                    <option value="">Select user</option>
                    {testUsers.map(u => (
                        <option key={u.id} value={u.id}>
                            {u.username}
                        </option>
                    ))}
                </select>
            </div>
        </>
    )
}

export default UserPage