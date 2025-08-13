// @ts-check
import js from '@eslint/js'
import prettier from 'eslint-plugin-prettier'
import prettierConfig from 'eslint-config-prettier'

export default [
  js.configs.recommended,
  {
    files: ['**/*.{js,mjs,cjs}'],
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: 'module',
      globals: {
        // Browser globals
        window: 'readonly',
        document: 'readonly',
        console: 'readonly',
        localStorage: 'readonly',
        sessionStorage: 'readonly',
        setTimeout: 'readonly',
        clearTimeout: 'readonly',
        setInterval: 'readonly',
        clearInterval: 'readonly',
        fetch: 'readonly',
        URL: 'readonly',
        URLSearchParams: 'readonly',
        File: 'readonly',
        FileReader: 'readonly',
        Blob: 'readonly',
        FormData: 'readonly',
        IntersectionObserver: 'readonly',
        PerformanceObserver: 'readonly',
        requestIdleCallback: 'readonly',
        performance: 'readonly',
        confirm: 'readonly',
        alert: 'readonly',

        // Node.js globals
        process: 'readonly',

        // Nuxt globals
        defineNuxtConfig: 'readonly',
        definePageMeta: 'readonly',
        defineEventHandler: 'readonly',
        defineNuxtRouteMiddleware: 'readonly',
        useHead: 'readonly',
        useSeoMeta: 'readonly',
        useRoute: 'readonly',
        useRouter: 'readonly',
        useRuntimeConfig: 'readonly',
        useAsyncData: 'readonly',
        $fetch: 'readonly',
        navigateTo: 'readonly',
        setHeader: 'readonly',

        // Vue globals
        ref: 'readonly',
        reactive: 'readonly',
        computed: 'readonly',
        watch: 'readonly',
        onMounted: 'readonly',
        onUnmounted: 'readonly',
        onBeforeMount: 'readonly',
        onBeforeUnmount: 'readonly',
        nextTick: 'readonly',

        // Pinia globals
        defineStore: 'readonly',
        useUserStore: 'readonly',

        // Vee-validate globals
        useField: 'readonly',
        useForm: 'readonly',
      },
    },
    plugins: {
      prettier: prettier,
    },
    rules: {
      'prettier/prettier': 'error',
      'arrow-body-style': 'off',
      'prefer-arrow-callback': 'off',
      'no-console': 'warn',
      'no-debugger': 'error',
      'no-unused-vars': 'warn',
    },
  },
  prettierConfig,
  {
    ignores: [
      'node_modules/**',
      '.nuxt/**',
      'dist/**',
      '.output/**',
      'public/**',
      'assets/**',
      '**/*.vue',
      '**/*.ts',
      '**/*.tsx',
    ],
  },
]
