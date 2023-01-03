import React, { useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Logout = () => {

    const navigate = useNavigate();
    const clearCookie = async () => {
        try {
            const res = await fetch('/logout', {
                method: "GET",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json"
                },
                credentials: "include"
            })

            if (res.status !== 200) {
                throw new Error(res.error);
            }
            toast.success("Logged out Successfully", {
                position: "top-right",
                autoClose: 1000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: false,
            });
            navigate('/');
        }
        catch (err) {
            // window.alert("Error Logout");
            toast.success("Logged out Successfully", {
                position: "top-right",
                autoClose: 1000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: false,
            });
        }
    }

    useEffect(() => {
        clearCookie();
    }, []);

    return (
        <>
            <h1></h1>
        </>
    )
};

export default Logout;