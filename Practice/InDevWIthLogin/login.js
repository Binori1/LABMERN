const msalConfig = {
    auth: {
        clientId: "b15b1517-1da5-4259-9b26-73f133872729",
        authority:"https://login.microsoftonline.com/c92da9ce-2036-43c6-8c72-662045ddce8e",
        redirectUri: "http://localhost:5500/InDevWIthLogin/console.html"
    }
};

const loginRequest = {
    scopes: [
        "User.Read"
    ]
};

const msalInstance = new msal.PublicClientApplication(msalConfig);

document.getElementById("loginBtn").onclick = async () => {
    try {
        const loginResponse = await msalInstance.loginPopup({
            scopes: ["User.Read"]
        });
        console.log("Login successful:", loginResponse);

        // Store token in sessionStorage
        sessionStorage.setItem("msalToken", loginResponse.accessToken);

        // Redirect to console page
        window.location.href = "console.html";
    } catch (error) {
        console.error("Login failed:", error);
        alert("Login failed. Please try again.");
    }
};