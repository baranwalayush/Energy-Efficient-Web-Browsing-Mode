// Initialize buttons
const tabManagementButton = document.getElementById("tabToggle");
const mediaBlockingButton = document.getElementById("mediaToggle");
const darkModeButton = document.getElementById("darkModeToggle");
const batterySaverButton = document.getElementById("batterySaverToggle");
const dataSaverButton = document.getElementById("dataSaverToggle");
const dashboardButton = document.getElementById("viewDashboard");

let tabManagementEnabled = false;

tabManagementButton.addEventListener("click", () => {
    tabManagementEnabled = !tabManagementEnabled;
    //tabManagementButton.innerText = tabManagementEnabled ? "Disable" : "Enable";
    if(tabManagementEnabled){
        console.log("Tab Management Enabled");
    }
    else{
        console.log("Tab Management Disabled");
    }
});
