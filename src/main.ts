import type { UserModule } from './types'
import { setupLayouts } from 'virtual:generated-layouts'

import { ViteSSG } from 'vite-ssg'
import { createWebHashHistory } from 'vue-router'

import { routes } from 'vue-router/auto-routes'
import App from './App.vue'
import 'element-plus/es/hooks/use-locale/index'

import '@unocss/reset/tailwind.css'
import './styles/main.css'
import './styles/markdown.css'
import './styles/element.scss'
import 'uno.css'

export const createApp = ViteSSG(
  App,
  {
    routes: setupLayouts(routes),
    history: createWebHashHistory(),
    base: import.meta.env.BASE_URL,
    scrollBehavior() {
      return { top: 0 }
    },
  },
  (ctx) => {
    // install all modules under `modules/`
    Object.values(import.meta.glob<{ install: UserModule }>('./modules/*.ts', { eager: true }))
      .forEach(i => i.install?.(ctx))
    // ctx.app.use(Previewer)
  },
)
