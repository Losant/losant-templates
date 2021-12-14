# Algolia — Search Index

This node provides access to [Algolia's Search Index HTTPS GET API](https://www.algolia.com/doc/rest-api/search/#search-index-get).

Once imported, this node is available in your application's collection of [Custom Nodes](https://~exportplaceholderid-docs-url~/workflows/custom-nodes/overview/).

## Input Configuration

* `Algolia Application ID`: Algolia Application ID.
* `Algolia Application Key`: Algolia Application Key.
* `Algolia Index Name to Search`: Algolia Index Name to search.
* `Search Parameters`: Algolia [Search Parameters](https://www.algolia.com/doc/api-reference/search-api-parameters/) that can be used with your search criteria to search your index.

## Output Result

The result of all successful requests include `body`, `headers`, and `statusCode` fields. The `body` object contains the response data—an example is below:

```json
{
  "body": {
    "exhaustiveNbHits": true,
    "hits": [
      {
        "_highlightResult": {
          "code": {
            "matchedWords": [
            ],
            "matchLevel": "none",
            "value": "16"
          },
          "type": {
            "matchedWords": [
            ],
            "matchLevel": "none",
            "value": "1"
          }
        },
        "cause": "I/O communication configuration fault detected. (CompactLogix 1768-L4x controllers only.)",
        "code": "16",
        "objectID": "734455050",
        "recoveryMethod": "Reconfigure the number of communication modules on the 1768 bus side of the controller: 1. 1768-L43 has a maximum of two modules. 2. 1768-L45 has a maximum of four modules. 2a. Up to four Sercos modules 2b. Up to two NetLinx communication modules",
        "type": "1"
      }
    ],
    "hitsPerPage": 20,
    "nbHits": 1,
    "nbPages": 1,
    "page": 0,
    "params": "facetFilters=[[%22code:16%22],[%22type:1%22]]",
    "processingTimeMS": 1,
    "query": ""
  },
  "headers": { },
  "statusCode": 200
}
```

If the request is successfully completed, but Algolia's API returns an error, check the `statusCode` and `body` fields for additional details.

```json
{
  "body": {
    "message": "Invalid Application-ID or API key",
    "status": 403
  },
  "headers": { },
  "statusCode": 403
}
```

If the request to Algolia's API fails, the output will contain an `error` object with additional details.

```json
{
  "error": {
    "message": "Cannot resolve host: my-application-id-dsn.algolia.net",
    "name": "ValidationError"
  }
}
```

## License

Copyright (c) 2020 Losant IoT, Inc. All rights reserved.

Licensed under the [MIT](https://github.com/Losant/losant-templates/blob/master/LICENSE.txt) license.

https://www.losant.com
