import axios from 'axios';

const instance = axios.create({
    baseURL: "https://cwd316.com:7002/",
    timeout: 1000,
})

instance.defaults.headers.common['Content-Type'] = 'application/x-www-form-urlencoded';

instance.interceptors.request.use(
    function (config) {
        console.log("interceptorsreq");
        const token = localStorage.getItem("token");
        token && (config.headers.Authorization = token);     
        return config;
    }, function (error) {
        return Promise.reject(error);
    }
);

instance.interceptors.response.use(
    function (response) {
        console.log(response);
        return response;
    }, function (error) {
        console.log(error.response.status);
        switch (error.response.status) {
            case 401:
                window.routeTo("/login")
                window.$message.error("请登录");
                break;
        
            default:
                break;
        }
        return Promise.reject(error);
    }
);

export default instance;