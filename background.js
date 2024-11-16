// Background Script to manage energy saving features

// Listen for messages from popup.js to enable/disable each feature
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action == "toggleFeature") {
        switch (request.feature) {
            case "tabManagemet":
                toggleTabManagement(request.enabled);
                break;
            case "mediaBlocking": {
                toggleMediaBlocking(request.enabled);
                break;
            }
            case "darkMode": {
                toggleDarkMode(request.enabled);
                break;
            }
            case "batterySaver": {
                toggleBatterySaver(request.enabled);
                break;
            }
            case "dataSaver": {
                toggleDataSaver(request.enabled);
            }
        }
    }
})


function toggleTabManagement(enable) {
    if (enable) {

    }
    else {

    }
}


function toggleMediaBlocking(enable) {
    if (enable) {

    }
    else {
        
    }
}


function toggleDarkMode(enable) {
    if (enable) {
        console.log("Dark Mode Enabled --- checking background.js working");
    }
    else {
        
    }
}


function toggleBatterySaver(enable) {
    if (enable) {

    }
    else {
        
    }
}


function toggleDataSaver(enable) {
    if (enable) {

    }
    else {
        
    }
}



