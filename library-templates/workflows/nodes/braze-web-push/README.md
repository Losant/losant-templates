# Braze: Web Push

Immediately send a web push message using the [Braze API](https://www.braze.com/docs/api/endpoints/messaging/send_messages/post_send_messages/). Once imported, this node will be available in your application's collection of [Custom Nodes](https://~exportplaceholderid-docs-url~/workflows/custom-nodes/overview/).

## Input Configuration

* `REST Endpoint`: [REST Endpoint](https://www.braze.com/docs/api/basics/#endpoints) that corresponds to the Braze instance you're provisioned to.
* `REST API Key`: Braze [REST API Key](https://www.braze.com/docs/api/basics/#app-group-rest-api-keys). The key requires minimum permissions of `messages.send`.
* `Broadcast`: Used when you intend to [Broadcast](https://www.braze.com/docs/api/parameters#broadcast) an API message to the entire segment that a campaign or canvas targets.
* `External User IDs`: Comma-delimited list of [External User IDs](https://www.braze.com/docs/api/parameters#external-user-id). Optional.
* `User Aliases`: Payload path that points to an array of [User Alias](https://www.braze.com/docs/api/objects_filters/user_alias_object/) objects. Optional.
* `Segment ID`: [Segment Identifer](https://www.braze.com/docs/api/parameters#segment-identifier). Optional.
* `Connected Audience`: Payload path that points to a [Connected Audience](https://www.braze.com/docs/api/objects_filters/connected_audience/) object. Optional.
* `Campaign ID`: [Campaign Identifier](https://www.braze.com/docs/api/parameters#campaign-identifier). Optional.
* `Send ID`: [Send Identifier](https://www.braze.com/docs/api/parameters#send-identifier). Optional.
* `Override Frequency Capping`: Determines whether to disable [Frequency Capping](https://www.braze.com/docs/user_guide/engagement_tools/campaigns/testing_and_more/rate-limiting/#frequency-capping). Optional. Defaults to `false`.
* `Recipient Subscription State`: Limits messages to users based on their state. Valid values are `opted_in`, `subscribed`, `all`. Optional. Defaults to `subscribed`.
* `Alert`: Notification message. See [Web Push Object](https://www.braze.com/docs/api/objects_filters/web_objects/#web-push-object) for more information. Required.
* `Title`: Title that appears in the notification drawer. See [Web Push Object](https://www.braze.com/docs/api/objects_filters/web_objects/#web-push-object) for more information. Required.
* `Extra`: Payload path that points to an object that contains additional keys and values to be sent in the push. See [Web Push Object](https://www.braze.com/docs/api/objects_filters/web_objects/#web-push-object) for more information. Optional.
* `Message Variation ID`: Used when providing a `Campaign ID` to specify which message variation this message should be tracked under. See [Web Push Object](https://www.braze.com/docs/api/objects_filters/web_objects/#web-push-object) for more information. Optional.
* `Custom URL`: Web URL. See [Web Push Object](https://www.braze.com/docs/api/objects_filters/web_objects/#web-push-object) for more information. Optional.
* `Image URL`: URL for the image to show. See [Web Push Object](https://www.braze.com/docs/api/objects_filters/web_objects/#web-push-object) for more information. Optional.
* `Large Image URL`: URL for a large image. Supported on Google Chrome Windows/Android. See [Web Push Object](https://www.braze.com/docs/api/objects_filters/web_objects/#web-push-object) for more information. Optional.
* `Require Interaction`: Whether to require the user to dismiss the notification. Supported on Mac Google Chrome. See [Web Push Object](https://www.braze.com/docs/api/objects_filters/web_objects/#web-push-object) for more information. Optional. Defaults to `false`.
* `Time to Live (seconds)`: [TTL](https://www.braze.com/docs/user_guide/administrative/app_settings/manage_app_group/push_ttl_settings/#push-time-to-live-settings) for the push message. Optional.
* `Send to Most Recent Device Only`: Defaults to false. If set to true, Braze only sends this push to a user's most recently used browser, rather than all eligible browsers. See [Web Push Object](https://www.braze.com/docs/api/objects_filters/web_objects/#web-push-object) for more information. Optional.
* `Buttons`: Payload path that points to an array of [Web Push Button Objects](https://www.braze.com/docs/api/objects_filters/web_objects/#web-push-object) to display. Optional.



## Output Result

The result of all successful requests will include `body`, `headers`, and `statusCode` fields. The `body` object contains the response data, shown below. See [Braze Response Documentation](https://www.braze.com/docs/api/endpoints/messaging/send_messages/post_send_messages/#response-details) for more information.

```json
{
  "body": {
    "message": "success",
    "dispatch_id": "xxxxx"
  },
  "headers": { },
  "statusCode": 201
}
```

If the request is successfully made, but the Braze API returns an error, check the `statusCode` and `body` fields for additional details.

```json
{
  "body": {
    "message": "Invalid API key: xxxxx"
  },
  "headers": { },
  "statusCode": 401
}
```

If the request to the Braze API fails, the output will contain an `error` object with additional details.

```json
{
  "error": {
    "message": "Cannot resolve host: rest.iad-03.braze.com",
    "name": "ValidationError"
  }
}
```

## License

Copyright (c) 2020 Losant IoT, Inc. All rights reserved.

Licensed under the [MIT](https://github.com/Losant/losant-templates/blob/master/LICENSE.txt) license.

https://www.losant.com
