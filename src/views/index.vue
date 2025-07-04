<script setup>
import { h,ref } from 'vue'

import Editor from '@/components/mdeditor.vue'
import DrawerMenu from '@/components/drawerMenu/drawerMenu.vue'
import { DoubleRightOutlined } from '@ant-design/icons-vue'

const drawerMenu = ref(null)

const openMenu = () => {
  drawerMenu.value.show = true
}

const menuBtnShow = ref(false)
</script>

<template>
  <div style="display: flex;justify-content: center;align-items: center;height: 100vh;width: 100vw;">
    <div style="width: 90vw;height: 90vh;">
      <Editor style="width: 100%;height: 100%;"/>
    </div>
  </div>
  <DoubleRightOutlined :class="{ 'menu-btn-show': menuBtnShow, 'menu-btn-hide': !menuBtnShow }" style="position: fixed;top: 20px;left: 0px;transition: 0.25s;" @click="openMenu" @mouseenter="menuBtnShow = true" @mouseleave="menuBtnShow = false"  />
  <!-- <a-button :class="{ 'menu-btn-show': menuBtnShow, 'menu-btn-hide': !menuBtnShow }" type="text" :icon="h(DoubleRightOutlined)" style="position: fixed;top: 10px;left: 0px;transition: 0.25s;" @click="openMenu" @mouseenter="menuBtnShow = true" @mouseleave="menuBtnShow = false" /> -->
  <DrawerMenu ref="drawerMenu"/>
</template>

<style scoped>
.menu-btn-show{
  opacity: 1;
  /* visibility: visible; */
}
.menu-btn-hide{
  opacity: 0.2;
  /* visibility: hidden; */
}
</style>
