# Latching and Events

This template demonstrates:

- How to use the [Latch Node](https://~exportplaceholderid-docs-url~/workflows/logic/latch/) and create [events](https://~exportplaceholderid-docs-url~/applications/events/) with the [Event: Create Node](https://~exportplaceholderid-docs-url~/workflows/data/event-create/).
- How to auto-resolve events after the Latch Node resets using the [Event: Update Node](https://~exportplaceholderid-docs-url~/workflows/data/event-update/).
- How to store attribute value thresholds on [attribute tags](https://~exportplaceholderid-docs-url~/devices/attributes/#including-optional-fields).

Given a device reporting a numerical state value, if the value is greater than or equal to a defined threshold, the workflow will create an event. The workflow will not create another event until the device reports state at or below a separate threshold, at which point the Latch Node "resets" and allows another event to be logged against the device.

The workflow can handle any number of events, as each latch state and logged event is scoped to each of your application's devices by their unique IDs.

## Dependencies

This template has no additional dependencies.

## Usage

After you have added the template to your application, visit your application's [workflows list](/applications/recent/workflows) and enable the "Latching and Events" workflow.

From this point, you can use the [Virtual Button Trigger](https://~exportplaceholderid-docs-url~/workflows/triggers/virtual-button/) included in the workflow to immediately test the functionality. To use the workflow in a production setting, you will need to perform additional configuration.

### Device Configuration

Out of the box, the template assumes a device with a `temperature` attribute of the ["number" data type](https://~exportplaceholderid-docs-url~/devices/attributes/#numbers). That attribute should have two attribute tag values:

- `maxThreshold`: This value should be a number, and whenever the reported `temperature` meets or exceeds this value, the workflow will create an event (assuming it is not in a "latched" state) logging the device ID and the recorded value.
- `resetThreshold`: This value should also be a number, less than or equal to the value of `maxThreshold`. When a reported `temperature` is at or below this number, the workflow will "unlatch" if applicable, allowing for additional events to be logged against the device.

If your application has devices with attributes and attribute tags representing the values described above, the respective names of these properties can be changed in the workflow configuration.

### Workflow Configuration

If you want to use the [Device: State Trigger Node](https://~exportplaceholderid-docs-url~/workflows/triggers/device/) you must perform additional configuration. You must define the device(s) whose state reports fire this workflow. Losant also recommends that you define specific attributes against which the trigger should fire, limiting the trigger to just one attribute.

Next, within your [workflow globals](https://~exportplaceholderid-docs-url~/workflows/overview/#workflow-globals), you may need to change three values:

- `attributeName`: Name of the attribute whose state reports cause the workflow to run. This should match the name of the attribute you set in the Device: State Trigger Node above.
- `maxThresholdAttributeTagName`: Name of the maximum threshold attribute tag on the attribute described above. Reported state values greater than or equal to the value of this attribute tag will create an event if the workflow is not in a "latched" state.
- `resetThresholdAttributeTagName`: Name of the reset threshold attribute tag on the attribute described above. Reported state values less than or equal to the value of this attribute tag will "unlatch" the workflow if applicable, allowing for additional events to be logged against the device. 

If you do not want the events logged by this workflow to auto-resolve when the Latch Node resets, delete or disconnect the nodes that are wrapped in the [annotation](https://~exportplaceholderid-docs-url~/workflows/annotations/note/) towards the bottom of the workflow.

## License

Copyright (c) 2020 Losant IoT, Inc. All rights reserved.

Licensed under the [MIT](https://github.com/Losant/losant-templates/blob/master/LICENSE.txt) license.

https://www.losant.com