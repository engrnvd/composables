import { ref, watch } from 'vue'

export function useStorage(key, data = null) {
  let storedData = read()

  if (storedData) {
    data = ref(storedData)
  } else {
    data = ref(data)
    write()
  }

  watch(data, write, { deep: true })

  function read() {
    let v = localStorage.getItem(key)
    if (!v) return v
    return JSON.parse(v)
  }

  function write() {
    if (data.value === null || data.value === '') {
      localStorage.removeItem(key)
    } else {
      localStorage.setItem(key, JSON.stringify(data.value))
    }
  }

  return data
}
