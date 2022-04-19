/*global chrome*/

// Placeholder for reseting DOM when no toggle is selected
// let oldDocumentBody = document.querySelector('body').cloneNode(true);
let censorWords;
let censorWordsRegex;

chrome.storage.sync.get('storedCensorType', () => {
    chrome.storage.sync.set({
        storedCensorType: "",})
    console.log('set storage to nothing from within content.js')
})

const censorText = (element, censorApp) => {
    if (element.hasChildNodes()) {
      element.childNodes.forEach(child=>censorText(child, censorApp))
    } else if (element.nodeType === Text.TEXT_NODE) {
      if (element.textContent.match(censorWordsRegex)) {
        censorApp(element);
      }
    }
};

const censorWithBlackBox = (element) => {
    const newElement = document.createElement('span');
    newElement.innerHTML = element.textContent.replace(censorWordsRegex, 
        '<span style="background-color: black; color: black;">$&</span>');
    element.replaceWith(newElement);
};
const censorWithStars = (element) => {
    const newElement = document.createElement('span');
    newElement.innerHTML = element.textContent.replace(censorWordsRegex, (match) => {
        const starForm = match.replace(/./g,'*');
        return `<span>${starForm}</span>`;
    });
    element.replaceWith(newElement);
};
const censorWithTransparent = (element) => {
    const newElement = document.createElement('span');
    newElement.innerHTML = element.textContent.replace(censorWordsRegex, 
        '<span style="opacity: 0;">$&</span>');
    element.replaceWith(newElement); 
};
const censorWithStrike = (element) => {
    const newElement = document.createElement('span');
    newElement.innerHTML = element.textContent.replace(censorWordsRegex, 
        '<span style="text-decoration: line-through;">$&</span>');
    element.replaceWith(newElement); 
};
const resetCensor = () => {
    document.body.replaceWith(oldDocumentBody);
    oldDocumentBody = document.querySelector('body').cloneNode(true);
}

const censorApplications = {
    "": resetCensor,
    "Black-Box": censorWithBlackBox,
    "Stars": censorWithStars,
    "Transparent": censorWithTransparent,
    "Strike": censorWithStrike
};


const messagesFromReactAppListener = (message, sender, response) => {
    console.log('[content.js]. Message received');

    if (
        sender.id === chrome.runtime.id &&
        message.from === "React" &&
        message.message === "") {
            const censorApp = censorApplications[message.message];
            censorApp();
            response("No censor is being applied.");
        }

    if (
        sender.id === chrome.runtime.id &&
        message.from === "React" &&
        message.message === "Black-Box") {
            const censorApp = censorApplications[message.message];
            censorText(document.body, censorApp);
            response("Black-Box censor has been applied.");
        }

    if (
        sender.id === chrome.runtime.id &&
        message.from === "React" &&
        message.message === "Stars") {
            const censorApp = censorApplications[message.message];
            censorText(document.body, censorApp);
            response("Stars censor has been applied.");
        }

    if (
        sender.id === chrome.runtime.id &&
        message.from === "React" &&
        message.message === "Transparent") {
            const censorApp = censorApplications[message.message];
            censorText(document.body, censorApp);
            response("Transparent censor has been applied.");
        }
    
    if (
        sender.id === chrome.runtime.id &&
        message.from === "React" &&
        message.message === "Strike") {
            const censorApp = censorApplications[message.message];
            censorText(document.body, censorApp);
            response("Strike censor has been applied.");
        }

    if (
        sender.id === chrome.runtime.id &&
        message.from === "React") {
            const wordsData = message.message;
            censorWords = wordsData.map(word => `(${word})`);
            censorWordsRegex = new RegExp(censorWords.join("|"), "gi");
            response("Word data has been received.");
        }
};

// Fires when either the React Main.js or content.js sends a message
// onMessage event is fired when a messag eis sent from either an extension (chrome.runtime.sendMessage)
// or a content script (chrome.tabs.sendMessage)
chrome.runtime.onMessage.addListener(messagesFromReactAppListener);
// chrome.storage.onChanged.addListener(changes, areaName)
chrome.storage.onChanged.addListener((changes, area) => {
    if (area === 'sync' && changes.storedCensorType?.newValue) {
        console.log('-- Inside storage listener --')
        console.log('Changes: ' + changes.storedCensorType.newValue)
    }
})