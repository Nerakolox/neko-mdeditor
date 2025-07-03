<script setup>
import { ref } from 'vue'

import { message } from 'ant-design-vue'
import dayjs from 'dayjs'

import { dbOperations } from '@/db/files'

const fileListModal = ref(false)
const fileContent = ref(null) // 文件内容缓存

const showFileList = async (content) => {
    fileList.value = await dbOperations.getAllFiles()
    fileListModal.value = true
    console.log(fileList.value)
    fileContent.value = content
}

defineExpose({
  showFileList, // 暴露方法
})

const fileList = ref([])

const addFileModal = ref(false)
const savedName = ref('')// 保存的名称
const saveAlertNONAME = ref(false)// 是否有未输入名称的错误提示
const saveAlertERRNAME = ref(false)// 是否有同名文件的错误提示
const chosedFile = ref('')
const clickMenu = (e) => {
    // 右键菜单点击事件
    switch (e.key) {
        case 'add':
            addFileModal.value = true
            // 这里可以添加逻辑来处理添加文件的操作
            // 添加文件逻辑
            // const newFile = {
            //     name: `新文件-${fileList.value.length + 1}`,
            //     content: '',
            // }
            // fileList.value.push(newFile)
            // localStorage.setItem('fileList', JSON.stringify(fileList.value))
            break
        default:
            break
    }
}

const saveFile = async (replace) => {
    const newFile = {
        name: replace?chosedFile.value:savedName.value,
        content: fileContent.value,
        updateTime:dayjs().valueOf()
    }
    console.log('要保存的文件',newFile)
    if(!replace){
        console.log('新存储')
        const hadSaved = await dbOperations.getFile(savedName.value)
        if (savedName.value.trim() === '') {// 判断名称是否为空
            saveAlertNONAME.value = true
            return
        }
        if (hadSaved) {// 判断名称是否被注册过
            saveAlertERRNAME.value = true
            return
        }
        saveAlertNONAME.value = false
        saveAlertERRNAME.value = false

        // 将文件内容存储到 indexDB
        await dbOperations.addFile(newFile)

        savedName.value = ''
    }else{
        // 若为替换现有文件
        if(chosedFile.value == ''){
            // 如果没有选中文件
            message.warning('请选择一个文件或新建文件')
            return
        }else{
            // 将文件内容存储到 indexDB
            await dbOperations.updateFile(newFile)
            chosedFile.value = ''
        }
    }
    addFileModal.value = false
    fileListModal.value = false
}
</script>

<template>
    <a-modal v-model:open="fileListModal" centered title="文件列表" :bodyStyle="{ height: '80vh' }" width="80vh" @ok="saveFile(1)" @cancel="chosedFile = ''">
        <a-dropdown :trigger="['contextmenu']">
            <div style="height: 100%;">
                <div class="file-list" v-if="fileList.length > 0">
                    <div class="file-item" :style="{background:file.name === chosedFile?'#e0e0e0':''}" v-for="file in fileList" :key="file.name" @click="chosedFile !== file.name?chosedFile = file.name:chosedFile = ''">
                        {{ file.name }}
                        <!-- <span @click="showFileList(file)">{{ file }}</span>
                        <a-popconfirm title="确定删除此文件吗？" @confirm="deleteFile(file)">
                            <a-button size="small" type="text" icon="delete" />
                        </a-popconfirm> -->
                    </div>
                </div>
                <div v-else style="display: flex; justify-content: center; align-items: center; height: 100%;">
                    <p>没有文件，右键单击此处以添加文件</p>
                </div>
            </div>
            <template #overlay>
                <a-menu @click="clickMenu">
                    <a-menu-item key="add">添加文件</a-menu-item>
                </a-menu>
            </template>
        </a-dropdown>
    </a-modal>


    <a-modal v-model:open="addFileModal" title="输入一个名称，下次将可以在保存列表中继续编辑" centered @ok="saveFile(0)" @cancel="() => { savedName = ''; saveAlertNONAME = false; saveAlertERRNAME = false; }">
        <a-alert v-if="saveAlertNONAME" message="请输入一个名称！" type="warning" />
        <a-alert v-if="saveAlertERRNAME" message="重复的名称！" type="error" />
        <a-input style="margin:0.5rem 0;" size="large" v-model:value="savedName" placeholder="输入一个名称" />
    </a-modal>
</template>

<style scoped>
.file-list{
    height: 100%;
    overflow-y: auto;
    display:flex;
    flex-direction:column;
    gap:0.25rem;
}
.file-item{
    border-radius:12px;
    padding:0.5rem 0.5rem;
    transition:0.25s;
    &:hover{
        cursor:pointer;
        background:#efefef;
    }
}
</style>
