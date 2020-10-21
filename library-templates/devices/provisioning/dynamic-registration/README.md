# Dynamic Registration
This template provides [JWT-based](https://en.wikipedia.org/wiki/JSON_Web_Token) dynamic device registration. This allows devices to register themselves by sending a digitally-signed JWT token to a registration API endpoint. That endpoint then verifies the token, creates the [Losant Device](https://docs.losant.com/devices/overview/), and replies with the device ID, access key, and access secret that can be used to authenticate against Losant's MQTT broker and Losant's API.

With dynamic registration, every device can be flashed with identical firmware, which can greatly simplify an IoT solution's development and deployment process.

This template provides an example implementation and is designed to be modified and extended to meet the specific requirements of your IoT solution.

## Setup
1. Create a `tl-jwt-register-secret` [Application Global](https://docs.losant.com/applications/overview/#application-globals) and set it to any string value. It should be a sufficiently complex string, much like a password. This is used to sign your JWT tokens. Never share this value.
2. Create a `tl-jwt-register-issuer` [Application Global](https://docs.losant.com/applications/overview/#application-globals) and set it to a string value that is your company's domain (e.g. example.com).
3. Enable the Create JWT Token workflow included in this template. 

## Endpoint Routes
This template includes endpoints that may conflict with endpoints that already exist in your application. To successfully import this template, you must remove or rename any existing endpoints that have the following routes:

* `POST /api/register-device`

## Create the Registration Token
This template contains the Create JWT Token workflow, which can be used to generate your registration token.

Within that workflow, when the `Create` virtual button is clicked, it will generate a signed token and print it to the [Debug Panel](https://docs.losant.com/workflows/outputs/debug/#debug-panel), which can be copied and deployed to your devices. Encoded in the token's payload is the registration URL. This allows your devices to optionally obtain the registration URL from the token instead of being hard-coded in your firmware. You can modify the workflow to add or remove any fields that your solution requires.

Most applications only require a single, or very few, registration tokens. The same token can be flashed to every device. The token is digitally signed using the private secret in your application globals. The JWT signature prevents attackers from creating and spoofing their own registration token. Never share your JWT secret.

The token is signed, not encrypted, meaning every field in the token's payload can be seen by anyone with access to the token, even if they don't know the secret. Keep this in mind so that you don't add sensitive information to the token's payload. This also allows devices to access fields encoded in the payload (e.g. registration URL) without the device requiring the secret.

## Registering a Device
This template contains the `POST /api/register-device endpoint`, which a device can POST to when registering itself. This endpoint triggers the Register Device workflow that performs the token verification and registration process.

This template expects the device to send a JWT token and a unique manufacturer ID:

```
POST /api/register-device

{
  "token": "THE_REGISTRATION_JWT_TOKEN",
  "manufacturerId": "UNIQUE_MANUFACTURER_ID"
}
```

The manufacturer ID is anything unique to that physical device (e.g. MAC address). This ID is added as a `manufacturerId` tag on the resulting device. It's also used to ensure the same device is not registered twice. This template allows the manufacturer ID to be set to any value. If you have a known set of valid IDs, this template could be extended to ensure the incoming ID is valid based on your solution's requirements.

If the registration token is valid and the manufacturer ID is present, this request will create a new device from the tl-generator [Device Recipe](https://docs.losant.com/devices/device-recipes/) and reply with the new device ID, access key, and access secret that can be used to authenticate to Losant's MQTT broker or Losant's API:

```
{
  "deviceId": "LOSANT_DEVICE_ID",
  "accessKey": "LOSANT_ACCESS_KEY",
  "accessSecret": "LOSANT_ACCESS_SECRET"
}
```

The registration endpoint should only be requested a single time per device. The device should persist the resulting credentials to internal storage or flash. This template will deny any registration attempts made using the same manufacturer ID.

## Testing the Registration Endpoint
The following CURL command can be used to manually test the registration endpoint:

```
curl -H "Content-Type: application/json" \
-X POST \
-d '{ "token": "THE_REGISTRATION_TOKEN", "manufacturerId": "UNIQUE_MANUFACTURER_ID" }' \
https://<YOUR_APP_ID>.onlosant.com/api/register-device
```

## Sample Node.js Firmware
To demonstrate how a device's firmware performs dynamic registration, a [Node.js](https://nodejs.org) script is added to your [Application Files](https://docs.losant.com/applications/files/) at `/tl-sample-firmware/NodeJS`. This script demonstrates the registration concepts that can be applied to many other languages. Once Node.js is installed on your computer, you can run the script by following these steps:

1. Download `index.js` and `package.json` to a folder on your computer.
2. Edit `index.js` and set the `TOKEN` constant to the JWT registration token created above. Also edit the `MANUFACTURER_ID` constant to any example ID.
3. Using a terminal, use `cd` to navigate to the script's folder and run `npm install`.
4. Run `node index.js`.

On the first execution of the script, it will perform a registration request and save the credentials to a local file named `credentials.json`. On all subsequent executions, it will use the credentials from that file. Once the credentials are obtained, the script makes an authenticated connection to Losant's MQTT broker.

## License

Copyright (c) 2020 Losant IoT, Inc. All rights reserved.

Licensed under the [MIT](https://github.com/Losant/losant-templates/blob/master/LICENSE.txt) license.

https://www.losant.com
