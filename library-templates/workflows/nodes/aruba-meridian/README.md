# Aruba Meridian Asset Tracking API Node

This node provides access to Meridian's Asset Tracking tag details using the [Meridian Asset Tracking API](https://docs.meridianapps.com/hc/en-us/articles/360040165333-Asset-Tracking-REST-API).

Once imported, this node will be available in your application's collection of [Custom Nodes](https://docs.losant.com/workflows/custom-nodes/overview/).

## Input Configuration

* `Authentication Token`: Your Meridian API authentication token.
* `Location ID`: Location ID for the tags to retrieve information about.
* `Asset MAC Address`: MAC address of an individual tag. Optional. If left blank, the result will include all assets in the specified location, up to 1,000.

## Output Result

The result of all successful requests include `body`, `headers`, and `statusCode` fields. The `body` object contains the response data.

If the `Asset MAC Address` field is left blank, the response includes an array of up to 1,000 assets at the specified `Location ID`.

```json
{
  "body": {
    "results": [
        {
        "tags": [],
        "battery_level": 78,
        "is_control_tag": null,
        "id": "xxxxxxx",
        "control_y": null,
        "control_x": null,
        "image_url": null,
        "location": "xxxxxxx",
        "tag_ids": [],
        "mac": "xxxxxxx",
        "external_id": null,
        "name": "QT8",
        "created": "2017-10-24T17:19:16Z",
        "modified": "2018-08-02T20:16:27Z"
        },
        {  },
        {  }
    ],
  },
  "headers": {  },
  "statusCode": 200
}
```

If an `Asset MAC Address` is provided, the response includes the details of the specific asset.

```json
{
  "body": {
    "map": {  },
    "calculations": {  },
    "hw_type": null,
    "tags": [],
    "battery_level": 73,
    "is_control_tag": 1916.5103642988422,
    "id": "CC78ABA442E4",
    "control_y": 1916.5103642988422,
    "control_x": 5403.906545774522,
    "image_url": null,
    "location": "5198682008846336",
    "tag_ids": [],
    "mac": "CC78ABA442E4",
    "external_id": null,
    "name": "MER-StinsonBeach",
    "created": "2017-10-06T20:11:22Z",
    "modified": "2018-08-02T21:36:22Z"
  },
  "headers": {  },
  "statusCode": 200
}
```

If the request is successfully made, but Meridian's API returns an error, check the `statusCode` and `body` fields for additional details.

```json
{
  "body": {
    "detail": "Invalid token"
  },
  "headers": {  },
  "statusCode": 401
}
```

If the request to Meridian's API fails, the output will contain an `error` object with additional details.

```json
{
  "error": {
    "message": "Cannot resolve host: edit.meridianapps.com",
  }
}
```

## License

Copyright (c) 2022 Losant IoT, Inc. All rights reserved.

Licensed under the [MIT](https://github.com/Losant/losant-templates/blob/master/LICENSE.txt) license.

https://www.losant.com