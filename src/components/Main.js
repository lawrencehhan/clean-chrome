/*global chrome*/
import React, { useState } from 'react'
import ToggleButton from './ToggleButton'
import toggleData from './toggles'
import wordsData from './wiktionaryWords'


export default function Main() {
    // States are kept for active censorType and content.js responseFromContent
    const [censorType, setCensorType] = useState("")
    console.log("Active censor type: " + censorType)
    const [responseFromContent, setResponseFromContent] = useState("")
    console.log("Response: " + responseFromContent)
    // Message passing to content.js for any updates on active censorType
    const sendCensorMessage = (censorMessage) => {
        // Initializing message and conditions
        const message = {
            from: "React",
            message: censorMessage,
        }
        const queryCriteria = {
            active: true,
            currentWindow: true
        }
        // Sending message to content.js
        chrome.tabs && chrome.tabs.query(queryCriteria, tabs => {
            const currentTabId = tabs[0].id
            chrome.tabs.sendMessage(
                currentTabId,
                message,
                (response) => {
                    setResponseFromContent(response);
                })
        })
    }

    // Sending words from here to content.js so the file does not need to be in 'public'
    const sendWordsData = (data) => {
        const message = {
            from: "React",
            message: data,
        }
        const queryCriteria = {
            active: true,
            currentWindow: true
        }

        chrome.tabs && chrome.tabs.query(queryCriteria, tabs => {
            const currentTabId = tabs[0].id
            chrome.tabs.sendMessage(
                currentTabId,
                message,
                (response) => {
                    setResponseFromContent(response);
                })
        })
    }
    sendWordsData(wordsData)
    
    // Updating states active in Main.js whenever a toggle is clicked
    function handleChange(event) {
        const newCensorType = event.target.value === censorType ? "" : event.target.value
        // setCensorType(prevCensorType => (
        //     event.target.value === prevCensorType ? "" : event.target.value
        // ))
        setCensorType(newCensorType)
        sendCensorMessage(newCensorType)
    }

    // Initializing the toggle elements
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