# Edit Profile Experience Form

This template demonstrates how to allow [Experience Users](https://docs.losant.com/experiences/users/) to edit their personal profiles, including their email address, name, and abritrary values stored as tags on the Experience User object. As part of the template, you may define which (if any) tags the user may edit, and you may also decide which tags to expose to your users as read-only values.

## Dependencies

This template requires no additional dependencies; however, the markup within the included page is built around the [Twitter Bootstrap](https://getbootstrap.com/) framework. Therefore, Losant recommends installing the Bootstrap 4 Layouts template along with this one.

## Usage

Installing this template adds the following to your application:

- Two [Experience Endpoints](https://docs.losant.com/experiences/endpoints/) for displaying the Edit Profile page and receiving values from the user.
- An [Experience Workflow](https://docs.losant.com/workflows/experience-workflows/) that serves the Edit Profile page, validates the user input, and updates the user in your application.
- An [Experience Page](https://docs.losant.com/experiences/views/#pages) that displays all profile form fields, including read-only values, and provides feedback to the user post-submission.

By default, the template allows users to edit their email address, first name, and last name. All three fields are required. You may also define one or more [User Tags](https://docs.losant.com/experiences/users/#user-tags) that the Experience User should be allowed to manage.

### Defining Exposed Tags

User Tags can store a variety of meta values pertaining to a given Experience User, and you may not wish to expose some of these values to the users themselves. For that reason, you must opt in to any tags you wish to expose, and that is managed through a [workflow global](https://docs.losant.com/workflows/overview/#workflow-globals) value.

That global has a key of `exposedUserTags` and is of the "JSON" type. Its value must be an array of objects, and each object accepts the following properties:

- `key`: This corresponds to the key of the User Tag to expose. If a value exists for the provided tag, the input will be populated with that value when the Experience User first visits the Edit Profile page.
- `label`: If set, this string will appear as the label for the input. If not set, the `key` will be used as the label.
- `required`: If set to `true`, the tag will be treated as a required field.
- `type`: If set, the Edit Profile page will apply the type to the input (such as "email" or "tel"). This affects client-side validation as well as what sort of keyboard is exposed to mobile visitors.
- `readOnly`: If set to `true`, users will see this value in a disabled form field, but they will not be able to change its value.
- `pattern`: This is a [regular expression](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions) that the user's input must validate against in order for the tag to be accepted.

What you enter in this global variable dictates:

- Which User Tags are exposed to your Experience Users, including which are read-only vs. editable.
- How submission requests are validated server-side (i.e. within the workflow).
- Client-side validation rules, i.e. whether it is required, what regular expression pattern the input must match, and what type of input to display.

For demonstration purposes, this template includes three values in the `exposedUserTags` global variable that utilize different combinations of the properties described above. For example, the global value set in the template includes a "phone" tag that is required, and whose value must be a 10-digit number.

### Configuring the Page

The included page does not require any configuration. Form fields and client-side validation rules are based on the `exposedUserTags` global variable defined in the workflow.

However, the page does include a `<head>` section and other layout-style markup beneath the form (for example, the closing `</body>` and `</html>` tags). Most users will want to delete these sections and apply their own [layout](https://docs.losant.com/experiences/views/#layouts) to the page. The deletable sections are noted in the page's markup.

## License

Copyright (c) 2022 Losant IoT, Inc. All rights reserved.

Licensed under the [MIT](https://github.com/Losant/losant-templates/blob/master/LICENSE.txt) license.

https://www.losant.com