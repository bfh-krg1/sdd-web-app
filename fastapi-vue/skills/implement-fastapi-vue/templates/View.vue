<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useEntityStore } from '@/stores/entity'

const store = useEntityStore()
const newName = ref('')

onMounted(() => store.fetchAll())

async function handleCreate() {
  if (!newName.value.trim()) return
  await store.create({ name: newName.value.trim() })
  newName.value = ''
}
</script>

<template>
  <div class="p-6 max-w-2xl mx-auto">
    <h1 class="text-2xl font-bold mb-6">Entities</h1>

    <form class="flex gap-2 mb-6" @submit.prevent="handleCreate">
      <input
        v-model="newName"
        type="text"
        placeholder="Name"
        class="flex-1 border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <button
        type="submit"
        class="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Add
      </button>
    </form>

    <div v-if="store.loading" class="text-gray-500">Loading...</div>
    <div v-else-if="store.error" class="text-red-600">{{ store.error }}</div>
    <ul v-else class="space-y-2">
      <li
        v-for="item in store.items"
        :key="item.id"
        class="flex items-center justify-between border rounded px-4 py-2"
      >
        <span>{{ item.name }}</span>
        <button
          class="text-red-500 hover:text-red-700 text-sm"
          @click="store.remove(item.id)"
        >
          Remove
        </button>
      </li>
      <li v-if="store.items.length === 0" class="text-gray-400 text-sm">No items yet.</li>
    </ul>
  </div>
</template>
