# Edge Agent Auto Registration

This template demonstrates the use of an [on-disk workflow](https://~exportplaceholderid-docs-url~/workflows/edge-workflows/#on-disk-workflows) to enable an [Edge Agent](https://~exportplaceholderid-docs-url~/edge-compute/edge-agent-installation/) to register itself as a new device. The primary use case of this behavior is to allow the distribution of large fleets of gateways all flashed with identical images. The device ID, access key, and access secret that must be unique to each gateway is obtained automatically by the edge agent when it first launches and runs the on-disk workflow.

## Dependencies
This template assumes you have an [Edge Compute device](https://~exportplaceholderid-docs-url~/devices/edge-compute/) running the **Losant Edge Agent version 1.24.0 or later**.

This template also depends on the [Dynamic Registration](https://~exportplaceholderid-app-url~/applications/recent/template-library/5f909d54c0779800540ef0d4?templateId=5f909d5ec0779800540ef0fb) library template. This template provides the endpoint that the on-disk workflow will POST to when registering itself. To support Edge Compute devices, the Dynamic Registration template requires a minor edit, which is described in the following section.

## Editing the Dynamic Registration Library Template
The [Dynamic Registration](https://~exportplaceholderid-app-url~/applications/recent/template-library/5f909d54c0779800540ef0d4?templateId=5f909d5ec0779800540ef0fb) library template, by default, registers devices based on the "tl-generator" recipe that gets installed with the template. This recipe is configured as a "Standalone" device class. To support the dynamic registration of edge compute devices, you **must** use a recipe configured as an "Edge Compute" device. To do this, you can perform one of the following actions:

1.  Edit the "tl-generator" recipe and change the device class to "Edge Compute".
1.  Change the "Register Device" experience workflow to use any other recipe that is already configured as an "Edge Compute" device class. In production applications, this is the recommended approach, since you'll likely have a device recipe specific to your edge compute devices.

If you see the following error in your connection log after the edge agent connects, it means the device is configured as the incorrect device class, and the above edits were not applied:

```
Publish Error - Not allowed to publish to losant/<device-id>/fromAgent/hello
```

This error means the device is not an Edge Compute device and it attempted to publish to a topic that is reserved for only Edge Compute devices.

## Installing the On-Disk Workflow
The "Auto Register" workflow provided by this template is designed to be used as an on-disk workflow. This is because the edge agent must be able to run this workflow without any agent configuration or connection to the Losant broker. The workflow can be exported as an on-disk workflow through the following steps:

1. Open the "Auto Register" workflow.
1. At the top-right corner of the workflow editor, click the menu button (three vertical dots) and then click "Export".
1. On the export modal, select the "Export to Edge Agent file" option.
1. Click the "Export Workflow" button, which will prompt you to download the file to your local computer.

On-disk workflows must be mounted into the edge agent Docker container based on your on-disk directory configuration (defaults to `/data/workflows`). If you followed the [Creating a Storage Area](https://~exportplaceholderid-docs-url~/edge-compute/edge-agent-usage/#creating-storage-area) instructions, you will already be mounting a directory into the container at `/data`. The only required step is to add a `workflows` directory to that folder and place the exported workflow file into that directory.

## Creating and Installing the Registration Token
To validate the authenticity of a registration request, the edge workflow submits both a signed JWT token and a manufacturer ID that should be unique to the specific gateway (e.g. a MAC address or serial number).

This template assumes all gateways share the same JWT registration token, but each gateway is providing a unique manufacturer ID. To create the JWT token, follow the instructions in the [Dynamic Registration](https://~exportplaceholderid-app-url~/applications/recent/template-library/5f909d54c0779800540ef0d4?templateId=5f909d5ec0779800540ef0fb) library template readme - specifically the "Create the Registration Token" section.

The registration token contains the registration endpoint (e.g. /api/register-device). If you change this endpoint, you must also change the `url` field that's encoded into the token. The edge workflow will submit its registration request to the endpoint encoded into the token.

The JWT token and manufacturer ID are provided to the edge agent using the following environment variables:

* `REGISTRATION_TOKEN`: the JWT registration token.
* `MANUFACTURER_ID`: an ID unique to the specific gateway (e.g. MAC address or serial number).

In most scenarios, these environment variables are provided in your Docker run command:

```
$ docker run -e "REGISTRATION_TOKEN=<jwt-token>" -e "MANUFACTURER_ID=<unique-id>" ...
```

If you'd like to change this behavior and obtain the token and/or ID from other sources, like a file, the "Auto Register" workflow can be modified as needed.

## The Registration Process
When the edge agent starts with this template's on-disk workflow installed, the following actions will be performed:

1. The edge workflow checks the agent's current configuration using an [Agent Config: Get Node](https://~exportplaceholderid-docs-url~/workflows/data/agent-config-get/). If the agent is already configured, no further action is taken.
1. The edge workflow decodes the JWT token from the `REGISTRATION_TOKEN` environment variable to obtain the registration URL.
1. The edge workflow POSTs the token and the ID from the `MANUFACTURER_ID` environment variable to the registration URL.
1. The experience workflow validates the token and manufacturer ID. If valid, it replies with a newly created device ID, access key, and access secret.
1. The edge workflow uses an [Agent Config: Set Node](https://~exportplaceholderid-docs-url~/workflows/data/agent-config-set/) to update the agent configuration with the new device ID, access key, and access secret.
1. The edge agent will connect to the Losant broker using the new credentials.

## License

Copyright (c) 2021 Losant IoT, Inc. All rights reserved.

Licensed under the [MIT](https://github.com/Losant/losant-templates/blob/master/LICENSE.txt) license.

https://www.losant.com