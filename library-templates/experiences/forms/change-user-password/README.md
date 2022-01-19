# Change Password Experience Form

This template demonstrates how to allow [Experience Users](https://docs.losant.com/experiences/users/) to change their account password. As part of the template, you may also define password complexity rules for your Experience User accounts beyond the minimum 8 characters required by Losant.

## Dependencies

This template requires no additional dependencies; however, the markup within the included page is built around the [Twitter Bootstrap](https://getbootstrap.com/) framework. Therefore, Losant recommends installing the Bootstrap 4 Layouts template along with this one.

## Usage

Installing this template adds the following resources to your application:

- Two [Experience Endpoints](https://docs.losant.com/experiences/endpoints/) for serving the Change Password page and receiving values from the user.
- An [Experience Workflow](https://docs.losant.com/workflows/experience-workflows/) that provides data to the Change Password page, validates the user input, and updates the user's password in your application.
- An [Experience Page](https://docs.losant.com/experiences/views/#pages) that displays input fields for the current and new password, validates the inputs against the complexity rules, and provides feedback to the user post-submission.

### Endpoint Routes

Users must be signed in to view the Change Password page and to submit the form. By default, both endpoints have a route of `/tl-change-password` to avoid potential collisions with existing `/change-password` routes on template import. You may change these routes within the configuration screens for each endpoint. **If you change one, you must change the other to match.**

### Defining Password Complexity Rules

Losant only enforces that Experience User passwords be between 8 and 2,048 characters. This template includes three [workflow global](https://docs.losant.com/workflows/overview/#workflow-globals) variables that allow you to change the password complexity rules, with the new password being validated against these rules client-side and server-side:

- `requireStrongPassword`: Whether to enforce your additional password validation rules. **This is `true` by default**; change this to `false` or remove the global variable to fall back to Losant's basic password rules.
- `strongPasswordRegExp`: A [regular expression](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions) defining the rules for your password complexity. (See below for the default value.)
- `strongPasswordExplanation`: A human-readable explanation of the password rules defined in `strongPasswordRegExp`. This is displayed to users of the Change Password page as instructions for how to format their new password.

If `requireStrongPassword` is `false` or is deleted, the `strongPasswordRegExp` and `strongPasswordExplanation` variables have no effect.

By default, this template has the following regular expression as the value for the `strongPasswordRegExp`, which applies to all Experience User password change requests:

```
^(?=.*[A-Z])(?=.*[^A-Za-z0-9])(?=.*[0-9])(?=.*[a-z]).{12,}$
```

This regular expression matches the same password requirements for [Losant user accounts](https://docs.losant.com/user-accounts/overview/), dictating that new Experience User passwords must have ...

- `(?=.*[A-Z])`: At least one uppercase letter (A-Z)
- `(?=.*[^A-Za-z0-9])`: At least one special (non-alphanumeric) character (!@#$%-,. etc.)
- `(?=.*\d)`: At least one number (0-9) 
- `(?=.*[a-z])`: At least one lowercase letter (a-z)
- `{12,}`: At least 12 characters

If you wish to change the complexity rules as defined in the `strongPasswordRegExp` workflow global, you should also change the text within the `strongPasswordExplanation` global variable to explain what you expect to your Experience Users.

### New User Accounts

If you are utilizing the advanced password complexity rules provided with this template, note that the rules **only apply password to in-session, existing account password changes**. In other words, rules will not apply to new Experience User accounts or for Experience Users who are resetting a forgotten password.

If you wish to apply these rules for those situations as well, multiple elements of the template must be ported over to your other flows, including:

- The workflow global values defining the complexity rules. (These can be migrated to [application globals](https://docs.losant.com/applications/overview/#application-globals) to reduce repetition.)
- The [Validate Payload Node](https://docs.losant.com/workflows/logic/validate-payload/), which validates the user's submitted password against the complexity regular expression. (You will probably want to copy the rules for the "newPassword" field only.)
- The "New Password" input from the [Experience Page](https://docs.losant.com/experiences/views/#pages), which utilizes the regular expression defined in the `strongPasswordRegExp` for improved client-side validation.

**Note:** The enhanced password validation also do not apply when a Losant user changes an Experience User's password through the Losant web interface.

## License

Copyright (c) 2022 Losant IoT, Inc. All rights reserved.

Licensed under the [MIT](https://github.com/Losant/losant-templates/blob/master/LICENSE.txt) license.

https://www.losant.com