//这个createRouter是用来创建router的，createWebHashHistory则是创建hash模式
import { createRouter, createWebHashHistory } from "vue-router";
import store from '@/store.js';
//配置路由
const router = createRouter({
    history: createWebHashHistory(),
    routes: [
        {
            path: "/",
            redirect: "/login",
        },
        {
            path: "/login",
            name: "login",
            component: () => import("@/views/login/index.vue")
        },
        {
            path: "/main",
            name: "main",
            component: () => import("@/views/main.vue"),
            redirect: "/home",
            children: [
                {
                    path: "/home",
                    name: "home",
                    component: () => import("@/views/dashboard/home.vue"),
                },
                {
                    path: "/orders",
                    name: "orders",
                    component: () => import("@/views/dashboard/OrderManagement.vue")
                },
                {
                    path: "/products",
                    name: "products",
                    component: () => import("@/views/dashboard/ProductList/ProductLayout.vue"),
                    redirect: "/products/list", // 默认重定向到商品清单
                    children: [
                        {
                            path: "list",
                            name: "productList",
                            component: () => import("@/views/dashboard/ProductList/ProductList.vue")
                        },
                        {
                            path: "packages",
                            name: "packages",
                            component: () => import("@/views/dashboard/ProductList/PackageManagement.vue")
                        }
                    ]
                },
                {
                    path: "/employees",
                    name: "employees",
                    component: () => import("@/views/dashboard/employees.vue")
                },
                {
                    path: "/account",
                    name: "account",
                    component: () => import("@/views/dashboard/AccountList/AccountLayout.vue"),
                    redirect: "/account/list",
                    children: [
                        {
                            path: "profile",
                            name: "profile",
                            component: () => import("@/views/dashboard/AccountList/Profile.vue")
                        },
                        {
                            path: "password",
                            name: "password",
                            component: () => import("@/views/dashboard/AccountList/Password.vue")
                        }
                    ]


                },
            ]
        }
    ]
})

// 添加全局前置守卫
router.beforeEach((to, from, next) => {
    const token = localStorage.getItem('t_k')
    const menu = localStorage.getItem('menu')

    // 如果要去登录页，直接放行
    if (to.path === '/login') {
        next()
        return
    }

    // 如果没有token，重定向到登录页
    if (!token) {
        next('/login')
        return
    }

    if (menu && store.state.menu.length === 0) {
        try {
            const parsedMenu = JSON.parse(menu)
            store.commit('setMenu', parsedMenu)
        } catch (error) {
            console.error('解析菜单数据失败:', error)
            localStorage.removeItem('menu') // 清除无效的菜单数据
        }
    }

    // 其他情况放行
    next()
})

export default router