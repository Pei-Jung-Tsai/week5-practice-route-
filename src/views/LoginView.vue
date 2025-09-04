<script>

import { ref } from 'vue'

const LoginData = ref({
  email: '',
  password: ''
})
const hardcodedUser = {
  email: "ptsa0008@student.monash.edu",
  password: "Evelyn0*"
}

const errors = ref({
  email: null,
  password: null,
  login: null
})

const isAuthenticated = ref(false)

const validateEmail = (blur) => {
  if (!LoginData.value.email) {
    if (blur) {
      errors.value.email = "Email is required"
    }
  } else {
    errors.value.email = null
  }
}

const validatePassword = (blur) => {
  if (!LoginData.value.password) {
    if (blur) {
      errors.value.password = "Password is required"
    }
  } else {
    errors.value.password = null
  }
}
const submitLogin = () => {
  validateEmail(true)
  validatePassword(true)

  if (!errors.value.email && !errors.value.password) {
    if (
      LoginData.value.email === hardcodedUser.email &&
      LoginData.value.password === hardcodedUser.password
    ) {
      isAuthenticated.value = true
      errors.value.login = null
      alert(" Login successful!")
    } else {
      errors.value.login = " email or password is wrong!"
    }
  }
}

const clearForm = () => {
  LoginData.value = {
    email: '',
    password: ''
  }
}

</script>

<template>
  <div class="mt-5">
    <div class="row">
      <div class="col-md-8 offset-md-2">
        <h1>Login </h1>
        <p>
          Login with your registered email and password. Authenticated users can access restricted pages; unauthenticated users will be redirected to the login page.
        </p>
        <form @submit.prevent="submitLogin">
          <div class="row mb-3">
            
              <label for="email" class="form-label">Email</label>
              <input
                type="email"
                class="form-control"
                id="email"
                v-model="LoginData.email"
                @blur="() => validateEmail(true)" 
          @input="() => validateEmail(false)"
              />
              <p v-if="errors.email" style="color:red">{{ errors.email }}</p>
           </div>
           <div class="row mb-3">
            <label for="password" class="form-label">Password</label>
              <input
                type="password"
                class="form-control"
                id="password"
                @blur="() => validatePassword(true)" 
          @input="() => validatePassword(false)" 
                v-model="LoginData.password"
              />
              <p v-if="errors.password" style="color:red">{{ errors.password }}</p>
           </div>
         
          <div class="text-center">
            <button type="submit" class="btn btn-primary me-2">Login</button>
            <p v-if="errors.login" style="color:red">{{ errors.login }}</p>
            <button type="button" class="btn btn-secondary" @click="clearForm">Clear</button>
          </form>  
            <div v-if="isAuthenticated" style="margin-top:10px; color:green">
       You are logged in!
            </div>
          </div>
    </div>
  </div>
</template>