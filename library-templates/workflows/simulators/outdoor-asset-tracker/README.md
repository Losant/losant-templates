# Outdoor Asset Tracker Simulator

This template simulates a GPS device moving along a route of your choosing. The simulated data can then be used to:
- [Record device state](https://docs.losant.com/devices/state/)
- Build [GPS History dashboard blocks](https://docs.losant.com/dashboards/gps-history/)
- Fire [geofence-based alerts](https://docs.losant.com/workflows/logic/geofence/)

## Dependencies

This template requires no additional dependencies, but it is recommended that you use it in conjunction with a [device](https://docs.losant.com/devices/overview/) that has a [GPS attribute](https://docs.losant.com/devices/attributes/#gps) to record state.

## Usage

After installing the template, go to your application's workflow list and enable the "Route Simulator" workflow. This will start running the workflow once a minute by default.

The route follows major highways to the following stops, in order:

1. Indianapolis, IN Airport (IND)
2. Columbus, OH Airport (CMH)
3. Cincinnati, OH Airport (CVG)
4. Louisville, KY Airport (SDF)
5. Return to start point (IND)

### Changing the Route

If you need to generate a new route for your simulation, there is an additional workflow in the Route Simulator to do that. First, generate the route you wish to simulate as a GPX file:

1. Go to [http://map.project-osrm.org/](http://map.project-osrm.org/).
2. In the top left corner, switch the route type from "Bike" to "Car" before entering any locations.
3. Enter a "Start" destination string in the top input box.
4. Press "Enter" to display a list of suggested locations. 
5. Click the location to use as the starting point for your route.
4. Enter an "End" destination string in the second input box and repeat steps 4 and 5. 
5. To add additional stops on the route: 
    1. Click the "+" button in the bottom right corner of the inputs. 
    2. Set the location for each stop.
6. Optional. End your route at the same place as your starting location. Otherwise, when the simulator reaches the final point along the route, it will "jump" back to the beginning instead of traveling there naturally.
7. Click the "Export GPX" button in the bottom left portion of the window. This downloads a file to your computer.

Once you have a GPX file in hand:

1. Upload the GPX file to your [Application Files](/applications/recent/files).
2. Update the "URL Template" field of the [HTTP Node](https://docs.losant.com/workflows/data/http/) in the helper workflow to point to the location of the GPX file you just uploaded.
3. Update the [File: Create Node](https://docs.losant.com/workflows/data/file-create/)'s "File Name Template" to the name you wish to give this new file. The file extension should be `.json` since the workflow will convert your GPX file to JSON format.

Processing your file can take several seconds. Check the workflow's [Debug Log](https://docs.losant.com/workflows/outputs/debug/#debug-panel) to know when the conversion has completed and the file is available for use.

Once your file is generated, you can reference it in the HTTP Node in the Route Simulator to use these new coordinates.

### Changing Reporting Interval

To change the frequency that the simulator runs, change the value within the workflow's [Timer Trigger Node](https://docs.losant.com/workflows/triggers/timer/). Depending on the number of points in your route and the frequency at which the simulator runs, you may also change the "pointsPerIteration" [workflow global value](https://docs.losant.com/workflows/overview/#workflow-globals) to adjust the speed of the simulated vehicle.

### Using Reported Data

In most cases, recording the simulated data as GPS state on one of your application's devices can be beneficial. Edit the Route Simulator workflow according to the following:

1. Connect the Look Up Current Point Node to the Device State Node.
2. Update the Device State Node to point to the device you wish to record the simulated data to.
3. If necessary, change the name of the attribute receiving the state report (location by default).

## License

Copyright (c) 2020 Losant IoT, Inc. All rights reserved.

Licensed under the [MIT](https://github.com/Losant/losant-templates/blob/master/LICENSE.txt) license.

https://www.losant.com