<h1 align="center">Cloud Foundry Service Metrics Logger</h1>

<p align="center">
  <a href="https://david-dm.org/DaNautilus/cf-service-metrics-logger">
    <img src="https://david-dm.org/DaNautilus/cf-service-metrics-logger/status.svg?style=flat" alt="dependency" />
  </a>
  <a href="https://travis-ci.org/DaNautilus/cf-service-metrics-logger">
    <img src="https://travis-ci.org/DaNautilus/cf-service-metrics-logger.svg?branch=master" alt="travis" />
  </a>
  <a href="https://ci.appveyor.com/project/DaNautilus/cf-service-metrics-logger/branch/master">
    <img src="https://ci.appveyor.com/api/projects/status/hln22i8cy56xe65o?svg=true&passingText=windows%20passing&pendingText=windows%20pending&failingText=windows%20failing" alt="appveyor" />
  </a>
  <a href="https://sonarcloud.io/dashboard?id=DaNautilus_cf-service-metrics-logger">
    <img src="https://sonarcloud.io/api/project_badges/measure?project=DaNautilus_cf-service-metrics-logger&metric=coverage" alt="coverage" />
  </a>
  <a href="https://sonarcloud.io/dashboard/index/DaNautilus_cf-service-metrics-logger">
    <img src="https://sonarcloud.io/api/project_badges/measure?project=DaNautilus_cf-service-metrics-logger&metric=alert_status" alt="quality gate" />
  </a>
</p>

<br />

![divider](./divider.png)

## ❯ Why

You want to log service metrics from your application on Cloud Foundry? - Yes? - Here you are 🙌 !!

![divider](./divider.png)

## ❯ Table of Contents

- [Supported Services](#-supported-services)
- [Quick Start](#-quick-start)
- [API](#-api)
- [Development](#-development)
- [Project Structure](#-project-structure)

![divider](./divider.png)

## ❯ Supported Services

| Service     | Version |
| ----------- | ------- |
| **MongoDB** | >=3.6.6 |
| **Redis**   | >=2.3.9 |

![divider](./divider.png)

## ❯ Quick Start

### Installation

Install library by using `npm`

```shell
npm install cf-service-metrics-logger
```

or by using `yarn`

```shell
yarn add cf-service-metrics-logger
```

### How to use

#### Step 1: Import CfServiceMetricsLogger

Using `CommonJS` module loader:

```javascript
const CfServiceMetricsLogger = require('cf-service-metrics-logger');
```

Using `ES6` module loader:

```javascript
import { CfServiceMetricsLogger } from 'cf-service-metrics-logger';
```

#### Step 2: Create new instance of CfServiceMetricsLogger

Create new instance of `CfServiceMetricsLogger` and provide [options](#-options):

```javascript
const options = {
  mongoDB: {
    serverStatusInterval: 10000,
    dbStatsInterval: 20000,
  },
  redis: {
    infoInterval: 100000
  }
};

const cfServiceMetricsLogger = new CfServiceMetricsLogger(options);
```

#### Step 3: Subscribe to receive service metrics and general logs

Subscribe `metrics` to receive service metrics data:

```javascript
cfServiceMetricsLogger.subscribe('metrics', data => {
  // do some fancy stuff with your metrics
});
```

Subscribe `logs` to receive general application logs:

```javascript
cfServiceMetricsLogger.subscribe('logs', {message, level} => {
  console[level](message));
});
```

#### Step 3: Start and stop service metrics logging

Start service metrics logging:

```javascript
cfServiceMetricsLogger.start();
```

Stop service metrics logging:

```javascript
cfServiceMetricsLogger.stop();
```

![divider](./divider.png)

## ❯ API

### Options

| Option                                    | Description                                                    | Default Value |
| ----------------------------------------- | -------------------------------------------------------------- | ------------: |
| `mongoDb.serverStatusInterval` (optional) | MongoDb database status polling interval in ms                 | `10000`       |
| `mongoDb.dbStatsInterval` (optional)      | MongoDB storage statistics polling interval in ms              | `10000`       |
| `redis.infoInterval` (optional)           | Redis statistics polling interval                              | `10000`       |
| `vcap` (optional)                         | Provide local `VCAP_SERVICES` and/or `VCAP_APPLICATION` values | `{}`          |
| `vcapFile` (optional)                     | Provide local `VCAP_SERVICES` and/or `VCAP_APPLICATION` file   | `''`          |

### Methods

| Method                           | Description            |
| -------------------------------- | ---------------------- |
| `start()`                        | Start service metrics  |
| `stop()`                         | Stop service metrics   |
| `subscribe(eventId, callback)`   | Subscribe an event     |
| `unsubscribe(eventId, callback)` | Unsubscribe an event   |
| `unsubscribeAll()`               | Unsubscribe all events |

### Subscription event id's

| Id        | Description                                                            |
| --------- | ---------------------------------------------------------------------- |
| `metrics` | Service metrics                                                        |
| `logs`    | General application logs for levels `debug`, `info`, `warn` and `error` |

![divider](./divider.png)

## ❯ Development

### Getting Started

#### Step 1: Set up the Development Environment

You need to set up your development environment before you can do anything.

Install [Node.js and NPM](https://nodejs.org/en/download/)

- on OSX use [homebrew](http://brew.sh) `brew install node`
- on Windows use [chocolatey](https://chocolatey.org/) `choco install nodejs`

Install yarn globally

```bash
yarn install yarn -g
```

#### Step 2: Set up Environment Variables

Copy the `vcap.example.json` file and rename it to `vcap.json`. This file provides `VCAP_SERVICES` and/or `VCAP_APPLICATION` for local development.
More information is provided [here](https://github.com/cloudfoundry-community/node-cfenv#running-in-cloud-foundry-vs-locally).

#### Step 3: Install dependencies

Install all dependencies with yarn.

```bash
yarn install
```

### Scripts and Tasks

#### Install

- Install all dependencies with `yarn install`

#### Linting

- Run code quality analysis using `yarn run lint`. This runs tslint.

#### Tests

- Run unit test using `yarn run test`.

#### Building the project

- Run `yarn run build` to generate commonJS and ES6 modules as well as declaration from the TypeScript source.
- Builded sources are located in `dist` folder.

### Debugger

#### VS Code

Just set a breakpoint in source or unit test and hit <kbd>F5</kbd> in your Visual Studio Code to execute and debug all unit tests.

![divider](./divider.png)

## ❯ Project Structure

| Name                              | Description |
| --------------------------------- | ----------- |
| **.vscode/**                      | VSCode tasks, launch configuration and some other settings |
| **dist/**                         | Compiled and bundled source files will be placed here |
| **src/**                          | Source files |
| **src/types/** *.d.ts             | Custom type definitions and files that aren't on DefinitelyTyped |
| **test/**                         | Tests |
| **test/unit/** *.test.ts          | Unit tests |
| vcap.example.json                 | Provides `VCAP_SERVICES` and/or `VCAP_APPLICATION` for local development |
| vcap.test.json                    | Provides `VCAP_SERVICES` and/or `VCAP_APPLICATION` for unit tests |
| rollup.config.js                  | Config for Rollup module bundler |
