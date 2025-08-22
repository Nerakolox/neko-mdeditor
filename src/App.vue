<script setup>
import { RouterLink, RouterView } from 'vue-router'
import zhCN from 'ant-design-vue/es/locale/zh_CN'
import { theme } from 'ant-design-vue'

import { useSettingStore } from '@/stores/setting'

const setting = localStorage.getItem('setting') ? JSON.parse(localStorage.getItem('setting')) : null
const settingStore = useSettingStore()

console.log('setting',setting)
if(setting){
  //有设置配置，使用本地存储的配置
  // console.log('有设置配置，使用本地存储的配置')
  settingStore.changeSetting(setting)
}else{
  //没有设置配置，使用默认配置
  // console.log('没有设置配置，使用默认配置')
  localStorage.setItem('setting', JSON.stringify(settingStore.setting))
}



const themex = {
  token: {
    // colorPrimary: '#EEA2A4',
    // colorInfo:'#EEA2A4',
    borderRadius: 12,
  },
  algorithm: settingStore.setting.theme==='default'?theme.defaultAlgorithm:theme.darkAlgorithm,
}
const locale = zhCN
</script>

<template>
  <a-config-provider :theme="themex" :locale="locale">
    <RouterView />
  </a-config-provider>
</template>

<style scoped>

</style>

<style>
body{
  margin: 0;
}
.md-editor-preview .md-editor-code .md-editor-code-head{
  position: relative !important;
  z-index: 1 !important;
}
</style>