import React, { useEffect, useContext } from "react";
import { NavLink } from "react-router-dom";
import HomeImg from '../images/home-img.png';
import { UseContext } from "../App";
import Cookies from 'js-cookie';

const Home = () => {

    const { state, dispatch } = useContext(UseContext);
    useEffect(() => {
        const token = Cookies.get('dsatokens');
        if (token) {
            dispatch({ type: "USER", payload: true });
        } else {
            dispatch({ type: "USER", payload: false });
        }
        
        console.log(token)

    }, [])

    return (
        <>
            <div className="home">
                <div className="home-content">
                    <div className="home-content-left"></div>
                    <div className="home-content-right">
                        <h1>DSAprep,</h1>
                        <p>Your one stop Solution</p>
                        <p>for all your <strong>Data Structure and Algorithms</strong> needs.</p>
                        <NavLink to="practice">Prepare</NavLink>
                    </div>
                </div>
                <div className="home-img">
                    <img src={HomeImg} alt="binary tree" />
                </div>
            </div>
        </>
    )
}

export default Home;