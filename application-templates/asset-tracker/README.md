# Asset Tracker Template

This template illustrates a geolocation asset tracking solution with temperature, shock, and tilt monitoring. By combining real-time location data with real-time sensor data, this template delivers many asset tracking use cases such as:

* Automated delivery confirmation
* Cold-chain monitoring
* Theft prevention and recovery
* Equipment usage trends

## Key Components

* Sample tracking devices moving between distribution centers, and a recipe for creating additional devices.
* Tracking issues with shipments through Events.
* Information about distribution centers stored in a Data Table.
* Custom application experience that utilizes overview and detail dashboards.

## Setup

1. Enable the [Data Simulator](/applications/~exportplaceholderid-application-applicationAssetTracker~/workflows/~exportplaceholderid-flow-dataSimulator~/develop) workflow.
2. Enable the [Event Logger](/applications/~exportplaceholderid-application-applicationAssetTracker~/workflows/~exportplaceholderid-flow-eventLogger~/develop) workflow.
3. Create an [Experience User](/applications/~exportplaceholderid-application-applicationAssetTracker~/experience/users/new) with a unique email address and password, which is necessary to sign in to the template's End User Experience.

## Data Simulator

When the [Data Simulator](/applications/~exportplaceholderid-application-applicationAssetTracker~/workflows/~exportplaceholderid-flow-dataSimulator~/develop) workflow is enabled, it will simulate the movement of GPS devices between Indianapolis, Columbus, Cincinnati, and Louisville. While in transit, these devices will log fluctuations in temperature, orientation, and signal strength. Battery level will deplete over the course of a trip and shipments are susceptible to random shock events. When a tracker leaves one of the four cities, it will start a new shipment, resetting all of these state properties.

## Events

When the [Event Logger](/applications/~exportplaceholderid-application-applicationAssetTracker~/workflows/~exportplaceholderid-flow-eventLogger~/develop) workflow is enabled, any device reporting temperature, orientation, or shock incidents over a certain threshold will log an [Event](/applications/~exportplaceholderid-application-applicationAssetTracker~/events) in the application. That Event is tied to the tracker and the ID of its current shipment.

## Dashboards

This template includes two dashboards: 

* Overview of all trackers
* Detail view of an individual tracker

### Overview Dashboard

The [Overview Dashboard](/dashboards/~exportplaceholderid-dashboard-overviewDashboard~) provides a look at the current status of all GPS trackers, as well as a list of all events that have been logged in the past 24 hours.

### Detail Dashboard

The [Detail Dashboard](/dashboards/~exportplaceholderid-dashboard-detailDashboard~) provides additional information around a single tracker, including blocks displaying its current sensor data and a list of recent events tied to the selected tracker.

## Data Tables

The template also includes a [Data Table](/applications/~exportplaceholderid-application-applicationAssetTracker~/data-tables/~exportplaceholderid-dataTable-distributionCenters~) that includes additional information about each of the distribution centers within the data simulator. The table includes an ID for each center and its geocoordinates, as well as additional information that is not used in the application.

## Experience

This template's [Experience](/applications/~exportplaceholderid-application-applicationAssetTracker~/experience/versions/develop) provides an authenticated portal where users can view the two dashboards described above, as well as a list of all devices within the application. Events can be updated — for example, marked as "acknowledged" or "resolved" – directly from these dashboards.

Users can be modified, added, or removed by navigating to the experience's [Users & Groups](/applications/~exportplaceholderid-application-applicationAssetTracker~/experience/users) page.

## Resources

* [Events](https://docs.losant.com/applications/events/)
* [Data Tables](https://docs.losant.com/data-tables/overview/)
* [GPS History Dashboard Block](https://docs.losant.com/dashboards/gps-history/)
* [Application Experiences Overview](https://docs.losant.com/experiences/overview/)

## License

Copyright &copy; 2024 Losant IoT, Inc. All rights reserved.

Licensed under the [MIT](https://github.com/Losant/losant-templates/blob/master/LICENSE.txt) license.

https://www.losant.com