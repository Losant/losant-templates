# Publish Edge Files to Application Files

This template demonstrates how to publish files from an [edge compute device](https://docs.losant.com/devices/edge-compute/) to [Application Files](https://docs.losant.com/applications/files/). This allows for receiving files (images, CSVs, etc.) that are too large to be reported as [device state](https://docs.losant.com/devices/state/) through [blob attributes](https://docs.losant.com/devices/blobs/).

## Dependencies

This template requires at least one edge compute device running the [Losant Edge Agent](https://docs.losant.com/edge-compute/edge-agent-usage/); aside from that, there are no additional dependencies.

**Note:** Some [alternative builds](https://docs.losant.com/edge-compute/edge-agent-installation/#alternative-edge-agent-builds) of the agent are unable to utilize this template; for example, the Alpine version does not have [curl](https://docs.losant.com/edge-compute/edge-agent-installation/#alternative-edge-agent-builds) installed, which the included edge workflow relies on for part of the upload process.

## Included Resources

This template includes the following resources:

1. One [Edge Workflow](https://docs.losant.com/workflows/edge-workflows/): Requests credentials for uploading a file and, on receipt of the signed URL, uploads the file to Application Files.
2. One [Application Workflow](https://docs.losant.com/workflows/application-workflows/): Handles requests for signed URLs, generates the upload credentials, and sends commands to the edge compute devices with the credentials.

## Usage

After importing the template, there are a few steps necessary to set it up before uploading files from your edge compute devices to your application.

### Existing Access Keys

First, this template requires your edge devices to publish messages on a [custom MQTT topic](https://docs.losant.com/mqtt/overview/#custom-topics); therefore, any device receiving the included edge workflow must utilize an [access key](https://docs.losant.com/applications/access-keys/) that has [permission](https://docs.losant.com/applications/access-keys/#additional-mqtt-topics-access) to publish to that custom topic.

By default, this custom topic is `tl-edge-to-files`; if you wish to use a different custom topic, you will need to provide publish permissions for your chosen topic instead. Instructions on other places where the topic name must be changed are included below.

### Application Workflow

1. Enable the application workflow included in this template.
2. By default, uploads from edge compute devices are stored in a directory called `/tl-edge-to-files-uploads`. If you would like to change this directory, you can do so by updating the "uploadsRoot" [workflow global](https://docs.losant.com/workflows/overview/#workflow-globals) value. 
3. If you are using a different custom topic as described above, you must also change the topic in the application workflow's [MQTT Trigger](https://docs.losant.com/workflows/triggers/mqtt/) to match your desired topic.
4. This template also makes use of [device commands](https://docs.losant.com/devices/commands/) by sending a specific command to the device. By default, that command name is `tl-upload-to-files`. If you would like to change that command name, do so in the [Device: Command Node](https://docs.losant.com/workflows/outputs/device-command/).

### Edge Workflow

1. In the edge workflow's "fileDirectory" global value, define the directory on your device where the edge workflow should look for files to upload to your application's files. By default, this directory is `/data/files`.
2. Currently, the flow begins by press of a [Virtual Button](https://docs.losant.com/workflows/triggers/virtual-button/) in the edge workflow. You may wish to check for files to upload on a regular interval by including a [Timer Trigger](https://docs.losant.com/workflows/triggers/timer/), or by beginning the flow via a [Device: Command Trigger](https://docs.losant.com/workflows/triggers/device-command/).
3. If you are changing the custom MQTT topic as described in previous steps, change the topic name in the [MQTT Node's](https://docs.losant.com/workflows/outputs/mqtt/) "Topic Template" field.
4. If you are using a different device command name as described above, change the [Conditional Node](https://docs.losant.com/workflows/logic/conditional/) in the lower portion of the workflow to match your desired command name.
5. Once all changes are complete, [deploy the workflow](https://docs.losant.com/workflows/edge-workflows/#deploying-versions) to one or more edge compute devices.

## Accessing Uploaded Files

Uploaded files are publicly available at a URL of the form "https://~exportplaceholderid-files-domain~/APPLICATION_ID/UPLOAD_ROOT/DEVICE_ID/FILE_NAME.EXT", where ...

- `APPLICATION_ID` is the ID of the application where you've imported this template.
- `UPLOAD_ROOT` is the root directory for all device uploads. This can be changed by setting the "uploadsRoot" [workflow global](https://docs.losant.com/workflows/overview/#workflow-globals).
- `DEVICE_ID` is the ID of the device that uploaded the file.
- `FILE_NAME.EXT` is the name of the uploaded file, including its extension (e.g. ".jpg", ".png").

You may also browse all device uploads by visiting your [Application Files](https://docs.losant.com/applications/files/) and navigating to the directory defined in the "uploadsRoot" global.

## How It Works

The act of uploading a file from an edge compute device to the publicly accessible application files is a multi-step process.

1. The top section of the included edge workflow is triggered by pressing of the Virtual Button (or through some other trigger as described above).
2. The [Function Node](https://docs.losant.com/workflows/logic/function/) retrieves a list of all files in the global-defined directory, including their size in bytes and [MIME type](https://docs.losant.com/workflows/logic/function/).
3. The array of files is published on the custom MQTT topic.
4. In the application workflow, the array of files is received on the custom topic.
5. For each file, upload credentials are generated. These credentials allow for the upload of new files (or the replacement of existing files of the same name) from the device itself.
6. The application workflow sends the array of credentials back to the device in the message body of a command.
7. As a separate process, the lower section of the edge workflow is triggered by receipt of that command.
8. For each file upload credential received in the payload, a [Run Executable Node](https://docs.losant.com/workflows/data/run-executable/) kicks off a process to upload the file using [curl](https://curl.se/).
9. If the upload succeeds, another Run Executable Node removes the file from the directory. This both helps manage storage space on the device and prevents the process from running unnecessarily for any files that have already been successfully uploaded.

## License

Copyright &copy; 2021 Losant IoT, Inc. All rights reserved.

Licensed under the [MIT](https://github.com/Losant/losant-templates/blob/master/LICENSE.txt) license.

https://www.losant.com