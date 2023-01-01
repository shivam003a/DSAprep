import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import login from '../images/login.png';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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


        if (res.status === 201) {
            // window.alert('Login Successful')
            toast.success("Logged in Successfully", {
                position: "top-right",
                autoClose: 1000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: false,
            });
            navigate('/practice')
        }
        else {
            // window.alert('Eror login')
            toast.error("Error!", {
                position: "top-right",
                autoClose: 1000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: false,
            });
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