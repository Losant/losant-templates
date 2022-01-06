# Downsample

Downsamples (or decimates) buckets of data points into a single value. As data is streamed into this node, each time `Bucket Size` points have been received, it will output a single data point based on the specified `Downsample Technique`. This node is useful for filtering high-frequency data.

Once imported, this node is available in your application's collection of [Custom Nodes](https://docs.losant.com/workflows/custom-nodes/overview/).

## Input Configuration

* `Bucket Size`: Number of data points to process before returning a downsampled value.
* `Downsample Technique`: Technique used to downsample the received data. `MEAN` returns the average of all data points in the bucket. `FIRST` returns the first data point received in each bucket. `LAST` returns the last data point in each bucket.
* `Downsample Identifier`: Optional. Allows this node to downsample multiple sets of data.
* `Value`: Incoming value that is downsampled in each bucket.

## Output Result

This node takes the true path each time `Bucket Size` points have been processed. The output is the downsampled value based on the specified technique. All other data points result in the false path and the raw value is directly passed through.

## License

Copyright (c) 2020 Losant IoT, Inc. All rights reserved.

Licensed under the [MIT](https://github.com/Losant/losant-templates/blob/master/LICENSE.txt) license.

https://www.losant.com