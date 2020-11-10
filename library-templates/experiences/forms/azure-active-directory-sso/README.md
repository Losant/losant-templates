# Azure Active Directory SSO

This template demonstrates how to authenticate to an Experience using service provider initiated [Single Sign-On (SSO)](https://en.wikipedia.org/wiki/Single_sign-on) with [Azure Active Directory](https://azure.microsoft.com/en-us/services/active-directory/).

This template was designed to perform SSO based on a specfic email domain. For example, we can point a unique domain to a unique identity provider like so:

@example.com -> Active Directory

This configuration is done with Application Globals and supports the usage of multiple Identity Providers within a single multi-tenant Losant Experience.

## Usage

Once this template is imported and configured, you can test the example by:

1. Configuring the Application Globals (details below).

2. Navigating to `https://<your-app-id>.onlosant.com/tl-login-sso`.

![Example Form](./preview.png)

## How the Template Works

When complete, you will have imported the following logic:

1. An Experience User navigates to an Experience Endpoint: [`GET /tl-login-sso`](https://app.losant.com/applications/~losant-application-libraryExperiencesFormsAzureActiveDirectorySso-0~/experience/versions/develop/endpoints/5f997a064e295d0006f1c493/properties) and makes a request using the form.
2. The [`POST /tl-login-sso`](https://app.losant.com/applications/~losant-application-libraryExperiencesFormsAzureActiveDirectorySso-0~/workflows/~losant-flow-postTlLoginSso-0~/develop) Experience Endpoint triggers an Experience Workflow. This workflow generates an Active Directory SSO URL and redirects the user.
3. The Experience User can then authenticate to Active Directory. After a successful login, the user is redirected back to a Losant Experience Endpoint: [`POST /tl-saml`](https://app.losant.com/applications/~losant-application-libraryExperiencesFormsAzureActiveDirectorySso-0~/workflows/~losant-flow-postTlSaml-1~/develop).
4. The `POST /tl-saml` Experience Endpoint verifies the request and authorizes the user by [setting the authorization cookie](/experiences/endpoints/#passing-authorization-tokens).
5. Redirect the user to `/` if successful.

## Configuration

Before you can configure SSO, you first must prepare the proper configuration for the [SAML: Login Node](/workflows/experience/saml-login/) and [SAML: Verify Node](/workflows/experience/saml-verify/).

The two nodes share a common configuration. They both require:

- [Service Provider Metadata Template](/workflows/experience/saml-login/#service-provider-metadata-template)
- [Identity Provider Metadata Template](/workflows/experience/saml-login/#identity-provider-metadata-template)

### Service Provider Metadata Template

The Service Provider Metadata Template describes the service provider, which in this case is your Losant Experience. Here is an example configuration:

```xml
<EntityDescriptor
  xmlns:md="urn:oasis:names:tc:SAML:2.0:metadata"
  xmlns:saml="urn:oasis:names:tc:SAML:2.0:assertion"
  xmlns:ds="http://www.w3.org/2000/09/xmldsig#"
  entityID="ENTITYID"
>
  <SPSSODescriptor
    protocolSupportEnumeration="urn:oasis:names:tc:SAML:2.0:protocol"
  >
    <!-- insert ds:Signature element (omitted) -->
    <NameIDFormat
    >urn:oasis:names:tc:SAML:1.1:nameid-format:emailAddress</NameIDFormat>
    <AssertionConsumerService
      isDefault="true"
      index="0"
      Binding="urn:oasis:names:tc:SAML:2.0:bindings:HTTP-POST"
      Location="REDIRECT_URL"
    />
  </SPSSODescriptor>
</EntityDescriptor>
```

You can use this example directly or update it to support any application-specific requirements.

Following from the example, you must update the following values:

- `ENTITYID`: Globally unique name for an Identity Provider or a Service Provider. Depending on your environment, there may be a specific `entityId` required. However, in this example, you may set this value to your Experience URL.
- `REDIRECT_URL`: Set to the value of `[Your experience url]/tl-saml`. For example, if your Experience URL was `https://5f3ac1c2d1b1a400075cb42a.onlosant.com`, the value you would configure would be `https://5f3ac1c2d1b1a400075cb42a.onlosant.com/tl-saml`.

**Identity Provider Metadata Template**

Next, you need to acquire an Identity Provider Metadata Template from the identity provider, which in this case is Active Directory:

1. [Add an application to your Azure Active Directory](https://docs.microsoft.com/en-us/azure/active-directory/manage-apps/add-application-portal).
2. [Set up single sign-on (SSO) for an application in your Azure Active Directory](https://docs.microsoft.com/en-us/azure/active-directory/manage-apps/add-application-portal-setup-sso).
3. Download the “Federation Metadata XML.” You can find this within your Azure Active Directory single sign-on application settings:

![Federation Metadata XML](./federation-metadata.png)

4. Create or give a user [access to the application within Active Directory](https://docs.microsoft.com/en-us/microsoft-desktop-optimization-pack/appv-v4/how-to-grant-access-to-an-application).

### Setting Global Configuration

It’s best practice to use [application globals](/applications/overview/#application-globals) to store application-wide configuration that may be used across multiple workflows, like phone numbers or API keys. Application globals are a set of key/value pairs that are accessible inside of a workflow.

In this case, you can use them to store the SSO configuration to be used within the SAML Nodes within the [`POST /tl-login-sso`](https://app.losant.com/applications/~losant-application-libraryExperiencesFormsAzureActiveDirectorySso-0~/workflows/~losant-flow-postTlLoginSso-0~/develop) and [`POST /tl-saml`](https://app.losant.com/applications/~losant-application-libraryExperiencesFormsAzureActiveDirectorySso-0~/workflows/~losant-flow-postTlSaml-1~/develop) Experience Workflows.

![Application Globals](./application-globals.png)

To configure this template, we must configure at least two globals for one email domain.

Identity Provider Global Example:

```
identityProviderMetadataTemplate_example_com
```

Service Provider Global Example::

```
serviceProviderMetadataTemplate_example_com
```

Replace `example_com` with the email address domain you would like to configure SSO for. For example, if your domain was kanarra.com, you would use `kanarra_com`.

### Global Configuration Parsing

The globals with this template assume a specific format per email address (`example_com`). If your use case requires more complexity, feel free to change or extend this parsing for your needs.

Within this template, the email is parsed from the global using the following steps:

1. When an email `user@example.com`, [split](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/split) the email at the "@" character.
2. From the string of "example.com", replace the "." character to the "_" character. Globals do not support the "." character.
3. Then, using the resulting value leveraging templating:

```
serviceProviderMetadataTemplate_{{working.emailWithUnderscore}}
```

You may find an example of this parsing within a workflow in the [`/tl-login-sso`](https://app.losant.com/applications/5f99a59fc1a0290006995772/workflows/~losant-flow-postTlLoginSso-0~/develop) experience workflow.

You may also test the templating for this use case using the [Template Test Tool](https://docs.losant.com/template-tester/tool) within the Documentation. Here is an example context and template you can use to understand how the parsing works:

```
{
  "working": {
    "email": {
      "underscore": "example_com",
      "split": [
        "user",
        "example.com"
      ]
    }
  },
    "body": {
      "email": "user@example.com"
    }
}
```

```
serviceProviderMetadataTemplate_{{working.email.underscore}}
```

## Resources

- [SAML Tutorial](https://developers.onelogin.com/saml)
- [How SAML Authentication Works](https://auth0.com/blog/how-saml-authentication-works/)

## License

Copyright (c) 2020 Losant IoT, Inc. All rights reserved.

Licensed under the [MIT](https://github.com/Losant/losant-templates/blob/master/LICENSE.txt) license.

https://www.losant.com