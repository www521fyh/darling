//引入mock，mock不仅可以拦截请求还可以模拟数据
import Mock from 'mockjs'

//返回一个对象，其中的方法会作为mock拦截成功要调用的方法，并把方法返回值作为请求返回值
export default {
    getMenu: config => {
        try {
            const { username, password } = JSON.parse(config.body)

            // 判断账号和密码是否对应
            if (username === 'admin' && password === 'admin') {
                return {
                    code: 200,
                    data: {
                        menu: [
                            {
                                path: '/home',
                                name: 'home',
                                label: '后台首页',
                                icon: 'House',
                                url: 'home/index'
                            },
                            {
                                path: '/orders',
                                name: 'orders',
                                label: '订单管理',
                                icon: 'Document',
                                url: 'orders/index'
                            },
                            {
                                path: '/products',
                                name: 'products',
                                label: '商品管理',
                                icon: 'Goods',
                                children: [
                                    {
                                        path: '/products/list',
                                        name: 'productList',
                                        label: '商品清单',
                                        icon: 'ForkSpoon'
                                    },
                                    {
                                        path: '/products/packages',
                                        name: 'packages',
                                        label: '套餐管理',
                                        icon: 'Box'
                                    }
                                ]
                            },
                            {
                                path: '/employees',
                                name: 'employees',
                                label: '员工管理',
                                icon: 'Notebook',
                                url: 'employees/index'
                            },
                            {
                                path: '/account',
                                name: 'account',
                                label: '账号管理',
                                icon: 'Monitor',
                                children: [
                                    {
                                        path: '/account/profile',
                                        name: 'profile',
                                        label: '个人中心',
                                        icon: 'UserFilled',
                                    },
                                    {
                                        path: '/account/password',
                                        name: 'password',
                                        label: '修改密码',
                                        icon: 'Lock',
                                    }




                                ]
                            },
                        ],
                        token: Mock.Random.guid(),
                        message: '获取成功'

                    }
                }
            } else {
                return {
                    code: -999,
                    data: {
                        message: '用户名或密码错误'
                    }
                }
            }
        } catch (error) {
            console.error('解析登录请求失败:', error);
            return {
                code: -999,
                data: {
                    message: '登录请求格式错误'
                }
            }
        }
    }
}

