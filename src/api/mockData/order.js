import Mock from 'mockjs'

export default {
    getOrderList: config => {
        const dishMenu = [
            { name: '宫保鸡丁', price: 28 },
            { name: '麻婆豆腐', price: 22 },
            { name: '水煮鱼', price: 48 },
            { name: '青椒肉丝', price: 26 },
            { name: '回锅肉', price: 32 },
            { name: '酸菜鱼', price: 46 },
            { name: '辣子鸡', price: 38 },
            { name: '毛血旺', price: 44 },
            { name: '干锅牛肉', price: 52 },
            { name: '蒜蓉炒青菜', price: 18 }
        ]

        // 生成模拟订单数据
        const orderList = []
        for (let i = 0; i < 20; i++) {
            // 确保每个订单至少有1个菜品
            const dishCount = Mock.Random.integer(1, 5)
            const selectedDishes = Mock.Random.shuffle(dishMenu).slice(0, dishCount)

            // 为每个选中的菜品生成数量，并计算总价
            const dishes = selectedDishes.map(dish => ({
                name: dish.name,
                quantity: Mock.Random.integer(1, 5),
                price: dish.price
            }))

            // 计算订单总金额
            const totalAmount = dishes.reduce((sum, dish) => {
                return sum + (dish.price * dish.quantity)
            }, 0)

            // 生成订单数据
            orderList.push({
                id: Mock.Random.increment(),
                orderNumber: `ORD${Mock.Random.date('yyyyMMdd')}${Mock.Random.string('number', 4)}`,
                customerName: Mock.Random.cname(),
                status: Mock.Random.pick(['pending', 'accepted', 'completed']),
                createTime: Mock.Random.datetime(),
                dishes,
                totalAmount
            })
        }

        console.log('生成的订单数据:', orderList); // 添加日志

        return {
            code: 200,
            data: {
                list: orderList,
                total: orderList.length,
                message: '获取成功'
            }
        }
    },

    updateOrderStatus: config => {
        const { id, status } = JSON.parse(config.body)
        return {
            code: 200,
            data: {
                message: '状态更新成功'
            }
        }
    }
}