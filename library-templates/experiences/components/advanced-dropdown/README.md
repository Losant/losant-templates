# Advanced Dropdown Experience Component

This template renders an advanced dropdown menu for filtering and selecting one of an array of items—typically devices or experience groups.

## Dependencies

This component requires the use of [Twitter Bootstrap v4](https://getbootstrap.com) as a CSS and JS framework. Losant recommends installing the "Bootstrap 4 Layouts" template in conjunction with this one.

## Usage

This template adds a single experience component to your application, which can be invoked to add a filterable drop-down menu to your experience pages. This component can act as a form input or as a link to other resources:

```
{{component
  'tl-advanced-dropdown'
  myArrayOfObjects
  itemLinkTemplate="/devices/{{this.id}}"
}}
```

### Context 

The component must be passed an array of objects (as `myArrayOfObjects` in the example above). In most cases, this will be an array of [devices](https://~exportplaceholderid-docs-url~/devices/overview/) or [experience groups](https://~exportplaceholderid-docs-url~/experiences/groups/) that are [passed into a page's `pageData`](https://~exportplaceholderid-docs-url~/workflows/outputs/endpoint-reply/#reply-type) via an [experience workflow](https://~exportplaceholderid-docs-url~/workflows/experience-workflows/).

The component will iterate over the array and create a menu item in the drop-down menu for each object.

### Arguments

Additional arguments are passed in as key-value pairs after the context argument.

| Property          | Description                                                                                                                                                                                                                                                                                                                                                                                                | Default                |
|-------------------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|------------------------|
| id                | ([HTML5 ID](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/id)) The ID of the element into which the drop-down menu will be rendered. Note: If you are using multiple instances of this component on one page, this property is required and must be unique per instance.                                                                                                       | "tl-advanced-dropdown" |
| inputName         | (String) If set, the name of the the input whose value should be associated with the selected menu item.                                                                                                                                                                                                                                                                                                   |                        |
| selectedValue     | (String) The default value that should be selected on mount of the component, as matched against the `itemValueProp` argument when iterating over the array items.                                                                                                                                                                                                                                         |                        |
| variant           | (String) The Bootstrap variant color to apply to the dropdown. This should be one of the [predefined contextual classes](https://getbootstrap.com/docs/4.5/utilities/colors/) or, if using your own, should match with one you have [generated](https://getbootstrap.com/docs/4.5/getting-started/theming/).                                                                                               | "light"                |
| itemComponentName | ([Component Name](https://~exportplaceholderid-docs-url~/experiences/views/#components)) The name of a component to render for each menu item in place of the string output by `itemLabelTemplate`, for example, if you wish to include an icon alongside each label. Your component should render some text (i.e. not an image alone) against which the dropdown can filter its menu items.                            |                        |
| itemLabelTemplate | (String [Template](https://~exportplaceholderid-docs-url~/workflows/accessing-payload-data/#string-templates)) The label for each menu item in the drop-down menu. If `itemComponentName` is set, this argument has no effect.                                                                                                                                                                                                  | "{{this.name}}"        |
| itemLinkTemplate  | (String [Template](https://~exportplaceholderid-docs-url~/workflows/accessing-payload-data/#string-templates)) The URL to take the user to on selection of a menu item. If `inputName` is set, this argument has no effect; otherwise it is required.                                                                                                                                                                 |                        |
| itemValueProp     | (String) The name of the prop on each iterated object where the value associated with each menu item can be found. This prop is used for determining which item should be selected by default, and also the value to associate with the selection when using this drop-down menu as a form element (i.e. when the `inputName` argument is set). The value of this prop should be unique per item in the array. | "id"                   |

## Examples

In each of the following implementation examples, assume that the context passed into the component includes an array of devices generated from the [Device: Get Node](https://~exportplaceholderid-docs-url~/workflows/data/get-device/) with the following configuration:
- The "Return multiple devices" checkbox is checked.
- The "Return tags as an object map instead of an array" is checked.
- The Result Path is set to "pageData.devices".

### Using Dropdown as a Link

Assuming you have an [experience endpoint](https://~exportplaceholderid-docs-url~/experiences/endpoints/) for the route `GET /devices/{id}`, the drop-down menu can link users to specific devices (and display the currently selected device) as shown below:

```
{{component
  'tl-advanced-dropdown'
  pageData.devices
  selectedValue=request.params.id
  itemLinkTemplate="/devices/{{this.id}}"
}}
```

### Using Dropdown as an Input

Given a form where you wish to submit the selected device ID under the name "deviceId", and where the drop-down menu should display the just-submitted ID as the selected item, you would configure this component as shown below:

```
{{component
  'tl-advanced-dropdown'
  pageData.devices
  id="component-as-input"
  selectedValue=request.body.deviceId
  inputName="deviceId"
}}
```

### Using a Custom Component for Menu Items

Given an array of devices, where each device has a tag with the key "icon" and a value of a URL to an image, you could render a custom component for displaying that image in the menu item as shown below:
```
{{component
  'tl-advanced-dropdown'
  pageData.devices
  id="custom-label-component"
  selectedValue=request.query.deviceId
  itemComponentName="example-component"
}}
```

Then, your "example-component" (which receives the current iterated item as its context), would look similar to:

```
<span>
  <img src="{{this.tags.icon}}" alt="{{this.name}}" /> {{this.name}}
</span>
```

## License

Copyright (c) 2020 Losant IoT, Inc. All rights reserved.

Licensed under the [MIT](https://github.com/Losant/losant-templates/blob/master/LICENSE.txt) license.

https://www.losant.com