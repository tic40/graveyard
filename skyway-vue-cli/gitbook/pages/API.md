# API

When you start the API mock server to hit the command below, then all the endpoints are listed in console.

```
$ npm run apimock

> @1.0.0 apimock /home/repo/tic40/skyway-vue-cli
> node apimock/server.js

method | endpoint
GET | /test
GET | /ajax/cosmo/timestamp
POST | /ajax/cosmo/log
GET | /ajax/cosmo/member/auth
GET | /ajax/cosmo/skyway/key
GET | /ajax/cosmo/member/lesson/skyway/chat
GET | /ajax/cosmo/member/lesson/request
GET | /ajax/cosmo/member/lesson/reservation
POST | /ajax/getLessonMemo
POST | /ajax/lessonMemo
POST | /ajax/cosmo/member/lesson/skyway/condition
GET | /ajax/cosmo/member/lesson/skyway
GET | /ajax/cosmo/member/material
GET | /ajax/cosmo/member/curriculum

json-server started on port 8081
```
