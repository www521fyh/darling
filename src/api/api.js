//引入二次封装的请求方法
import request from "./request"

export default {
    // 定义登录要发送的请求
    getMenu(params) {
        return request({
            url: '/permission/getMenu',
            method: "post",
            data: params,
        })
    },
    // 添加订单相关接口
    getOrders(params) {
        return request({
            url: '/orders/list',
            method: "get",
            params
        })
    },
    updateOrderStatus(data) {
        return request({
            url: '/orders/status',
            method: "put",
            data
        })
    },
    getProducts(params) {
        return request({
            url: '/products/list',
            method: 'get',
            params
        })
    },
    updateProductStatus(data) {
        return request({
            url: '/products/status',
            method: 'put',
            data
        })
    },
    addProduct(data) {
        return request({
            url: '/products/add',
            method: 'post',
            data
        })
    },
    getPackages(params) {
        return request({
            url: '/packages/list',
            method: 'get',
            params
        })
    },
    updatePackageStatus(data) {
        return request({
            url: '/packages/status',
            method: 'put',
            data
        })
    },
    addPackage(data) {
        return request({
            url: '/packages/add',
            method: 'post',
            data
        })
    },
    getEmployees(params) {
        return request({
            url: '/employees/list',
            method: 'get',
            params
        })
    },
    updateEmployeeStatus(data) {
        return request({
            url: '/employees/status',
            method: 'put',
            data
        })
    },
    addEmployee(data) {
        return request({
            url: '/employees/add',
            method: 'post',
            data
        })
    },
    getUserInfo() {
        return request({
            url: '/profile/info',
            method: 'get'
        })
    },
    updateUserInfo(data) {
        return request({
            url: '/profile/update',
            method: 'post',
            data
        })
    },
    changePassword(data) {
        return request({
            url: '/changePassword/password',
            method: 'post',
            data
        })
    }
}
