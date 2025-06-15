import { createStore } from "vuex"
import api from '@/api/api'
//createStore创建store实例
export default createStore({
    //state则是保存数据
    state: {
        menu: [],
        //isCollapse默认值是false表示不折叠
        isCollapse: false,
        currentMenu: null,
        orders: [],
        orderFilters: {
            status: '',
            searchQuery: ''
        },
        products: [],
        productFilters: {
            status: '',
            searchQuery: ''
        },
        packages: [],
        packageFilters: {
            status: '',
            searchQuery: ''
        },
        employees: [],
        employeeFilters: {
            status: '',
            searchQuery: ''
        }


    },
    //mutations是修改state的方法
    mutations: {
        setMenu(state, val) {
            state.menu = val
        },
        //updateIsCollapse修改isCollapse的方法 
        updateIsCollapse(state, value) {
            state.isCollapse = value
        },
        selectMenu(state, value) {
            if (value.path == "/path" || value.path == "home") {
                state.currentMenu = null
            } else {
                state.currentMenu = value
            }
        },
        setOrders(state, orders) {
            state.orders = orders
        },
        updateOrderFilters(state, filters) {
            state.orderFilters = { ...state.orderFilters, ...filters }
        },
        setProducts(state, products) {
            state.products = products
        },
        updateProductStatus(state, { id, status }) {
            const product = state.products.find(p => p.id === id)
            if (product) {
                product.status = status
            }
        },
        setPackages(state, packages) {
            state.packages = packages
        },
        updatePackageStatus(state, { id, status }) {
            const pkg = state.packages.find(p => p.id === id)
            if (pkg) {
                pkg.status = status
            }
        },
        setEmployees(state, employees) {
            state.employees = employees
        },
        updateEmployeeStatus(state, { id, status }) {
            const employee = state.employees.find(p => p.id === id)
            if (employee) {
                employee.status = status
            }
        }

    },
    // 添加 actions 处理异步操作
    actions: {
        async fetchOrders({ commit }, params) {
            try {
                const res = await api.getOrders(params)
                if (res.code === 200) {
                    commit('setOrders', res.data.list)
                }
            } catch (error) {
                console.error('获取订单列表失败:', error)
            }
        },
        async fetchProducts({ commit }, params) {
            try {
                const res = await api.getProducts(params)
                if (res.code === 200) {
                    commit('setProducts', res.data.list)
                }
            } catch (error) {
                console.error('获取商品列表失败:', error)
            }
        },
        async fetchPackages({ commit }, params) {
            try {
                const res = await api.getPackages(params)
                if (res.code === 200) {
                    commit('setPackages', res.data.list)
                }
            } catch (error) {
                console.error('获取套餐列表失败:', error)
            }
        },
        async fetchEmployees({ commit }, params) {
            try {
                const res = await api.getEmployees(params)
                if (res.code === 200) {
                    commit('setEmployees', res.data.list)
                }
            } catch (error) {
                console.error('获取员工列表失败:', error)
            }
        }




    }
})