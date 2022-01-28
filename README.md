# Autoinspector Node.js SDK

The Autoinspector Node library provides convenient access to the Autoinspector API from applications written in server-side JavaScript.

## Installation

```bash
npm install autoinspector
#or
yarn add autoinspector
```

## Usage

The package needs to be configured with your company api key, which is available in the [Autoinspector Dashboard](https://dashboard.autoinspector.com.ar/). Require it passing the token at the moment of instantiate Autoinspector class.

```javascript
const Autoinspector = require('autoinspector').default

const autoinspector = new Autoinspector({
    apikey:"YOUR_API_KEY"
})

autoinspector.inspections.vehicle.create({...})
.then((res) => {
    console.log("inspection created!", res.inspectionId)
})
.catch((err) => console.error(err))
```

Or using ES modules and async/await:

```javascript
import Autoinspector from 'autoinspector'

const autoinspector = new Autoinspector({
    apikey:"YOUR_API_KEY"
})

(async () => {

try {

const inspection = await autoinspector.inspections.vehicle.create({...})

console.log(inspection._id)

} catch (err) {

  console.error(err)

}

})()
```

## Usage with Typescript

All the types are included in the module, so if you install it using typescript you automatically have access to all the interfaces used by Autoinspector SDK.

## Configuration

Initialize with config object

The package can be initialized with two options:

```javascript
import Autoinspector from 'autoinspector';

const autoinspector = new Autoinspector({
  apikey: 'YOUR_API_KEY',
  timeout: 1000,
});
```

| Option  | Default | Description                                               |
| ------- | ------- | --------------------------------------------------------- |
| apikey  | null    | token for authentication that belongs to specific company |
| timeout | 80000   | Maximum time each request can take in ms.                 |
