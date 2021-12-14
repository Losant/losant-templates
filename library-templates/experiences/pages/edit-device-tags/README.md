# Edit Device Tags Experience Page

This template demonstrates how to allow Experience Users to edit the values of device tags. Included is the ability to:
- Only allow editing of certain tags.
- Only expose the values of certain tags to the user, whether editable or read-only.
- Provide custom labels on a per-tag basis.

## Dependencies

This template requires no additional dependencies, however, the markup within the included page is built around the [Twitter Bootstrap](https://getbootstrap.com/) framework. Therefore, Losant recommend installing the Bootstrap 4 Layouts template along with this one.

**Note:** This template assumes that your application has only one value per device tag key on any given device.

## Usage

Installing this template adds the following to your application:

- The [endpoints](https://~exportplaceholderid-docs-url~/experiences/endpoints/) necessary to display a device's tags and allow for editing of those tags.
- The [workflow](https://~exportplaceholderid-docs-url~/workflows/overview/) for sanitizing tags for user consumption.
- The [page](https://~exportplaceholderid-docs-url~/experiences/views/) for displaying the tags and providing an interface for editing their values.

### Configuring the Endpoints

By default, the endpoints for displaying and setting tag values reside at the route `/devices/{deviceId}/edit`, where `{deviceId}` is a placeholder for a path parameter mapped to a device ID. You may change these endpoints if you wish.

The endpoints are also, by default, only accessible by authenticated [Experience Users](https://~exportplaceholderid-docs-url~/experiences/users/), redirecting any unauthenticated users to `/login`. This too can be changed within the configuration for each endpoint.

### Configuring the Workflow

There are three global values to set within the workflow:

- **editableTagKeys**: Array of tag keys that the user is permitted to set new values for. The workflow rejects any proposed edits to tags whose key does not appear in this array.
- **readOnlyTagKeys**: Array that defines the values of any tags that the user is allowed to see the value of, but may not update with a new value.
- **tagLabelMap**: The keys of this object should correspond to the keys of device tags, and the value of each key should be a string used for the input label within the page. Any device tag key not provided here falls back to the device tag key itself for the label.

If you manage device access on a [per-user or per-group basis](https://~exportplaceholderid-docs-url~/experiences/groups/#devices), there is an additional [Device: Get Node](https://~exportplaceholderid-docs-url~/workflows/data/get-device/) included in the workflow that you may use to validate that the user has access to the device he/she is attempting to retrieve.

### Configuring the Page

By default, the page does the following:

- Displays a "Device was not found" alert if an invalid device ID is provided.
- Renders each provided tag as an input within a form, with read-only tag inputs disabled.
- Displays a validation alert if the user attempts to update tag values they do not have access to.

The entire device object is exposed under the [`pageData` property](https://~exportplaceholderid-docs-url~/experiences/views/#custom-pages) so you may display additional information about the device if desired.

## License

Copyright (c) 2020 Losant IoT, Inc. All rights reserved.

Licensed under the [MIT](https://github.com/Losant/losant-templates/blob/master/LICENSE.txt) license.

https://www.losant.com