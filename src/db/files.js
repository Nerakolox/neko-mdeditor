// 使用indexDB储存文件数据

import Dexie from 'dexie'
import { ref } from 'vue'
import { message } from 'ant-design-vue'

// 初始化 Dexie 数据库
const db = new Dexie('files')
db.version(1).stores({
    files: 'name, content, updateTime, &&updateTimeIdx'
})


// 数据库操作封装
const dbOperations = {
    // 查询所有文件（按时间先后顺序）
    async getAllFiles(descending = false) {
        try {
            const query = db.files.orderBy('updateTime')
            const files = descending ? await query.reverse().toArray() : await query.toArray()
            return files
        } catch (error) {
            console.error('获取文件列表失败:', error)
            return []
        }
    },
    // 添加文件
    async addFile(fileData) {
        try {
            await db.files.add(fileData)
            message.success(`文件${fileData.name}保存成功`)
            return true
        } catch (error) {
            console.error('文件添加失败:', error)
            return false
        }
    },

    // 更新文件
    async updateFile(fileData) {
        try {
            await db.files.put(fileData)
            message.success(`文件${fileData.name}保存成功`)
            return true
        } catch (error) {
            console.error('文件更新失败:', error)
            return false
        }
    },

    // 删除文件
    async deleteFile(key) {
        try {
            await db.files.delete(key)
            message.success(`文件${key}删除成功`)
            return true
        } catch (error) {
            console.error('文件删除失败:', error)
            return false
        }
    },

    // 按主键查询文件
    async getFile(key) {
        try {
            const file = await db.files.get(key)
            return file || null
        } catch (error) {
            console.error('查询文件失败:', error)
            return null
        }
    },

    // 按更新时间查询文件
    async getFilesByTime(minTime) {
        try {
            const files = await db.files.where('updateTime').above(minTime).toArray()
            return files
        } catch (error) {
            console.error('按时间查询文件失败:', error)
            return []
        }
    }
}

db.open().catch(error => {
    console.error('数据库打开失败:', error)
    message.error('数据库初始化失败，请刷新页面')
})

export { dbOperations }