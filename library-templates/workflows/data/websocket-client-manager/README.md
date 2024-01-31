# WebSocket Client Manager

This template demonstrates how to track client connections to a [WebSocket](https://en.wikipedia.org/wiki/WebSocket)-type [Losant Webhook](https://docs/losant.com/applications/webhooks/). The template also demonstrates how to send messages to, and receive messages from, currently connected clients.

## Included Resources

This template includes two application resources:

- A [Webhook](https://docs.losant.com/applications/webhooks/) configured to accept WebSocket requests. By default, the webhook has no [basic authentication](https://docs.losant.com/applications/webhooks/#basic-auth) applied.
- An [Application Workflow](https://docs.losant.com/workflows/application-workflows/) containing a [Webhook Trigger](https://docs.losant.com/workflows/triggers/webhook/) that fires on client connections, disconnections, and messages to the webhook.

## Usage

After importing this template, **you must first enable the included workflow**. While WebSocket clients can connect to the webhook without enabling the workflow, you will be unable to track the clients, take action based on their messages, or communicate with them without enabling the workflow first.

### Testing Connections

Once you have enabled the workflow, you can test it by establishing a connection to the webhook using one of several third-party tools. For example ...

- [Postman](https://www.postman.com/downloads/) is a free, robust, easy-to-use tool for making test HTTP and WebSocket requests.
- There are web-based tools, such as this [WebSocket tester from PieHost](https://piehost.com/websocket-tester), that also allow for establishing connections to WebSocket servers.

### Sending Messages to Clients

The workflow includes a separate collection of nodes with two [Virtual Button Triggers](https://docs.losant.com/workflows/triggers/virtual-button/): one for retrieving a list of currently connected clients and one for broadcasting a message to all connected clients. The broadcast button demonstrates how to use the [Webhook: Reply Node](https://docs.losant.com/workflows/outputs/webhook-reply/) to send a message to a connected client in response to some action other than an initial message from the client.

## How It Works

The template makes use of [workflow storage](https://docs.losant.com/workflows/overview/#workflow-storage) to maintain a list of currently connected clients and the last messages to and from each client. Each client is keyed by a prefix and its `replyId` in storage, and the [atomic](https://en.wikipedia.org/wiki/Atomicity_(database_systems)) nature of storage reads and writes ensures that no updates are ever missed.

- On a new client connection, an entry is added to workflow storage for the new client, and the client's `replyId` property is immediately sent back to the client.
- New messages received from a client result in a lookup of the client and the received message being written to its storage entry.
- On disconnection, the client entry is removed from workflow storage.

## Extending the Template

This template should serve as a starting point for managing WebSocket client connections; users who import this template should modify it to fit their application's needs. For example, if clients are sending device telemetry data over the WebSocket connection, then a [Device: State Node](https://docs.losant.com/workflows/outputs/device-state/) should be added to record that data to the time series database.

## License

Copyright &copy; 2024 Losant IoT, Inc. All rights reserved.

Licensed under the MIT license.

https://www.losant.com