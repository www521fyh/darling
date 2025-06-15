import Mock from 'mockjs'

export default {
    getPackageList: () => {
        const packageList = [
            { name: "人气套餐", price: 58, status: "Active" },
            { name: "超值单人餐", price: 32, status: "Active" },
            { name: "实惠多人餐", price: 78, status: "Active" },
            { name: "新品套餐", price: 46, status: "Active" },

        ];
        return {
            code: 200,
            data: {
                list: packageList,
                total: packageList.length,
                message: '获取成功'
            }
        }
    },
    updatePackageStatus: config => {
        const { id, status } = JSON.parse(config.body)
        return {
            code: 200,
            data: {
                message: '状态更新成功'
            }
        }
    },
    addPackage: config => {
        const packages = JSON.parse(config.body);
        return {
            code: 200,
            data: {
                ...packages,
                id: Date.now(), // 模拟生成 ID
                message: '添加成功'
            }
        }
    }
}