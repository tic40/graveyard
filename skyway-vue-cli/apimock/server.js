// api mock server
const fs = require('fs')
const https = require('https')
const express = require('express')
const bodyParser = require('body-parser')
const server = express()
const log4js = require('log4js')
const cors = require('cors')
const port = 8081
const Moment = require('moment')

// allow cors
server.use(cors())
// logging
log4js.configure ({
  appenders: {
    access: { type: 'console' }
  },
  categories: {
    default: { appenders: ['access'], level: 'info' }
  }
})
const accessLogger = log4js.getLogger('access')
server.use(log4js.connectLogger(accessLogger))

// ssl support
const sslOptions = {
  key: fs.readFileSync('build/cert/server.key'),
  cert: fs.readFileSync('build/cert/server.crt')
}

const DbBasePath = 'apimock/db/'
const cosmoAPIBasePath = '/ajax/cosmo/'
const DbPath = {
  'memberAuth': DbBasePath + 'memberAuth.json',
  'skywayKey': DbBasePath + 'skywayKey.json',
  'memberLessonSkywayChat': DbBasePath + 'memberLessonSkywayChat.json',
  'memberLessonRequest': DbBasePath + 'memberLessonRequest.json',
  'memberLessonReservation': DbBasePath + 'memberLessonReservation.json',
  'memberLessonMemo': DbBasePath + 'memberLessonMemo.json',
  'memberLessonSkyway': DbBasePath + 'memberLessonSkyway.json',
  'memberMaterial': DbBasePath + 'memberMaterial.json',
  'memberCurriculum': DbBasePath + 'memberCurriculum.json'
}
const ApiPath = {
  'test': '/test',
  'timestamp': '/ajax/cosmo/timestamp',
  'log': '/ajax/cosmo/log',
  'memberAuth': cosmoAPIBasePath + 'member/auth',
  'skywayKey': cosmoAPIBasePath + 'skyway/key',
  'memberLessonSkywayChat': cosmoAPIBasePath + 'member/lesson/skyway/chat',
  'memberLessonRequest': cosmoAPIBasePath + 'member/lesson/request',
  'memberLessonReservation': cosmoAPIBasePath + 'member/lesson/reservation',
  'memberLessonMemo': '/ajax/getLessonMemo',
  'postMemberLessonMemo': '/ajax/lessonMemo',
  'memberLessonSkywayCondition': cosmoAPIBasePath + 'member/lesson/skyway/condition',
  'memberLessonSkyway': cosmoAPIBasePath + 'member/lesson/skyway',
  'memberMaterial': cosmoAPIBasePath + 'member/material',
  'memberCurriculum': cosmoAPIBasePath + 'member/curriculum'
}

const readJson = (filePath) => {
  return new Promise(resolve => {
    fs.readFile(filePath, (err, data) => {
      resolve(JSON.parse(data))
    })
  })
}

server.get(ApiPath.test, (req, res) => {
  res.json({ 'test': 'this is test response' })
})
server.get(ApiPath.timestamp, (req, res) => {
  // server time
  res.json({ timestamp: Moment().format('X') })
})
server.post(ApiPath.log, (req, res) => {
  res.json({ result: 1 })
})
server.get(ApiPath.memberAuth, (req, res) => {
  readJson(DbPath.memberAuth).then(data => { res.json(data) })
})
server.get(ApiPath.skywayKey, (req, res) => {
  readJson(DbPath.skywayKey).then(data => { res.json(data) })
})
server.get(ApiPath.memberLessonSkywayChat, (req, res) => {
  readJson(DbPath.memberLessonSkywayChat).then(data => { res.json(data) })
})
server.get(ApiPath.memberLessonRequest, (req, res) => {
  readJson(DbPath.memberLessonRequest).then(data => { res.json(data) })
})
server.get(ApiPath.memberLessonReservation, (req, res) => {
  readJson(DbPath.memberLessonReservation).then(data => {
    const now = Moment()
    let response = { list: [] }
    for (let v of data.list) {
      const lessonEndTime = Moment(v.lesson_start_time, 'YYYYMMDDHHmm').add(60*30, 'seconds')
      if (now.diff(lessonEndTime, 'seconds') <= 0) {
        response.list.push(v)
      }
    }
    res.json(response)
  })
})
server.post(ApiPath.memberLessonMemo, (req, res) => {
  readJson(DbPath.memberLessonMemo).then(data => { res.json(data) })
})
server.post(ApiPath.postMemberLessonMemo, (req, res) => {
  res.json('SUCCESS')
})
server.post(ApiPath.memberLessonSkywayCondition, (req, res) => {
  res.json({'result_flg': '1'})
})
server.get(ApiPath.memberLessonSkyway, (req, res) => {
  readJson(DbPath.memberLessonSkyway).then(data => {
    // random string
    data.member_peer_id = Math.floor(Math.random() * 10000).toString()
    data.tutor_peer_id = Math.floor(Math.random() * 10000).toString()
    res.json(data)
  })
})
server.get(ApiPath.memberMaterial, (req, res) => {
  readJson(DbPath.memberMaterial).then(data => { res.json(data) })
})
server.get(ApiPath.memberCurriculum, (req, res) => {
  readJson(DbPath.memberCurriculum).then(data => { res.json(data) })
})

console.log('method | endpoint')
for (let v of server._router.stack) {
  if (v.route && v.route.path){
    let path = v.route.path
    let method = v.route.stack[0].method.toUpperCase()
    console.log(method + ' | '+ path);
  }
}
console.log()

https.createServer(sslOptions, server).listen(port, () => {
  console.log('API server started on port ' + port)
})
