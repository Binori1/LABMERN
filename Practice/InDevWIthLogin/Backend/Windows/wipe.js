const express = require("express");
const bodyParser = require("body-parser");
const axios = require("axios");
const msal = require("@azure/msal-node");
const cors = require("cors");

const app = express();
app.use(bodyParser.json());

// Replace with your Azure AD app details
const tenantId = "c92da9ce-2036-43c6-8c72-662045ddce8e";
const clientId = "b15b1517-1da5-4259-9b26-73f133872729";
const clientSecret = "17i8Q~0hUfaix3gaJ8CIImGVSO8TP4o9uivHcbc~";

const msalConfig = {
  auth: {
    clientId,
    authority: `https://login.microsoftonline.com/${'c92da9ce-2036-43c6-8c72-662045ddce8e'}`,
    clientSecret,
  }
};

const cca = new msal.ConfidentialClientApplication(msalConfig);

// Get Graph token
async function getToken() {
  const result = await cca.acquireTokenByClientCredential({
    scopes: ["https://graph.microsoft.com/.default"],
  });
  return result.accessToken;
}

// Find device by serial number
async function getDeviceIdBySerial(serialNumber, token) {
  const url = `https://graph.microsoft.com/v1.0/deviceManagement/managedDevices?$filter=serialNumber eq '${serialNumber}'`;
  const response = await axios.get(url, {
    headers: { Authorization: `Bearer ${token}` }
  });

  if (response.data.value.length === 0) {
    throw new Error("Device not found");
  }

  return response.data.value[0].id;
}

// Allow requests from your frontend origin
app.use(cors({
  origin: "http://127.0.0.1:5500",  // frontend origin
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));

app.use(express.json());


// Wipe device
async function wipeDevice(deviceId, token) {
  const url = `https://graph.microsoft.com/v1.0/deviceManagement/managedDevices/${deviceId}/wipe`;
  const response = await axios.post(url, {}, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return response.status === 204;
}

// API endpoint
app.post("/api/devices/wipe", async (req, res) => {
  const { serialNumber } = req.body;

  if (!serialNumber) {
    return res.status(400).json({ message: "Serial number required" });
  }

  try {
    const token = await getToken();
    const deviceId = await getDeviceIdBySerial(serialNumber, token);
    await wipeDevice(deviceId, token);

    res.json({ message: `Device ${serialNumber} wipe initiated.` });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
});

app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});
