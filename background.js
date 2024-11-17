// Background Script to manage energy saving features

// Listen for messages from popup.js to enable/disable each feature
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === "toggleFeature") {
        switch (request.feature) {
            case "tabManagement":
                toggleTabManagement(request.enabled);
                break;
            case "mediaBlocking":
                toggleMediaBlocking(request.enabled);
                break;
            case "darkMode":
                toggleDarkMode(request.enabled);
                break;
            case "batterySaver":
                toggleBatterySaver(request.enabled);
                break;
            case "dataSaver":
                toggleDataSaver(request.enabled);
                break;
        }
    }
  });


function toggleTabManagement(enable) {
    if (enable) {
        console.log("-");
    }
    else {
        console.log("-");
    }
}


function toggleMediaBlocking(enable) {
    if (enable) {
        console.log("-");
    }
    else {
        console.log("-");
    }
}


function toggleDarkMode(enable) {
    chrome.tabs.query({}, (tabs) => {
        tabs.forEach(tab => {
            chrome.scripting.executeScript({
                target : {tabId : tab.id},
                function : enableDarkMode,
                args : [enable]
            })
            .then(() => console.log("task completed"));
        });
    })
}

// function isDarkMode() {
//     const darkModeClasses = ['dark-mode', 'dark-theme', 'dark'];
  
//     for (const className of darkModeClasses) {
//       if (document.body.classList.contains(className)) {
//         return true;
//       }
//     }
//     return false;
//   }

function enableDarkMode(enabled) {
    if (enabled) {
        document.body.style.filter = "invert(1) hue-rotate(180deg)";
    } 
    else {
        document.body.style.filter = "";
    }
}


function toggleBatterySaver(enable) {
    if (enable) {
        console.log("-");
    }
    else {
        console.log("-");
    }
}


function toggleDataSaver(enable) {
    if (enable) {
        console.log("-");
    }
    else {
        console.log("-");
    }
}



