# KST33 Series Distance Sensor Template

This template contains workflows and dashboards to demonstrate the functionality of the LoRaWAN [KST3320 Distance Sensor](https://kstechnologies.com/kst3320). This template provides built-in support for multiple LoRaWAN networks, which include [Actility](https://www.actility.com/), [MachineQ](https://machineq.com/), and [Helium](https://www.helium.com/lorawan). To implement and test solutions without requiring physical devices, this template also contains a simulation workflow and dashboard.

The KST3320 is equipped with a 4-meter distance sensor, 3-axis accelerometer, temperature and humidity sensors, and GPS. With these sensors you detect various material levels, angle of the KST3320, monitor relative ambient temperature and humidity, and pinpoint the KST3320's exact position in the world.

![KST3320](https://~exportplaceholderid-files-domain~/~exportplaceholderid-application-applicationKst33SeriesDistanceSensor-0~/template/kst3300_enclosure.png)

## How to Purchase a KST3320 Dev Kit
To obtain a KST3320 Dev Kit or learn about additional purchasing options, please [contact the KS Technologies sales team](https://kstechnologies.com/contact). 

## Simulation Overview
When using this template's simulation workflow and dashboard, you do not require a physical KST3320 device. This is useful during development and testing where real sensor data may not be available. This template contains the following resources for simulating KST3320 devices:

* **KST3320 Simulated Device Recipe**: device recipe that makes it easy to create multiple simulation KST3320 devices.
* **KST3320 (Simulated Device)**: the simulated device that comes with this template. Data is reported to this device every 15 minutes by the simulation workflow.
* **Simulated KST3320 Workflow**: when enabled, generates simulation data and reports that data to the simulation device every 15 minutes.
* **Simulated KST3320 Dashboard (All Sensors)**: dashboard that displays all sensor data from the simulation device.

## LoRaWAN Overview
This template contains the following resources to receive and display real KST3320 device data through one of the supported LoRaWAN network providers (Actility, MachineQ, Helium). 

* **KST3320 Device Recipe**: contains all the attributes and tags required to create KST3320 devices that will accept real data.
* **KST3320 Workflow**: receives sensor data via a webhook and records the data to the appropriate KST3320 device based on EUI.
* **KST3320 Dashboard**: dashboard to visualize real KST3320 data.

## How to Configure Your KST3320 through Actility, MachineQ, or Helium
The following steps are required to configure your KST3320 device to report data through your selected LoraWAN network provider:

### 1. Configure the KST Device in Your Network Provider's Console
Add your KST3320 to your network provider's console/backend. The required configuration details are provided by KST when devices are purchased.

### 2. Configure a Webhook Integration in Your Network Provider's Console
Depending on your LoRaWAN network provider, add one of the following URLs as a webhook integration in your network provider's console/backend:

**Actility**
```
https://ow0wlg9ee7.execute-api.us-west-2.amazonaws.com/dev/actility/kst3320
```
**MachineQ**
```
https://ow0wlg9ee7.execute-api.us-west-2.amazonaws.com/dev/machineq/kst3320
```

**Helium**
```
https://ow0wlg9ee7.execute-api.us-west-2.amazonaws.com/dev/helium/kst3320
```

## Create the Losant Device
Follow the instructions below to create a [Losant Device](https://~exportplaceholderid-docs-url~/devices/overview/) that represents your physical KST3320 sensor.

On the main application menu, click **Devices** to display your application's device list.

![Losant Devices Menu](https://~exportplaceholderid-files-domain~/~exportplaceholderid-application-applicationKst33SeriesDistanceSensor-0~/template/devices-menu.png)

On to the top right corner of the screen, select from dropdown next to the **Add Device** button and click **Create From Recipe**.

![Losant Add Device from Recipe](https://~exportplaceholderid-files-domain~/~exportplaceholderid-application-applicationKst33SeriesDistanceSensor-0~/template/create-from-recipe.png)

Select the **KST3320 Device Recipe**.

![Losant Device Recipe](https://~exportplaceholderid-files-domain~/~exportplaceholderid-application-applicationKst33SeriesDistanceSensor-0~/template/create-from-kst-recipe.png)

Click the **Create From Recipe** button to create the device. Once created, you'll be taken to the overview page for the new device.

On the device overview page, give the device any name you'd like and change the **dev_eui** and **serial_number** tag values to match the values of your physical KST3320 device.

![Losant Device Tags](https://~exportplaceholderid-files-domain~/~exportplaceholderid-application-applicationKst33SeriesDistanceSensor-0~/template/device-tags.png)

Click the **Save Device** button at the bottom of the page.

## Register the Losant Webhook with KS Technologies
This template involves two webhooks. The webhook above, that you gave to your LoRaWAN network provider, is used to send your sensor data to KS Technologies for parsing and normalization. This template automatically creates a unique [Losant Webhook](https://~exportplaceholderid-docs-url~/applications/webhooks/) so KS Technologies can forward that normalized sensor data to your application.

You can find your unique webhook URL by clicking the **Webhooks** item in the main application menu.

![Losant Webhooks](https://~exportplaceholderid-files-domain~/~exportplaceholderid-application-applicationKst33SeriesDistanceSensor-0~/template/webhooks-menu.png)

Copy the URL for the **Receive Data** webhook.

Next, send an email to [webhooks@kstechnologies.com](mailto:webhooks@kstechnologies.com?subject=Losant%20Webook) that contains your unique webhook URL. KS Technologies will then add it to the factory record of the device(s) that you have purchased.

Lastly, you must enable the **KST3320 Workflow** workflow so that it will run when data is sent to your webhook from KS Technologies.

## The Dashboard for Your KST3320 Device
This template contains the **KST3320 Dashboard (Distance)** dashboard, which can be used to visualize data from any of your physical KST3320 devices.

This dashboard uses a [Context Variable](https://~exportplaceholderid-docs-url~/dashboards/context-variables/) to quickly switch between any device you have. You can change the device by clicking the gear icon on the top right corner of the dashboard. In that menu, you can then select a new device from the **Dashboard Context** section.

## How to Modify the KST3320 Simulation Workflow
The **Simulated KST3320 Workflow** workflow can be modified to report any custom test data you require. Simulated device data can be viewed on the **Simulated KST3320 Dashboard (All Sensors)** or the **Simulated KST3320 Dashboard (Distance)** dashboards.

The simulation workflow **must be enabled** before it will begin generating data.

The list below contains the possible range of values that the simulator will produce. You can adjust these values as required by editing the workflow.

* **Battery**: a random value between 0 and 100.
* **Distance**: a random value between 0 and 4000.
* **Temperature** a random value between -20 and 50.
* **Humidity**: a random value between 0 and 100.
* **Location**: a static GPS value of "38.999796,-104.701690".
* **Accelerometer X, Y & Z**: random values between -7.999 and 7.999.

You can also adjust the [Timer Trigger](https://~exportplaceholderid-docs-url~/workflows/triggers/timer/) to control the rate at which simulated data is generated. The default value is every 15 minutes.

## License

Copyright (c) 2020 Losant IoT, Inc. All rights reserved.

Licensed under the [MIT](https://github.com/Losant/losant-templates/blob/master/LICENSE.txt) license.

https://www.losant.com