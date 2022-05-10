# Request Experience Dashboard Report

This template demonstrates how to allow [Experience Users](https://docs.losant.com/experiences/users/) to [request a PDF snapshot](https://docs.losant.com/dashboards/overview/#non-recurring-report) of a personalized [dashboard](https://docs.losant.com/dashboards/overview/) to be delivered to their inbox. The email and the PDF contain no Losant branding, and the email body is customizable to match your business requirements.

## Dependencies

This template requires no additional dependencies; however, the markup within the included page is built around the [Twitter Bootstrap](https://getbootstrap.com/) framework. Therefore, Losant recommends installing the Bootstrap 4 Layouts template along with this one.

## Included Resources

The Request Experience Dashboard template adds the following resources to your application:

- An example [dashboard](https://docs.losant.com/dashboards/overview/) that simply displays a list of devices and the current dashboard settings ([time](https://docs.losant.com/dashboards/overview/#viewing-past-dashboard-states), [theme](https://docs.losant.com/dashboards/overview/#display-settings), and [context variable](https://docs.losant.com/dashboards/context-variables/) values). The dashboard utilizes an [Experience User context variable](https://docs.losant.com/dashboards/context-variables/#experience-users) and a [device ID context variable](https://docs.losant.com/dashboards/context-variables/#device-ids).
- One [device](https://docs.losant.com/devices/overview/) that serves as the default context variable value for the dashboard.
- An [Experience Page](https://docs.losant.com/experiences/views/#custom-pages) that displays the dashboard, a button for requesting a dashboard report, and any feedback from the report request. The dashboard's context variables are set through the Experience User making the request and the device ID in the endpoint path. Optionally, the theme and time can be set through query parameters (`theme` and `t` respectively).
- Three [Experience Endpoints](https://docs.losant.com/experiences/endpoints/) for viewing the dashboard, processing the request for a PDF, and handling the callback request when the report generation is complete.
- One [Experience Workflow](https://docs.losant.com/workflows/experience-workflows/) for handling the endpoint requests, including the generation and delivery of the requested PDF.

## Usage

The template assumes that the request for a PDF is being made by an authenticated Experience User, and it utilizes that user's email address as the destination for the PDF report.

While the template works as a proof of concept out of the box, there are a number of recommended changes before using in a production setting.

### Workflow Globals Updates

First, there are two [workflow global variables](https://docs.losant.com/workflows/overview/#workflow-globals) that must be changed: 

- `JWT_SECRET`: This must be changed to a long, random, secret string that will be used to sign and verify the JWT that's included in the PDF export request. The template's workflow includes a [Virtual Button](https://docs.losant.com/workflows/triggers/virtual-button/) and a [Generate ID Node](https://docs.losant.com/workflows/logic/generate-id/) that can create this for you; simply copy the output of the operation from the [debug log](https://docs.losant.com/workflows/debugging-workflows/#viewing-debug-output) and use that as the value of the global.
- `dashboardId`: By default, this is set to the ID of the dashboard included with this template. This should be changed to the ID of the dashboard you would like to display and export as a PDF.

### Dashboard Configuration Updates

For the dashboard ID, the workflow can be modified to pull this value dynamically from the request path if it is included there, in which case you must edit the [Losant API Node](https://docs.losant.com/workflows/data/losant-api/) (and the included [Experience Page](https://docs.losant.com/experiences/views/#pages)) to pull the "dashboardId" value from the correct spot on the payload.

Depending on the chosen dashboard, you may also need to adjust the context variables that are passed through the Experience Page and the request for the PDF (in the workflow's [Mutate Node](https://docs.losant.com/workflows/logic/mutate/)) and in the page's Handlebars helper that renders the dashboard.

Next, if you are allowing users to set the dashboard time and theme, you must pass those values through the request to export the dashboard if you are setting those values through some means other than the query string as described above in both the Losant API Node and the Experience Page. If the values are not set, the dashboard will export with data from the current time and in the light theme.

### SendGrid Node

This template includes an [Email Node](https://docs.losant.com/workflows/outputs/email/) for sending the actual PDF. In production settings, we strongly recommend using the [SendGrid Node](https://docs.losant.com/workflows/outputs/sendgrid/) tied to your own [SendGrid](https://sendgrid.com/) account instead. A pre-configured version of the SendGrid Node is included in this template and, once your API key is in place, it can easily be swapped with the Email Node.

### Experience Page Updates

This template's Experience Page does not reference a [layout](https://docs.losant.com/experiences/views/#layouts). If your application already has a layout applied, you will need to:

1. Set that layout on the Experience Page.
2. Delete the `<doctype>`, `<head>`, and closing `</body>` and `</html>` tags from the page. The relevant sections of the page are clearly marked in its content, and everything outside of those sections can be deleted.

## License

Copyright (c) 2022 Losant IoT, Inc. All rights reserved.

Licensed under the [MIT](https://github.com/Losant/losant-templates/blob/master/LICENSE.txt) license.

https://www.losant.com