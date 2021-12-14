# File Upload Form

This template demonstrates how to accept large file uploads from [Experience Users](https://~exportplaceholderid-docs-url~/experiences/users/) and place them in [Application Files](https://~exportplaceholderid-docs-url~/applications/files/). This allows for receiving larger files (images, CSVs, etc.) through an [Experience Endpoint](https://~exportplaceholderid-docs-url~/experiences/endpoints/) that would otherwise be rejected for not fitting within the allowed workflow payload size limit.

## Dependencies

This template has no additional dependencies, though the interface is tailored to the [Bootstrap 4](https://getbootstrap.com/docs/4.5/getting-started/introduction/) framework, as are all experience-based templates. While not required, we recommend building out your application experiences using this framework.

## Usage

This template includes the following resources:

1. One [Experience Page](https://~exportplaceholderid-docs-url~/experiences/views/#pages): Displays the form input and handles the file upload to the underlying storage engine.
2. Two [Experience Endpoints](https://~exportplaceholderid-docs-url~/experiences/endpoints/): One for replying to requests to display the form, and one to handle requests to upload a file.
3. One [Experience Workflow](https://~exportplaceholderid-docs-url~/workflows/experience-workflows/): Handles requests to the included endpoints, including generating and replying with a signed URL that the browser can use to complete the file upload.

After importing the template, in a browser visit the page "/tl-file-upload" on your [experience domain or slug](https://~exportplaceholderid-docs-url~/experiences/domains/). Click the "Choose File" button to browse your computer's file system and choose a file to upload. then click the "Upload File" button. Depending on the size of the file, the upload may take a few seconds.

### Accessing Uploaded Files

Uploaded files are publicly available at a URL of the form "https://~exportplaceholderid-files-domain~/APPLICATION\_ID/UPLOAD\_ROOT/USER_ID/FILE_NAME.EXT", where ...

- `APPLICATION_ID` is the ID of the application where you've imported this template.
- `UPLOAD_ROOT` is the root directory for all user uploads. This can be changed by setting the `uploadsRoot` [workflow global](https://~exportplaceholderid-docs-url~/workflows/overview/#workflow-globals). The default value is "userUploads".
- `USER_ID` is the ID of the Experience User who uploaded the file. This defaults to "\__anonymous__" if the file was uploaded by a non-signed-in user.
- `FILE_NAME.EXT` is the name of the uploaded file, including its extension (e.g. ".jpg", ".png").

You may also browse all user uploads by visiting your [Application Files](https://~exportplaceholderid-docs-url~/applications/files/) and navigating to the directory defined in the `uploadsRoot` global.

### Limiting Accepted File Types

Optionally, you may limit the types of files users may upload by defining a list of acceptable [MIME types](https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/MIME_types). These can be defined by defining a workflow global with the key "accept" and a value of a JSON array of MIME type strings.

In addition to validating that file upload requests match one of the provided MIME types within the workflow, these types will also be sent down to the rendered page and applied to the file input. Doing so limits which files the user can select in the file system to one of the provided types.

The workflow includes an `example-accept` global demonstrating the expected format, with the value being a list of standard image formats. To accept only image uploads, you may rename this global key to "accept".

### User Access

By default, this template allows all site visitors to upload files, with non-signed-in user files being lumped together in a single directory and signed-in user files scoped to directories based on user ID.

To limit file uploads to just signed-in users:

- Update the [access control](https://~exportplaceholderid-docs-url~/experiences/endpoints/#access-control) for both the  `GET /tl-file-upload` and `POST /tl-file-upload` endpoints to only allow requests from "Any authenticated user".
- For the `GET` endpoint, you likely want to issue a [static reply](https://~exportplaceholderid-docs-url~/experiences/endpoints/#reply-types) for unauthorized users, redirecting them to your sign-in page.
- Besides the access control update, no additional changes are needed for the `POST` endpoint.

## How It Works

Unlike a traditional form submission, this template executes the submission [asynchronously](https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Asynchronous/Concepts) - or, without requiring a full page refresh. Also, the actual uploading of the file is executed by the browser as an additional step, instead of submitting the file itself directly to the workflow engine.

1. The user visits the page that renders the form.
2. The user chooses a file to upload and clicks the "Submit File" button. The button flips into a "working" state to alert the user that the request is in progress.
3. The browser makes an asynchronous request to the `POST` endpoint included in this template, sending along meta information about the file (name, size, content type) but not the file contents itself.
4. The workflow receives the request, validates the submitted info (including, optionally, whether the file is a valid content type), and replies with a signed URL and any parameters needed to authenticate the signed request.
5. The browser receives this URL and immediately begins a new asynchronous request to the signed URL, sending the actual file contents as part of the request.
6. On completion of the upload, the signed URL request resolves and replies to the browser, indicating whether the upload was successful.
7. Feedback is provided to the user in the browser in the form of the button returning to a clickable state and an alert message indicating an error (if applicable) or that the request succeeded.

## License

Copyright &copy; 2021 Losant IoT, Inc. All rights reserved.

Licensed under the [MIT](https://github.com/Losant/losant-templates/blob/master/LICENSE.txt) license.

https://www.losant.com