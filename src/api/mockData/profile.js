import Mock from 'mockjs'

export default {
    getUserInfo: () => {
        return {
            code: 200,
            data: {
                account: 'admin',
                name: '管理员',
                role: '系统管理员',
                birthday: '1990-01-01',
                phone: '13800138000',
                email: 'admin@example.com'
            }
        }
    },
    updateUserInfo: config => {
        const data = JSON.parse(config.body)
        return {
            code: 200,
            data: {
                ...data,
                message: '更新成功'
            }
        }
    },
    changePassword: config => {
        const { oldPassword, newPassword } = JSON.parse(config.body)
        if (oldPassword === 'admin') {
            return {
                code: 200,
                data: {
                    message: '密码修改成功'
                }
            }
        } else {
            return {
                code: 400,
                data: {
                    message: '原密码错误'
                }
            }
        }
    }
}