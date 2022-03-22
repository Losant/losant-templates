# Function Node Scripts

This template demonstrates how to send reusable JavaScript libraries down to your [Edge Compute device](https://docs.losant.com/devices/edge-compute/) for use within the [Function Node](https://docs.losant.com/workflows/logic/function/). Libraries are written to the device's file system and thus are made available to *all edge workflows* running on the device–not just the one that created the files.

## Dependencies

This template assumes you have an Edge Compute device that is connected to the Losant Broker and is currently running Edge workflows. It also assumes the user has a basic understanding of the JavaScript programming language.

If you are new to Edge Compute, we recommend starting with the [Edge Compute Walkthrough](https://docs.losant.com/edge-compute/walkthrough/) before working with this template.

## How to Use

This template will create a single Edge workflow within your application. That workflow demonstrates how to write scripts to the file system, how to utilize those scripts in a Function Node, and how to re-sync scripts without requiring another [edge deployment](https://docs.losant.com/edge-compute/edge-deployments/).

### Writing Resources

This template's workflow demonstrates writing files to the device's file system in three separate ways:

1. By creating JavaScript functions inline in the body of the [File: Write Node](https://docs.losant.com/workflows/data/file-write/).
2. By pulling a library ([lodash](https://lodash.com/)) from a CDN and writing it to the file system.
3. By pulling a JSON file (included with the template) from your [Application Files](https://docs.losant.com/applications/files/) and writing it to the file system.

There are three methods by which files can be loaded into the file system with the provided workflow:

1. Via the [Device: Connect Trigger](https://docs.losant.com/workflows/triggers/on-connect/), which will attempt to load and write the files any time the device connects to the Losant Broker.
2. By pressing a [Virtual Button](https://docs.losant.com/workflows/triggers/virtual-button/) within the workflow, which will cause the device to re-fetch and re-write the referenced files.
3. By sending a "reSync" [command](https://docs.losant.com/devices/commands/) to the device.

### Utilizing Resources

The [Function Node](https://docs.losant.com/workflows/logic/function/) supports [`require`](https://nodejs.org/en/knowledge/getting-started/what-is-require/), which allows for referencing files on the file system and utilizing their exported functions and data within the node.

For example, given a file at the path "/data/my-script.js" with the following contents ...

```
module.exports = {
    sayHello: (name) => `Hello, ${name}!`,
    sayGoodbye: (name) => `Goodbye, ${name}!`
}
```

You could then pull those exported functions into a Function Node and call them like so:

```
try {
    const { sayHello, sayGoodbye } = require('/data/my-script.js');
    payload.result = sayHello('George');
    payload.result += ` and ${sayGoodbye('Hillary')}`;
} catch (e) {
    // in most cases, an error will throw because the file cannot be found
    payload.result = e;
}
```

### Syncing Static Data

If you are referencing data files or scripts from a CDN, and you would like to push changes made to those files down to your Edge workflows, you may follow one of the three methods described above to push the updates to the device *without requiring another edge deployment*.

Bear in mind the following:

- This assumes the URL of the referenced files *has not changed*; if the URL has changed, you will need to change the URLs within your workflow nodes. A possible workaround to this would be to store the URLs in application globals; then, the new URLs would get sent down to the device automatically. In that case you would still need to re-sync the files as described above.
- Any changes to these files will be reflected in *all edge workflows* that reference them. Since the files are written to the device's file system, they are in no way scoped to just a single workflow.

## Considerations

This template demonstrates functionality that goes beyond the normal workflow execution methods built into the Losant platform. Therefore, please consider the following before utilizing this template ... 

### Security

If you utilize the portions of the workflow that pull scripts from third-party services, you should only pull from **trusted, secure sources.** The workflow does require that all resources are pulled over HTTPS; however, there are no integrity checks to ensure that the received result matches with a hashed key.

Bear in mind that any code written to your file system will execute on your device when its included functions are called.

### Scripts Referenced Before Available

It is certainly possible that a script could not be finished downloading or resyncing before attempting to use it in a Function Node. Therefore, any workflows referencing scripts or resources written to the file system should have appropriate safeguards in place for when the file is not available.

### Cleaning Up Old Files

The template does not provide any method for removing previously imported files from the file system when they are no longer being utilized. Removing such files is a manual process currently, as there is no way to delete a file using an Edge workflow. 

## License

Copyright (c) 2022 Losant IoT, Inc. All rights reserved.

Licensed under the MIT license.

https://www.losant.com