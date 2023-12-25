# Encinitas dApp agent

## Overview

The Encinitas dApp agent it's the main dependency to install for Encinitas which is an observability platform that helps you build better dApps in Solana.

Read the docs at [https://encinitas.xyz/](https://encinitas.xyz/)

## Features

- **Easy Initialization:** Quickly set up Encinitas within your application.
- **Configuration Validation:** Ensures the provided configuration is valid to prevent runtime errors.
- **Tracing Instrumentation:** Integrates Grafana Faro's tracing capabilities for detailed monitoring.
- **Session Tracking:** Configurable session tracking options for better user interaction analysis.

## Installation

Before you start using the Encinitas Library, ensure you have installed it via npm or yarn:

```bash
npm install encinitas-dapp-agent
# OR
yarn add encinitas-dapp-agent
```

## Usage

To use the Encinitas Library, you need to import the `initializeEncinitas` function from the package and provide a configuration object.

### Example:

```javascript
import { initializeEncinitas } from 'encinitas-dapp-agent';

const config = {
  url: "https://your-encinitas-instance.com",
  app: {
    name: "YourAppName",
    version: "1.0.0",
    environment: "production",
  },
  sessionTracking: {
    enabled: true
  }
};

const encinitas = initializeEncinitas(config);
```

### Configuration Object (`EncinitasConfig`)

The configuration object should adhere to the `EncinitasConfig` type and includes the following properties:

- `url`: The URL provided by Encinitas.
- `app`: An object containing `name`, `version`, and `environment` of your application.
- `sessionTracking`: An object with a boolean `enabled` property to toggle session tracking.

## Functions

### `initializeEncinitas(config)`

## Contributing

Contributions to the Encinitas Library are welcome. Please follow the standard GitHub pull request workflow. Ensure that your code adheres to the existing style and all tests pass before submitting a pull request.

## License

Specify the license under which the Encinitas Library is released, e.g., MIT, GPL, etc.
