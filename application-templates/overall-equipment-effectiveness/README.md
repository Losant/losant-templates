# Overall Equipment Effectiveness (OEE) Template
This template provides a sample implementation of OEE measurements for a set of paper machines. The specific process and simulation details for the paper machines are described at the end of this README.  

## How it Works  
Calculating OEE is very specific to each organization's machine types and manufacturing processes. Because of that, this template is meant to act as a reference implementation that can be adapted to your own equipment and requirements.

This is a tool to guide your thinking when you implement OEE in your unique solution. It utilizes features of Losant that can be used to perform the OEE calculations.

## Setup
1. Enable the [Paper Machine Data Simulator](/applications/~exportplaceholderid-application-applicationOverallEquipmentEffectiveness-0~/workflows/~exportplaceholderid-flow-paperMachineDataSimulator-0~/develop) workflow.  
2. Enable the [OEE Calculations](/applications/~exportplaceholderid-application-applicationOverallEquipmentEffectiveness-0~/workflows/~exportplaceholderid-flow-oeeCalculations-1~/develop) workflow.

## Dashboards
This template includes [one dashboard](https://~exportplaceholderid-app-url~/dashboards/~exportplaceholderid-dashboard-paperMachine-0~): an OEE overview of a single paper machine. The dashboard is built with [context variables](https://~exportplaceholderid-docs-url~/dashboards/context-variables/) to allow the user to switch between the different paper machine devices. This template calculates OEE every hour, so OEE calculations will not appear on the dashboard until one hour has elapsed.

## OEE Calculation
This template includes an [OEE Calculations](/applications/~exportplaceholderid-application-applicationOverallEquipmentEffectiveness-0~/workflows/~exportplaceholderid-flow-oeeCalculations-1~/develop) workflow, which will calculate the three parts of OEE over the last 30 days and save the results on device attributes.

### Availability 
Availability is calculated using a 30-day [Time At Value](https://~exportplaceholderid-docs-url~/references/aggregations/#time-at-value) aggregation of the paper machine's status and reason [string attributes](https://~exportplaceholderid-docs-url~/devices/attributes/#strings).

```
(Running + Planned + Unplanned + Sheetbreak) = totalTime  
(totalTime - Utility Outage) = scheduled runTime  
(Running + Sheetbreak)/runTime = Availability
```

Note: Availability takes into account the scheduled run time for each specific machine/process. Every process has different ways of calculating scheduled run time. Items that could affect run time include technician shifts, holidays, or orders. This use case assumes the machine will be running 24/7/365 with the exception of the utility outage.

### Performance
Performance is calculated using a 30-day [mean aggregation](https://~exportplaceholderid-docs-url~/references/aggregations/#mean) of the paper machine's rate attribute. It then compares the mean to the maxRate for the machine where maxRate is set as a [Device Tag](https://~exportplaceholderid-docs-url~/devices/overview/#device-tags) since it is a constant value and could vary by machine.

```
rate/maxRate = Performance
```

### Quality 
Quality is calculated using a 30-day [sum aggregation](https://~exportplaceholderid-docs-url~/references/aggregations/#sum) of the paper machine's currentTons and currentWaste attributes.

These attributes should be changed to match the good quality (currentTons in this example) and the bad quality (currentWaste in this example) attribute you have for your device.

```
(tons + waste) = totalTons  
tons/totalTons = Quality
```

## Paper Machine Process and Simulation
OEE is a very process-focused calculation, so we built this template with a paper machine process in mind. This section offers insight into the process so that you can modify the OEE calculations to fit your needs.

When the [Paper Machine Data Simulator](/applications/~exportplaceholderid-application-applicationOverallEquipmentEffectiveness-0~/workflows/~exportplaceholderid-flow-paperMachineDataSimulator-0~/develop) workflow is enabled, it will simulate the status of every paper machine as well as the production of paper. 

These paper machines have several different status values. The status of the machine is a string attribute on each device. The values called out below in italics are the string values that are recorded for each state.

### *Running*
If the machine is *running*, it is only outputting paper of the correct quality, at the machine rate, with a small amount of cutoff at the sides to give it a clean edge. The trim is considered waste because it will go into the repulper to be reworked and brought back into the furnish recipe.

### *Planned* Downtime 
*Planned* downtime is classified further with a string attribute to give the reason behind the downtime event. These are events where the machine went through a controlled shutdown for scheduled maintenance of some kind. These are typically planned in advance. This simulation will have one of two types of planned downtime events:

* **SKU Change**: SKU Changes require some amount of downtime to change certain parameters of the machine to meet the recipe guidelines.
* **Scheduled Maintenance**: Common events that are used for preventive maintenance and machine updates. The correct use of planned downtime should, over time, result in fewer unplanned downtime events overall.
* **Utility Outage**: These are planned shutdowns where the power to the entire facility is shut off for maintenance. Since this would be planned for once a year, the scheduled amount of time for the downtime event would not be on the books for the machine to be running. Thus the time spent in utility outage does not count against the availability.

### *Unplanned* Downtime 
*Unplanned* downtime is classified further with a string attribute to give the reason behind the downtime event. These are events where the machine goes through an automatic shutdown for a quality or safety reason. These events can result in a large amount of downtime and costly damage. This simulation can have unplanned downtime for the following reasons:

* **Yankee Hood Temp Out of Range**: The Yankee Hood is above the Yankee Dryer and the two together are one of the main ways of drying paper on the paper machine. Each SKU, or type of paper, requires the hood to be within a specific temperature range. There are also safety limits for the temperature of the hood. If it goes outside of any of these limits, the machine will automatically shut down to protect the technicians, the process, or to prevent excessive amounts of off-quality paper.
* **Quick Mix Level Low**: A quick mix is a tank that holds the mixture of pulps that is set by the recipe for the SKU in production. If the tank gets too low, the machine will shut down because there is not enough furnish mixture to make paper.
* **Water Quality Out of Spec**: Water is one of the main ingredients in the paper-making process. There are multiple inline quality monitoring systems because if the water is out of spec, the chemistry of the chemicals and the furnish can change and prevent the correct quality of paper from being created.
* **Boiler Shut Down**: The Yankee Dryer is filled with steam at a specific pressure. Because the paper going over the dryer is one of the main transformations of the paper, it needs to have the correct pressure inside of the roll.
* **Drive Failure**: Paper machines are made up of many rolls that all have a drive to keep them at the correct speed. These drives can fail, causing the machine to shut down to avoid damage.

### *Sheetbreak*
A sheetbreak occurs while the machine runs and causes the paper to go into the repulper so that it is not rolled up and sent on. All paper made during a sheetbreak is considered waste and is therefore counted against quality. In this simulation, sheetbreaks are classified further with the string attribute "reason" to track major quality issues or focus areas for the technicians.

* **Holes in Sheet**: There are going to be holes in the sheet but every SKU has a quality limit for the size of the holes. If the holes are outside of those limits, a machine inspection system will detect them and break the sheet so that it does not roll up.
* **Incorrect Web Tension**: This is not an actual quality issue with the paper but an issue with the machine that will cause the paper to roll up incorrectly. This causes issues further down in the process. If the tension of the web is too loose or too tight, the machine will break the sheet to prevent an issue downstream. These tension values are typically determined by machine learning.
* **Flocs in Sheet**: Flocs are small parts of paper that did not break up completely when the pulp went through the pulper. There are always going to be flocs in the sheet but just like holes, too many flocs are against the quality standard for the SKU and the visual inspection system will pick them up and break the sheet.
 
Once the issue is addressed and the inspection system indicates that the paper is within quality, the technicians have to re-thread the paper. This time does not count against availability since the machine is actually running, but the paper created is going to be reworked and therefore the tons created will count against quality.

---

This template was created by Losant. For license details, or to submit feature requests or bugs, visit the [GitHub repository](https://github.com/Losant/application-templates). If you have general questions or comments, let us know on the [Losant Forums](https://forums.losant.com).

Copyright (c) 2020 Losant IoT, Inc

https://www.losant.com