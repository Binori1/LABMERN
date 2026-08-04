const express = require("express");
const bodyParser = require("body-parser");
const axios = require("axios");
const msal = require("@azure/msal-node");
const cors = require("cors");
const multer = require("multer");
const csv = require("csv-parser");
const fs = require("fs");

const upload = multer({ dest: "uploads/"});

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

// Add below function after getDeviceIdBySerial()
async function getDeviceBySerial(serialNumber, token) {
  const url = `https://graph.microsoft.com/v1.0/deviceManagement/managedDevices?$filter=serialNumber eq '${serialNumber}'`;
  const response = await axios.get(url,{headers:{Authorization:`Bearer ${token}`}});
  if(response.data.value.length===0){ throw new Error('Device not found'); }
  return response.data.value[0];
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

// API endpoint for device details
app.post('/api/devices/details', async (req,res)=>{
 const {serialNumber}=req.body;
 if(!serialNumber){ return res.status(400).json({message:'Serial Number required'}); }
 try{
  const token=await getToken();
  const device=await getDeviceBySerial(serialNumber, token);
  res.json({
   id: device.id,
   deviceName: device.deviceName,
   serialNumber: device.serialNumber,
   manufacturer: device.manufacturer,
   model: device.model,
   userPrincipalName: device.userPrincipalName,
   complianceState: device.complianceState,
   lastSyncDateTime: device.lastSyncDateTime
  });
 }catch(error){
  res.status(500).json({message:error.message});
 }
});

// API endpoint for autopilot detsils
app.post("/api/autopilot/details", async (req, res) => {

    const { serialNumber } = req.body;

    try {

        const token = await getToken();

        const response = await axios.get(
            "https://graph.microsoft.com/v1.0/deviceManagement/windowsAutopilotDeviceIdentities",
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        );

        const device = response.data.value.find(
            d => d.serialNumber &&
            d.serialNumber.toUpperCase() === serialNumber.toUpperCase()
        );

        if (!device) {
            return res.status(404).json({
                message: "Autopilot device not found"
            });
        }

        res.json({
            id: device.id,
            serialNumber: device.serialNumber,
            manufacturer: device.manufacturer,
            model: device.model,
            groupTag: device.groupTag
        });

    }
    catch (error) {

        res.status(500).json({
            message: error.message
        });
    }
});

// API endpoint for autopilot detsils


// API endpoint to Backend Route for Delete Device

async function deleteDevice(deviceId, token) {

    const url =
        `https://graph.microsoft.com/v1.0/deviceManagement/managedDevices/${deviceId}`;

    await axios.delete(
        url,
        {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
    );

    return true;
}

// API endpoint to Delete API
app.post("/api/devices/delete", async (req, res) => {

    const { serialNumber } = req.body;

    try {

        const token = await getToken();

        const deviceId =
            await getDeviceIdBySerial(
                serialNumber,
                token
            );

        await deleteDevice(
            deviceId,
            token
        );

        res.json({
            message:
                `Device ${serialNumber} deleted successfully`
        });

    }
    catch (error) {

        res.status(500).json({
            message:
                error.message
        });

    }

});

// API endpoint to update group tag
app.post("/api/autopilot/updateGroupTag", async (req, res) => {

    const { serialNumber, groupTag } = req.body;

    try {

        const token = await getToken();

        const response = await axios.get(
            "https://graph.microsoft.com/v1.0/deviceManagement/windowsAutopilotDeviceIdentities",
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        );

        const device = response.data.value.find(
            d => d.serialNumber &&
            d.serialNumber.toUpperCase() === serialNumber.toUpperCase()
        );

        if (!device) {
            return res.status(404).json({
                message: "Autopilot device not found"
            });
        }

        await axios.post(
            `https://graph.microsoft.com/v1.0/deviceManagement/windowsAutopilotDeviceIdentities/${device.id}/UpdateDeviceProperties`,
            {
                groupTag: groupTag
            },
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json"
                }
            }
        );

        res.json({
            message:
                `Group Tag successfully updated to '${groupTag}'`
        });

    }
    catch (error) {

        res.status(500).json({
            message: error.message
        });
    }
});

// API endpoint to register system into autopilot
app.post("/api/autopilot/register", upload.single("file"), async (req, res) => {
        try {
            console.log(req.file);
            const rows = [];
            fs.createReadStream(req.file.path)
                .pipe(csv())
                .on("data", (data) => {
                    rows.push(data);
                })
                .on("end", async () => {
                    const token =
                        await getToken();
                    const devices =
                        rows.map(row => ({
                            serialNumber:
                                row["Device Serial Number"],

                            hardwareIdentifier:
                                row["Hardware Hash"],

                            groupTag:
                                row["Group Tag"] || ""

                        }));

                    await axios.post(
                        "https://graph.microsoft.com/beta/deviceManagement/importedWindowsAutopilotDeviceIdentities/import",
                        {
                            importedWindowsAutopilotDeviceIdentities:
                                devices
                        },
                        {
                            headers: {
                                Authorization:
                                    `Bearer ${token}`,
                                "Content-Type":
                                    "application/json"
                            }
                        }
                    );

                    fs.unlinkSync(req.file.path);

                    res.json({
                        message:
                            `${devices.length} device(s) submitted for Autopilot import`
                    });

                });

        }
        catch (error) {

            res.status(500).json({
                message:
                    error.response?.data ||
                    error.message
            });

        }

    }
);

// API endpoint to de-register system into autopilot
app.post("/api/autopilot/deregister", async (req, res) => {

    const { serialNumber } = req.body;

    try {

        const token = await getToken();

        const response = await axios.get(
            "https://graph.microsoft.com/v1.0/deviceManagement/windowsAutopilotDeviceIdentities",
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        );

        const device =
            response.data.value.find(
                d =>
                d.serialNumber &&
                d.serialNumber.toUpperCase() ===
                serialNumber.toUpperCase()
            );

        if (!device) {

            return res.status(404).json({
                message: "Autopilot device not found"
            });

        }

        await axios.delete(
            `https://graph.microsoft.com/v1.0/deviceManagement/windowsAutopilotDeviceIdentities/${device.id}`,
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        );

        res.json({
            message:
                `Autopilot device ${serialNumber} removed successfully`
        });

    }
    catch (error) {

        res.status(500).json({
            message:
                error.response?.data?.error?.message ||
                error.message
        });

    }

});

app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});
