import React from 'react'

const censorTypes = ["Black-box", "Stars", "Transparent", "Strike"]
const buttonrow = censorTypes.map(censor => 
    <div className="button-row">
        <div className="toggle-button">
            <input type="checkbox"></input>
            <span className="toggle-slider"></span>
        </div>
        <span className="button-text"> 
            {censor}: Text  &#10145;
            <span className={censor}>  Text</span>
        </span>
    </div>   
)

export default function Main() {
    return (
        <div className="button-box">
            {buttonrow}
        </div>
    )
}