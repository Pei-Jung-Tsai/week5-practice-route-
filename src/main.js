// import './assets/main.css'
// import '@/assets/style.css'
import 'bootstrap/dist/css/bootstrap.min.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

import PrimeVue from 'primevue/config'
import Aura from '@primevue/themes/aura'
import { useAuth } from './authentication/useAuth'

// import DataTable from 'primevue/datatable'
// import Column from 'primevue/Column'
const app = createApp(App)

const { initAuthListener } = useAuth()
initAuthListener()



app.use(PrimeVue, { theme: { preset: Aura } })
app.use(router)

// app.component('DataTable', DataTable)
// app.component('Column', Column)


app.mount('#app')
