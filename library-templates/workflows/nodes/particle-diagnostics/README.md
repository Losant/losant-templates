# Particle Diagnostics

This node provides access to [Particle's Remote Diagnostics API](https://docs.particle.io/reference/api/#remote-diagnostics) to retrieve device information.

Once imported, this node is available in your application's collection of [Custom Nodes](https://docs.losant.com/workflows/custom-nodes/overview/).

## Input Configuration

* `Particle Access Key`: Your Particle API Access Key. You can obtain an API key through your Particle account settings.
* `Particle Device ID`: Particle device ID to retrieve information about.
* `Method`: API routeto call on the device.

## Output Result

The result of all successful requests include `body`, `headers`, and `statusCode` fields. The `body` object contains the response data. The following is an example of the request body when calling the method `Update`:

```json
{
  "body": {
    "ok": true
  }
}
```

If the request is successfully made, but Particle's API returns an error, check the `statusCode` and `body` fields for additional details.

```json
{
  "body": {
    "error_description":"The access token provided is invalid.",
    "error":"invalid_token"
  },
  "headers": { },
  "statusCode": 401
}
```

If the request to Particle's API fails, the output contains an `error` object with additional details.

```json
{
  "error": {
    "message": "Cannot resolve host: api.particle.io",
  }
}
```

## License

Copyright (c) 2022 Losant IoT, Inc. All rights reserved.

Licensed under the [MIT](https://github.com/Losant/losant-templates/blob/master/LICENSE.txt) license.

https://www.losant.com
