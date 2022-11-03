import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig(() => {
  const env = loadEnv('mock', process.cwd(), '')
  const processEnvValues = {
    'process.env': Object.entries(env).reduce((prev, [key, val]) => {
      return {
        ...prev,
        [key]: val,
      }
    }, {}),
  }

  return {
    plugins: [vue()],
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `
            @import '/src/assets/sass/_reset.scss';
            @import '/src/assets/sass/_variable.scss';
          `,
        },
      },
    },
    define: processEnvValues,
  }
})
