import Mock from "mockjs"
//引入获取数据的对象
import permissionApi from "./mockData/permission"
import orderApi from "./mockData/order"
import productApi from "./mockData/product"
import packageApi from "./mockData/package"
import employeeApi from "./mockData/employees"
import profileApi from "./mockData/profile"
import changePasswordApi from "./mockData/changePassword"



//拦截指定接口，返回一个回调函数的返回值
//第一个参数使用正则的方式匹配拦截请求，第二个是请求方式，第三个是拦截后调用的方法
Mock.mock(/permission\/getMenu/, "post", permissionApi.getMenu)
Mock.mock(/orders\/list/, "get", orderApi.getOrderList)
Mock.mock(/orders\/status/, "put", orderApi.updateOrderStatus)
Mock.mock(/products\/list/, "get", productApi.getProductList)
Mock.mock(/products\/status/, "put", productApi.updateProductStatus)
Mock.mock(/products\/add/, 'post', productApi.addProduct)
Mock.mock(/packages\/list/, "get", packageApi.getPackageList)
Mock.mock(/packages\/status/, "put", packageApi.updatePackageStatus)
Mock.mock(/packages\/add/, 'post', packageApi.addPackage)
Mock.mock(/employees\/list/, "get", employeeApi.getEmployeeList)
Mock.mock(/employees\/status/, "put", employeeApi.updateEmployeeStatus)
Mock.mock(/employees\/add/, 'post', employeeApi.addEmployee)
Mock.mock(/profile\/info/, "get", profileApi.getUserInfo)
Mock.mock(/profile\/update/, "post", profileApi.updateUserInfo)
Mock.mock(/account\/password/, "post", changePasswordApi.changePassword)