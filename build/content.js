/*global chrome*/
// import { ChromeMessage, Sender } from "./types";
console.log("CURRENTLY RUNNING THE CONTENT SCRIPT")
const messagesFromReactAppListener = (message, sender, response) => {
    console.log('[content.js]. Message received', {message, sender})

    if (
        sender.id === chrome.runtime.id &&
        message.from === "React" &&
        message.message === "") {
            response("No censor is being applied.");
        }

    if (
        sender.id === chrome.runtime.id &&
        message.from === "React" &&
        message.message === "Black-Box") {
            // code block here on blacking out DOM words
            response("Black-Box censor has been applied.");
        }

    // if (
    //     sender.id === chrome.runtime.id &&
    //     message.from === Sender.React &&
    //     message.message === "Stars") {
    //         // code block here on blacking out DOM words
    //         response("Stars censor has been applied.");
    //     }

    // if (
    //     sender.id === chrome.runtime.id &&
    //     message.from === Sender.React &&
    //     message.message === "Transparent") {
    //         // code block here on blacking out DOM words
    //         response("Transparent censor has been applied.");
    //     }
    
    // if (
    //     sender.id === chrome.runtime.id &&
    //     message.from === Sender.React &&
    //     message.message === "Strike") {
    //         // code block here on blacking out DOM words
    //         response("Strike censor has been applied.");
    //     }
}

// Fires when either the React Main.js or content.js sends a message
chrome.runtime.onMessage.addListener(messagesFromReactAppListener);
