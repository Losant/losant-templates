# Log In
This template provides a Log In form to authenticate your application's [Experience Users](https://~exportplaceholderid-docs-url~/experiences/users/). Upon successful authentication, the Log In workflow sets the `Authorization` cookie and redirects the user to your home page (`/`).

## Endpoint Routes
This template includes endpoints that may conflict with endpoints that already exist in your application. To successfully import this template, you must remove or rename any existing endpoints that have the following routes:

* `GET /login`
* `POST /login`
* `GET /logout`

## Authorization Cookie
Experience Users are [authenticated](https://~exportplaceholderid-docs-url~/workflows/experience/authenticate/) using their email address and password. When a user is successfully authenticated, an [Authorization Token](https://~exportplaceholderid-docs-url~/experiences/endpoints/#passing-authorization-tokens) is generated. This token can be used to make any number of subsequent, authorized requests to your Experience Endpoints.

There are multiple ways to provide this token with each request. For browser-based web applications, the most common is with an [HTTP cookie](https://en.wikipedia.org/wiki/HTTP_cookie). When an `Authorization` cookie is set by the [Endpoint Reply Node](https://~exportplaceholderid-docs-url~/workflows/outputs/endpoint-reply/), the token is sent to the user's browser. The browser will then automatically send that token back to Losant with each request. This allows Losant to automatically authorize every subsequent request made by a previously logged in user.

## The Log In Page
![Log In Page](https://~exportplaceholderid-files-domain~/~exportplaceholderid-application-libraryExperiencesFormsLogIn-0~/template/login-form.png)

Once this template is imported, the Log In page can be found in your experience and is named `tl-page-login`.

By default, the Log In page displays a logo from your application files at `tl-login-form/logo.png`. You can either replace the logo at this path or edit `tl-page-login` to display an image from any other URL.

To change where the user is redirect upon a successful authentication, edit the `Log In` workflow.

## Logging Out
This template contains a `GET /logout` endpoint and a `Log Out` workflow that are used to log a user out of their current session. Logging out is done by removing the `authorization` cookie and redirecting the user back to the Log In page.

To add log out functionality to your application, you'll need to add a link somewhere in your application to the `/logout` endpoint:

```
<a href="/logout">Log Out</a>
```

## Page Layouts
The pages that are included in this template contain markup that would typically be found in an [Experience Layout](https://~exportplaceholderid-docs-url~/experiences/views/#layouts). This was done so that these pages could be used immediately without additional configuration. For production applications, you may want to modify these pages to use them within an existing layout. `PAGE_START` and `PAGE_END` comments have been added to each page's code to indicate which section to keep when using a custom layout.

## License

Copyright (c) 2020 Losant IoT, Inc. All rights reserved.

Licensed under the [MIT](https://github.com/Losant/losant-templates/blob/master/LICENSE.txt) license.

https://www.losant.com