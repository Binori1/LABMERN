// Validate
window.onload = () => {
    const token = sessionStorage.getItem("msalToken");
    if (!token) {
        alert("You must sign in first.");
        window.location.href = "login.html";
    } else {
        // Optionally fetch user profile
        fetch("https://graph.microsoft.com/v1.0/me", {
            headers: { Authorization: `Bearer ${token}` }
        })
        .then(res => res.json())
        .then(user => {
            document.querySelector(".header span").innerText = user.displayName;
        })
        .catch(err => console.error(err));
    }
};



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
