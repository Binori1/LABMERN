function showPlatform(platform){
    document.getElementById("platformTitle").innerText = platform;
    document.getElementById("platformText").innerText =
        "Manage " + platform + " devices using the available actions below.";
}

function actionClicked(action){
    alert(action + " selected.");
}

async function wipeDevice(serial) {

    let serialNumber = prompt("Enter Device Serial Number:");

    if (!serialNumber) {
        return alert("Serial number can't be blank");
    }

    // Trim spaces from the input
    serialNumber = serialNumber.trim();

    try {
        const response = await fetch("http://localhost:3000/api/devices/wipe", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                serialNumber: serialNumber
            })
        });

        const result = await response.json();

        if (response.ok) {
            alert(result.message);
        } else {
            alert("Error: " + result.message);
        }

    } catch (error) {
        alert("Failed to connect to server.");
        console.error(error);
    }
}
