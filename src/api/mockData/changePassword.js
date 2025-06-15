import Mock from 'mockjs'

export default {
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