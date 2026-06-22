function showPlatform(platform){
    document.getElementById("platformTitle").innerText = platform;
    document.getElementById("platformText").innerText =
        "Manage " + platform + " devices using the available actions below.";
}

function actionClicked(action){
    alert(action + " selected.");
}

async function deleteDevice() {

    const serialNumber = prompt("Enter Device Serial Number:");

    if (!serialNumber) {
        return;
    }

    try {

        const response = await fetch("/api/devices/delete", {
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