# Industrial Equipment Monitor
This template illustrates an industrial equipment monitoring solution. This is a multi-tenant application that OEMs, telcos, or any other solution provider can offer to their customers as a way to remotely monitor their equipment. This template is meant to be used as a learning tool and starting point for your own applications.

## Key Components
* Sample devices based on industrial power generators.
* Live and historial overview and device dashboards.
* Sample fault and maintenance monitoring.
* Multi-tenant experience with built-in access control based on customer.

## Setup
Enable the [Simulate Devices](/applications/~exportplaceholderid-application-applicationIndustrialEquipmentMonitor-0~/workflows/~exportplaceholderid-flow-simulateDevices-0~/develop) workflow.

## Device Simulation
When the [Simulate Devices](/applications/~exportplaceholderid-application-applicationIndustrialEquipmentMonitor-0~/workflows/~exportplaceholderid-flow-simulateDevices-0~/develop) workflow is enabled, it will generate random sensor data for all generator devices every two minutes.

The most common state for every device is "Running," however there is a small chance that a generator will also be "Stopped" or "Faulted." When a device is running, the `days_running` and `hours_running` device attributes are incremented appropriately.

When a device is in the "Faulted" state, the specific fault will be a random item from the [warning_and_alarms](/applications/~exportplaceholderid-application-applicationIndustrialEquipmentMonitor-0~/data-tables/~exportplaceholderid-dataTable-warningsAndAlarms-0~) data table.

## Dashboards
This template includes two dashboards. One displays an overview with aggregate data for all devices for the current user. The other displays details for a specific device.

### Overview Dashboard
The [Overview](/dashboards/~exportplaceholderid-dashboard-overview-1~) dashboard uses an experience user context variable to define which user is viewing this dashboard. All blocks on this dashboard use this context variable to query devices that are only associated with this user. The [page-dashboard-overview](/applications/~exportplaceholderid-application-applicationIndustrialEquipmentMonitor-0~/experience/versions/develop/pages/~exportplaceholderid-experienceView-pageDashboardOverview-2~/properties) experience page provides this context variable.

### Generator Details Dashboard
The [Generator Details](/dashboards/~exportplaceholderid-dashboard-generatorDetails-0~) dashboard uses a device context variable to display details for a specific device. The [page-dashboard-device](/applications/~exportplaceholderid-application-applicationIndustrialEquipmentMonitor-0~/experience/versions/develop/pages/~exportplaceholderid-experienceView-pageDashboardDevice-3~/properties) experience page provides this context variable.

## Experience
This template includes a multi-tenant experience with two example tenants: "Sadler-Isberg" and "Tekton Health." Each tenant represents a hospital chain that deploys power generators across their facilities. The devices that make up this template are divided between these two tenants.

When a user logs in, they are presented an overview dashboard and a list of devices associated with their tenant. When a device is selected, the user sees a dashboard showing the details for that specific device.

To view this experience yourself, navigate to the [Experience Edit](/applications/~exportplaceholderid-application-applicationIndustrialEquipmentMonitor-0~/experience/versions/develop) page and select the URL at the top of the screen. This takes you directly to the login page where you can log in using one of the users below.

### Users
This template includes three users:

1. `kanarra@example.com`—Admin user who has access to all devices.
2. `sadler-isberg@example.com`—User assigned to the [Sadler-Isberg](/applications/~exportplaceholderid-application-applicationIndustrialEquipmentMonitor-0~/experience/groups/~exportplaceholderid-experienceGroup-sadlerIsberg-1~/members) group with access only to those devices.
3. `tekton-health@example.com`—User is assigned to the [Tekton Health](/applications/~exportplaceholderid-application-applicationIndustrialEquipmentMonitor-0~/experience/groups/~exportplaceholderid-experienceGroup-tektonHealth-2~/members) group with access only to those devices.

The password for all users is `qwerty123`. Users can be modified, added, or removed by navigating to this applications's [Users & Groups](/applications/~exportplaceholderid-application-applicationIndustrialEquipmentMonitor-0~/experience/users) page.

## Resources
The following list contains helpful resources that are related to how this template is implemented:

* [Dashboard Context Variables](https://~exportplaceholderid-docs-url~/dashboards/context-variables/)
* [Experience Dashboard Pages](https://~exportplaceholderid-docs-url~/experiences/views/#dashboard-pages)
* [Experience Users](https://~exportplaceholderid-docs-url~/experiences/users/)
* [Experience Groups](https://~exportplaceholderid-docs-url~/experiences/groups/)
* [Nested Experience Groups Webinar](https://www.losant.com/deeper-dive-webinar-series?demo=nested-experience-groups)

---

This template was created by Losant. For license details, or to submit feature requests or bugs, visit the [GitHub repository](https://github.com/Losant/application-templates). If you have general questions or comments, let us know on the [Losant Forums](https://forums.losant.com).

Copyright (c) 2020 Losant IoT, Inc

https://www.losant.com