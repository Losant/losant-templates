# Connected Product Foundation

The [Connected Product Foundation](https://docs.losant.com/cpf/overview/) (CPF) is a prebuilt and production-ready template that significantly reduces the development time and complexity for your Losant applications. The CPF provides a wide variety of out-of-the-box functionality required by most IoT products and services. This includes:

* Multitenancy
* User Management
* Device Management
* Data Visualization
* Event Management
* White Labeling

## Setup

This template creates a ready-to-use experience with example customers, sites, and users. This library template contains a subset of resources from the CPF application template. **Do not import this template** if you started your application from the CPF application template since it will create many duplicate experience resources. For the best results, this template should be used to bootstrap new experiences within existing applications.

Once imported, there are a few initial steps that must be completed:

1. Set a password for the CPF's system admin. Navigate to **User and Groups** using the left navigation. Click the `system-admin@example.com` user from the list. Click the **Change Password?** checkbox and provide a secure password.
1. Create a JWT Service Credential called `User Password Reset`. Provide an Issuer (usually your domain name) and enter a long, random, secure value in the Secret field. This secret is used to sign tokens as part of the forgot password process.

The CPF can now be accessed using your application’s default [Experience Slug](https://docs.losant.com/experiences/domains/#experience-slugs) (e.g. `<YOUR_APPLICATION_ID>.onlosant.com`). Once you navigate to that URL with your browser, you’ll automatically be redirected to the CPF’s log in page (/login) where you can login using your system admin's email and password.

For more details, please review the [CPF User Guide](https://docs.losant.com/cpf/user-guide/).

## License

Copyright &copy; 2024 Losant IoT, Inc. All rights reserved.

Licensed under the [MIT](https://github.com/Losant/losant-templates/blob/master/LICENSE.txt) license.

https://www.losant.com