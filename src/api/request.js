import axios from "axios"
import { ElMessage } from 'element-plus'
const NETWORK_ERROR = "网络错误"

let service = axios.create({
    baseURL: "/api",
    timeout: 5000, // 请求超时时间
})

//请求拦截器
service.interceptors.request.use((config) => {
    // 对所有请求做统一处理（给鉴权接口添加鉴权字段）
    const token = JSON.parse(localStorage.getItem("t_k"));
    if (token) {
        config.headers.Authorization = token;
    }
    return config;
},
    (err) => {
        console.error(err);
    }
)

//响应拦截器
service.interceptors.response.use((res) => {
    let { code, message, data } = res
    if (code == "200" || res.status == "200") {
        return data
    } else {
        ElMessage.error(message || NETWORK_ERROR)
        return Promise.reject(message || NETWORK_ERROR)
    }
})

//请求方法封装
function request(options) {
    options.method = options.method || "get"
    if (options.method.toLowerCase() == "get") {
        options.params = options.query || options.data
    }
    return service(options)
}
//把二次封装的请求方法暴露出去
export default request