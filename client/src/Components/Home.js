import React from "react";
import { NavLink } from "react-router-dom";
import HomeImg from '../images/home-img.png';

const Home = () => {

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