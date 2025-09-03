<script>
const formData = ref({
  email: '',
  password: ''
})
</script>

<template>
  <div class=" mt-5">
    <div class="row">
      <div class="col-md-8 offset-md-2">
        <h1 class="text-center">Login </h1>
        <p class="text-center">
          Login with your registered email and password. Authenticated users can access restricted pages; unauthenticated users will be redirected to the login page.
        </p>
        <form @submit.prevent="submitForm">
          <div class="row mb-3">
            <div class="col-md-6 col-sm-6">
              <label for="email" class="form-label">Email</label>
              <input
                type="text"
                class="form-control"
                id="email"
                
                v-model="formData.email"
              />
              <div v-if="errors.username" class="text-danger">{{ errors.username }}</div>

    </div>
  </div>
 <template/>