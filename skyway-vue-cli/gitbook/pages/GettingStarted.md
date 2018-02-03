# Getting Started


## Start Servers

This repository is included Node.js application server and API mock server for development.

Install packages
```
$ npm install
```

Modify dev setting.
Open config/index.js and modify the params below.
```
  dev: {
    ...
    apiBasePath: '{your domain}:8081/',
    rjBasePath: '{your domain}',
    ...
```

Start application server for dev
```
$ npm run dev
```

Start API mock server
```
$ npm run apimock
```


## Edit API Mock Server's Response


Each API mock response are written here.
```
apimock/db/*.json
```

You can modify the API response to edit the json files.
