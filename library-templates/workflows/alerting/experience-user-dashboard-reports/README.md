# Experience User Dashboard Reports

This template demonstrates how to use [Resource Jobs](https://docs.losant.com/applications/resource-jobs/) to generate and send personalized [dashboard reports](https://docs.losant.com/dashboards/overview/#non-recurring-report) to each of your [Experience Users](https://docs.losant.com/experiences/users/).

## Resources

The template includes the following resources:

- A [Resource Job](https://docs.losant.com/applications/resource-jobs/) that targets all of your application's [Experience Users](https://docs.losant.com/experiences/users/).
- An [Application Workflow](https://docs.losant.com/workflows/application-workflows/) that kicks off the job, manages its iterations, requests the dashboard report, sends the report to each user, and saves the final report to your [Application Files](https://docs.losant.com/applications/files/).
- A [Webhook](https://docs.losant.com/applications/webhooks/) for receiving the callback request when the dashboard report generation completes per user.
- An example [Dashboard](https://docs.losant.com/dashboards/overview/) that uses an [Experience User context variable](https://docs.losant.com/dashboards/context-variables/#experience-users) to display the user details of the iterated user.

## Setup

Utilizing this template requires making a couple additional changes after import; applying it to your use case likely takes some additional updates ...

### Required Changes

1. For security, the user's email address is encoded in a [JSON Web Token (JWT)](https://jwt.io) to prevent malicious actors from using the public callback URL to send emails to your users. This means **you must create a JWT service credential named "Dashboard Report Secret"**, whose secret value is a long, random string of your choosing.
2. By default, the Application Workflow will be disabled after importing this template. You must enable it before you can use the Resource Job.

### Recommended Changes

1. Choose which of your dashboards you would like to send to your users and change the `dashboardId` value in the Resource Job's default context to match that ID.
2. If you want to send the report to only a subset of your users, you can update the query on the Resource Job to target users individually, by group assocation, or by tag values.
3. In the workflow's [Losant API Node](https://docs.losant.com/workflows/data/losant-api/) labeled "Send Report", you may need to adjust the `ctx` object to provide variables specific to your chosen dashboard, and values specific to each iteration. In the example, we are providing the iterated user's ID as the value of an `exerienceUser` variable.
4. There are [additional settings](https://docs.losant.com/rest-api/schemas#dashboard-send-report) you can provide in the "Send Report" node to further personalize the report. For example, you can provide a `timezone` and `locale` specific to each user if those values are defined as [user tags](https://docs.losant.com/experiences/users/#user-tags).
5. To make the report delivery occur automatically on a regular basis, add a [Timer Trigger](https://docs.losant.com/workflows/triggers/timer/) to the workflow alongside the Virtual Button. The Timer Trigger can deliver reports daily, weekly, monthly, or on an [advanced schedule](https://docs.losant.com/workflows/triggers/timer/#advanced).
6. Included in the workflow is a [SendGrid Node](https://docs.losant.com/workflows/outputs/sendgrid/) with many of the same settings as the [Email Node](https://docs.losant.com/workflows/outputs/email/). For production applications, we **strongly recommend** using your own SendGrid account to send emails, as the SendGrid Node provides more flexibility and greatly reduces the chances of your message being flagged as spam.

## Dependencies

This template requires no additional dependencies; however, your application should have a dashboard that utilizes [context variables](https://docs.losant.com/dashboards/context-variables/) to personalize the content per user, which you will use in place of the included dashboard.

## License

Copyright (c) 2024 Losant IoT, Inc. All rights reserved.

Licensed under the MIT license.

https://www.losant.com