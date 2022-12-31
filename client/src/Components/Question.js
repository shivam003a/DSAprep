import React from "react";

const Question = (props) => {

    const sendData = async ()=>{
        const count = props.count;
        console.log("Started")
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
            console.log("Checked");
        }
        else{
            console.log("Not Checked");
        }
    }

    return (
        <a href={props.link} className="question-parent" target="_blank">
            <div style={props.isDone ? { backgroundColor: "green", color: "#101010" } : { backgroundColor: "#101010" }} className="question">
                <p>{props.question}</p>
                {props.isDone ? <input type="checkbox" checked /> : <input type="checkbox" onChange={sendData}/>}
            </div>
        </a>
    )
}

export default Question;