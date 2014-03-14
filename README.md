# broccoli-env

Get the environment (development or production) from the BROCCOLI_ENV
environment variable.

## Installation

```bash
npm install --save-dev broccoli-env
```

## Usage

```js
var env = require('broccoli-env').getEnv();
console.log(env) // => 'development' or 'production' or 'test'
```
