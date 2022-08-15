import UserContext from "./UserContext";
import { useState } from "react";

const UserState = (props) => {
    const [userData, setUserData] = useState([])
    const [uname, setUname] = useState(null)
    const getUserData = async () => {
        try {
            const response = await fetch("http://localhost:5000/api/auth/getuser", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    "auth-token": localStorage.getItem('token')
                }
            })
            const json = await response.json();
            if (response.status === 200) {
                localStorage.setItem("uname", json.name.toString())
                setUserData(json)
                // console.log("get data called")
            }
            // console.log(json);
        } catch (error) {
            console.log("getUserData error" + error)
        }
    }
    return (
        <UserContext.Provider value={{ userData, getUserData, uname, setUname }}>
            {props.children}
        </UserContext.Provider>
    )
}

export default UserState;