import React from "react"

export default function ToggleButton(props){
    const {id, censorType, handleChange} = props

    // Creating sample censor text component next to toggle buttons
    function ExampleText() {
        if (id === "Black-Box") {
            return <span style={{backgroundColor: 'black', color: 'black'}}>Text</span>
        } else if ( id === "Stars") {
            return <span>****</span>
        } else if( id === "Transparent") {
            return <span style={{opacity: 0}}>Text</span>
        } else if( id === "Strike") {
            return <span style={{textDecoration: 'line-through'}}>Text</span>
        }
    }

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
                {id} -  
                <span className={`censor-example ${id}`}> (Text &#8594; <ExampleText />)</span>
            </span> 
        </div>
    )
}