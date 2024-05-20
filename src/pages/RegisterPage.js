import { useState } from "react";

export default function RegisterPage() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    async function register(ev) {
        ev.preventDefault();
        const response = await fetch("http://localhost:4000/register", {
            method: 'POST',
            body: JSON.stringify({username,password}),
            headers: {'Content-Type':'application/json'},
        });
        if (response.status !== 200) {
            alert('Nem sikerült a regisztráció')
        } else {
            alert("Sikeres regisztráció")
        }
    }
    return(
        <form className="register" onSubmit={register}>
            <h1>Regisztráció</h1>
            <input type="text" 
            placeholder="felhasználónév" 
            value={username} 
            onChange={ev => setUsername(ev.target.value)}/>
            <input type="password" 
            placeholder="jelszó"
            value={password} 
            onChange={ev => setPassword(ev.target.value)}/>
            <button>Regisztráció</button>
        </form>
    );
}