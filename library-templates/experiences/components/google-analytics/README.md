# Google Analytics Experience Component

This template adds a component containing the JavaScript snippet required to track your Experience Users' pageviews within Google Analytics.

## Dependencies

This template requires you to have a [Google Analytics](https://marketingplatform.google.com/about/analytics/) account and to set up a property for your [experience's domain or slug](https://docs.losant.com/experiences/domains/).

## Usage

The template contains one component, which should be used only once within any rendered page:

```
{{component 'tl-google-analytics' 'GA_MEASUREMENT_ID'}}
```

Where 'GA_MEASUREMENT_ID' is replaced with your [Google Analytics property's tracking ID](https://support.google.com/analytics/thread/13109681?hl=en), usually in a format like 'UA-XXXXXXXX-X' or 'G-YYYYYYYYYY'.

Losant recommends placing the component inside the opening `<head>` tag in your experience layout(s) for best performance, though this is not required. However, the tracking code must only display once within any rendered experience page; otherwise, your duplicate tracking codes may register multiple pageviews.

### Adding a User ID

To take advantage of Google's [User-ID feature](https://support.google.com/analytics/answer/3123662?hl=en), you may pass an additional argument to the component specifying the a unique identifier for your experience user. We strongly recommend using the ID assigned to the user by Losant, which is guaranteed to be unique not just across your application, but across all applications.

In most cases, this would be implemented as follows:

```
{{component 'tl-google-analytics' 'GA_MEASUREMENT_ID' user_id=experience.user.id}}
```

This value will automatically resolve to the experience user's ID if this component is used directly within an experience page or layout. However, if the component is used within another component, you may need to manually pass the value in from the context exposed to the parent component.

---

## License

Copyright &copy; 2022 Losant IoT, Inc. All rights reserved.

Licensed under the [MIT](https://github.com/Losant/losant-templates/blob/master/LICENSE.txt) license.

https://www.losant.com