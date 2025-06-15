import Mock from 'mockjs'

export default {
    getEmployeeList: () => {
        const employeeList = [
            { name: "管理员", account: "admin", phoneNumber: "18779882673", status: "Active" },

        ];
        return {
            code: 200,
            data: {
                list: employeeList,
                total: employeeList.length,
                message: '获取成功'
            }
        }
    },
    updateEmployeeStatus: config => {
        const { id, status } = JSON.parse(config.body)
        return {
            code: 200,
            data: {
                message: '状态更新成功'
            }
        }
    },
    addEmployee: config => {
        const employees = JSON.parse(config.body);
        return {
            code: 200,
            data: {
                ...employees,
                id: Date.now(), // 模拟生成 ID
                message: '添加成功'
            }
        }
    }
}