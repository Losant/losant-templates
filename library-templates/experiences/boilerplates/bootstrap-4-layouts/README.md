# Bootstrap 4 Layouts

This template includes a variety of page layout configurations built within the [Bootstrap 4 framework](https://getbootstrap.com/). While it is not required to use Bootstrap 4 within your application experience, all other experience templates are built with this framework in mind. Therefore, this template is a great starting point for any new application experience.

## Dependencies

This template does not require any additional dependencies; all required scripts and markup are included in the template.

## Usage

When configuring your [Experience Pages](https://~exportplaceholderid-docs-url~/experiences/views/#pages), choose one of the included layouts for the page configuration:

- **Fixed Width, Single Column:** The container width is one of a handful of fixed sizes, which changes with current width of the browser window. At small window sizes (such as on mobile devices), the container width is equal to the window width. This container works well for static content pages.
- **Fixed Width, Two Columns:** The container width is similar to the single column version, but it includes a narrow left column and a wider right column. At smaller window sizes, the left column displays below, instead of alongside, the right column.
- **Fluid Width, Single Column:** The container width matches the current width of the browser window, regardless of window size. This container is a good choice for [Dashboard Pages](https://~exportplaceholderid-docs-url~/experiences/views/#dashboard-pages).
- **Fluid Width, Two Columns:** The container width is similar to the single column version, but it includes a narrow left column and a wider right column. At smaller window sizes, the left column displays below, instead of alongside, the right column.

### Configuring Navigation

The header navigation is configured in a separate component (`tl-nav-bs4`) so that changes to the navigation need only be made in one spot, instead of within each layout. By default, the nav contains a few placeholder links and a right-aligned dropdown for users to sign in and sign out.

At smaller window sizes, the navigation collapses into a mobile-friendly "hamburger menu."

### Section Helpers

The layouts include two named section helpers:

- `pageTitle`: This allows for setting a custom page title, which is crawled by search engines and displays alongside your favicon in a browser tab. By default, this section is filled with the name of the page being rendered as given to it within your Experience configuration.
- `tl-left-column`: In the two-column layouts, this allows for overriding the content that appears in the left (smaller) column. Your experience page appears in the right (larger) column. **Note:** In many cases, this content remains the same for all pages that use a given layout; therefore, we recommend editing the default left column content in each layout and only using the `{{#fillSection}}` block helper when it is necessary to override the default content.

```
{{#fillSection 'NAME_OF_SECTION'}}This content will replace the default content in its corresponding "section" tag.{{/fillSection}}
```

### Favicon

The template includes a placeholder favicon in your Application Files in the "/tl-bs4-layouts" directory. To replace this with your brand's icon, simply upload a new file named "favicon.ico" to overwrite the file in this directory.

## License

Copyright (c) 2020 Losant IoT, Inc. All rights reserved.

Licensed under the [MIT](https://github.com/Losant/losant-templates/blob/master/LICENSE.txt) license.

https://www.losant.com