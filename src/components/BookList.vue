
<template>
  <div>
    <h1>Books with ISBN > 1000</h1>
    <ul>
      <li v-for="book in books" :key="book.id">
        {{ book.name }} - ISBN: {{ book.isbn }}
      </li>
    </ul>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue'
import db from '../firebase/init.js'
import { collection, query, where, getDocs } from 'firebase/firestore'

export default {
  setup() {
    const books = ref([])

    const fetchBooks = async () => {
      try {
        const q = query(
          collection(db, 'books'),  //collection
          where('isbn', '>', 1000) // filter, return targeted document
        ) //  make it query object

        const querySnapshot = await getDocs(q) 

        const booksArray = []
        querySnapshot.forEach((doc) => {
          booksArray.push({ id: doc.id, ...doc.data() })
        })

        books.value = booksArray
      } catch (error) {
        console.error('Error fetching books: ', error)
      }
    }

    onMounted(() => {
      fetchBooks()
    })

    return {
      books,
    }
  },
}
</script>

/*

import { onMounted, onBeforeUnmount, ref } from 'vue'
import { collection, onSnapshot } from 'firebase/firestore'
import db from '../firebase/init.js'

const books = ref([])
let unsubscribe = null

onMounted(() => {
  const q = collection(db, 'books')
  unsubscribe = onSnapshot(q, (snap) => {
    books.value = snap.docs.map(doc => ({ id: doc.id, ...doc.data() }))
  })
})

onBeforeUnmount(() => {
  if (unsubscribe) unsubscribe() 
})

*/