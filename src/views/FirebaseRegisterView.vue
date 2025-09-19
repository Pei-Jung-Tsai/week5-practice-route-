<template>
  <h1>Create an Account</h1>
  <p>
    <input type="text" placeholder="Email" v-model="email" />
  </p>
  <p>
    <input type="password" placeholder="Password" v-model="password" />
  </p>
  <p>
    <button @click="register">Save to Firebase</button>
  </p>
</template>

<script setup>
import { ref } from "vue"
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth"          
import { useRouter } from "vue-router"
import { doc, setDoc, serverTimestamp } from "firebase/firestore"                 
import db from '../firebase/init.js' 

const email = ref("")
const password = ref("")
const router = useRouter()
const auth = getAuth() 

const register = async () => {
  try {
    const cred = await createUserWithEmailAndPassword(auth, email.value, password.value)
    console.log('Firebase Register Successful!')

    await setDoc(
      doc(db, 'users', cred.user.uid),
      {
        uid: cred.user.uid,
        email: cred.user.email,
        role: 'member',
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      },
      { merge: true }
    )

    router.push('/FireLogin')
  } catch (error) {
    console.log(error.code)
  }
}
</script>