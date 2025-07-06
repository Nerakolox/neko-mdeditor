<script setup>
import { ref,watch } from 'vue'
import { dbOperations } from '@/db/files'

import DataList from './components/dataList.vue'

const show = ref(false)

const onClose = () => {
  show.value = false
}

const fileList = ref([])

const getFiles = async () => {
  fileList.value = await dbOperations.getAllFiles()
}

// 监听 show 的变化，打开的时候获取文件列表
watch(show, async (newValue) => {
  if (newValue) {
    getFiles()
  }
})

defineExpose({
  show, // 暴露方法
})
</script>

<template>
  <div class="workbenches">
    <a-drawer placement="left"
      :closable="false"
      :open="show"
      @close="onClose"
      :bodyStyle="{ padding:'12px' }"
      width="256"
      style="border-top-right-radius: 12px;border-bottom-right-radius: 12px;position: relative;">
      <div style="padding-bottom: 10px;margin: 6px 0;">
        <strong>工作台</strong>
      </div>
      <DataList :label="'文件列表'" :data="fileList" @closeDrawer="onClose"/>
    </a-drawer>
  </div>
  
</template>

<style scoped>

</style>
<style>
.workbenches{
  .ant-drawer-header{
    padding: 12px;
  }
}
</style>
