# Redact Payload

Redacts a payload, obscuring sensitive values based on property names. **Note**: Property values are not searched, only property names.

Once imported, this node is available in your application's collection of [Custom Nodes](https://docs.losant.com/workflows/custom-nodes/overview/).

## Input Configuration

- `Payload Path`: Payload path containing the object to recursively search and redact.
- `Additional Strings to Redact`: Optional. Additional string(s) that denote sensitive keys.

## Output Result

The output is a recursively redacted copy of the payload found at `path`. Any property names containing one of a list of keywords will have its value replaced with `*****REDACTED*****`. This redaction protects sensitive data when saving or sending a payload. For instance, when using the `Workflow Error` Trigger Node, you may want to to email yourself a copy of any errored payloads, but do not want to have sensitive data included in the email.

The default list of keywords denoting values to be redacted is `secret`, `token`, `password`, `auth`, and `key`. Additional keywords can be specified using the `keysToRedactCSV` input. For instance, a value for this input of `hello,sensitive` adds both `hello` and `sensitive` to the default list of keywords.

## Example:

Given an `Additional Strings to Redact` value of `hello,sensitive`, and the payload:

```
{
  "clean":"sparkling",
  "someSecretishThing":"The key is 42.",
  "additionalSensitiveData":"password123",
  "aNestedObject":{
      "token": "abc123"
  },
  "values":[
    {
      "password":"alphabravocharlie"
    }
  ]
}
```

The returned value will be:

```
{
  "clean": "sparkling",
  "someSecretishThing": "*****REDACTED*****",
  "additionalSensitiveData":"*******REDACTED*******",
  "aNestedObject": {
    "token": "*****REDACTED*****"
  },
  "values": [
    {
      "password": "*****REDACTED*****"
    }
  ]
}
```

## License

Copyright (c) 2020 Losant IoT, Inc. All rights reserved.

Licensed under the [MIT](https://github.com/Losant/losant-templates/blob/master/LICENSE.txt) license.

https://www.losant.com