import React, { useEffect } from "react";
import { useNavigate } from 'react-router-dom';

const Logout = ()=>{

    const navigate = useNavigate();
    const clearCookie = async ()=>{
        try{
            const res = await fetch('/logout', {
                method : "GET",
                headers : {
                    Accept : "application/json",
                    "Content-Type" : "application/json"
                },
                credentials : "include"
            })
            navigate('/');
    
            if(res.status !== 200){
                throw new Error(res.error);
            }
        }
        catch(err){
            window.alert("Error Logout");
        }
    }

    useEffect(()=>{
        clearCookie();
    }, []);

    return(
        <h1></h1>
    ) 
};

export default Logout;