import ToastPlugin from 'vue-toast-notification'
import 'vue-toast-notification/dist/theme-sugar.css'

export default defineNuxtPlugin(async nuxtApp => {
  nuxtApp.vueApp.use(ToastPlugin)

  const { useToast } = await import('vue-toast-notification')
  const toast = useToast({
    position: 'bottom',
    duration: 3000,
    dismissible: true,
    pauseOnHover: true,
  })

  return { provide: { toast } }
})
