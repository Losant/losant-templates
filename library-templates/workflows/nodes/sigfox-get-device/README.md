# Sigfox Get Device

This node provide access to Sigfox's REST API to retrieve a device's information.

Once imported, this node is available in your application's collection of [Custom Nodes](https://docs.losant.com/workflows/custom-nodes/overview/).

## Input Configuration

* `Sigfox Username`: Your Sigfox API username.
* `Sigfox Password`: Your Sigfox API password.
* `Sigfox Device ID`: Sigfox device ID to retrieve information about.

## Output Result

The result of all successful requests include `body`, `headers`, and `statusCode` fields. The `body` object contains the response data. The following is an example of the request body:

 ```json
{
  "body": {
    "automaticRenewal":true,
    "preventRenewal":false,
    "tokenEnd":0000,
    "contractId":"xxxx",
    "tokenType":"CONTRACT",
    "lng":0,
    "lat":0,
    "activationTime":1527116970285,
    "state":0,
    "averageRssi":-50.531433,
    "averageSnr":29.01479,
    "averageSignal":29.01479,
    "last":1533577884,
    "type":"xxxx",
    "name":"Device Name",
    "id":"Device ID"
  }
}
```

If the request is successfully made, but Sigfox's API returns an error, check the `statusCode` and `body` fields for additional details.

```json
{
  "body": {
    "message":"You are not allowed to access the resource."
  },
  "headers": {...},
  "statusCode": 403
}
```

If the request to Sigfox's API fails, the output will contain an `error` object with additional details.

 ```json
{
  "error": {
    "message": "Cannot resolve host: api.sigfox.com",
  }
}
```

## License

Copyright (c) 2020 Losant IoT, Inc. All rights reserved.

Licensed under the [MIT](https://github.com/Losant/losant-templates/blob/master/LICENSE.txt) license.

https://www.losant.com