[![Build Status](https://travis-ci.com/studykik/web.svg?token=ep486uxesfywHQ7s7j7H&branch=master)](https://travis-ci.com/studykik/web) master
[![Build Status](https://travis-ci.com/studykik/web.svg?token=ep486uxesfywHQ7s7j7H&branch=develop)](https://travis-ci.com/studykik/web) develop

You will need to install packages first and install the Postgres database to run the server. You'll also need to have some environment variables defined in a .env file (which you should NOT commit to the repository).

### Environment variables
Create a file named `.env` at the root of this project that includes the following values:
```
NODE_ENV=development
API_URL=http://localhost:3000/api/v1
SOCKET_URL=http://localhost:3000
HTTP=true
GOOGLE_RECAPTCHA_SITE_KEY=6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI
DASHBOARD_TIMEZONE=America/New_York
FORCE_LOGOUT=(should be 10 hours in milliseconds)
IDLE_TIMEOUT=(should be 2 hours in milliseconds)
```
If you like inline source maps, and debugging anywhere in the app with Chrome Dev Tools, enter this line into the .env file as well:
```
SOURCEMAP=true
```

If you want to develop with Redux Dev Tools, then have this value in the .env as well:
```
DEVTOOLS=true
```
You will also need to install the associated Chrome extension for Redux Dev Tools to use it.
https://chrome.google.com/webstore/detail/redux-devtools/lmhkpmbekcpmknklioeibfkpmmfibljd

If you want to use staging to test the web repo, change your config to:
```
API_URL=http://api-staging.studykik.com/api/v1
```

If you want to test with Mixpanel, add the studykik testing app token from mixpanel:
```
MIXPANEL_TOKEN=token

### Install packages
```
npm install
```
for correct installation of package 'git-validate' it may be necessary
to manually create a pre-commit file in ./.git/hooks directory and change
the rights for it.

### Running the app:
```
npm start
```

### Running tests:
```
# unit tests
npm test

# integration tests
npm run browsers

# all tests
npm run test
```

# Cucumber
https://cucumber.io/

Documentation about how to use the command line tools:
https://github.com/cucumber/cucumber-js/blob/master/docs/cli.md

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
to install the necessary dependencies. You will also need to enable it in the **settings panel** in Webstorm for ESLint to be active. Jetbrains also has a good support document on using ESLint in Webstorm.
[https://www.jetbrains.com/help/webstorm/2017.1/eslint.html](https://www.jetbrains.com/help/webstorm/2017.1/eslint.html)

For Visual Studio Code: 
[https://code.visualstudio.com/docs/languages/javascript#_linters](https://code.visualstudio.com/docs/languages/javascript#_linters)

You will not need to create an .eslintrc.json file, as the ESLint configuration already exists in the repository.

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

In addition, it is best practice if the absolute imports are before the relative imports.

## Tech Used

- [Cucumber](https://cucumber.io/) for BDD testing
- [dotenv](https://github.com/bkeepers/dotenv) for loading environment variables from a .env file
- [ESLint](http://eslint.org/) for linting
- [Express](http://expressjs.com/) for web server
- [Google APIs](https://console.developers.google.com) for Google APIs
- [moment](https://momentjs.com/) for parsing and displaying timezones
- [React](https://github.com/facebook/react) for all the goodness.
- [Redux](https://github.com/gaearon/redux) for the _Atomic Flux_ architecture.
- [React-Router](https://github.com/rackt/react-router) for routing goodness.
- [React-Transform](https://github.com/gaearon/babel-plugin-react-transform) for development fun (and productivity).
- [Socket.io](http://socket.io/) for real time communication features
- [Sentry](https://sentry.io) for production crash logging
- [Webpack](https://github.com/webpack/webpack) for asset management and production builds.