import axios from 'axios';

export default function ajax(url, params = {}, reqMethod = 'GET'){
    // params = {username: tom, password: 123}
    // paramStr: username=tom&password=123
    if (reqMethod === 'GET'){
        let paramStr = '';
        Object.keys(params).forEach((key) => {
            paramStr += `${key}=${params[key]}&`
        })
        if (paramStr) {
            paramStr = paramStr.substring(0,paramStr.length - 1);
        }
        console.log('paramStr',url+'?'+paramStr);
       return axios.get(url+'?'+paramStr);
    } else {
       return axios.post(url, params);
    }
}