import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useAppStore = defineStore('app', () => {
  const temp = ref('')
  function updateTemp(v){
    temp.value = v
  }

  return { temp,updateTemp }
})
