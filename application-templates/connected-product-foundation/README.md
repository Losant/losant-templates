# Connected Product Foundation

The [Connected Product Foundation](https://docs.losant.com/cpf/overview/) (CPF) is a prebuilt and production-ready template that significantly reduces the development time and complexity for your Losant applications. The CPF provides a wide variety of out-of-the-box functionality required by most IoT products and services. This includes:

* Multitenancy
* User Management
* Device Management
* Data Visualization
* Alerting
* Event Management
* White Labeling

## Setup

This template creates a ready-to-use application with example devices, recipes, customers, sites, and users. This template also includes a data simulation workflow and a workflow that generates events based on the simulated data. To begin using the CPF, the following setup steps are required:

1. Set a password for the CPF's system admin. Navigate to **User and Groups** using the left navigation. Click the `system-admin@example.com` user from the list. Click the **Change Password?** checkbox and provide a secure password.
1. Enable the **Simulator** and **Alerting** workflows. The simulation workflow replays device data from the `TurbineEngine.csv` file once every five minutes and records that data to the example Turbofan devices. (You may increase this frequency by adjusting the Timer Trigger in the workflow.)
1. Create a JWT Service Credential called `User Password Reset`. Provide an Issuer (usually your domain name) and enter a long, random, secure value in the Secret field. This secret is used to sign tokens as part of the forgot password and new user invitation processes.

The CPF can now be accessed using your application’s default [Experience Slug](https://docs.losant.com/experiences/domains/#experience-slugs) (e.g. `<YOUR_APPLICATION_ID>.onlosant.com`). Once you navigate to that URL with your browser, you’ll automatically be redirected to the CPF’s log in page (/login) where you can login using your system admin's email and password.

For more details, please review the [CPF User Guide](https://docs.losant.com/cpf/user-guide/).

## License

Copyright &copy; 2024 Losant IoT, Inc. All rights reserved.

Licensed under the [MIT](https://github.com/Losant/losant-templates/blob/master/LICENSE.txt) license.

https://www.losant.com