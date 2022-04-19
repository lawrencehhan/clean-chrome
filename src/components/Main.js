/*global chrome*/
import React, { useState } from 'react'
import ToggleButton from './ToggleButton'
import toggleData from './toggles'
import wordsData from './wiktionaryWords'


export default function Main() {
    // States are kept for active censorType and content.js responseFromContent
    const [censorType, setCensorType] = useState(chrome.storage.sync.get('storedCensorType', 
        (storage) => {
            return storage.storedCensorType
        })
    )
    const [responseFromContent, setResponseFromContent] = useState("")

    // Message passing to content.js for any updates on active censorType
    const sendCensorMessage = (censorMessage) => {
        // Initializing message and conditions
        const message = {
            from: "React",
            message: censorMessage,
        }
        const queryInfo = {
            active: true,
            currentWindow: true
        }
        // Sending message to content.js
        chrome.tabs && chrome.tabs.query(queryInfo, tabs => {
            const currentTabId = tabs[0].id
            chrome.tabs.sendMessage(
                currentTabId,
                message,
                (response) => {
                    setResponseFromContent(response)
                    console.log('content.js response: ' + response)
                })
        })
    }

    // Sending words from here to content.js so the file does not need to be in 'public'
    const sendWordsData = (data) => {
        const message = {
            from: "React",
            message: data,
        }
        const queryInfo = {
            active: true,
            currentWindow: true
        }

        chrome.tabs && chrome.tabs.query(queryInfo, tabs => {
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

    // chrome.storage.sync.get('storedCensorType', () => {
    //     chrome.storage.sync.set({
    //         storedCensorType: censorType,})
    //     console.log('SET STORED MESSAGE/CENSOR AS ' + censorType)
    // })
    
    
    // Updating states active in Main.js whenever a toggle is clicked
    function handleChange(event) {
        const newCensorType = event.target.value === censorType ? "" : event.target.value
        chrome.storage.sync.get('storedCensorType', () => {
            chrome.storage.sync.set({
                storedCensorType: newCensorType,})
            console.log('-- set storage to button click: ' + newCensorType)
        })
        
        chrome.storage.sync.get('storedCensorType', (storage) => {
            setCensorType(storage.storedCensorType)
        })
        // if (newCensorType === "") {
        //     setCensorType(newCensorType)
        //     sendCensorMessage(newCensorType)
        // } else {
        //     sendCensorMessage("")
        //     setCensorType(newCensorType)
        //     sendCensorMessage(newCensorType)
        // }
        console.log('Current active censorType: ' + newCensorType)
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