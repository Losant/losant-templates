# Device State Stream Experience Component

This template establishes a live stream and displays the value(s) for a given device and attribute in real time. The template includes a [component](https://docs.losant.com/experiences/views/#components) for establishing and displaying the results of the stream, as well as the [endpoint and workflow](https://docs.losant.com/experiences/streaming-endpoints/) needed to process the stream.

## Dependencies

This component has no additional Losant dependencies. However, the default template is written to work with the [Twitter Bootstrap](https://getbootstrap.com/) framework. While not required, it is recommended you install the Bootstrap 4 Layouts component in conjunction with this template.

## Usage

To utilize this component, create an instance of it within any of your experience views as shown below:

```
{{component
  'tl-device-state-stream'
  deviceId=request.params.deviceId
  attribute="myAttributeName"
}}
```

### Arguments

Arguments are passed in as key-value pairs. This component accepts the following arguments:

| Property         | Description                                                                                                                                                                                                                                                                                         | Default                  |
|------------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|--------------------------|
| id               | ([HTML5 ID](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/id)) The ID of the element into which the scanner will be rendered. **Note:** If you are using multiple instances of this component on one page, this property is required and must be unique per instance. | "tl-device-state-stream" |
| deviceId         | (**Required** Device ID) The ID of the device for which the stream should be opened. In most cases, you'll pass this argument in from a URL parameter, such as `request.params.deviceId`.                                                                                                           |                          |
| attribute        | (**Required** [Attribute Name](https://docs.losant.com/devices/attributes/#creating-device-attributes)) The name of the attribute whose value should be displayed in the stream.                                                                                                                    |                          |
| maxItems         | (Number) The number of items to display in the state stream. As new messages come in, the oldest messages will be removed from the list to respect this limit.                                                                                                                                      | 1                        |
| newItemsPosition | ("top" or "bottom") Where to place new state reports in the list as they come in. If `maxItems` is not set (or if it is set to 1), this prop has no effect.                                                                                                                                         | "top"                    |

## Examples

In each of the following examples, it is assumed that the `deviceId` and `attribute` being referenced are both valid, and the attribute is present on the selected device.

### Pulling Device ID from URL

Given a URL of the format `/devices/{deviceId}`, you can display the chosen device's value for its `temp` attribute as shown below:

```
{{component
  'tl-device-state-stream'
  id="example-from-request-params"
  deviceId=request.params.deviceId
  attribute="temp"
}}
```

### Displaying Multiple Values

To display a stream of the most recent 10 state reports, with the newest reports appending to the bottom of the component, you can pass an argument for `maxItems` as shown below:

```
{{component
  'tl-device-state-stream'
  id="example-longer-list"
  deviceId=request.params.deviceId
  attribute="temp"
  maxItems=10
  newItemsPostion="bottom"
}}
```

## Changing the Display Style

Within the component, you will find a `<template>` HTML tag, the inner content of which represents the display style for the stream's connection status as well as new entries. You may edit this markup to change the display style of entries within the state stream.

Any content you place within this `<template>` tag should include one element with the class `tl-device-state-stream-value` applied to it. It is within this element that the stream status and values are applied as messages.

## License

Copyright (c) 2020 Losant IoT, Inc. All rights reserved.

Licensed under the [MIT](https://github.com/Losant/losant-templates/blob/master/LICENSE.txt) license.

https://www.losant.com