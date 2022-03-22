# Google Maps Experience Component

This template renders a Google Map view into your Experience Page or Layout. Optionally, the component can display markers (usually representing the location of devices) as well as custom images for each marker and information bubbles (pop-up windows).

## Dependencies

This component has no additional Losant dependencies, however, you must obtain and provide a [Google Maps API key](https://developers.google.com/maps/documentation/javascript/get-api-key) to use the component.

## Usage

This template creates a single [Experience Component](https://docs.losant.com/experiences/views/#components) that can be used in your [Experience Pages](https://docs.losant.com/experiences/views/#pages) or [Experience Layouts](https://docs.losant.com/experiences/views/#layouts). The component is named `tl-google-map`.

```
{{component
  'tl-google-map'
  myArrayOfObjects
  apiKey="MY_GOOGLE_MAPS_API_KEY"
  markerLatLngTemplate="{{this.compositeState.gps.value}}"
}}
```

### Context 

The component must be passed an array of objects (as `myArrayOfObjects` in the example above). In most cases, this will be an array of [devices](https://docs.losant.com/devices/overview/) that are [passed into a page's `pageData`](https://docs.losant.com/workflows/outputs/endpoint-reply/#reply-type) via an [Experience Workflow](https://docs.losant.com/workflows/experience-workflows/).

Each object is represented by a marker on the map, provided a latitude and longitude are available and are rendered correctly given the additional arguments below.

### Arguments

Additional arguments are passed in as key-value pairs after the context argument.

| Property                | Description                                                                                                                                                                                                                                                                                                                                                                                                                | Default          |
|-------------------------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|------------------|
| apiKey                  | (**Required** [API Key](https://developers.google.com/maps/documentation/javascript/get-api-key)) The [Google Maps API key](https://developers.google.com/maps/documentation/javascript/get-api-key) against which your map should be authenticated. **Note**: If you utilize multiple instances of this component on the same page, this key must be the same for each instance.                                      |                  |
| id                      | ([HTML5 ID](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/id)) The ID of the element into which the map will be rendered. **Note**: If you are using multiple instances of this component on one page, this property is required and must be unique per instance.                                                                                                                            | "tl-google-map"  |
| height                  | ([CSS Unit](https://developer.mozilla.org/en-US/docs/Web/CSS/height)) The height of the container in which the map is rendered.                                                                                                                                                                                                                                                                                       | "640px"          |
| defaultZoom             | ([Google Maps Zoom Level](https://developers.google.com/maps/documentation/javascript/overview#zoom-levels)) The default zoom level of the map on load. Users may zoom in and out after creation.                                                                                                                                                                                                                          | 8                |
| defaultCenter           | ("Lat,Lon" String) The default center point of the map on load. Users may pan the map after creation.                                                                                                                                                                                                                                                                                                                      | "39.108,-84.511" |
| markerLatLngTemplate    | (**Required** "Lat,Lon" String [Template](https://docs.losant.com/workflows/accessing-payload-data/#string-templates)) A template for rendering the position of each marker on the map. The output of the template must be a string of the form "Lat,Lon" where "Lat" is the latitude and "Lon" is the longitude of the marker. Any template that fails to render a string to this format will not place a pin on the map. |                  |
| markerIconTemplate      | (URL [Template](https://docs.losant.com/workflows/accessing-payload-data/#string-templates)) If necessary, provide a URL to a marker image to use in place of the standard Google Maps pin.                                                                                                                                                                                                                                  |                  |
| markerLabelTemplate     | (String [Template](https://docs.losant.com/workflows/accessing-payload-data/#string-templates)) If necessary, enter a string to display atop the marker image. This should be a short string if provided; otherwise the label will display well outside the boundaries of the marker.                                                                                                                                            |                  |
| infoWindowComponentName | ([Component Name](https://docs.losant.com/experiences/views/#components)) If desired, provide the name of one of your application's Experience Components to render inside an information bubble when a marker is clicked. The context passed to the component is the marker data object.                                                                                                                                  |                  |
| infoWindowTemplate      | (HTML [Template](https://docs.losant.com/workflows/accessing-payload-data/#string-templates)) Similar to "infoWindowComponentName," however, this property allows for setting the HTML content of the information bubble inline. If "infoWindowComponentName" is set, this property has no effect.                                                                                                                                 |                  |

## Examples

In each of the following examples, assume that the context passed into the component includes an array of devices generated from the [Device: Get Node](https://docs.losant.com/workflows/data/get-device/) with the following configuration:
- The "Return multiple devices" checkbox is checked.
- The "Include all attributes" option is selected in the "Composite State to Include" drop-down menu.
- The "Return tags as an object map instead of an array" checkbox is checked.
- The Result Path is set to "pageData.devices".

### Marker Position from Device Tag

Given a device tag with the key "location" and values in the format of "Lat,Lon" (e.g. "39.1,-84.51"), you can render each of your devices to the map as follows:

```
{{component
  'tl-google-map'
  pageData.devices
  apiKey="MY_GOOGLE_MAPS_API_KEY"
  markerLatLngTemplate="{{this.tags.location.[0]}}"
}}
```

### Marker Position from Device State

Given a device attribute of the "gps" data type and the name "gps," with values reported in the format "Lat,Lon" (e.g. "39.1,-84.51"), you can render each of your devices' current location to the map as follows:

```
{{component
  'tl-google-map'
  pageData.devices
  apiKey="MY_GOOGLE_MAPS_API_KEY"
  markerLatLngTemplate="{{this.compositeState.gps.value}}"
}}
```

### Composite State in Info Window

To display the name of your device and each value of its composite state in an information window, pass the following HTML string for the `infoWindowTemplate`:

```
{{component
  'tl-google-map'
  pageData.devices
  apiKey="MY_GOOGLE_MAPS_API_KEY"
  markerLatLngTemplate="{{this.compositeState.gps.value}}"
  infoWindowTemplate="
    <h3>{{this.name}}</h3>
    <ul>
    {{#each this.compositeState}}
      <li><strong>{{@key}}:</strong> {{this.value}}</li>
    {{/each}}
    </ul>
  "
}}
```

### Custom Marker from Tags

Given a device tag with the key "markerImage" and values in the format of a URL pointing to an image (e.g. "https://example.com/my-image.png"), you can render a custom marker for each of your devices to the map as follows:

```
{{component
  'tl-google-map'
  pageData.devices
  apiKey="MY_GOOGLE_MAPS_API_KEY"
  markerIconTemplate="{{this.tags.markerImage.[0]}}"
}}
```

## License

Copyright (c) 2022 Losant IoT, Inc. All rights reserved.

Licensed under the [MIT](https://github.com/Losant/losant-templates/blob/master/LICENSE.txt) license.

https://www.losant.com