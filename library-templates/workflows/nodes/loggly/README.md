# Loggly

Logs payload data to Loggly using their [HTTP API](https://www.loggly.com/docs/http-endpoint/).

Once imported, this node is available in your application's collection of [Custom Nodes](https://docs.losant.com/workflows/custom-nodes/overview/).

## Input Configuration

* `Loggly Customer Token`: [Customer Tokens](http://loggly.com/docs/customer-token-authentication-token/) are used by Loggly to associate data you send with your account. The token is used as part of the API request.
* `Event Data`: Payload path of event data to send to Loggly.

## Output Result

The result of all successful requests include `body`, `headers`, and `statusCode` fields. The `body` object contains the response data.

```json
{"response" : "ok"}
```

If the request is successfully made, but Loggly's API returns an error, check the `statusCode` and `body` fields for additional details.

```json
{
  "body": "Invalid API key",
  "headers": { },
  "statusCode": 403
}
```

If the request to Loggly's API fails, the output contains an `error` object with additional details.

```json
{
  "error": {
    "message": "Cannot resolve host: logs-01.loggly.com",
  }
}
```

## License

Copyright (c) 2022 Losant IoT, Inc. All rights reserved.

Licensed under the [MIT](https://github.com/Losant/losant-templates/blob/master/LICENSE.txt) license.

https://www.losant.com