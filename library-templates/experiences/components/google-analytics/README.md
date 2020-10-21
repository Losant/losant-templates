# Google Analytics Experience Component

This template adds a component containing the JavaScript snippet required to track your Experience Users' pageviews within Google Analytics.

## Dependencies

This template requires you to have a [Google Analytics](https://marketingplatform.google.com/about/analytics/) account and to set up a property for your [experience's domain or slug](https://docs.losant.com/experiences/domains/).

## Usage

The template contains one component which should be used only once within any rendered page:

```
{{component 'tl-google-analytics' 'UA-XXXXXXXX-X'}}
```

Where 'UA-XXXXXXXX-X' is replaced with your [Google Analytics property's tracking ID](https://support.google.com/analytics/thread/13109681?hl=en).

Losant recommends placing the component inside the opening `<head>` tag in your experience layout(s) for best performance, though this is not required. However, the tracking code must only display once within any rendered experience page; otherwise, your duplicate tracking codes may register multiple pageviews.

## License

Copyright (c) 2020 Losant IoT, Inc. All rights reserved.

Licensed under the [MIT](https://github.com/Losant/losant-templates/blob/master/LICENSE.txt) license.

https://www.losant.com