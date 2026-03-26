import { useState } from "react";


const LoginForm = () =>{
    const [username, setName] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        setName(e.target.username.value);
        setPassword(e.target.password.value);

        console.log(username, password);

        e.target.username.value = "";
        e.target.password.value = "";
    }

    return(
        <div>
            <h1>Login Form</h1>
            <br /><br /><br />
            <form onSubmit={handleSubmit}>
                <label htmlFor="username">Username:</label>
                <input type="text" id="username" placeholder="Username" value={username} onChange={(e) => setName(e.target.value)} />
                <br />
                <br />
                <label htmlFor="password">Password:</label>
                <input type="password" id="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                <br />
                <br />
                <button type="submit">Login</button>
            </form>
        </div>
    )
}

export default LoginForm;