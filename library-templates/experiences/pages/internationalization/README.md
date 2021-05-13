# Experience Internationalization

This template demonstrates how to build a multilingual [Application Experience](https://~losant-docs-url~/experiences/overview/), with the language managed in the URL and controlled by a dropdown menu.

## Dependencies

The included language selector dropdown requires the use of [Twitter Bootstrap v4](https://getbootstrap.com/docs/4.6/getting-started/introduction/) as a CSS and JS framework. Losant recommends installing the "Bootstrap 4 Layouts" template in conjunction with this one.

## Included Resources

This template includes the following resources for setting up your multilingual experience:

- A [Custom Node](https://~losant-docs-url~/workflows/custom-nodes/overview/) that returns a dictionary for the specified language as well as other helpful info that can be used in the user interface.
- An [Experience Component](https://~losant-docs-url~/experiences/views/#components) that renders a language dropdown selector.
- Another Experience Component that renders the appropriate `<link>` tags to be placed in your page's `<head>`.
- A third Experience Component that renders a language-specific URL; this is used within the other two components listed above.

The template also includes these resources for demonstrating the functionality:

- Two [Experience Endpoints](https://~losant-docs-url~/experiences/endpoints/) – one for serving the chosen language as a path parameter, and one for serving it as a subdomain. (The subdomain example requires additional setup as described below.)
- An [Experience Workflow](https://~losant-docs-url~/workflows/experience-workflows/) that handles requests to the two endpoints, returns the selected language's dictionary using the provided custom node, and issues replies.
- An [Experience Page](https://~losant-docs-url~/experiences/views/#pages) that displays content in the chosen language, along with the language selector dropdown.
- Three dictionary examples for English, Spanish, and French, all provided as CSVs in [Application Files](https://~losant-docs-url~/applications/files/).

## Choose a Language Management Mode

Google specifies a few different best-practice methods for [managing multilingual content](https://developers.google.com/search/docs/advanced/crawling/managing-multi-regional-sites#using-locale-specific-urls), all of which center around specifying the content's language as an [ISO language code](https://www.w3schools.com/tags/ref_language_codes.asp) in the URL.

The method you choose will affect this template's setup steps. While the mode can be changed at a later date, doing so requires additional steps to redirect traffic from the previous language mode to the new one. Resources to assist with that migration are not included in this template.

### Language as a Path Parameter

If you wish to manage the chosen language in the path of your URL (i.e. "mydomain.com/LANGUAGE/foo/bar"), you will need to update all of your endpoints to take the language as an initial [parameter](https://~losant-docs-url~/experiences/endpoints/#route). For example:

- A path of "/foo/bar" becomes "/{language}/foo/bar".
- A path of "/devices/{id}" becomes "/{language}/devices/{id}".

### Language as a Subdomain

Outside of the one-time configuration of the [Experience Domain(s)](https://~losant-docs-url~/experiences/domains/), managing the chosen language as a subdomain (i.e. "LANGUAGE.mydomain.com") is the easier of the two options supported by this template. Doing so requires setting up either:

- Individual domains per supported language ("en.mydomain.com" and "fr.mydomain.com"), or
- One [wildcard](https://en.wikipedia.org/wiki/Wildcard_DNS_record) subdomain, where the wildcard represents the language code ("*.mydomain.com").

### Language as a Country Code TLD

Out of the box, this template _does not support_ managing the language as [country code top-level domain](https://en.wikipedia.org/wiki/Country_code_top-level_domain), or ccTLD ("mydomain.us" or "mydomain.fr"). However, with some modifications to the custom node and components, this could be achieved relatively easily.

Using the template as such would also require registering multiple experience domains (one for each ccTLD).

## Usage

Setting up a multilingual site takes quite a bit of work, and while this template can be used as a starting point, there are a number of changes you must make within your application to fully internationalize your end-user experience.

In addition, when utilizing this template, **none of your endpoints may make use of [static replies](https://~losant-docs-url~/experiences/endpoints/#reply-types)**; all must use a workflow to respond to the request because the workflow is necessary to look up the language dictionary.

### Configuring Endpoints and Domains

As described above, if you are storing the chosen language as a path parameter, this will require adjusting all of your existing paths to begin with a parameter to hold the language (i.e. "{language}").

Steps for configuring subdomains are also described above if you are specifying the language at the beginning of your URL.

### Setting Up Languages

There are multiple steps to setting up a new language in your application.

#### Building a Dictionary

There are three sample language dictionaries, stored as CSVs, included in this template. They can be found in your Application Files under the "tl-i18n-dictionaries" directory.

While not required, it is a good convention to name the files after the two-character language code they represent (such as "en.csv" and "fr.csv").

The contents of each CSV is two columns:

- `key` is the unique identifier for the string. Each CSV in your application should have an entry for a given key.
- `value` is the language-specific string to print when its corresponding key is referenced in a template.

Each row in the CSV after the header represents an internationalized string used in your application. As new text is added, new entries should be added to each CSV for the text, with the `key` being the grouping identifier across each language.

#### Defining a Language

At the top of the included Custom Node is a [Mutate Node](https://~losant-docs-url~/workflows/logic/mutate/) that defines each supported language in your application as a JSON object. Additional languages can be added to your application by including a new entry within this node.

Each object contains the following keys:

- `url`: The public URL pointing to the CSV from which the dictionary will be loaded.
- `label`: The title of the language. This title should be in the same language as the dictionary it represents. The label is used in the language selector dropdown.
- `emoji`: The [Emoji representation](https://emojipedia.org/flags/) of the language's flag. This is also used in the language selector dropdown.
- `default`: A boolean that, when set to `true`, specifies which language should be listed as the default in your HTML `<head>`. Only one of your languages should have this property set.

### Using the Custom Node

As stated above, every endpoint must utilize a workflow that starts with an [Endpoint Trigger](https://~losant-docs-url~/workflows/triggers/endpoint/) and responds using an [Endpoint Reply Node](https://~losant-docs-url~/workflows/outputs/endpoint-reply/). Between them, the dictionary must be loaded onto the payload through the provided Custom Node.

If a dictionary for the specified language cannot be found, the Custom Node will take its `false` output. This allows you an opportunity to render a custom 404 page or redirect the user to the same page in your default language.

Prior to your Endpoint Reply Node in each workflow, you must include an instance of the Custom Node included in this template. The Custom Node takes the following inputs:

#### Path-Based Language Management

- **Language Template**: This allows for specifying the language code directly, which you must do if you are managing the chosen language as a path parameter. In such a case, the value to insert in this input will likely be `{{data.params.LANGUAGE}}`, where "LANGUAGE" is the name of the parameter you set at the start of each of your experience endpoints.
- **Path Template**: This is also required if using the path as the language manager. This value likely should be set to `{{data.path}}`.

#### Subdomain-Based Language Management

- **Host Template**: This must be provided if you are managing your language as a subdomain. Assuming you have not mutated your original endpoint request payload to remove the value, this should be set to `{{data.headers.host}}`.

### Rendering Dictionary Values

Within an Experience Page, you can render an interationalized string on your payload by referencing the payload path to the string's cross-language unique key.

For example, if you place the result of the custom node's output at the path `pageData.dictionaryInfo`, and you set the additional render context as the value at the path of `pageData`, you could render a string with the key of "myString" using the following Handlebars helper:

```
{{pageData.dictionaryInfo.dictionary.myString}}
```

You can also use the built-in [`{{#with}}` Handlebars helper](https://handlebarsjs.com/guide/builtin-helpers.html#with) to shorten the variable names when using them multiple times in one file. For example ...

```
{{#with pageData.dictionaryInfo as |dictionaryInfo|}}
  {{#with dictionaryInfo.dictionary as |dictionary|}}
    ...
    {{dictionary.myString}}
  {{/with}}
{{/with}}
```

In an Experience Component, there are a few different ways to render the interationalized string. Given a value you wish to render from your dictionary at the key "myString", you must either:

- Pass the dictionary as [context](https://~losant-docs-url~/experiences/views/#passing-custom-context). Given a component rendered as `{{component 'my-component' pageData.dictionaryInfo.dictionary}}`,render the string as `{{myString}}`.
- Pass the dictionary as a [custom argument](https://~losant-docs-url~/experiences/views/#passing-custom-arguments). Given a component rendered as `{{component 'my-component' dictionary=pageData.dictionaryInfo.dictionary}}`, render the string as `{{@args.dictionary.myString}}`.
- Reference the `@root` payload. Regardless of the context or arguments passed to your component, render the string as `{{@root.pageData.dictionaryInfo.dictionary.myString}}`.

### Rendering a Language Selector

The included Custom Node also provides all the information needed to render a language selector; you may use the Experience Component included with this template or build your own:

- `dictionaries`: This is the same object defined at the beginning of your custom node, and it includes the language codes as object keys, and the label and emoji as values. It will also include the flag for your default language.
- `selectedLanguage`: This is the code for the currently selected language. This allows you to add a selected state to one of the options in your selector dropdown.
- `pathNoLanguage`: When using path-based language management, this value provides the current path after the domain with the language removed. This can be used to construct paths to the same page in other languages.
- `hostNoLanguage`: When using subdomain-based language management, this value is the current domain without the language code as a subdomain. This can be used to construct paths to the same page in other languages.

---

## License

Copyright &copy; 2021 Losant IoT, Inc. All rights reserved.

Licensed under the [MIT](https://github.com/Losant/losant-templates/blob/master/LICENSE.txt) license.

https://www.losant.com