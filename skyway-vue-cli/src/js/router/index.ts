import Vue from 'vue'
import Router from 'vue-router'
import Lesson from '@js/components/views/Lesson'
import LessonFinish from '@js/components/views/LessonFinish'
import Preparation from '@js/components/views/Preparation'
import * as Constants from '@js/constants/index'

Vue.use(Router)

const routes = [
  {
    name: 'lesson',
    path: '/',
    component: Lesson
  },
  {
    name: 'preparation',
    path: '/preparation',
    component: Preparation
  },
  {
    name: 'lessonFinish',
    path: '/finish',
    component: LessonFinish
  },
  {
    path: '*',
    redirect: '/'
  }
]

export default new Router({
  mode: 'history',
  base: Constants.basePath,
  routes
})
