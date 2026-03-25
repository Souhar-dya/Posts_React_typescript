import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [loginData, setLoginData] = useState({
        email: '',
        password: ''
    });

  const navigate = useNavigate();

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const storedUser = localStorage.getItem('user') || "null";
        if (storedUser) {
            const user = JSON.parse(storedUser);

            if (user.email === loginData.email && user.password === loginData.password) {
                    localStorage.setItem('isAuthenticated', 'true');
                    console.log('Login successful');
                navigate('/dashboard');
            } else {
                alert('Invalid email or password');
            }
        } else {
            alert('No user found. Please register first.');
        }
    };

  return (
    <div>
        <form onSubmit={handleSubmit}>
        <h1>Login Page</h1>
            <div>
                <label htmlFor="email">Email:</label>
                <input type="email" id="email" name="email" value={loginData.email} required onChange={(e) => setLoginData((prev) => ({ ...prev, email: e.target.value }))} />
            </div>
            <div>
                <label htmlFor="password">Password:</label>
                <input type="password" id="password" name="password" value={loginData.password} required onChange={(e) => setLoginData((prev) => ({ ...prev, password: e.target.value }))} />
            </div>
            <button type="submit">Login</button>
        </form>
    </div>
  );
}

export default Login;