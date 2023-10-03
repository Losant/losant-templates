# Endpoint Retrieving Edge Data

This template demonstrates how to retrieve data on demand from an [edge compute device](https://docs.losant.com/devices/edge-compute/) in response to an [experience endpoint request](https://docs.losant.com/experiences/endpoints/), and then reply to the open request with that data.

For example, an implementation of this template could be used to allow Experience Users to:

- Scan a local network for BACnet devices.
- Retrieve edge compute device system metrics.
- Read telemetry data that is not recorded as device state on demand.

## Dependencies

This template requires at least one edge compute device running the [Losant Edge Agent](https://docs.losant.com/edge-compute/edge-agent-usage/); aside from that, there are no additional dependencies.

## Included Resources

This template includes the following resources:

1. One [Experience Endpoint](https://docs.losant.com/experiences/endpoints/): Exposes access to the device data through an HTTP request made by your [experience users](https://docs.losant.com/experiences/users/). By default the endpoint is [available to all users](https://docs.losant.com/experiences/endpoints/#access-control), though in most cases this should be edited to only allow requests from authenticated users.
1. One [Experience Workflow](https://docs.losant.com/workflows/experience-workflows/): Handles endpoint requests, validates input, and either issues error-status replies or forwards the request to the device through a [command](https://docs.losant.com/devices/commands/).
1. One [Edge Workflow](https://docs.losant.com/workflows/edge-workflows/): Listens for commands sent by the experience workflow, retrieves data from the device, and publishes that data to the custom MQTT topic.
1. One [Application Workflow](https://docs.losant.com/workflows/application-workflows/): Triggers on messages sent by the edge device on a [custom MQTT topic](https://docs.losant.com/mqtt/overview/#custom-topics) and issues replies to the original endpoint request.

## Usage

After importing the template, there are a few steps necessary to set it up before use.

### Access Key Permissions

First, this template requires your edge devices to publish messages on a [custom MQTT topic](https://docs.losant.com/mqtt/overview/#custom-topics); therefore, any device receiving the included edge workflow must utilize an [access key](https://docs.losant.com/applications/access-keys/) that has [permission](https://docs.losant.com/applications/access-keys/#additional-mqtt-topics-access) to publish to that custom topic.

By default, this custom topic is `tl-edge-response`; if you wish to use a different custom topic, you will need to provide publish permissions for your chosen topic instead. Instructions on other places where the topic name must be changed are included below.

### Experience Workflow

1. If using a different endpoint than the example included in this template, change the [Endpoint Trigger](https://docs.losant.com/workflows/triggers/endpoint/) to fire on your desired endpoint.
2. This template makes use of [device commands](https://docs.losant.com/devices/commands/) by sending a specific command to the device. By default, that command name is `getEdgeData`. If you would like to change that command name, do so in the [Device: Command Node](https://docs.losant.com/workflows/outputs/device-command/).
3. If using [experience groups](https://docs.losant.com/experiences/groups/) for a tenancy model, delete the `true` path connector from the "Found?" [Conditional Node](https://docs.losant.com/workflows/logic/conditional/) and instead connect it to the input of the [Device: Verify Node](https://docs.losant.com/workflows/experience/verify-device/).

### Application Workflow

1. Enable the application workflow included in this template.
2. If you are using a different custom topic as described above, you must also change the topic in the [MQTT Trigger](https://docs.losant.com/workflows/triggers/mqtt/) to match your desired topic.

### Edge Workflow

1. If you are using a different device command name as described above, change the [Conditional Node](https://docs.losant.com/workflows/logic/conditional/) to match against your desired command name.
2. If you are changing the custom MQTT topic as described in previous steps, change the topic name in the [MQTT Node's](https://docs.losant.com/workflows/outputs/mqtt/) "Topic Template" field.
3. Add your own workflow nodes to retrieve the desired data from the edge compute device. The template simply replies with the `deviceName` property from the initial payload.
4. Once all changes are complete, [deploy the workflow](https://docs.losant.com/workflows/edge-workflows/#deploying-versions) to one or more edge compute devices.

## How It Works

The act of receiving an endpoint request, retrieving data from an edge device, and then issuing a response is a multi-step process.

1. A user makes a request to the experience endpoint. Included in the endpoint path is a device ID, and the initial workflow payload includes a `replyId` property, which is used to tie a response to the open request.
2. In the application workflow, we verify that a device with that ID exists, and if applicable, that the experience user has access to the device. If either of those are not true, we issue a `404` response.
3. If the device is disconnected from the broker, we issue a `503` response as the device cannot receive the command.
4. If those checks pass, we send a command down to the device, making sure to include the `replyId` from the endpoint request in the command body. This is required to complete the response in later steps.
5. On the device, the edge workflow fires on receipt of the command.
6. The MQTT Node publishes the requested data on the custom topic, along with the `replyId` from the command payload.
7. Back in the application workflow, the MQTT Trigger fires on receipt of the message published by the device and parses the message body as JSON.
8. The application workflow issues a reply to the original endpoint request using the `replyId` that was included in the message body, with the data from the edge compute device in the response body.

## Considerations

While this template demonstrates the cloud-to-edge-to-cloud flow for replying to an endpoint request, we recommend persisting any data that you would like to expose to your end users to the cloud in the form of [device state](https://docs.losant.com/devices/state/) or, if the data is static in nature, to a [data table](https://docs.losant.com/data-tables/overview/). This allows for historical tracking and aggregation of the data.

This process is also prone to more errors than retrieving data from cloud-based sources; for example, if the device is offline, the data cannot be retrieved. Similarly, these extra steps can lead to longer response times or even request timeouts, depending on the speed of the device's internet connection and its processing power.

One way to mitigate these issues is to cache responses from the device in [workflow storage](https://docs.losant.com/workflows/overview/#workflow-storage) within the application workflow. This is not included in the template, and whether this is a viable strategy depends on the volume of requests, the number of devices, and the size of the responses.

## License

Copyright &copy; 2023 Losant IoT, Inc. All rights reserved.

Licensed under the [MIT](https://github.com/Losant/losant-templates/blob/master/LICENSE.txt) license.

https://www.losant.com