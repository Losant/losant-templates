# User-Friendly Error Pages

This template includes implementations for returning user-friendly error screens for when experience users request nonexistent endpoints (404 page) or for when experience workflows encounter uncaught errors (500 page).

## Included Resources

The template includes the following resources:
- Two [experience pages](https://docs.losant.com/experiences/views/#pages) (one for 404 errors and one for 500 errors) that you can serve to your [experience users](https://docs.losant.com/experiences/users/) should they encounter such errors when navigating your application experience.
- Two [experience endpoints](https://docs.losant.com/experiences/endpoints/) for catching unconfigured GET and POST routes and issuing replies with your 404 Page.
- An [experience workflow](https://docs.losant.com/workflows/experience-workflows/) with a [Workflow Error Trigger](https://docs.losant.com/workflows/triggers/flow-error/#experience) for catching errors thrown in other experience workflows and replying with your 500 Page. 

## Usage

Once the template is installed, it will immediately begin handling 404 and 500 errors within your application without any additional configuration. However, we recommend making some changes to optimize the experience for your users.

### Editing the Pages

Each page includes some wrapper markup that, if you are making use of [experience layouts](https://docs.losant.com/experiences/views/#layouts) within your application, you will want to remove and instead set each page's "layout" property appropriately. The sections that can be removed are clearly marked within each page.

The markup for each page is a barebones implementation; you should adjust the content appropriately to reflect the design and the voice of your brand. There are numerous articles (such as [this one](https://blog.prototypr.io/a-ux-guide-for-designing-error-pages-fb9ced1f1c8a)) that speak to best practices when designing error pages for your users.

### Testing the 404 Page

Causing your 404 page to display is quite simple: Simply open your web browser and navigate to an unconfigured route within your application experience (such as https://MY_APPLICATION_ID.onlosant.com/foo/bar/bat).

The endpoints within this template are configured with "catch-all" routes for GET and POST requests–meaning, if no other route in the application matches the request first, this one will always match and return the 404 page.

### Testing the 500 Page

Testing your 500 page is a bit more difficult, though we have provided steps for causing the page to display within the provided workflow, It includes an HTTP Node that will throw an error when invoked, which will cause the Workflow Error trigger to fire and reply to the endpoint request with the 500 page.

1. Add an Endpoint Trigger to the workflow.
2. Choose one of your experience endpoints ...
   - Make sure that the endpoint does not have a Static Reply configured, as a response will be issued before the workflow runs.
   - While not required, a GET endpoint is easier to test in your browser as a POST endpoint requires a form submission with the correct `method` set.
   - If the endpoint is triggered by a separate workflow, you may encounter a race condition where sometimes the error case replies first, and sometimes the other workflow does.
3. Connect the Endpoint Trigger to the HTTP Node.
4. In a separate browser tab, make a request to the selected endpoint.
5. **IMPORTANT:** When you are finished, remember to remove the Endpoint Trigger you added in the first step.

## License

Copyright (c) 2022 Losant IoT, Inc. All rights reserved.

Licensed under the [MIT](https://github.com/Losant/losant-templates/blob/master/LICENSE.txt) license.

https://www.losant.com