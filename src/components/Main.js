/*global chrome*/
import React, { useState } from 'react'
import ToggleButton from './ToggleButton'
import toggleData from './toggles'


export default function Main() {
    const [censorType, setCensorType] = useState("")
    console.log("Active censor type: " + censorType)
    
    const [responseFromContent, setResponseFromContent] = useState("")
    console.log("Response: " + responseFromContent)


    const sendCensorMessage = (censorMessage) => {
        const message = {
            from: "React",
            message: censorMessage,
        }
        const queryCriteria = {
            active: true,
            currentWindow: true
        }

        chrome.tabs && chrome.tabs.query(queryCriteria, tabs => {
            const currentTabId = tabs[0].id
            console.log("URL" + tabs[0].url)
            chrome.tabs.sendMessage(
                currentTabId,
                message,
                (response) => {
                    setResponseFromContent(response);
                })
        })
    }
    
    
    /** Updating states active in Main.js */
    function handleChange(event) {
        const newCensorType = event.target.value === censorType ? "" : event.target.value

        // setCensorType(prevCensorType => (
        //     event.target.value === prevCensorType ? "" : event.target.value
        // ))
        setCensorType(newCensorType)
        sendCensorMessage(newCensorType)
    }

    /** Instantiating the toggle elements */
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