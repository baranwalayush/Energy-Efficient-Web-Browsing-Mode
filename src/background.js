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
    navigator.getBattery().then(battery => {
        let value = battery.level;
        console.log(`Battery Level: ${value}`);
        if(enable) {
            if(value < 0.3) {
                // Reduces energy consumption when battery is low
                chrome.power.requestKeepAwake("system");
                console.log("Battery Saver Enabled: Optimized settings for low battery.");
            }
            else {
                console.log("Battery Level already optimal");
            }
        }
        else {
            chrome.power.releaseKeepAwake();
            console.log("Battery Saver Disabled");
        }
    });
}


function toggleDataSaver(enable) {
    if (enable) {
        // Apply image compression to current active tab
        chrome.tabs.query({active: true}, (tabs) => {
            tabs.forEach(tab => {
                chrome.scripting.executeScript({
                    target: { tabId: tab.id },
                    function: compressImages
                })
                .then(() => {console.log("Task Completed")});
            });
        });

        // Listen for newly loaded tabs and apply image compression
        // chrome.webNavigation.onCompleted.addListener((details) => {
        //     chrome.scripting.executeScript({
        //         target: { tabId: details.tabId },
        //         function: compressImages
        //     });
        // });
        
    } 
    else {
        // Remove image compression
        chrome.tabs.query({active: true}, (tabs) => {
            tabs.forEach(tab => {
                chrome.scripting.executeScript({
                    target: { tabId: tab.id },
                    function: restoreImages
                })
                .then(() => {console.log("Task Completed")});
            });
        });
        //console.log("Data Saver Disabled.");
    }
}

// This function is only applicable to images that are open source.
// For non-opensource images, it will give  "Tainted canvases may not be exported" error.
function compressImages() {

    const images = document.getElementsByTagName("img");
    const img_arr = [];

    for(var i=0; i<images.length; i++){
        img_arr.push(images[i]);
    }

    img_arr.forEach((img) => {
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");

        // Skip already compressed images
        if (!img.hasAttribute("data-original-src")) {
            img.setAttribute("data-original-src", img.src); // Save original source
        }
        
        try {
            // Set canvas dimensions to match the image
            canvas.width = img.naturalWidth;
            canvas.height = img.naturalHeight;

            // Draw the image onto the canvas
            ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

            // Compress the image by converting it to a JPEG with reduced quality
            const compressedDataUrl = canvas.toDataURL("image/png", 0.5); // 50% quality

            // Replace the image's src with the compressed version
            img.src = compressedDataUrl;
            console.log("Image Compressed");
        }
        catch(e) {
            img.removeAttribute("data-original-src");
            console.error("Failed to process image due to cross-origin restrictions.");
        }

    })
}

function restoreImages() {

    const images = document.querySelectorAll("img");

    images.forEach((img) => {
        if (img.hasAttribute("data-original-src")) {
            img.src = img.getAttribute("data-original-src"); // Restore original source
            img.removeAttribute("data-original-src"); // Clean up
            console.log("Image Restored");
        }
    });
}




