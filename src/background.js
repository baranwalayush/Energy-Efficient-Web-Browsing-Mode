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


// Feature 1: Tab Management - Suspend inactive tabs
function toggleTabManagement(enable) {
    if (enable) {
        // Activate tab suspension by monitoring inactive tabs
        chrome.tabs.onActivated.addListener(checkAndSuspendTabs);
        console.log("Inactive tabs will be suspended.");
    } else {
        // Remove listener when tab management is disabled
        chrome.tabs.onActivated.removeListener(checkAndSuspendTabs);
        console.log("Task completed");
    }
  }
  
  // Helper function to suspend tabs not in active use
  function checkAndSuspendTabs() {
    chrome.tabs.query({ active: false, currentWindow: true }, (tabs) => {
        tabs.forEach(tab => {
            // Suspend tab by reloading with minimal CPU usage
            chrome.tabs.discard(tab.id, () => {
                console.log(`Tab ${tab.id} suspended.`);
            });
        });
    });
  }


function toggleMediaBlocking(enable) {
    if (enable) {
        console.log("-");
    }
    else {
        console.log("-");
    }
}

// Feature 3: Dark Mode - Enable/Disable adaptive dark mode
function toggleDarkMode(enable) {
    chrome.tabs.query({ active : true}, (tabs) => {
        tabs.forEach(tab => {
            chrome.scripting.executeScript({
                target : {tabId : tab.id},
                function : enableDarkMode,
                args : [enable]
            })
            .then(() => console.log("Task completed"));
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


// Helper function for feature 3
function enableDarkMode(enabled) {
    if (enabled) {
        document.body.style.filter = "invert(1) hue-rotate(180deg)";
    } 
    else {
        document.body.style.filter = "";
    }
}


function toggleBatterySaver(enable) {
    // navigator.getBattery().then(battery => {
    //     let value = battery.level;
    //     console.log(`Battery Level: ${value}`);
    //     if(enable) {
    //         if(value < 0.3) {
    //             // Reduces energy consumption when battery is low
    //             chrome.power.requestKeepAwake("system");
    //             console.log("Battery Saver Enabled: Optimized settings for low battery.");
    //         }
    //         else {
    //             console.log("Battery Level already optimal");
    //         }
    //     }
    //     else {
    //         chrome.power.releaseKeepAwake();
    //         console.log("Battery Saver Disabled");
    //     }
    // });
}


function toggleDataSaver(enable) {
    if (enable) {
        console.log("-");
    }
    else {
        console.log("-");
    }
}



