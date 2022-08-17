# Huddle Room Monitoring Template
This template reduces wasted time searching for huddle rooms by providing a real-time space availability and utilization application. Employees can log in and see a floor plan containing live huddle room availability. Managers can log in to see both live and historical utilization data.

## Key Components
* Sample huddle rooms with occupancy monitoring.
* Aggregated occupancy data by floor and building.
* Access control through user roles.

## Setup
Enable the [Simulate Rooms](https://app.losant.com/applications/~exportplaceholderid-application-applicationHuddleRoomMonitor-0~/workflows/~exportplaceholderid-flow-simulateRooms-0~/develop) workflow.

## Room Simulation
When the [Simulate Rooms](https://app.losant.com/applications/~exportplaceholderid-application-applicationHuddleRoomMonitor-0~/workflows/~exportplaceholderid-flow-simulateRooms-0~/develop) workflow is enabled, occupancy data will be simulated for each huddle room every two minutes.

On each iteration, there's a small chance a room will become occupied. Rooms will only become occupied during business hours (8:00a - 5:00p EST). Once occupied, the room will remain occupied for a random amount of time between 15 and 90 minutes.

To change the working hours or the time zone, edit the [Time Range Node](https://docs.losant.com/workflows/logic/time-range/) that can be found in the [Simulate Rooms](https://app.losant.com/applications/~exportplaceholderid-application-applicationHuddleRoomMonitor-0~/workflows/~exportplaceholderid-flow-simulateRooms-0~/develop) workflow.

## Dashboards
This template includes two dashboards: one for employees and one for facilities managers.

### Available Rooms Dashboard
The [Available Rooms](https://app.losant.com/dashboards/~exportplaceholderid-dashboard-availableRooms-0~) dashboard provides live availability for each of this template's three huddle rooms.

### Occupancy History Dashboard
The [Occupancy History](https://app.losant.com/dashboards/~exportplaceholderid-dashboard-occupancyHistory-1~) dashboard provides historical usage data for this template's three huddle rooms.

## Experience
This template's [Experience](https://app.losant.com/applications/~exportplaceholderid-application-applicationHuddleRoomMonitor-0~/experience/versions/develop) provides an authenticated portal where employees and managers can view this application's dashboards. To distinguish between an employee and a manager, each user has a `role` tag that is set to either `employee` or `manager`.

### Users
This experience has two example users:
* `employee@example.com`: Represents an employee.
* `manager@example.com`: Represents a manager.

The password for both users is `qwerty123`. Users can be modified, added, or removed by navigating to the experience's [Users & Groups](https://app.losant.com/applications/~exportplaceholderid-application-applicationHuddleRoomMonitor-0~/experience/users) page.

## Resources
* [Image Overlay Block](https://docs.losant.com/devices/overview/)
* [System Devices](https://docs.losant.com/devices/systems/)

---

This template was created by Losant. For license details, or to submit feature requests or bugs, visit the [GitHub repository](https://github.com/Losant/application-templates). If you have general questions or comments, let us know on the [Losant Forums](https://forums.losant.com).

Copyright (c) 2020 Losant IoT, Inc

https://www.losant.com