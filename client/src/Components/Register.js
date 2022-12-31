import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Register = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState({
        name: "",
        email: "",
        password: "",
        cpassword: ""
    })

    const handleInput = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value })
    }

    const submitData = async (e) => {
        e.preventDefault();

        const { name, email, password, cpassword } = user;

        const res = await fetch('/register', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                name, email, password, cpassword
            })
        })


        if (res.status === 422 || !res) {
            window.alert("Invalid Registration")
        }
        else {
            window.alert("registration successfull");
            navigate('/login')
        }
    }

    return (
        <>
            <div className="register">
                <form method="POST">
                    <h2>Register</h2>
                    <input type="text" name="name" value={user.name} placeholder="name" autoComplete="off"
                        onChange={handleInput}
                    />
                    <input type="email" name="email" value={user.email} placeholder="e-mail" autoComplete="off"
                        onChange={handleInput}
                    />
                    <input type="password" name="password" value={user.password} placeholder="password" autoComplete="off"
                        onChange={handleInput}
                    />
                    <input type="password" name="cpassword" value={user.cpassword} placeholder="confirm password" autoComplete="off"
                        onChange={handleInput}
                    />
                    <input type="submit" className='submit' placeholder="Submit"
                        onClick={submitData} />
                </form>
            </div>
        </>
    )
}

export default Register;