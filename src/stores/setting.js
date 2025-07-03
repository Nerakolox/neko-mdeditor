import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useSettingStore = defineStore('setting', () => {
  const setting = ref({
    theme: 'default', // 主题（通用）= default = dark
    editorTheme:{
      previewTheme: 'default', // 预览主题
      codeTheme: 'atom', // 行高
    }
  })
  function changeSetting(v){
    setting.value = { ...setting.value, ...v }
  }

  return { setting,changeSetting }
})
