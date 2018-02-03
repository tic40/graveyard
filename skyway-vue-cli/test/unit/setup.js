import Vue from 'vue'
import $ from 'jquery'
import * as _ from 'lodash'
import * as Constants from '@js/constants/index'
import * as Util from '@js/modules/util'
import * as GibsonApi from '@js/api/gibsonApi'
import Moment from 'moment-timezone'

global.$ = global.jQuery = $
global._ = _
global.Constants = Constants
global.Util = Util
global.Moment = Moment
global.GibsonApi = GibsonApi

Vue.config.productionTip = false
