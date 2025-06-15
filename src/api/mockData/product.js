import Mock from 'mockjs'

export default {
    getProductList: () => {
        const productList = [
            { name: "宫保鸡丁", price: 28, status: "Active" },
            { name: "麻婆豆腐", price: 22, status: "Active" },
            { name: "水煮鱼", price: 48, status: "Active" },
            { name: "青椒肉丝", price: 26, status: "Active" },
            { name: "回锅肉", price: 32, status: "Active" },
            { name: "酸菜鱼", price: 46, status: "Active" },
            { name: "辣子鸡", price: 38, status: "Active" },
            { name: "毛血旺", price: 44, status: "Active" },
            { name: "干锅牛肉", price: 52, status: "Active" },
            { name: "蒜蓉炒青菜", price: 18, status: "Active" },

        ];
        return {
            code: 200,
            data: {
                list: productList,
                total: productList.length,
                message: '获取成功'
            }
        }
    },
    updateProductStatus: config => {
        const { id, status } = JSON.parse(config.body)
        return {
            code: 200,
            data: {
                message: '状态更新成功'
            }
        }
    },
    addProduct: config => {
        const product = JSON.parse(config.body);
        return {
            code: 200,
            data: {
                ...product,
                id: Date.now(), // 模拟生成 ID
                message: '添加成功'
            }
        }
    }
}