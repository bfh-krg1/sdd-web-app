import { defineStore } from 'pinia'
import { ref } from 'vue'

interface Entity {
  id: number
  name: string
  description?: string | null
  createdAt: string
}

interface EntityCreate {
  name: string
  description?: string
}

const API_BASE = import.meta.env.VITE_API_BASE_URL ?? 'http://localhost:3000'

export const useEntityStore = defineStore('entity', () => {
  const items = ref<Entity[]>([])
  const loading = ref(false)
  const error = ref<string | null>(null)

  async function fetchAll() {
    loading.value = true
    error.value = null
    try {
      const res = await fetch(`${API_BASE}/entities`)
      if (!res.ok) throw new Error(`HTTP ${res.status}`)
      items.value = await res.json()
    } catch (e) {
      error.value = (e as Error).message
    } finally {
      loading.value = false
    }
  }

  async function create(data: EntityCreate) {
    const res = await fetch(`${API_BASE}/entities`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    })
    if (!res.ok) throw new Error(`HTTP ${res.status}`)
    const created: Entity = await res.json()
    items.value.push(created)
    return created
  }

  async function remove(id: number) {
    await fetch(`${API_BASE}/entities/${id}`, { method: 'DELETE' })
    items.value = items.value.filter((i) => i.id !== id)
  }

  return { items, loading, error, fetchAll, create, remove }
})
