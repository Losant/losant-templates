# Asset Tracker Template
This template illustrates a geolocation asset tracking solution with temperature, shock, and tilt monitoring. By combining real-time location data with real-time sensor data, this template delivers many asset tracking use cases such as:

* Automated delivery confirmation
* Cold-chain monitoring
* Theft prevention and recovery
* Equipment usage trends


## Key Components
* Sample tracking devices moving between distribution centers.
* Tracking issues with shipments through Events.
* Information about distribution centers stored in a Data Table.
* Custom application experience that utilizes overview and detail dashboards.

## Setup
1. Enable the [Data Simulator](/applications/~exportplaceholderid-application-applicationAssetTracker-0~/workflows/~exportplaceholderid-flow-dataSimulator-0~/develop) workflow.
2. Enable the [Event Logger](https://~exportplaceholderid-app-url~/applications/~exportplaceholderid-application-applicationAssetTracker-0~/workflows/~exportplaceholderid-flow-eventLogger-1~/develop) workflow.

## Data Simulator
When the [Data Simulator](/applications/~exportplaceholderid-application-applicationAssetTracker-0~/workflows/~exportplaceholderid-flow-dataSimulator-0~/develop) workflow is enabled, it will simulate the movement of GPS devices between Indianapolis, Columbus, Cincinnati, and Louisville. While in transit, these devices will log fluctuations in temperature, orientation, and signal strength. Battery level will deplete over the course of a trip and shipments are susceptible to random shock events. When a tracker leaves one of the four cities, it will start a new shipment, resetting all of these state properties.

## Events
When the [Event Logger](/applications/~exportplaceholderid-application-applicationAssetTracker-0~/workflows/~exportplaceholderid-flow-eventLogger-1~/develop) workflow is enabled, any device reporting temperature, orientation, or shock incidents over a certain threshold will log an [Event](/applications/~exportplaceholderid-application-applicationAssetTracker-0~/events) in the application. That Event is tied to the tracker and the ID of its current shipment.

## Dashboards
This template includes two dashboards: 
- Overview of all trackers
- Detail view of an individual tracker

### Overview Dashboard
The [Overview Dashboard](/dashboards/~exportplaceholderid-dashboard-overviewDashboard-1~) provides a look at the current status of all GPS trackers, as well as a list of all events that have been logged in the past 24 hours.

### Detail Dashboard
The [Detail Dashboard](/dashboards/~exportplaceholderid-dashboard-detailDashboard-0~) provides additional information around a single tracker, including blocks displaying its current sensor data and a list of recent events tied to the selected tracker.

## Data Tables
The template also includes a [Data Table](/applications/~exportplaceholderid-application-applicationAssetTracker-0~/data-tables/~exportplaceholderid-dataTable-distributionCenters-0~) that includes additional information about each of the distribution centers within the data simulator. The table includes an ID for each center and its geocoordinates, as well as additional information that is not used in the application.

## Experience
This template's [Experience](/applications/~exportplaceholderid-application-applicationAssetTracker-0~/experience/versions/develop) provides an authenticated portal where users can view the two dashboards described above, as well as a list of all devices within the application. Events can be updated, for example, marked as "acknowledged" or "resolved," directly from these dashboards.

The experience comes with one experience user for testing purposes:

```
Email: test.user@example.com
Password: qwerty123
```

Users can be modified, added, or removed by navigating to the experience's [Users & Groups](/applications/~exportplaceholderid-application-applicationAssetTracker-0~/experience/users) page.

## Resources
* [Events](https://~exportplaceholderid-docs-url~/applications/events/)
* [Data Tables](https://~exportplaceholderid-docs-url~/data-tables/overview/)
* [GPS History Dashboard Block](https://~exportplaceholderid-docs-url~/dashboards/gps-history/)

---

This template was created by Losant. For license details, or to submit feature requests or bugs, visit the [GitHub repository](https://github.com/Losant/application-templates). If you have general questions or comments, let us know on the [Losant Forums](https://forums.losant.com).

Copyright (c) 2020 Losant IoT, Inc

https://www.losant.com