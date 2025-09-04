import { ref } from 'vue'

export const isAuthenticated = ref(localStorage.getItem('auth') === 'true')
export const userEmail = ref(localStorage.getItem('userEmail') || '')

export const login = (email) => {
  isAuthenticated.value = true
  userEmail.value = email
  localStorage.setItem('auth', 'true')
  localStorage.setItem('userEmail', email)
}

export const logout = () => {
  isAuthenticated.value = false
  userEmail.value = ''
  localStorage.removeItem('auth')
  localStorage.removeItem('userEmail')
}