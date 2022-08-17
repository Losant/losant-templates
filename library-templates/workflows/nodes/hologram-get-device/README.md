# Hologram

This node provide access to [Hologram's API](https://hologram.io/docs/reference/cloud/http/#/reference/device-management/devices/get-a-device) to retrieve device information.

Once imported, this node is available in your application's collection of [Custom Nodes](https://docs.losant.com/workflows/custom-nodes/overview/).

## Input Configuration

* `Hologram API Key`: Your Hologram API Key. You can obtain an API key through your Hologram account settings.
* `Device ID`: Hologram device ID to retrieve information about.

## Output Result

The result of all successful requests include `body`, `headers`, and `statusCode` fields. The `body` object contains the response data.

```json
{
  "body": {
    "data": {
      "links": {
        "cellular": [
          {
            "last_connect_time": "",
            "last_network_used": "",
            "plan": {
              "account_tier": "BASE",
              "overage": "0.4000",
              "sms": "0.1900",
              "cost": "0.0000",
              "data": 1000000,
              "name": "Pilot Plan - 1MB",
              "zone": "global",
              "id": 170
            },
            "apn": "hologram (no user, no pw)",
            "cur_billing_data_used": 0,
            "overagelimit": 0,
            "whenexpires": "2018-09-03 20:41:45",
            "whenclaimed": "2018-08-04 20:41:45",
            "state": "LIVE",
            "carrierid": 2,
            "imsi": 0000,
            "sim": "0000",
            "id": 0000
          }
        ]
      },
      "tags": [],
      "hidden": 0,
      "tunnelable": 0,
      "phonenumber_cost": "0.0000",
      "phonenumber": "",
      "whencreated": "2018-08-04 20:41:45",
      "type": "Unknown",
      "name": "Pilot (69063)",
      "orgid": 0000,
      "id": 0000
    },
    "success": true
  },
  "headers": { },
  "statusCode": 200
}
```

If the request is successfully made, but Hologram's API returns an error, check the `statusCode` and `body` fields for additional details.

```json
{
  "body": {
    "error": "API method does not exist",
    "success": false
  },
  "headers": { },
  "statusCode": 404
}
```

If the request to Hologram's API fails, the output contains an `error` object with additional details.

```json
{
  "error": {
    "message": "Cannot resolve host: dashboard.hologram.io",
  }
}
```

## License

Copyright (c) 2020 Losant IoT, Inc. All rights reserved.

Licensed under the [MIT](https://github.com/Losant/losant-templates/blob/master/LICENSE.txt) license.

https://www.losant.com