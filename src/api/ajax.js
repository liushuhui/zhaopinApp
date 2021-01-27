import axios from 'axios';

const baseUrl = 'http://localhost:7001';
export default function ajax(url, params = {}, reqMethod = 'GET'){
    // params = {username: tom, password: 123}
    // paramStr: username=tom&password=123
    url = baseUrl + url
    if (reqMethod === 'GET'){
        let paramStr = '';
        Object.keys(params).forEach((key) => {
            paramStr += `${key}=${params[key]}&`
        })
        if (paramStr) {
            paramStr = paramStr.substring(0,paramStr.length - 1);
        }
        console.log('paramStr',url+'?'+paramStr);
       return axios.get(url+'?'+paramStr, {withCredentials: true});
    } else {
       return axios.post(url, params,{withCredentials: true});
    }
}