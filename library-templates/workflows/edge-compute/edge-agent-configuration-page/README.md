# Edge Agent Configuration Page

This template allows an [Edge Agent's configuration](https://~exportplaceholderid-docs-url~/edge-compute/edge-agent-usage/#running-with-a-configuration-file) to be set through a web page served by the [agent's web server](https://~exportplaceholderid-docs-url~/edge-compute/edge-agent-usage/#webserver-http-request-trigger--http-response-node). The included [Edge Workflow](https://~exportplaceholderid-docs-url~/workflows/edge-workflows/) can be deployed to a device from the cloud, or it can be exported and stored on the device for use as an [on-disk workflow](https://~exportplaceholderid-docs-url~/workflows/edge-workflows/#on-disk-workflows).

## Dependencies

This template assumes you have an [Edge Compute device](https://~exportplaceholderid-docs-url~/devices/edge-compute/) running the **Losant Edge Agent version 1.24.0 or later**, with or without current configuration. The Edge Agent must also have its **web server enabled**, which it is by default.

If you are new to Edge Compute, we recommend starting with the [Edge Compute Walkthrough](https://~exportplaceholderid-docs-url~/edge-compute/walkthrough/) before working with this template.

## How to Use

This template imports a single Edge Workflow into your application. That workflow triggers on GET and POST requests to the path "/agent-configuration", displaying a form that allows users to view the current agent configuration and to make changes if desired.

![Configuration Screen](https://~exportplaceholderid-files-domain~/~exportplaceholderid-application-libraryWorkflowsEdgeComputeEdgeAgentConfigurationPage-0~/template/form-preview.png)

Whenever changes are made, the agent restarts with the new settings once all currently running workflows have completed.

### Setting Admin Credentials

To prevent unauthorized users from accessing the agent configuration page and changing settings, the workflow implements [Basic HTTP authentication](https://developer.mozilla.org/en-US/docs/Web/HTTP/Authentication#basic_authentication_scheme). The default username and password are "admin" and "admin123", both of which are set as global values within the workflow. We recommend changing these to something more obscure.

![Authorization Popup](https://~exportplaceholderid-files-domain~/~exportplaceholderid-application-libraryWorkflowsEdgeComputeEdgeAgentConfigurationPage-0~/template/authorization.png)

**Basic HTTP authentication should only be considered secure** if the request is served over HTTPS, which requires installing an SSL certificate on your edge device's web server. When served over HTTP, it is possible that other users on your network could see the credentials in transit.

### Running On-Disk

You may wish to export this workflow and include it as an [on-disk workflow](https://~exportplaceholderid-docs-url~/workflows/edge-workflows/#on-disk-workflows), so that it is always available on your device, even before it has connected to the cloud. To do so, simply visit the workflow, click the "More" button in the top right corner of the editor, and choose the "Export" option. In the modal that appears, select the "Export to Edge Agent file" option, which will download a file to your computer.

This file must then be placed on the host machine, and [mounted into a directory](https://docs.docker.com/storage/bind-mounts/) defined as the on-disk workflow location within your Docker container ("/data/workflows" by default).

### Removing Inputs

The template includes all values that can be set through the agent's configuration file as of Edge Agent v1.24.0. You may wish to remove some of these properties if you do not want to allow them to be changed through the web interface (i.e. the broker host domain).

To do so, view the workflow's "configSchemas" global, which is an array of JSON schemas used both to render the form and to validate requests. Any field you do not wish to expose through the interface can be removed by removing the object for that field.

For example, to disallow users from changing the broker host, you would remove the following lines from the global value:

```
"gateway.host": {
    "title": "Host",
    "type": "string",
    "pattern": "^[a-zA-Z0-9-\\.]+$",
    "default": "~exportplaceholderid-broker-url~"
},
```

## Considerations

The use of this template comes with some caveats that should be considered.

### Environment Variables Take Precedence

The template works by overwriting the agent's "config.toml" file whenever changes are made. Any configuration option displayed within the form is the currently applied value, whether that is set by an environment variable, through the TOML file, as a CLI flag, or the option's default value.

When a change is made, the updates are written to the config.toml file stored on the device and the agent restarts. However, if an environment variable has been set for a given configuration property, that environment variable always overrides what is written to the TOML file; thus, it is impossible to override an environment variable's value through this template.

### Breaking Changes

It is absolutely possible to enter values into this form that would render your Edge Compute device unusable (for example, by changing the device ID and disabling the web server so this form could not be viewed again). If you manage to do this, you must manually overwrite the TOML file stored on disk and reboot the agent, or override the offending values through the use of environment variables.

### Conflicting Workflows

If you have other Edge Workflows utilizing the HTTP Request Trigger deployed to your device, you must ensure that those workflows do not conflict with this one by also matching GET and POST requests to the "/agent-configuration" path. In most cases, this occurs when those workflows make use of an [HTTP Request Trigger](https://~exportplaceholderid-docs-url~/workflows/triggers/request/) that runs for all web requests, and all possible workflow paths off the trigger end with an [HTTP Response Node](https://~exportplaceholderid-docs-url~/workflows/outputs/http-response/).

This creates a race condition, as this workflow and the other matching workflow(s) will all fire when attempting to view or set configuration through this template. Whichever workflow reaches its HTTP Response Node first will issue the reply.

## License

Copyright (c) 2021 Losant IoT, Inc. All rights reserved.

Licensed under the MIT license.

https://www.losant.com