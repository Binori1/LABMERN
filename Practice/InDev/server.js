const express = require("express");
const bodyParser = require("body-parser");
const msal = require("@azure/msal-node");

const app = express();
app.use(bodyParser.json());

// MSAL configuration
const msalConfig = {
  auth: {
    clientId: "7e8bfa07-4175-460c-a353-cc8d5c3047fe",
    authority: "https://login.microsoftonline.com/c92da9ce-2036-43c6-8c72-662045ddce8e",
    clientSecret: "2wk8Q~My86Eq64NA4xAVsGATG0NdQc5P82sNEaFL"
  }
};

const cca = new msal.ConfidentialClientApplication(msalConfig);

// Login route
app.post("/auth/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    // Resource Owner Password Credential (ROPC) flow
    const result = await cca.acquireTokenByUsernamePassword({
      scopes: ["User.Read"],
      username: email,
      password: password
    });

    res.json({ token: result.accessToken });
  } catch (error) {
    console.error(error);
    res.status(401).json({ message: "Authentication failed" });
  }
});

app.listen(5000, () => console.log("Server running on http://localhost:5000"));
