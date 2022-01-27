# Autoinspector Node.js SDK

> **IMPORTANT**: At the moment this SDK only works for stage environment.

The Autoinspector Node library provides convenient access to the Autoinspector API from applications written in server-side JavaScript.

## Installation

At the moment this node module is no published in NPM. But you can use it locally linking the autoinspector SDK to your project. Follow the next steps:

```
git clone https://github.com/autoinspector-global/autoinspector-node autoinspector
cd autoinspector
npm i
npm run build
npm link
```

And in your project:

```
npm link autoinspector
```

## Usage

The package needs to be configured with your company api key, which is available in the [Autoinspector Dashboard](https://dashboard.autoinspector.com.ar/). Require it passing the token at the moment of instantiate Autoinspector class.

```javascript
const Autoinspector = require('autoinspector').default

const autoinspector = new Autoinspector({
    apikey:"YOUR_API_KEY"
})

autoinspector.createVehicleInspection({...})
.then((res) => {
    console.log("inspection created!", res._id)
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

const inspection = await autoinspector.createVehicleInspection({...})

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
