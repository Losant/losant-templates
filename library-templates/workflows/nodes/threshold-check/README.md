# Threshold Check

Checks that a value has met a threshold a consecutive number of times. For example, this node can be used to generate an alert if a device's `temperature` attribute exceeds 100 degrees 5 times in a row.

This is a branching node that takes the `true` path (right) when the consecutive count has been reached.

This node latches once the consecutive count has been reached and resets when the threshold is no longer met. This prevents duplicate alerts if the value continuously meets the threshold after the consecutive count is reached. See the [Latch Node](https://docs.losant.com/workflows/logic/latch/) for more details on this behavior.

Once imported, this node is available in your application's collection of [Custom Nodes](https://docs.losant.com/workflows/custom-nodes/overview/).

## Input Configuration

* `Value`: The incoming value to compare against the threshold.
* `Threshold`: The threshold that must be met.
* `Comparator`: How to compare the threshold against the incoming value (Greater Than, Less Than, Equal To).
* `Identifier`: Optional. A unique identifier that allows this node to perform threshold checks for multiple sets of data. A common identifier is a device ID. If you are performing checks on multiple attributes for the same device ID, the recommended identifier is `device_id:attribute_name`.
* `Count`: The number of consecutive times the value must meet the threshold.

## Output Result

Optionally, provide a payload path where an object with the following fields will be placed:

* `count`: The number of consecutive occurrences where the value has met the threshold.
* `comparisonResult`: The boolean result of this single threshold comparison.
* `wasLatched`: Boolean for if this node was latched prior to this execution.
* `isLatched`: Boolean for if this node is latched after this execution.
* `latchBranch`: Boolean for the branch that was taken.

If your application requires it, `wasLatched` and `isLatched` provide an easy way to determine if the result of the node (`true` path vs. `false` path) has changed between its last invocation and the current invocation.

## License

Copyright (c) 2022 Losant IoT, Inc. All rights reserved.

Licensed under the [MIT](https://github.com/Losant/losant-templates/blob/master/LICENSE.txt) license.

https://www.losant.com