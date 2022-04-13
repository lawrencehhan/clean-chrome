import React, {useState} from 'react'
import ToggleButton from './ToggleButton'
import toggleData from './toggles'


export default function Main() {
    const [censorType, setCensorType] = useState("")
    console.log("Active censor type: " + censorType)
    
    function handleChange(event) {
        setCensorType(prevCensorType => (
            event.target.value === prevCensorType ? "" : event.target.value
        ))
    }

    const toggleElements = toggleData.map(toggle => {
        return <ToggleButton
            key={toggle.keyID}
            id={toggle.id}
            censorType={censorType}
            handleChange={handleChange}
        />
    })

    return (
        <form className="button-box">
            {toggleElements}
        </form>
    )
}