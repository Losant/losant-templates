# Elipsa Predictive Maintenance

This template demonstrates how to perform real-time outlier detection using an AI model trained and executed using [Elipsa](https://www.elipsa.ai/). The data in this template is based on an [industrial turbofan](https://en.wikipedia.org/wiki/Turbofan).

Even though this template is built around outlier detection for industrial equipment, Elipsa and Losant support many other AI use cases, including:

* Will a tank go below a certain level in `x` days?
* Will a system fail in the next `x` number of hours?
* Will the output of my manufacturing process result in a defect?
* What will the CO2 level in a room be in `x` minutes?
* How many hours until machine failure?
* What is the projected battery life?

## Key Components
* Combining IoT and AI in a real-world use case 
* Real-time outlier detection using AI models
* Simulation using a real-world dataset
* Automatic [Event](https://docs.losant.com/applications/events/) creation based on AI predictions

## Setup
1. Enable the `Predict` workflow.
1. Enable the `Simulator` workflow.

## About Elipsa

[Elipsa's](https://www.elipsa.ai/) no-code environment makes training and utilizing AI models easy and approachable. Elipsa works seamlessly with Losant's [data exports](https://docs.losant.com/devices/bulk-actions/#request-data-export) to quickly train AI models with little-to-no data reformatting, cleaning, or engineering.

![Elipsa Logo](./elipsa-logo.jpg)

## About this Template's AI Model

The outlier detection model being executed by this template has been trained on an open-source dataset provided by [NASA's Prognostic Data Repository](https://ti.arc.nasa.gov/tech/dash/groups/pcoe/prognostic-data-repository/). This dataset is representative of the time-series data collected by most Losant applications. Feel free to directly download and explore the dataset for more information.

**Name**:  

> Turbofan Engine Degradation Simulation Data Set


**Description**:  

> Engine degradation simulation was carried out using C-MAPSS. Four different were sets simulated under different combinations of operational conditions and fault modes. Records several sensor channels to characterize fault evolution. The data set was provided by the Prognostics CoE at NASA Ames.


## About the Simulation Data

This template includes a simulator that replays a subset of data extracted from the dataset above. You can find the simulation data in [Files](https://docs.losant.com/applications/files/) at `TurbineEngine.csv`.

Every minute, the `Simulator` workflow pulls the next row from the simulation data and reports it as state to the `Turbofan` device. When the end of the file has been reached, the simulator will start over at the first row.

## Prediction

Each time the simulator records device state, the `Predict` workflow will trigger. This workflow invokes an API endpoint provided by Elipsa specifically for this template. Elipsa has provided access to this endpoint and pre-trained model to make it as easy as possible to get started with a real-world example. When using your own Elipsa account and AI models, you will use the Elipsa API to invoke your own models.

Each time the model is invoked with a data point, Elipsa returns the following data:

```
{
  "Prediction": <1 or 0>,
  "Anomaly Score": <confidence: 0.0-1.0>
}
```

If `Prediction` is set to `1`, an outlier has been detected. The `Anomaly Score` then represents the model's confidence in that prediction. An `Anomaly Score` of `0` represents a very low confidence and a score of `1` represents a very high confidence.

## Events

Whenever an outlier occurs with an `Anomaly Score` above `0.5`, which indicates a high degree of confidence, an [Event](https://docs.losant.com/applications/events/) is created in your application. The event contains the confidence level and lists the values of every attribute that caused the outlier.

---

## License

Copyright &copy; 2022 Losant IoT, Inc. All rights reserved.

Licensed under the [MIT](https://github.com/Losant/losant-templates/blob/master/LICENSE.txt) license.

https://www.losant.com