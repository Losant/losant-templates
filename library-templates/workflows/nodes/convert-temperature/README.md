# Convert Temperature

Converts temperatures between Celsius, Fahrenheit, and Kelvin.

## How to Use this Node

This node will be imported as a [Custom Node](https://docs.losant.com/workflows/custom-nodes/overview/).

## Input Configuration

* `Input Units`: Units of the input data. Options are `Celsius`, `Fahrenheit`, and `Kelvin`.
* `Output Units`: Units to convert the incoming temperature value to. Options are `Celsius`, `Fahrenheit`, and `Kelvin`.
* `Temperature Value`: Temperature value to convert.

## Output Result

Outputs the converted value based on the specified input and output units. For example, if `Input Units` is set to `Celsius`, `Output Units` is set to `Fahrenheit`. If the provided `Temperature Value` is `100`, this node will output the value `212`.

## License

Copyright (c) 2020 Losant IoT, Inc. All rights reserved.

Licensed under the [MIT](https://github.com/Losant/losant-templates/blob/master/LICENSE.txt) license.

https://www.losant.com