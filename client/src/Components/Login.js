import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import login from '../images/login.png';

const Login = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState({
        email: "",
        password: ""
    })

    const handleInput = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value })
    }

    const submitData = async (e) => {
        e.preventDefault();

        const { email, password } = user;

        const res = await fetch('/login', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                email, password
            })
        })


        if (res.status === 400 || !res) {
            window.alert('Eror login')
        }
        else {
            window.alert('Login Successful')
            navigate('/practice')
        }
    }
    return (
        <>
            <div className="login">
                <div className='lContainer'>
                    <img src={login} />
                    <form method="POST">
                        <h2>Login</h2>
                        <input type="email" name="email" value={user.email} placeholder="e-mail" autoComplete="off"
                            onChange={handleInput}
                        />
                        <input type="password" name="password" value={user.password} placeholder="password" autoComplete="off"
                            onChange={handleInput}
                        />
                        <input type="submit" className='submit' placeholder="Submit"
                            onClick={submitData} />
                    </form>
                </div>
            </div>
        </>
    )
}

export default Login;