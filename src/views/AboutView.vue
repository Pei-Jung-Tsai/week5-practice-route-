<template>
  <div class="page">
    <h1>About Our Library</h1>
    <p v-if="isAuthenticated">
  Welcome back, <span class="text-success">{{ userEmail }}</span> 
</p>
    <p>Welcome to our digital library! We're dedicated to providing a vast collection of books and resources to our community.</p>
  </div>
</template>

<script setup>
import { isAuthenticated, userEmail } from '../stores/auth'
</script>

<style>
</style>