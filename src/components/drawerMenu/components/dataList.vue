<script setup>
import { RightOutlined } from '@ant-design/icons-vue'
import { ref,onMounted,watch } from 'vue'


const isShow = ref(false)

// 声明 props
const props = defineProps({
  label: {
    type: String,
    default: '', // 可选：设置默认值
    required: true // 可选：是否必须传入
  },
  data: {
    type: Array,
    default: [], // 可选：设置默认值
    required: true // 可选：是否必须传入
  },
})
</script>

<template>
  <div class="box">
    <div class="box-top">
      <div class="collapse" @click="isShow = !isShow">
        <RightOutlined class="iconTrans" :style="{ transform: isShow?'rotate(90deg)':'' }"/>
      </div>
      <div>
        {{ label }}
      </div>
    </div>
    <div class="box-bottom" v-if="isShow">
      <div v-if="data.length>0" style="width: 20px;text-align: center;height: 100%;">
        <div class="line"></div>
      </div>
      <div v-if="data.length>0" style="flex-grow: 1;display: flex;flex-direction: column;gap: 3px;">
        <div class="file-item" v-for="file in data">
          {{ file.name }}
        </div>
      </div>
      <div v-if="data.length<=0" style="padding: 6px;display: flex;justify-content: center;align-items: center;flex-grow: 1;color: #7C7C7C;">
        还没有文件哦
      </div>
    </div>
  </div>
</template>

<style scoped>
.box{
  display: flex;
  flex-direction: column;
  color: #434343;
}
.box-top{
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 5px;
}
.box-bottom{
  display: flex;
  flex-direction: row;
  align-items: center;
  position: relative;
  gap: 5px;
  font-size: 0.75rem;
}
.collapse{
  padding: 8px;
  border-radius: 12px;
  transition: 0.25s;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  &:hover{
    background: #efefef;
  }
}
.iconTrans{
  font-size: 12px;
  transition: 0.25s cubic-bezier(0.45, 0.1, 0, 1.35);
}
.line{
  width: 1px;
  height: 100%;
  background: #efefef;
}
.file-item{
  padding: 6px 8px;
  border-radius: 12px;
  transition: 0.25s;
  &:hover{
    background: #efefef;
    cursor: pointer;
  }
}
</style>