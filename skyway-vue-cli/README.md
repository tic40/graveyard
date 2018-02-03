# Cosmo(WebRTC) Project

## Environment

* Server: CentOS
* Node.js: v8.4.0
* Lang
  * Typescript v2
* Main frameworks
  * Vuejs v2
  * Vuex v2
* Build / Bundler
  * Webpack
* Testing
  * Jest(unit)
  * Nightwatch(e2e)
* Package Manager
  * npm

## Installation


### Install Node.js

```
# Install Node.js via nvm
$ git clone https://github.com/creationix/nvm.git ~/.nvm
$ source ~/.nvm/nvm.sh

# Add the below to ~/.bash_profile
if [[ -s ~/.nvm/nvm.sh ]]; then
  source ~/.nvm/nvm.sh
fi

# Install Node.js
$ nvm install v8.4.0
```

### Install Java for e2e test

```
# (you can skip this if you don't run e2e test)
$ yum install java-1.8.0-openjdk.x86_64
```

### Install packages via npm

```
# install dependencies
npm install
```

### Start API Mock

```
$ npm run apimock
```

### Start application server

```
npm run dev
```

### Build

```
# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```

## For Developer


### Formatter

#### prettier(Typescript/JS)

```
$ npm run prettier
```

#### stylefmt(SCSS)

```
$ npm run stylefmt
```

### Static code analysis

#### eslint(Typescript/JS)

```
$ npm run eslint
```

#### sass-lint(SCSS)

```
$ npm run sasslint
```


### Testing

#### Unit Test: jest

* http://facebook.github.io/jest/

#### E2E Test: Nightwatch

* http://nightwatchjs.org/guide


### Run Test

```
# unit tests
npm run unit

# e2e tests
npm run e2e

# all tests
npm test
```


### Documentation

#### gitbook

run gitbook on port 8082
```
$ npm run gitbook
```

### Vue.js devtools for chrome

Recommend to install this extension for debugging.
https://github.com/vuejs/vue-devtools


## References

### vue-cli

For detailed explanation on how things work, checkout the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).

### Vuejs v2

* https://vuejs.org/v2/guide/
* Japanese: https://jp.vuejs.org/v2/guide/

### Vuex v2

* https://vuex.vuejs.org/en/intro.html
* Japanese: https://vuex.vuejs.org/ja/

### Typescript v2

* https://www.typescriptlang.org/docs/
