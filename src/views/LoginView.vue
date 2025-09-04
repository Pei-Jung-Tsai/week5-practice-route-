<script setup>
import { ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'   
import { login } from '../stores/auth'              

const router = useRouter() 
const route = useRoute() 

const LoginData = ref({
  email: '',
  password: ''
})

const hardcodedUser = {
  email: 'ptsa0008@student.monash.edu',
  password: 'Evelyn0*'
}

const errors = ref({
  email: null,
  password: null,
  login: null
})

const validateEmail = (blur) => {
  if (!LoginData.value.email) {
    if (blur) errors.value.email = 'Email is required'
  } else {
    errors.value.email = null
  }
}

const validatePassword = (blur) => {
  if (!LoginData.value.password) {
    if (blur) errors.value.password = 'Password is required'
  } else {
    errors.value.password = null
  }
}

const checkCredentials = (email, password) => {
  return email === hardcodedUser.email && password === hardcodedUser.password
}

const submitLogin = () => {
  validateEmail(true)
  validatePassword(true)

  if (!errors.value.email && !errors.value.password) {
    if (
      checkCredentials(LoginData.value.email, LoginData.value.password)
    ) {

      errors.value.login = null

      /* store login status in localstorage*/
      login(LoginData.value.email)

      /* go to which page after login*/
      const redirect = route.query.redirect || '/about'
      router.push(redirect)

      alert('Login successful!')
    } else {
      errors.value.login = 'Email or password is wrong!'
    }
  }
}

const clearForm = () => {
  LoginData.value = { email: '', password: '' }
  errors.value = { email: null, password: null, login: null }
}
</script>

<template>

  <div class="mt-5">
    <div class="row">
      <div class="col-md-8 offset-md-2">
        
      <div class="row mb-3">
        <div class="col-md-8 offset-md-2">
        <h1>Login</h1>
        <p>
          Login with your registered email and password. Authenticated users can access restricted pages; unauthenticated users will be redirected to the login page.
        </p>
        </div>
      </div>


        <form @submit.prevent="submitLogin">
          
      
          <div class="row mb-3">
            <div class="col-md-8 offset-md-2">
            <label for="email" class="form-label">Email</label>
            <input
              id="email"
              type="email"
              class="form-control"
              v-model="LoginData.email"
              @blur="() => validateEmail(true)"
              @input="() => validateEmail(false)"
            />
            <p v-if="errors.email" class="text-danger">{{ errors.email }}</p>
          </div>
            </div>

      
          <div class="row mb-3">
            <div class="col-md-8 offset-md-2">
            <label for="password" class="form-label">Password</label>
            <input
              id="password"
              type="password"
              class="form-control"
              v-model="LoginData.password"
              @blur="() => validatePassword(true)"
              @input="() => validatePassword(false)"
            />
            <p v-if="errors.password" class="text-danger">{{ errors.password }}</p>
          </div>
          </div>

         
          <div class="text-center">
            <button type="submit" class="btn btn-primary me-2">Login</button>
            <button type="button" class="btn btn-secondary" @click="clearForm">Clear</button>
          </div>

       
          <p v-if="errors.login" class="text-danger mt-2">
            {{ errors.login }}
          </p>
        </form>


      </div>
    </div>
  </div>
</template>
