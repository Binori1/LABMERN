let selectedDevice = null;
const groupTags = [
"INDIA",
"APAC",
"EMEA",
"US",
"NA"
];

function showPlatform(platform){
    document.getElementById("platformTitle").innerText = platform;
    document.getElementById("platformText").innerText =
        "Manage " + platform + " devices using the available actions below.";
}

function actionClicked(action){
    alert(action + " selected.");
}

//Frontend for wipe device
async function wipeDevice() {

    let serialNumber = prompt("Enter Device Serial Number");

    if (!serialNumber) {
        alert("Serial Number cannot be blank.");
        return;
    }

    serialNumber = serialNumber.trim();

    try {

        // Get Device Details
        const deviceResponse = await fetch(
            "http://localhost:3000/api/devices/details",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    serialNumber
                })
            }
        );

        const device = await deviceResponse.json();

        if (!deviceResponse.ok) {
            alert(device.message);
            return;
        }

        // Show Device Details and ask for confirmation
        const confirmMessage =
            `Please verify device details:\n\n` +
            `Device Name: ${device.deviceName || "N/A"}\n` +
            `Serial Number: ${device.serialNumber || "N/A"}\n` +
            `Manufacturer: ${device.manufacturer || "N/A"}\n` +
            `Model: ${device.model || "N/A"}\n` +
            `Primary User: ${device.userPrincipalName || "N/A"}\n` +
            `Compliance State: ${device.complianceState || "N/A"}\n\n` +
            `Last Sync time is: ${device.lastSyncDateTime || "N/A"}\n\n` +
            `Do you want to wipe this device?`;

        const confirmed = confirm(confirmMessage);

        if (!confirmed) {
            alert("Wipe request cancelled.");
            return;
        }

        // Initiate Wipe
        const wipeResponse = await fetch(
            "http://localhost:3000/api/devices/wipe",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    serialNumber
                })
            }
        );

        const wipeResult = await wipeResponse.json();

        if (wipeResponse.ok) {
            alert(wipeResult.message);
        } else {
            alert("Error: " + wipeResult.message);
        }

    }
    catch (error) {

        console.error(error);

        alert("Failed to connect to server.");
    }
}

//Frontend for delete device
async function deleteDevice() {

    let serialNumber =
        prompt("Enter Device Serial Number");

    if (!serialNumber) {
        return;
    }

    serialNumber = serialNumber.trim();

    try {

        const response = await fetch(
            "http://localhost:3000/api/devices/details",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    serialNumber
                })
            }
        );

        const device =
            await response.json();

        if (!response.ok) {

            alert(device.message);
            return;

        }

        const confirmed =
            confirm(
                `Delete Device?\n\n
Device Name: ${device.deviceName}
Serial Number: ${device.serialNumber}
Primary User: ${device.userPrincipalName}
Last Sync: ${device.lastSyncDateTime}`
            );

        if (!confirmed) {
            return;
        }

        const deleteResponse =
            await fetch(
                "http://localhost:3000/api/devices/delete",
                {
                    method: "POST",
                    headers: {
                        "Content-Type":
                            "application/json"
                    },
                    body: JSON.stringify({
                        serialNumber
                    })
                }
            );

        const result =
            await deleteResponse.json();

        alert(result.message);

    }
    catch (error) {

        console.error(error);

        alert(
            "Failed to connect to server"
        );

    }
}
//Frontend for grouptag update

async function updateGroupTag() {

    let serialNumber = prompt("Enter Device Serial Number");

    if (!serialNumber) {
        return;
    }

    serialNumber = serialNumber.trim();

    try {

        const response = await fetch(
            "http://localhost:3000/api/autopilot/details",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    serialNumber
                })
            }
        );

        const device = await response.json();

        if (!response.ok) {
            alert(device.message);
            return;
        }

        selectedDevice = device;

        document.getElementById("deviceInfo").innerHTML =
            `
            <b>Serial Number:</b> ${device.serialNumber}<br>
            <b>Manufacturer:</b> ${device.manufacturer || "N/A"}<br>
            <b>Model:</b> ${device.model || "N/A"}<br>
            <b>Current Tag:</b> ${device.groupTag || "Blank"}
            `;

        const dropdown =
            document.getElementById("groupTagSelect");

        dropdown.innerHTML =
            '<option value="">Select Group Tag</option>';

        groupTags.forEach(tag => {

            const option =
                document.createElement("option");

            option.value = tag;
            option.text = tag;

            dropdown.appendChild(option);

        });

        document.getElementById("groupTagModal")
            .style.display = "block";

    }
    catch (error) {

        console.error(error);

        alert("Failed to connect to server.");

    }
}

//Frontend to de-register system into AUtopilot
async function deregisterAutopilotDevice() {

    const serialNumber =
        prompt("Enter Device Serial Number");

    if (!serialNumber) return;

    try {

        const response = await fetch(
            "http://localhost:3000/api/autopilot/details",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    serialNumber
                })
            }
        );

        const device = await response.json();

        if (!response.ok) {

            alert(device.message);
            return;

        }

        const confirmed = confirm(
            `Remove this device from Autopilot?\n\n` +
            `Serial Number: ${device.serialNumber}\n` +
            `Manufacturer: ${device.manufacturer}\n` +
            `Model: ${device.model}\n` +
            `Current Group Tag: ${device.groupTag || "Blank"}`
        );

        if (!confirmed) {
            return;
        }

        const deleteResponse = await fetch(
            "http://localhost:3000/api/autopilot/deregister",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    serialNumber
                })
            }
        );

        const result =
            await deleteResponse.json();

        alert(result.message);

    }
    catch (error) {

        console.error(error);

        alert("Failed to connect to server");

    }
}

//Frontend for grouptag update(confirm grouptag update)
async function confirmGroupTagUpdate() {

    const dropdown =
        document.getElementById("groupTagSelect");

    const newGroupTag = dropdown.value;

    if (!newGroupTag) {

        alert("Please select a Group Tag");
        return;

    }

    try {

        const response = await fetch(
            "http://localhost:3000/api/autopilot/updateGroupTag",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    serialNumber:
                        selectedDevice.serialNumber,
                    groupTag: newGroupTag
                })
            }
        );

        const result = await response.json();

        alert(result.message);

        closeGroupTagModal();

    }
    catch (error) {

        console.error(error);

        alert("Failed to update Group Tag");

    }
}
//Frontend for Close modal function
function closeGroupTagModal() {

    document.getElementById("groupTagModal")
        .style.display = "none";

    selectedDevice = null;

}

//Frontend to register system into Autopilot
function openRegisterModal() {

    document.getElementById("registerModal")
        .style.display = "block";
}

function closeRegisterModal() {

    document.getElementById("registerModal")
        .style.display = "none";
}

async function registerAutopilotCsv() {

    const file =
        document.getElementById("autopilotCsv")
            .files[0];

    if (!file) {

        alert("Please select a CSV file");
        return;
    }

    const formData = new FormData();

    formData.append("file", file);

    try {

        const response = await fetch(
            "http://localhost:3000/api/autopilot/register",
            {
                method: "POST",
                body: formData
            }
        );

        const result =
            await response.json();

        alert(result.message);

        closeRegisterModal();

    }
    catch (error) {

        console.error(error);

        alert(
            "Failed to register device(s)"
        );
    }
}
