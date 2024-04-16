# Request Experience Dashboard Report

This template demonstrates how to allow [Experience Users](https://docs.losant.com/experiences/users/) to [request a PDF snapshot](https://docs.losant.com/dashboards/overview/#non-recurring-report) of a personalized [dashboard](https://docs.losant.com/dashboards/overview/) to be delivered to their inbox. The email and the PDF contain no Losant branding, and the email body is customizable to match your business requirements.

## Dependencies

This template requires no additional dependencies; however, the markup within the included page is built around the [Twitter Bootstrap](https://getbootstrap.com/) framework. Therefore, Losant recommends installing the Bootstrap 4 Layouts template along with this one.

## Included Resources

The Request Experience Dashboard template adds the following resources to your application:

- Three [Experience Endpoints](https://docs.losant.com/experiences/endpoints/) for viewing a dashboard, processing the request for a PDF, and handling the callback request when the report generation is complete. The first two require a dashboard ID to be passed in the request as a path parameter.
- An [Experience Page](https://docs.losant.com/experiences/views/#custom-pages) that displays the dashboard, a button for requesting a dashboard report, and any feedback from the report request. Optionally, the theme and time can be set through query parameters (`theme` and `t` respectively).
- One [Experience Workflow](https://docs.losant.com/workflows/experience-workflows/) for handling the endpoint requests, including the generation and delivery of the requested PDF, as well as simple responses for `404` errors (dashboard not found) and `500` errors (uncaught exceptions).

## Usage

The template assumes that the request for a PDF is being made by an authenticated Experience User, and it utilizes that user's email address as the destination for the PDF report.

### Create JWT Service Credential

Before using this template, you **must create a [JWT Service Credential](https://docs.losant.com/applications/credentials/#json-web-tokens-jwt) named "Sign Dashboard Export"**. This credential is used to sign and then verify the token that is passed through the dashboard export request callback URL.

### Workflow Updates

There are a few points that may need attention in the provided workflow.

#### Building Dashboard Context

The "Build Context" [Mutate Node](https://docs.losant.com/workflows/logic/mutate/) creates an object that is passed as [context](https://docs.losant.com/dashboards/context-variables/) to the requested dashboard. By default, this sets one context variable - an Experience User type variable named `experienceUser` with a default value of the ID of the user making the request.

Depending on the dashboard being viewed, this node will need to be adjusted to build the proper context object from the data provided in the request - i.e. from the requesting user object, path and query parameters, or global values.

You may also disconnect the node and reconnect its input and output nodes to bypass the setting of context.

#### Dashboard Existence Check

The "Find Dashboard" [Losant API Node](https://docs.losant.com/workflows/data/losant-api/) checks if the provided dashboard ID exists in the application. It **does not** determine whether the user making the request **should have access** to the dashboard. Additional nodes may be needed to validate the request for a given dashboard.

#### Error Pages

This workflow includes error handling for dashboards that are not found (404 errors) and for uncaught exceptions (500 errors), returning basic pages to the user. If your experience has its own custom 404 and 500 error pages, you will want to swap out the default responses to use those pages instead.

#### SendGrid Node

This template includes an [Email Node](https://docs.losant.com/workflows/outputs/email/) for sending the actual PDF. In production settings, we strongly recommend using the [SendGrid Node](https://docs.losant.com/workflows/outputs/sendgrid/) tied to your own [SendGrid](https://sendgrid.com/) account instead. A pre-configured version of the SendGrid Node is included in this template and, once your API key is in place, it can easily be swapped with the Email Node.

We recommend storing your API key in a [SendGrid Service Credential](https://docs.losant.com/applications/credentials/#sendgrid) if using this node.

### Experience Page Updates

This template's Experience Page does not reference a [layout](https://docs.losant.com/experiences/views/#layouts). If your application already has a layout applied, you will need to:

1. Set that layout on the Experience Page.
2. Delete the `<doctype>`, `<head>`, and closing `</body>` and `</html>` tags from the page. The relevant sections of the page are clearly marked in its content, and everything outside of those sections can be deleted.

Also, as noted above, you may need to edit the page to pass in the proper context variables that your dashboard is expecting – referencing them from path or query parameters or from other values on the render context.

## License

Copyright (c) 2024 Losant IoT, Inc. All rights reserved.

Licensed under the [MIT](https://github.com/Losant/losant-templates/blob/master/LICENSE.txt) license.

https://www.losant.com