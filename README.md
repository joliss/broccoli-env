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
console.log(env) // => 'development' or 'production'
```

```js
var env = require('broccoli-env').setEnvs(['development','production', 'testing']).getEnv();
console.log(env) // => 'development', 'production' or 'testing'
```

## Logic

- The default `envs` list is `['development', 'production']`
- The default environment is the first of the `envs` list
- If `BROCCOLI_ENV` is not defined, the default environment is assumed
- If `BROCCOLI_ENV` value is not in the `envs` list, the default environment is assumed
- Whenever the `envs` list is updated, the environment is resubmitted
