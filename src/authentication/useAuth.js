import { ref } from 'vue'
import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth'              
import { doc, onSnapshot } from 'firebase/firestore'                             
import db from '../firebase/init.js'

// global status 
const user = ref(null) // if not login == null        
const role = ref(null)         
const loading = ref(true)    

let stopUserDoc = null         

export function useAuth() {
  const auth = getAuth()

  function initAuthListener() {

    onAuthStateChanged(auth, (u) => {
      user.value = u
      role.value = null
      if (stopUserDoc) { stopUserDoc(); stopUserDoc = null }

      if (u) {
        
        const refDoc = doc(db, 'users', u.uid)
        stopUserDoc = onSnapshot(refDoc, (snap) => {
          role.value = snap.exists() ? snap.data().role : null
          loading.value = false
        }, () => { role.value = null; loading.value = false })
      } else {
        loading.value = false
      }
    })
  }
  async function logout() {
    await signOut(auth) 
     
  }

  return { user, role, loading, initAuthListener, logout }
}