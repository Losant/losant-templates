# QR Code Reader Component

This template renders a QR code reader that can tap into a device's camera to scan a QR code. This component is commonly used in device provisioning flows (i.e. tying new hardware to user accounts).

## Dependencies

This component has no additional dependencies, though Losant recommends installing the "Bootstrap 4 Layouts" template in conjunction with this one as many of the out-of-the-box styles are written with the [Bootstrap 4](https://getbootstrap.com/docs/4.5/getting-started/introduction/) framework in mind.

## Usage

This template adds a single experience component to your application, which can be invoked to add a QR code scanner to your Experience Pages. The component can take immediate action on scan or it can place the data in the QR code in an input beneath the scanner.

```
{{component
  'tl-qr-code-reader'
}}
```

### Context 

The QR code reader takes no context argument. Instead, it takes only named arguments as outlined below:

### Arguments

The following arguments can be passed when invoking the component to adjust its behavior and appearance:

| Property        | Description                                                                                                                                                                                                                                                                                                                         | Default             |
|-----------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|---------------------|
| id              | ([HTML5 ID](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/id)) The ID of the element into which the scanner will be rendered. **Note**: If you are using multiple instances of this component on one page, this property is required and must be unique per instance.                                 | "tl-qr-code-reader" |
| inputName       | (String) The name of the input to associate with the QR code's value. If `onSubmitAction` is set, this will be the name of the property on which the code's data will be submitted on successful scan.                                                                                                                              | "qrcode"            |
| inputValue      | (String) If set, the default value for the input rendered beneath the scanner on mount. If `onSuccessAction` is set, this prop has no effect as no input is rendered beneath the scanner.                                                                                                                                           |                     |
| onSuccessAction | (URL) If set, the URL to submit the scanned QR code to on successful scan. The value is submitted by the method defined in `onSuccessMethod`, under the property name defined in `inputName`. If this property is not set, the scanner will place the value of the QR code in an input beneath the scanner on success instead. |                     |
| onSuccessMethod | ("get" or "post") The form submission method to apply on scan of the QR code. If "onSuccessAction" is not set, this prop has no effect.                                                                                                                                                                                             | "get"               |
| size            | (Number) The size, in pixels, of the QR code scanner. This size is reflected in the outer width of the component, including the scanner and its outer padding.                                                                                                                                                                     | 360                 |
| variant         | (String) The Bootstrap variant color to apply to the drop-down menu. This should be one of the [predefined contextual classes](https://getbootstrap.com/docs/4.5/utilities/colors/) or, if using your own, should match with one you have [generated](https://getbootstrap.com/docs/4.5/getting-started/theming/).                        | "primary"           |

## Examples

The following are implementation examples given a variety of use cases for this component:

### Adding QR Value to an Input

This is the recommended implementation for this component, as it allows users who do not have a camera or cannot get their QR code to scan to manually input a value in its place. This example also changes the default `inputName` argument to "data" and sets a default value for the input based on the previously submitted value (if applicable).

```
{{component
  'tl-qr-code-reader'
  inputName="data"
  inputValue=request.query.data
}}
```

### Submitting as POST Data

To automatically submit the scanned code as POST data to the current URL, implement the component as follows:

```
{{component
  'tl-qr-code-reader'
  id="submit-as-post-data"
  onSubmitAction=request.path
  onSubmitMethod="post"
}}
```

The data is available on the request body under the default `inputName` of qrcode.

### Submitting as GET Data

To submit the data on scan to an endpoint with the default method GET at the route `/scan-success`, implement the component as follows:

```
{{component
  'tl-qr-code-reader'
  id="submit-as-get-data"
  onSubmitAction="/scan-success"
}}
```

The data is appended to the URL as a query parameter under the default `inputName` of qrcode. The user's web browser will redirect to `/scan-success?qrcode=THE_QR_CODE_DATA`.

### Customizing the Appearance

To change the color of the "Open Camera" button, and to increase the size of the component, pass the following as parameters:

```
{{component
  'tl-qr-code-reader'
  id="customized-appearance"
  variant="success"
  size=480
}}
```

## License

Copyright (c) 2020 Losant IoT, Inc. All rights reserved.

Licensed under the [MIT](https://github.com/Losant/losant-templates/blob/master/LICENSE.txt) license.

https://www.losant.com