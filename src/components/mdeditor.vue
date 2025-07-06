<script setup>
import { ref,defineEmits,onMounted,watch } from 'vue'
import { MdEditor } from 'md-editor-v3'
import 'md-editor-v3/lib/style.css'

import FileCommander from '@/components/tools/fileCommander.vue'

import { useSettingStore } from '@/stores/setting'
import { useAppStore } from '@/stores/app'

const settingStore = useSettingStore()
const app = useAppStore()
const emit = defineEmits([])

const text = ref('')

const toolbars = [
    'title',
    'bold',
    '-',
    'underline',
    'italic',
    'strikeThrough',
    '-',
    'quote',
    'unorderedList',
    'orderedList',
    'task',
    '-',
    'code',
    'link',
    'image',
    'table',
    '=',
    'revoke',
    'next',
    'save',
]


const fileCommander = ref(null) // 引用 FileCommander 组件
const onSave = () => {
    if (fileCommander.value) {
        fileCommander.value.showFileList(text.value) // 调用子组件的 showFileList 方法
        // console.log('父组件调用子组件方法，设置值为 fileCommander')
    }else{
        // console.log('父组件未找到子组件 fileCommander')
    }
    // console.log('Content saved:', text.value)
}

// 改变时写入缓存
const onChange = (e) => {
    app.updateTemp(e)
    localStorage.setItem('fileTemp',e)
}

// 监听 app 缓存 的变化，变化时更新local缓存和编辑器文本
watch(() => app.temp, (newValue) => {
    if (newValue) {
        localStorage.setItem('fileTemp',newValue)
        text.value = newValue
    }
})

// 加载时读取缓存，
onMounted(() => {
    const temp = localStorage.getItem('fileTemp')
    if(temp){
        app.updateTemp(temp)
        text.value = temp
    }
})
</script>

<template>
    <MdEditor v-model="text"
    :showToolbarName="true"
    @onSave="onSave"
    @onChange="onChange"
    :toolbars="toolbars"
    :theme="settingStore.setting.theme"
    :previewTheme="settingStore.setting.editorTheme.previewTheme"
    :codeTheme="settingStore.setting.editorTheme.codeTheme"
    class="neko-editor"
    style="height:100%;"/>

    <FileCommander ref="fileCommander"/>
</template>

<style scoped>

</style>

<style>
.neko-editor{
    border-radius: 12px;
    .md-editor-toolbar-item-name{
        font-size:0.6rem !important;
    }
    .md-editor-toolbar-item{
        border-radius:12px;
        padding: 0.35rem 0.35rem !important;
    }
    .md-editor-dropdown-overlay{
        background:none !important;
        border-radius: 12px;
        overflow:hidden;
    }
    .md-editor-menu{
        border-radius: 12px;
        overflow:hidden;
    }
    .md-editor-table-shape{
        border-radius: 12px;
        overflow:hidden;
    }
    .md-editor-table-shape-col{
        border-radius: 12px !important;
    }
}
</style>
