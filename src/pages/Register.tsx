import { useState } from 'react'
import React from 'react'
import { useNavigate } from 'react-router-dom';

const Register = () => {
    const [users, setUsers] = useState({
        username:'',email:'',password:''
    });
    const navigate = useNavigate();

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        localStorage.setItem('user', JSON.stringify(users));
        localStorage.setItem('isAuthenticated', 'true');
        navigate('/dashboard');
    }


  return (
    <div>
        <h1>Register Page</h1>
        <p>Please fill in the form below to create an account.

        </p>
        <form onSubmit={handleSubmit}>
            <div>
                <label htmlFor="username">Username:</label>
                <input type="text" id="username" name="username" value={users.username} required onChange={(e) => setUsers((prev)=>({...prev,username:e.target.value}))}/>
            </div>
            <div>
                <label htmlFor="email">Email:</label>
                <input type="email" id="email" name="email" value={users.email} required onChange={(e) => setUsers((prev)=>({...prev,email:e.target.value}))}/>
            </div>
            <div>
                <label htmlFor="password">Password:</label>
                <input type="password" id="password" name="password" value={users.password} required onChange={(e) => setUsers((prev)=>({...prev,password:e.target.value}))}/>
            </div>
            <button type="submit">Register</button>
        </form>
    </div>
    );
}

export default Register;