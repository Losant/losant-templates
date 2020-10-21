const fs = require('fs');
const path = require('path');
const axios = require('axios').default;
const jwt = require('jsonwebtoken');
const mqtt = require('mqtt');

/**
 * This script demonstrates JWT-based dynamic device registration
 * using the Losant IoT Platform.
 * 
 * If authentication credentials are not already available,
 * this script will POST a signed registration token to obtain
 * a device ID and authentication credentials. Those credentials
 * are then used to form an MQTT connection to the MQTT broker.
*/

// The registration JWT token.
const TOKEN = "YOUR_REGISTRATION_JWT_TOKEN";

// The unique manufacturer ID of this device.
// The actual value of this is up to your solution.
// It's common to use a MAC address for this:
//   https://www.npmjs.com/package/getmac
const MANUFACTURER_ID = 'AAABBBCCC';

// The path to the persisted credentials.
// One the registration completes, the credentials will be
// stored on disk at this location.
const CREDENTIALS_PATH = path.join(__dirname, 'credentials.json');

let mqttClient = null;

// Attempts to read existing credentials from disk.
// If no credentials are found, returns null.
const getExistingCredentials = () => {

  let exists = fs.existsSync(CREDENTIALS_PATH);
  if(exists) {
    return JSON.parse(fs.readFileSync(CREDENTIALS_PATH, { encoding: 'utf-8'}));
  }

  return null;
};

// Gets device credentials.
const getCredentials = async () => {
  let credentials = getExistingCredentials();

  if(credentials) {
    console.log('Credentials loaded from disk.');
    return credentials;
  }

  credentials = await registerDevice();

  if(credentials) {
    console.log('Credentials received from registration URL.');
    console.log('A new device has been created in your Losant application.');
    return credentials;
  }
};

// Saves the credentials to disk.
const persistCredentials = (credentials) => {
  fs.writeFileSync(CREDENTIALS_PATH, JSON.stringify(credentials, undefined, 2), { encoding: 'utf-8' });
  console.log('Credentials successfully persisted to disk.');
};

// Registers the device using the registration JWT token.
// The registration URL is decoded from the JWT payload.
const registerDevice = async () => { 
  let token = jwt.decode(TOKEN, { complete: true });
  if(!token) {
    console.log('Failed to decode JWT token.');
    return null;
  }

  let registrationUrl = token.payload.url;
  
  let response = await axios.post(registrationUrl, {
    token: TOKEN,
    manufacturerId: MANUFACTURER_ID
  }, { validateStatus: null });

  if(response.status !== 200) {
    console.log(response.data);
    return null;
  }

  persistCredentials(response.data);
  return response.data;
};

// Connect to the MQTT broker.
const connect = async () => {
  let credentials = await getCredentials();

  if(!credentials) {
    console.log('Unable to obtain authentication credentials.');
    return;
  }

  mqttClient = mqtt.connect('mqtts://broker.losant.com', {
    clientId: credentials.deviceId,
    username: credentials.accessKey,
    password: credentials.accessSecret
  });

  mqttClient.on('connect', () => {
    console.log('Successfull connected to MQTT broker.');
  });

  mqttClient.on('error', () => {
    console.log('Failed to connect to MQTT broker.');
  })
};

 connect();

