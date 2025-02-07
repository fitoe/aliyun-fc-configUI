import path from 'node:path'
import Vue from '@vitejs/plugin-vue'
import Unocss from 'unocss/vite'
import AutoImport from 'unplugin-auto-import/vite'
import ElementPlus from 'unplugin-element-plus/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import Components from 'unplugin-vue-components/vite'
import { VueRouterAutoImports } from 'unplugin-vue-router'
import VueRouter from 'unplugin-vue-router/vite'
import { defineConfig, loadEnv } from 'vite'
import Layouts from 'vite-plugin-vue-layouts'

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd())
  return {
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
      Vue(),
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
