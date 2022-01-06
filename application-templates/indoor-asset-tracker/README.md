# Indoor Asset Tracker Template
This template illustrates an indoor asset tracking solution, a multi-view application that can be used to monitor and locate assets in a physical environment. This application is designed to simulate movement of beacon-like devices on the campus of an assisted living facility. This template is meant to be used as a learning tool and starting point for your own applications.

This template uses several images to represent various types of equipment, visitors, and residents. Because of that, this template does not fit within the limits of a sandbox account. To learn more about enterprise licenses, which come with greatly increased resource limits, please [contact us](https://www.losant.com/contact-us).

## Key Components
* Sample devices based on BLE beacons
* Live and historical overview and device dashboards
* A pinpad kiosk login
* Separate views for managers and employees
* Real-time location-based event alerts and monitoring

## Setup
To begin using this template, enable the [Device Simulator](/applications/~exportplaceholderid-application-applicationIndoorAssetTracker-0~/workflows/~exportplaceholderid-flow-workflowDeviceSimulator-0~/develop) workflow and the [Event Alerting](/applications/~exportplaceholderid-application-applicationIndoorAssetTracker-0~/workflows/~exportplaceholderid-flow-workflowEventAlerting-3~/develop) workflow.

## Device Simulation
This workflow simulates the movement of devices every 15-90 minutes and includes conditional-based logic detailed below.

The devices simulated in this template were made to operate similarly and comparably to BLE or UWB devices in the physical space, much like an [Aruba Meridian](https://docs.losant.com/applications/integrations/#meridian) device.

## Devices

### Equipment
- Oxygen Concentrator
- Floor Lift
- Wheelchair

### Persons
- Resident
- Visitor

Devices are tagged with a `class` and `type` value. The `class` tag classifies the device as either a `person` or `equipment` device. The `type` tag distinguishes the device as a `resident`, `lift`, and so on. The `type` tag is used to resolve images in the Experience.

## Workflows

### Simulator
The simulator workflow randomly moves devices through rooms at an interval of every 15-90 minutes. The equipment devices are primarily stored in the `Utility Closet`, which is restricted for devices of class `person`. There are 19 rooms located on the campus, giving a 5% chance of a specific room being chosen.

At this time, there is a 10% chance that a device will move to a new room once it has been in one for 15 minutes.

### Event
This workflow is used to create events for the facility managers. Events are created whenever a device leaves the campus or when a `person` is in a restricted area.

## Experience
This experience has a unique structure; it contains two login "paths" that route to different views. Depending on an Experience User's `role` tag, a specific view will be rendered.

### Kiosk View
This view includes pincode login. The Kiosk-style view is accessible by any user that is a regular, non-manager employee. This type of user does not include a `role` user tag. 

### Manager View
The manager view is exclusively accessible by users tagged with the `role=manager` user tag. This login utilizes an email and password.

### Users
This template includes two users:
- `manager@example.com`: Manager user with access to the facilities manager view of the application. Password: `qwerty123` and pin: `1111`.
- `kanarra@example.com`: Regular staff user with access to the kiosk segments of the application. Password: `qwerty123` and pin: `2222`.

## Extending the Template
This template was built with scalability in mind. The dynamic architecture of this application allows for the addition of new devices with just a few configuration requirements. 

### Users
All users require an `email`, `password`, and a `pin` tag. `Pin` must be a unique value.

### Device Recipes
Device Recipes have been created to assist when extending this template:

- [Equipment Device Recipe](/applications/~exportplaceholderid-application-applicationIndoorAssetTracker-0~/device-recipes/~exportplaceholderid-deviceRecipe-equipmentDevice-0~/properties)
- [Person Device Recipe](/applications/~exportplaceholderid-application-applicationIndoorAssetTracker-0~/device-recipes/~exportplaceholderid-deviceRecipe-personDevice-1~/properties)

These recipes have been preconfigured with the required tags used to dynamically render values in experiences. These tags are:

- `class`: Devices require a class in order to render and route `kiosk` workflows. The preconfigured `class` values are `person` and `equipment.` Person devices are queried for `resident` devices and Equipment devices are queried and rendered as `equipment` buttons on the `Type` page.
- `type`: Devices are required to include a type for dynamically rendering data (such as the buttons on the `Type` page). These tags are also used to render images for the device.

### Images
If you do choose to extend this template by adding devices, you will need to also add images for the following cases:

- A new resident is created (in the `/residents` folder).
- A new device `type` is added (`/images`).

These require additions to Losant Files to render correctly in the experience.

## Resources
The following list contains resources related to this template:

* [Dashboard Context Variables](https://docs.losant.com/dashboards/context-variables/)
* [Experience Dashboard Pages](https://docs.losant.com/experiences/views/#dashboard-pages)
* [Experience Users](https://docs.losant.com/experiences/users/)
* [Experience User Tags](https://docs.losant.com/experiences/users/#user-tags)
* [Data Tables](https://docs.losant.com/data-tables/overview/)

## License

Copyright (c) 2020 Losant IoT, Inc. All rights reserved.

Licensed under the [MIT](https://github.com/Losant/losant-templates/blob/master/LICENSE.txt) license.

https://www.losant.com