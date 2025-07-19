import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import Vueform from '@vueform/vueform'
import vueformConfig from './../vueform.config'
import router from './router/index'

import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

import {
  faArrowLeftLong,
  faArrowRightLong,
  faCircleDot,
  faExclamationCircle,
  faCircleCheck,
} from '@fortawesome/free-solid-svg-icons'
import { faCircle } from '@fortawesome/free-regular-svg-icons'

library.add(
  faArrowLeftLong,
  faArrowRightLong,
  faCircleDot,
  faCircle,
  faCircleCheck,
  faExclamationCircle,
  faCircleCheck,
)

const app = createApp(App)

app.use(createPinia())
app.use(Vueform, vueformConfig)
app.use(router)
app.component('fa', FontAwesomeIcon)

app.mount('#app')
