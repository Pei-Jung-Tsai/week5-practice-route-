
<template>
  <div>
    <h1>Books with ISBN > 1000</h1>
    <ul>
        <li v-for="book in books" :key="book.id" style="margin-bottom:8px;">

        <template v-if="editingId === book.id">
          <input v-model="editName" placeholder="name" />
          <input v-model.number="editIsbn" type="number" placeholder="isbn" style="width:120px;" />
          <button @click="save(book.id)">Save</button>
          <button @click="cancel">Cancel</button>
        </template>

     
        <template v-else>
          {{ book.name }} - ISBN: {{ book.isbn }}
          <button @click="startEdit(book)">Update</button>
          <button @click="remove(book.id)">Delete</button>
        </template>
      </li>
    </ul>
  </div>
</template>

<script>
import { ref, onMounted, onBeforeUnmount } from 'vue'                  
import db from '../firebase/init.js'                                    
import {
  collection, query, where, orderBy, limit as limitBy, onSnapshot,     
  doc, updateDoc, deleteDoc, serverTimestamp                           
} from 'firebase/firestore'

export default {
  setup() {
    const books = ref([])
    const editingId = ref(null)
    const editName  = ref('')
    const editIsbn  = ref(null)

    let unsubscribe = null

    onMounted(() => {     
      const q = query(
        collection(db, 'books'),        // targeted collection
        where('isbn', '>=', 1000),      // filter, targeted documents
        orderBy('isbn', 'asc'),         // order
        limitBy(5)                     // limitation of number to get back
      )

      unsubscribe = onSnapshot(q, (snap) => {
        books.value = snap.docs.map(d => ({ id: d.id, ...d.data() }))
      }, (err) => {
        console.error('onSnapshot error:', err)
      })
    })

    onBeforeUnmount(() => {
      if (unsubscribe) unsubscribe()
    })
    
function startEdit(book) {
      editingId.value = book.id
      editName.value  = book.name ?? ''
      editIsbn.value  = book.isbn ?? null
    }

function cancel() {
      editingId.value = null
      editName.value  = ''
      editIsbn.value  = null
    }

    // update document
async function save(id) {
      const n = Number(editIsbn.value)
      if (Number.isNaN(n)) return alert('ISBN must be a number')

      await updateDoc(doc(db, 'books', id), {
        name: editName.value,
        isbn: n,
        updatedAt: serverTimestamp(),   
      })
      
      cancel()
    }
    // delete document
async function remove(id) {
      if (!confirm('Delete this book?')) return
      await deleteDoc(doc(db, 'books', id))
     
    }
return {
      books,
      editingId, editName, editIsbn,
      startEdit, cancel, save, remove,
    }
  },
}
</script>