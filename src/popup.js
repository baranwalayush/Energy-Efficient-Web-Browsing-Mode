// Initialize buttons
const tabManagementButton = document.getElementById("tabToggle");
const mediaBlockingButton = document.getElementById("mediaToggle");
const darkModeButton = document.getElementById("darkModeToggle");
const batterySaverButton = document.getElementById("batterySaverToggle");
const dataSaverButton = document.getElementById("dataSaverToggle");
const dashboardButton = document.getElementById("viewDashboard");

// Track feature states
let tabManagementEnabled = false;
let mediaBlockingEnabled = false;
let darkModeEnabled = false;
let batterySaverEnabled = false;
let dataSaverEnabled = false;

// Event listener to toggle Tab Management feature
tabManagementButton.addEventListener("click", () => {
    tabManagementEnabled = !tabManagementEnabled;
    toggleFeature("tabManagement", tabManagementEnabled);
});

// Event listener to toggle Media Blocking feature
mediaBlockingButton.addEventListener("click", () => {
    mediaBlockingEnabled = !mediaBlockingEnabled;
    toggleFeature("mediaBlocking", mediaBlockingEnabled);
});

// Event listener to toggle Dark Mode feature
darkModeButton.addEventListener("click", () => {
    darkModeEnabled = !darkModeEnabled;
    toggleFeature("darkMode", darkModeEnabled);
});

// Event listener to toggle Battery Saver feature
batterySaverButton.addEventListener("click", () => {
    batterySaverEnabled = !batterySaverEnabled;
    toggleFeature("batterySaver", batterySaverEnabled);
});

// Event listener to toggle Data Saver feature
dataSaverButton.addEventListener("click", () => {
    dataSaverEnabled = !dataSaverEnabled;
    toggleFeature("dataSaver", dataSaverEnabled);
});

// Event listener to view the dashboard
dashboardButton.addEventListener("click", () => {
    chrome.tabs.create({ url: "layouts/dashboard.html" });
});

// Function to send a message to background.js to toggle features
function toggleFeature(feature, enabled) {

    if(enabled){
        console.log(`${feature} Enabled`);
    }
    else{
        console.log(`${feature} Disabled`);
    }
    
    chrome.runtime.sendMessage({
        action: "toggleFeature",
        feature: feature,
        enabled: enabled
    });
}

// tabManagementButton.addEventListener("click", () => {
//     tabManagementEnabled = !tabManagementEnabled;
//     //tabManagementButton.innerText = tabManagementEnabled ? "Disable" : "Enable";
//     if(tabManagementEnabled){
//         console.log("Tab Management Enabled");
//     }
//     else{
//         console.log("Tab Management Disabled");
//     }
// });
