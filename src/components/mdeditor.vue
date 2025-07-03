<script setup>
import { ref } from 'vue'
import { MdEditor } from 'md-editor-v3'
import 'md-editor-v3/lib/style.css'

import { useSettingStore } from '@/stores/setting'
const settingStore = useSettingStore()

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

const saveModal = ref(false)// 保存弹窗
const savedName = ref('')// 保存的名称
const saveAlertNONAME = ref(false)// 是否有未输入名称的错误提示
const saveAlertERRNAME = ref(false)// 是否有同名文件的错误提示
const onSave = () => {
    saveModal.value = true
    console.log('Content saved:', text.value)
}
const saveText = () => {
    if (savedName.value.trim() === '') {
        saveAlertNONAME.value = true
        return
    }
    // 这里可以添加保存逻辑，存储到本地
    // 若已存在同名文件，则提示错误
    console.log('Saving text with name:', savedName.value, 'Content:', text.value)
    saveModal.value = false
    savedName.value = ''
}
</script>

<template>
    <MdEditor v-model="text"
    :showToolbarName="true"
    @onSave="onSave"
    :toolbars="toolbars"
    :theme="settingStore.setting.theme"
    :previewTheme="settingStore.setting.editorTheme.previewTheme"
    :codeTheme="settingStore.setting.editorTheme.codeTheme"
    class="neko-editor"
    style="height:100%;"/>


    <a-modal v-model:open="saveModal" title="输入一个名称，下次将可以在保存列表中继续编辑" centered @ok="saveText" @cancel="() => { savedName = ''; saveAlertNONAME = false; saveAlertERRNAME = false; }">
        <a-alert v-if="saveAlertNONAME" message="请输入一个名称！" type="warning" />
        <a-alert v-if="saveAlertERRNAME" message="重复的名称！" type="error" />
        <a-input style="margin:1rem 0;" v-model:value="savedName" placeholder="输入一个名称" />
    </a-modal>
</template>

<style scoped>

</style>

<style>
.neko-editor{
    border-radius: 12px;
    .md-editor-toolbar-item-name{
        font-size:0.6rem !important;
    }
}
</style>
