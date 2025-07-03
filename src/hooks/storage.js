import { useLocalStorage } from '@vueuse/core'
import { ref, computed } from 'vue'

// 封装 useStorage 工具函数
export const useStorage = (key, defaultValue) => {
    // 使用 useLocalStorage 初始化存储，自动处理 JSON 序列化/反序列化
    const storage = useLocalStorage(key, defaultValue, {
        serializer: {
            read: (v) => {
                try {
                    return v ? JSON.parse(v) : defaultValue
                } catch (e) {
                    console.error(`从 storage 解析${key}时失败：`, e)
                    return defaultValue // 解析失败时返回默认值
                }
            },
            write: (v) => {
                try {
                    return JSON.stringify(v)
                } catch (e) {
                    console.error(`从 storage 格式化${key}时失败：`, e)
                    return ''
                }
            },
        },
    })

    // 提供更新函数，支持对象部分更新（使用展开运算符）
    const update = (newValue) => {
        if (typeof newValue === 'object' && newValue !== null && !Array.isArray(newValue)) {
            // 如果是对象，自动合并（支持展开运算符）
            storage.value = { ...storage.value, ...newValue }
        } else {
            // 对于非对象（如字符串、数组、数字等），直接替换
            storage.value = newValue
        }
    }

    // 返回响应式数据和更新方法
    return {
        value: storage, // 响应式数据
        update, // 更新方法，支持部分更新
        clear: () => {
            storage.value = defaultValue // 重置为默认值
            localStorage.removeItem(key) // 清除 localStorage 中的键
        },
    }
}