import { fileURLToPath, URL } from 'url'
import type { UserConfigExport } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { NaiveUiResolver } from 'unplugin-vue-components/resolvers'
import Icons from 'unplugin-icons/vite'
import IconsResolver from 'unplugin-icons/resolver'
import Layouts from 'vite-plugin-vue-layouts'
import Pages from 'vite-plugin-pages'
import WindiCSS from 'vite-plugin-windicss'
import { readFile } from 'fs/promises'

// https://vitejs.dev/config/
export default async (): Promise<UserConfigExport> => {
  const proxyUrl = await getEnvConfig('VITE_PROXY_URL')
  return {
    plugins: [
      vue(),
      vueJsx(),
      Components({
        resolvers: [NaiveUiResolver(), IconsResolver()],
        directoryAsNamespace: true
      }),
      AutoImport({
        imports: ['vue', 'vue-router', '@vueuse/core'],
        eslintrc: {
          enabled: true,
          filepath: './.eslintrc-auto-import.json',
          globalsPropValue: true
        },
        dts: './auto-imports.d.ts'
      }),
      /**
       * 图标库 https://icon-sets.iconify.design/
       * 使用 <i-[collection-id]-[icon-name] />
       */
      Icons({
        compiler: 'vue3',
        autoInstall: true
      }),
      Layouts({
        layoutsDirs: 'src/pages/admin/layouts'
      }),
      Pages({
        dirs: [
          { dir: 'src/pages/admin/src', baseRoute: 'admin' },
          { dir: 'src/pages/views/src', baseRoute: 'form' }
        ],
        exclude: ['**/components/*.vue'],
        importMode: 'async'
      }),
      WindiCSS()
    ],
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url)),
        '@admin': fileURLToPath(new URL('./src/pages/admin', import.meta.url)),
        '@views': fileURLToPath(new URL('./src/pages/views', import.meta.url))
      }
    },
    base: './',
    server: {
      host: true,
      proxy: {
        '/api': {
          target: proxyUrl,
          changeOrigin: true,
          rewrite: path => path.replace(/^\/api/, '')
        }
      }
    },
    define: {
      // 关闭OPTIONS_API,减少打包大小
      // __VUE_OPTIONS_API__: false
    },
    build: {
      // 消除打包大小超过 500kb 警告
      chunkSizeWarningLimit: 2000,
      minify: 'terser',
      // 移除 console.log、debugger 和 注释
      terserOptions: {
        compress: {
          drop_console: true,
          drop_debugger: true
          // pure_funcs: ['console.log']
        },
        output: {
          // 删除注释
          comments: false
        }
      },
      rollupOptions: {
        input: {
          form: fileURLToPath(new URL('index.html', import.meta.url)),
          admin: fileURLToPath(new URL('admin.html', import.meta.url))
        },
        output: {
          chunkFileNames: 'static/js/[name]-[hash].js',
          entryFileNames: 'static/js/[name]-[hash].js',
          assetFileNames: 'static/[ext]/[name]-[hash].[ext]'
        }
      }
    }
  }
}

async function getEnvConfig(name: string) {
  const env = process.env.NODE_ENV || 'development'
  const file = await readFile(`./.env.${env}`, 'utf8')
  const arr = file.split('\n').find(i => i.includes(name))
  return arr!.split('=')[1].trim()
}
