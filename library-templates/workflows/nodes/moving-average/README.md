# Moving Average

Calculates a moving average over a configurable number of data points.

Once imported, this node is available in your application's collection of [Custom Nodes](https://~exportplaceholderid-docs-url~/workflows/custom-nodes/overview/).

## Input Configuration

* `Count`: Number of values to average together.
* `Average Identifier`: Optional. Allows this node to perform moving averages for multiple sets of data.
* `Value`: Value to average.

## Output Result

The output will be `null` until at least `Count` data points have been received. Once enough data points have been received, the output is the calculated moving average. The `Average Identifier` property allows this node to calculate multiple sets of moving averages based on this identifier. For example, if you wanted to calculate a moving average for an attribute of many different devices, the identifier could be set to the device ID.

The moving average is stored in workflow storage for a specific instance of this node. Deleting this node from the canvas and re-adding a new one resets the moving average calculation.

## License

Copyright (c) 2020 Losant IoT, Inc. All rights reserved.

Licensed under the [MIT](https://github.com/Losant/losant-templates/blob/master/LICENSE.txt) license.

https://www.losant.com