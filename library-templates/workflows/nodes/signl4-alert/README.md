# SIGNL4 Alert
[SIGNL4](https://www.signl4.com/) provides mobile alerting via app, push, text, and voice with tracking and escalation. This node provides the ability to report a SIGNL4 event via the [SIGNL4 API](https://www.signl4.com/developers/api).

Once imported, this node is available in your application's collection of [Custom Nodes](https://docs.losant.com/workflows/custom-nodes/overview/).

## Input Configuration
* `SIGNL4 Team Secret`: Your SIGNL4 team secret.
* `Alert Message`: Alert message text that is sent out by SIGNL4.

## Output Result
The result of all successful requests include `body`, `headers`, and `statusCode` fields. The `body` object contains the response data.

```json
{
  "body": {
    "eventId": "2518583650940558238_7647c33f-f66d-495f-aeb2-b408fba66404"
  },
  "headers": { },
  "statusCode": 201
}
```

If the request is successfully made, but SIGNL4's API returns an error, check the `statusCode` and `body` fields for additional details.

```json
{
  "body": {
      "requestId": "e933ece1-d0ef-471e-9627-6a5ae9de606a",
      "code": 3004,
      "details": "An event source with ID 96sbq49u was not found.",
      "message": "Error raising event."
  },
  "headers": { },
  "statusCode": 404
}
```

If the request to SIGNL4's API fails, the output will contain an `error` object with additional details.

```json
{
  "error": {
    "message": "Cannot resolve host: connect.signl4.com",
  }
} 
```

This node is developed and maintained by [SIGNL4](https://www.signl4.com).

Copyright © 2022 Derdack GmbH

https://www.signl4.com

