const Config = require('@/../config')

export const isDev: boolean = process.env.NODE_ENV !== 'production'
export const basePath: string = isDev
  ? Config.dev.basePath
  : Config.build.basePath
export const apiBasePath: string = isDev
  ? Config.dev.apiBasePath
  : Config.build.apiBasePath
export const rjBasePath: string = isDev
  ? Config.dev.rjBasePath
  : Config.build.rjBasePath

export const GA_TRACKING_ID: string = 'UA-2573220-1'
export const URL_RJ: string = rjBasePath
export const URL_RJ_MYPAGE: string = URL_RJ + 'mypage'
export const URL_RJ_LOGIN: string = URL_RJ + 'account/login'
export const URL_RJ_INQUIRY: string = URL_RJ + 'inquiry'
export const URL_RJ_LESSON_HISTORY: string = URL_RJ + 'mypage/history'
export const URL_RJ_FAILURE_REPORT: string = URL_RJ + 'lesson/failure/report'
export const URL_RJ_AWS: string = 'https://d1atgierv9op2.cloudfront.net'
export const URL_DNA: string = 'https://www.tic40.com/dna/'
export const URL_LESSON_ROOM_FAQ: string = isDev
  ? 'https://stg-www.tic40.com/info/howto/lesson/room/30'
  : 'https://www.tic40.com/info/howto/lesson/room/30'

export const FAQ_LIST = {
  browser: URL_LESSON_ROOM_FAQ + '/#content1',
  deviceConnection: URL_LESSON_ROOM_FAQ + '/#content2',
  device: URL_LESSON_ROOM_FAQ + '/#content3',
  speaker: URL_LESSON_ROOM_FAQ + '/#content4'
}

export const LESSON_TIME: number = 60 * 25 // 25 min(60 * 25)
export const MAX_PREPARATION_TIME_BEFORE_LESSON: number = 60 * 3 // 3 minutes
export const DEFAULT_LAYOUT: string = 'himawari'
export const LESSON_ROOM_TIME: number = 60 * 120

export const SKYWAY_DEBUG_OPTION: number = isDev ? 3 : 0

export const COOKIES = {
  LAYOUT: 'lesson_room_layout',
  TUTOR_SOUND_VOLUME: 'lesson_room_sound_volume',
  FINISH_TUTORIAL: 'lesson_room_finish_tutorial'
}

export const ERROR_CODE = {
  MEMBER_AUTH: '001',
  INVALID_QUERY_PARAM: '002',
  API_ERROR: '003',
  USER_ENV_ERROR: '004',
  USER_DEVICE_PERMISSION_DENIED: '005',
  NO_WEBRTC_LESSON_RESERVATION: '006',
  INVALID_ENTRANCE_TIME: '007',
  DUPLICATE_PEER_ID: '008',
  UNKNOWN: '999'
}

export const NUMBER_OF_DNA_MATERIAL: number = 20

export const ENV_CHECK_LIST_ID = {
  IS_VALID_BROWSER: 1,
  CAN_USE_WEBCAM: 2,
  CAN_USE_MIC: 3,
  CAN_SEE_VIDEO: 4,
  CAN_WORK_SOUND_METER: 5,
  CAN_HEAR_VIDEO_SOUND: 6
}

export const MESSAGE_ACTIONS = {
  END_LESSON: 'end lesson'
}

export const DEFAULT_TITLE = 'タイトル'
export const TITLE_PREPARATION = 'レッスン環境チェック'

export const MATERIAL_DOMAIN_LIST: Array<string> = [
  'www.tic40.com',
  'cdn.tic40.com',
  'd1atgierv9op2.cloudfront.net'
]

export const SKYWAY_PEER_DEBUG_PARAM: number = Config.isDev ? 3 : 0

export const VIDEO_CHAT_PLATFORM_ID = {
  SKYPE: 1,
  SKYWAY: 2
}

export const CHAT_MESSAGE_SENT_BY = {
  STUDENT: 1,
  TUTOR: 2
}

export const LESSON_TIME_STATUS = {
  BEFORE_START: 'beforeStart',
  STARTED_WITHIN_1MINUTE: 'startedWithin1minute',
  STARTED_AFTER_1MINUTE: 'startedAfter1minute',
  ENDED: 'ended'
}

export const CONNECTION_STATUS = {
  DISCONNECTED: 'disconnected',
  CONNECTING: 'connecting',
  CONNECTED: 'connected'
}

export const ROOM_STATUS = {
  BEFORE_START: 'beforeStart',
  BEFORE_START_CONNECTED: 'beforeStartConnected',
  STARTED: 'started',
  STARTED_WITHIN_1MINUTE_NO_CONNECTION: 'startedWithin1minuteNoConnection',
  STARTED_AFTER_1MINUTE_NO_CONNECTION: 'startedAfter1minuteNoConnection',
  LESSON_ENDED: 'lessonEnded',
  TUTOR_CAMERA_OFF: 'startedTutorCameraOff',
  TUTOR_DISCONNECTED: 'startedTutorDisconnected'
}

export const SKYWAY_OP_CODE = {
  CALL: '11',
  CONNECTED: '12',
  DISCONNECTED: '13',
  ACCESS_LESSON_ROOM: '31',
  EXIT_LESSON_ROOM: '32'
}

// milisec
export const CALL_INTERVAL: number = 10000
export const CHANGE_LAYOUT_TIMEOUT: number = 400
export const MIN_PRECHECK_TIMEOUT: number = 3000
export const AUTO_SAVE_LESSON_MEMO_INTERVAL: number = 10000

export const MAX_CHAT_INPUT_CHAR: number = 2000
export const MAX_LESSON_MEMO_INPUT_CHAR: number = 1000
export const DEFAULT_TUTOR_MIC_VOLUME: number = 0.5

export const DEFAULT_GET_USER_MEDIA_CONSTRAINTS = { audio: true, video: true }
export const GET_USER_MEDIA_CONSTRAINTS_ONLY_MIC = { audio: true, video: false }
export const GET_USER_MEDIA_CONSTRAINTS_ONLY_VIDEO = {
  audio: false,
  video: true
}
export const DEFAULT_SKYWAY_CALL_OPTION = {
  // 一旦 上限500kpbsで設定してみる
  audioBandwidth: 50,
  // audioCodec: 'PCMU',
  videoBandwidth: 450,
  videoCodec: 'H264',
  videoReceiveEnabled: true,
  audioReceiveEnabled: true
}
