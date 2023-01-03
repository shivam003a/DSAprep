import React, { useEffect, useState, useContext } from "react";
import { useNavigate } from 'react-router-dom';
import Question from "./Question";
import { UseContext } from "../App";
import Cookies from 'js-cookie';

const Questions = () => {
    const navigate = useNavigate();
    const [quesData, setQuestion] = useState([]);

    const { state, dispatch } = useContext(UseContext);
    useEffect(() => {
        const token = Cookies.get('dsatokens');
        if (token) {
            dispatch({ type: "USER", payload: true });
        } else {
            dispatch({ type: "USER", payload: false });
        }
    }, [])

    const callQuestionPage = async () => {
        try {
            const res = await fetch('/practice', {
                method: "GET",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json"
                },
                credentials: "include"
            })

            const data = await res.json();

            if (!res.status === 200) {
                throw new Error(res.error);
            }
            else{
                setQuestion(data);
            }

        } catch (err) {
            navigate('/login')
        }
    }

    useEffect(() => {
        callQuestionPage();
    }, [])


    return (
        <>
            <div className="questions">
                {
                    quesData.map((q, i) => {
                        return (
                            <Question question={q.question} count = {i} link={q.link} key={q._id} isDone={q.isDone} category={q.category}/>
                        )
                    })
                }
            </div>

        </>
    )
}

export default Questions;