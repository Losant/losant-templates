# Set Global

This node allows you to set or update an [application global](https://~exportplaceholderid-docs-url~/applications/overview/#application-globals) value (i.e. rotating API tokens).

Once imported, this node is available in your application's collection of [Custom Nodes](https://~exportplaceholderid-docs-url~/workflows/custom-nodes/overview/). It will be visible under the Data section of your toolbar.

## Input Configuration

* `key`: Name of your variable
* `type`: Type of data you will assign to the value. Options are String, Number, and JSON.
* `value`: Your global value.
* `description`: Note to inform other collaborators how the global functions.

## Output Result
The result of a successful request returns success as true.
```json
{
    "success": "true"
}
```

The result of a failed request returns an error message.
```json
{
    "error": "Global key \"key\" must have a valid json object. "
}
```

License
Copyright (c) 2023 Losant IoT, Inc. All rights reserved.

Licensed under the [MIT](https://github.com/Losant/losant-templates/blob/master/LICENSE.txt) license.

https://www.losant.com