import React from "react";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Question = (props) => {

    const sendData = async ()=>{
        const count = props.count;
        const res = await fetch('/question',{
            method : "POST",
            headers : {
                "Content-Type" : "application/json" 
            },
            body : JSON.stringify({
                count
            })
        })
        if(res.status === 200){
            toast.success("Updated Successfully", {
                position: "top-right",
                autoClose: 1000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: false,
            });
        }
        else{
            toast.error("Error while updating", {
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
        <a href={props.link} className="question-parent" target="_blank">
            <div style={props.isDone ? { backgroundColor: "#92e3a9", color: "#101010" } : { backgroundColor: "#101010" }} className="question">
                <p>{props.question}</p>
                {props.isDone ? <input type="checkbox" checked /> : <input type="checkbox" onChange={sendData}/>}
            </div>
        </a>
    )
}

export default Question;