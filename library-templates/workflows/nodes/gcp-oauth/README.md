# GCP: OAuth

This node generates [OAuth Tokens](https://developers.google.com/identity/protocols/OAuth2ServiceAccount) from [Google Cloud Service Accounts](https://cloud.google.com/iam/docs/creating-managing-service-accounts). These tokens can be used to make service-to-service requests against any number of [Google APIs](https://developers.google.com/apis-explorer/#p/) using the [HTTP Node](https://~exportplaceholderid-docs-url~/workflows/data/http/). This is primarily intended to make API requests to Google Cloud services, like [IoT Core](https://cloud.google.com/iot/docs/reference/rest/).

Tokens are automatically cached and re-fetched when they expire.

Once imported, this node is available in your application's collection of [Custom Nodes](https://~exportplaceholderid-docs-url~/workflows/custom-nodes/overview/).

## Input Configuration

* `Service Account Key`: Google Cloud [Service Account Key](https://cloud.google.com/iam/docs/creating-managing-service-account-keys), in JSON format.
* `Scope`: [OAuth Scope](https://developers.google.com/identity/protocols/googlescopes) to request. The Service Account must have the appropriate privileges to request a token for the specified scope.

## Output Result

If the result is successful, the result contains a single `token` field with the OAuth token.

```json
{
  "token": "your-oauth-token"
}
```

If the request fails, the output will contain an `error` object with additional details.

```json
{
  "error": {
    "error_description": "https://www.googleapis.com/auth/bad-scope is not a valid audience string.",
    "error": "invalid_scope"
  }
}
```

## License

Copyright (c) 2020 Losant IoT, Inc. All rights reserved.

Licensed under the [MIT](https://github.com/Losant/losant-templates/blob/master/LICENSE.txt) license.

https://www.losant.com
