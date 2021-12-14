# Collapsible Tree Component

This template renders a collapsible tree of deeply nested resources such as experience groups returned from the [Group: Summary Node](https://~exportplaceholderid-docs-url~/workflows/experience/summary-group/).

## Dependencies

This component has no additional dependencies, though Losant recommends installing the "Bootstrap 4 Layouts" template in conjunction with this one as many of the out-of-the-box styles are written with the [Bootstrap 4](https://getbootstrap.com/docs/4.5/getting-started/introduction/) framework in mind.

## Usage

This template adds a single Experience Component to your application, which can be invoked to add a collapsible tree menu to your Experience Pages. That component can behave as a checkbox list or as a list of links or, given a custom component to use as a renderer, a number of further possibilities.

```
{{component
  'tl-collapsible-tree'
  myArrayOfObjects
  itemLinkTemplate="/groups/{{this.id}}"
}}
```

### Context 

The component must be passed an array of objects (as `myArrayOfObjects` in the example above). In most cases, this will be an array of [Experience Groups](https://~exportplaceholderid-docs-url~/experiences/groups/) that are [passed into a page's `pageData`](https://~exportplaceholderid-docs-url~/workflows/outputs/endpoint-reply/#reply-type) via an [Experience Workflow](https://~exportplaceholderid-docs-url~/workflows/experience-workflows/), usually through the [Group: Summary Node](https://~exportplaceholderid-docs-url~/workflows/experience/summary-group/). Given the default output of that node, you should target the `children` property of the returned object when instantiatiing the component; see the examples below.

The component will iterate over the array and create an item for each in the tree as well as additional sub-trees if any item has child items.

### Arguments

Additional arguments are passed in as key-value pairs after the context argument. **Note:** The component's default argument values are written with the returned value of the Group: Summary Node in mind.

| Property          | Description                                                                                                                                                                                                                                                                                                                                                                                                        | Default               |
|-------------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|-----------------------|
| id                | ([HTML5 ID](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/id)) The ID of the element into which the tree will be rendered. Note: If you are using multiple instances of this component on one page, this property is required and must be unique per instance.                                                                                                               | "tl-collapsible-list" |
| expandAll         | (Boolean) Whether the entire tree should be expanded by default.                                                                                                                                                                                                                                                                                                                                                   | false                 |
| inputName         | (String) If set, this will render checkboxes with each item in the tree, and the checked values (from `itemValueProp`) will be available on form submission at the specified input name. If `itemComponentName` is set, this prop has no effect.                                                                                                                                                                   |                       |
| selectedValues    | (String or Array) The default value(s) that are selected on mount of the component, as matched against the `itemValueProp` argument when iterating over the array items. Any selected item will have its parents in the tree expanded by default. If `inputName` is provided, value(s) passed here also represent the checkboxes that should be checked by default.                                                   |                       |
| itemChildrenProp  | (String) The prop under each iterated object where the children of the current item can be found. The value found at this prop should be an array of objects in the same shape as the current item.                                                                                                                                                                                                                | "children"            |
| itemComponentName | ([Component Name](https://~exportplaceholderid-docs-url~/experiences/views/#components)) If set, a component to render for each item in the iteration. Setting this value overrides all item-level props except for `itemChildrenProp`.                                                                                                                                                                                           |                       |
| itemLabelTemplate | (String [Template](https://~exportplaceholderid-docs-url~/workflows/accessing-payload-data/#string-templates)) The label text for each item in the list. If `itemComponentName` is set, this prop has no effect.                                                                                                                                                                                                                  | "{{this.name}}"       |
| itemLinkTemplate  | (String [Template](https://~exportplaceholderid-docs-url~/workflows/accessing-payload-data/#string-templates)) The URL link for each item in the list. If `itemComponentName` or `inputName` are set, this prop has no effect. If neither `itemComponentName` nor `inputName` are set, this prop is required.                                                                                                                 |                       |
| itemValueProp     | (String) The name of the prop on each iterated object where the value associated with each menu item can be found. This prop is used for determining whether each item should be selected by default, and also the value to associate with the selection when using this component as a form element (i.e. when the `inputName` argument is set). The value of this prop should be unique per item in the array. | "id"                  |

## Examples

In each of the following implementations examples, assume that the context passed into the component includes an array of [Experience Groups](https://~exportplaceholderid-docs-url~/experiences/groups/) generated from the [Group: Summary Node](https://~exportplaceholderid-docs-url~/workflows/experience/summary-group/) with the following configuration:
- The Result Path is set to "pageData.experienceGroups".

### Using Tree for Navigation

Assuming you have an [Experience Endpoint](https://~exportplaceholderid-docs-url~/experiences/endpoints/) for the route `GET /groups/{groupId}`, the tree can link users to specific groups (and display the currently selected group) as shown below:

```
{{component
  'tl-collapsible-tree'
  pageData.experienceGroups.children
  selectedValues=request.params.groupId
  itemLinkTemplate="/groups/{{this.groupId}}"
}}
```

### Using Tree for Form Values

Given a form where you wish to submit the selected group IDs under the name "groupIds", and where the tree should display the newly-submitted IDs as selected items, you would configure this component as shown below:

```
{{component
  'tl-collapsible-tree'
  pageData.experienceGroups.children
  id="component-as-input"
  selectedValues=request.body.groupIds
  inputName="groupIds"
}}
```

**Note**: Form values submitted in this fashion can hit your endpoint either as a string or as an array of strings, depending on whether one or multiple items are checked.

### Using a Custom Component for Tree Items

Given an array of groups, you could render a custom component for displaying an image in the menu item as shown below:
```
{{component
  'tl-collapsible-tree'
  pageData.experienceGroups.children
  id="custom-label-component"
  selectedValues=request.query.groupIds
  itemComponentName="example-component"
}}
```

Then, your "example-component" (which receives the current iterated item as its context), would look similar to:

```
<span class="my-custom-class">
  {{this.name}} ({{this.id}})
</span>
```

## License

Copyright (c) 2020 Losant IoT, Inc. All rights reserved.

Licensed under the [MIT](https://github.com/Losant/losant-templates/blob/master/LICENSE.txt) license.

https://www.losant.com