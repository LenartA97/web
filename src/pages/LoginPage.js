import { useContext, useState } from "react";
import {Navigate} from "react-router-dom";
import { UserContext } from "../UserContext";

export default function LoginPage() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [redirect, setRedirect] = useState(false);
    const {setUserInfo} = useContext(UserContext);

    async function login(ev) {
        ev.preventDefault();
        const response = await fetch("http://localhost:4000/login", {
            method: 'POST',
            body: JSON.stringify({username,password}),
            headers: {'Content-Type':'application/json'},
            credentials: 'include',
        });
        if (response.ok) {
            response.json().then(userInfo => {
                setUserInfo(userInfo);
                setRedirect(true);
            })
            

        } else {
            alert('Hibás a felhasználónév vagy a jelszó!');
        }
    }

    if (redirect) {
        return <Navigate to={'/'} />
    }
    return(
        <form className="login" onSubmit={login}>
            <h1>Bejelentkezés</h1>
            <input type="text"
            placeholder="felhasználónév" 
            value ={username} 
            onChange={ev => setUsername(ev.target.value)}/>
            <input type="password"
            placeholder="jelszó" 
            value = {password} 
            onChange={ev => setPassword(ev.target.value)}/>
            <button>Belépés</button>
        </form>

    );
}