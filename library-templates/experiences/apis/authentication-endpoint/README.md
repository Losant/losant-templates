# Experience Authentication Endpoint

This template includes an [Experience Endpoint](https://docs.losant.com/experiences/endpoints/) (`/api/auth`) to authenticate and return an [authentication token](https://docs.losant.com/experiences/endpoints/#passing-authorization-tokens) for [Experiences Users](https://docs.losant.com/experiences/users/) via a RESTful API.

## Usage 

After importing the template, using a tool like [Postman](https://www.postman.com/), make a POST request to:

```
https://<APPLICATION_ID>.onlosant.com/api/auth 
```

You may find your base URL on the [Experience > Edit](https://app.losant.com/applications/recent/experience/versions/develop) page. 

In the body of the request, include an Experience User's email and password:

```
{
    "email": "user@example.com",
    "password": "password"
}
```

If successful, you will get a response:

```
{
    "success": true,
    "token": "<AUTH_TOKEN>"
}
```

This token can now be used to make subsequent requests to any other authenticated Experience Endpoints within your application. You can easily create more with the [Experience Wizard](https://app.losant.com/applications/recent/experience/versions/develop).

If you open the Experience Workflow named  "POST /api/auth", you can view, update, change, or extend this implementation. 

## Using the Token

Once you obtain an authentication token for an Experience User, the token can be appended to any subsequent HTTP request that requires authentication in the following ways:

- A query parameter added to the URL (e.g. https://<APPLICATION_ID>.onlosant.com/my-user?authorization=<token>).
- An Authorization HTTP header with the value `Bearer <token>`.
- A Cookie HTTP header in the format of `authorization=<token>`.

When a valid user session is found within an Experience Workflow, you may access the currently authenticated experience user at the payload path `experience.user`. The following expression allows you to easily check for an authenticated user within a workflow:

```
{{experience.user}} !== null
```

## Resources

- [Building an Experience API](https://docs.losant.com/guides/building-an-experience-api/overview/)
- [Generate Token Node](https://docs.losant.com/workflows/experience/generate-token/)
- [Experience Authenticate Node](https://docs.losant.com/workflows/experience/authenticate/)


## License

Copyright (c) 2020 Losant IoT, Inc. All rights reserved.

Licensed under the MIT license.

https://www.losant.com