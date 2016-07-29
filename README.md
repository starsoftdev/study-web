[![Build Status](https://travis-ci.com/studykik/web.svg?token=ep486uxesfywHQ7s7j7H&branch=master)](https://travis-ci.com/studykik/web) master
[![Build Status](https://travis-ci.com/studykik/web.svg?token=ep486uxesfywHQ7s7j7H&branch=develop)](https://travis-ci.com/studykik/web) develop

You will need to install packages first and install the Postgres database to run the server. You'll also need to have some environment variables defined in a .env file (which you should NOT commit to the repository).

### Environment variables
Create a file named `.env` at the root of this project that includes the following values:
```
NODE_ENV=development
PORT=8080
API_URL=http://localhost:3000/api/v1
HOST_URL=http://localhost:3000
```

If you want to develop with Redux Dev Tools, then have this value in the .env as well:
```
DEVTOOLS=true
```

If you want to use production search indices, change your config to:
```
API_URL=https://studykik.com/api
```

### Install packages
```
npm install
```

### Running the app:
```
npm start
```

### Running tests:
```
# unit tests
npm run unit

# integration tests
npm run browsers

# all tests
npm run test
```

### Folder Structure
Inspired by

1. https://gist.github.com/ryanflorence/daafb1e3cb8ad740b346
1. https://medium.com/@ryanflorence/welcome-to-future-of-web-application-delivery-9750b7564d9f#.513yw7csp

## Style Guide

Most of our style is handled by eslint, however, there are some extra bits to consider.

There is a pre-commit hook installed for running lint so that we always commit eslint-clean code.
However you can run the linter anytime and check styles.
```
npm run lint
```

#### Configuration
Various IDEs provide linting plugins. For Sublime Text,

1. [SublimeLinter](http://www.sublimelinter.com/en/latest/)
1. [SublimeLinter-contrib-eslint](https://github.com/roadhump/SublimeLinter-eslint)

For Jetbrains Webstorm, support is built-in, but you will need to enable it in settings after you run
```
npm install
```
to install the necessary dependencies. You will also need to enable it in the settings for Webstorm, as shown in the screenshot below.
![Webstorm ESLint Settings](https://studykik.atlassian.net/wiki/download/attachments/5210114/eslint%20webstorm.png?version=1&modificationDate=1467068787645&api=v2)

Jetbrains also has a good support document on using ESLint in Webstorm.

[https://www.jetbrains.com/help/webstorm/11.0/using-javascript-code-quality-tools.html#ESLint](https://www.jetbrains.com/help/webstorm/11.0/using-javascript-code-quality-tools.html#ESLint)

#### Imports
Imports should be added in the following order:

1. React
1. NPM packages
1. Constants
1. PropTypes
1. Actions
1. Reducers
1. shared components
1. child components
1. styles

If there are more than 5 import statements, feel free to add a line break between at any of the break points above so that the imports are easier to digest.

## Tech Used

- [ESLint](http://eslint.org/) for linting
- [Express](http://expressjs.com/) for web server
- [React](https://github.com/facebook/react) for all the goodness.
- [Redux](https://github.com/gaearon/redux) for the _Atomic Flux_ architecture.
- [React-Router](https://github.com/rackt/react-router) for routing goodness.
- [React-Transform](https://github.com/gaearon/babel-plugin-react-transform) for development fun (and productivity).
- [Webpack](https://github.com/webpack/webpack) for asset management and production builds.
- [TComb Forms](https://github.com/gcanti/tcomb-form/) for managing forms.

## API Explorer

- http://ec2-52-23-162-255.compute-1.amazonaws.com/explorer/
