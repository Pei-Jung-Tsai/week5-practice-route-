
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
import { ref, onMounted, onBeforeUnmount } from 'vue'                  // 🟩 來源：vue
import db from '../firebase/init.js'                                    // 你的 Firestore 實例
import {
  collection, query, where, orderBy, limit as limitBy, onSnapshot,     // 🟩 來源：firebase/firestore（查詢 + 監聽）
  doc, updateDoc, deleteDoc, serverTimestamp                           // 🟩 來源：firebase/firestore（更新/刪除）
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
        limitBy(20)                     // limitation of number to get back
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

function startEdit(b) {
      editingId.value = b.id
      editName.value  = b.name ?? ''
      editIsbn.value  = b.isbn ?? null
    }

async function remove(id) {
      if (!confirm('Delete this book?')) return
      await deleteDoc(doc(db, 'books', id))
     
    }

</script>

