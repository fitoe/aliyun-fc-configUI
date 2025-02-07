import path from 'node:path'
import Shiki from '@shikijs/markdown-it'
import Vue from '@vitejs/plugin-vue'
import LinkAttributes from 'markdown-it-link-attributes'
import TaskList from 'markdown-it-task-lists'
import Unocss from 'unocss/vite'
import AutoImport from 'unplugin-auto-import/vite'
import ElementPlus from 'unplugin-element-plus/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import Components from 'unplugin-vue-components/vite'
import Markdown from 'unplugin-vue-markdown/vite'
import { VueRouterAutoImports } from 'unplugin-vue-router'
import VueRouter from 'unplugin-vue-router/vite'
import { defineConfig, loadEnv } from 'vite'
import Layouts from 'vite-plugin-vue-layouts'

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd())
  return {
    base: './',
    build: {
      minify: true,
    },
    server: {
      host: true,
      port: 1010,
    },
    css: {
      preprocessorOptions: {
        scss: {
          api: 'modern',
          quietDeps: true,
        },
      },
    },
    resolve: {
      alias: {
        '~/': `${path.resolve(__dirname, 'src')}/`,
        '@/': `${path.resolve(__dirname, 'src')}/`,
      },
    },

    plugins: [
      Vue({
        include: [/\.vue$/, /\.md$/],
      }),
      ElementPlus({
        useSource: false,
        defaultLocale: 'zh-cn',
      }),
      VueRouter({
        extensions: ['.vue', '.md'],
        dts: 'src/typed-router.d.ts',
      }),
      Layouts(),
      AutoImport({
        resolvers: [ElementPlusResolver({ importStyle: 'sass' })],
        imports: [
          'vue',
          'vue-i18n',
          'pinia',
          '@vueuse/head',
          '@vueuse/core',
          VueRouterAutoImports,
          {
            'vue-router/auto': ['useLink'],
          },
        ],
        dts: 'src/auto-imports.d.ts',
        dirs: [
          'src/composables',
          'src/stores',
        ],
        vueTemplate: true,
      }),

      Components({
        extensions: ['vue', 'md'],
        include: [/\.vue$/, /\.vue\?vue/, /\.md$/],
        dts: 'src/components.d.ts',
        directoryAsNamespace: true,
        resolvers: [ElementPlusResolver({ importStyle: 'css' })],
      }),
      Unocss({
        variants: [
          {
            match: (s) => {
              if (s.startsWith('i-')) {
                return {
                  matcher: s,
                  selector: (s) => {
                    return s.startsWith('.') ? `${s.slice(1)},${s}` : s
                  },
                }
              }
            },
          },
        ],
      }),
      Markdown({
        wrapperClasses: 'prose prose-sm container m-auto text-left',
        headEnabled: true,
        markdownItOptions: {
          html: true,
          linkify: true,
          typographer: true,
        },
        async markdownItSetup(md) {
          md.use(TaskList, { label: true, labelAfter: true })
          md.use(LinkAttributes, {
            matcher: (link: string) => /^https?:\/\//.test(link),
            attrs: {
              target: '_blank',
              rel: 'noopener',
            },
          })
          md.use(await Shiki({
            defaultColor: false,
            themes: {
              light: 'vitesse-light',
              dark: 'vitesse-dark',
            },
          }))
        },
      }),
    ],

    test: {
      include: ['test/**/*.test.ts'],
      environment: 'jsdom',
    },

    ssr: {
      noExternal: ['workbox-window', /vue-i18n/],
    },
  }
})
