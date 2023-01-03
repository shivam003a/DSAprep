import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import Question from "./Question";

const Questions = () => {
    const navigate = useNavigate();
    const [quesData, setQuestion] = useState([]);

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