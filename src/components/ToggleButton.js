import React from "react"

export default function ToggleButton(props){
    const {id, censorType, handleChange} = props

    return (
        <div className="button-row">
            <input
                className="toggle-button"
                type="checkbox"
                name="censor"
                id={id}
                value={id}
                checked={censorType === id}
                onChange={handleChange} 
            />
            <label
                className="toggle-label"
                htmlFor={id}
            >
                <span className="toggle-switch" />
            </label>
            <span className="toggle-description"> 
                {id}:  
                <span className={`censor-example ${id}`}>     Text &#8594; Text</span>
            </span> 
        </div>
    )
}