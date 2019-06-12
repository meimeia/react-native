import { Platform } from 'react-native'
import {log, logErr} from "./log";

let baseUrl="https://dalingjia.com/xc_sale/"
let res=null;
/**
 * 默认的头信息
 */

let headers = {
    uid: 0,
    jsversion: "0.0.1",
    utoken: "",
    platform: Platform.OS,
    clientid: '',
    version: '',
    model: '',
    OSVersion: '',
    brand: '',
    channel: '',
    net: '',
    bundle: '',
    xcrole: 0, //0-普通用户,1-店主
}
let options={
    method: 'GET',
    headers: headers,
    timeout: 10000
}

function getHeaders(){
    return headers
}
function getHeader(name){
    if (!name) return "";
    return headers[name] || '';
}

 async function get(obj) {
    let result={}
    await fetch(baseUrl+obj.url).then(async data=>{
        return await data.text();
     }).then(res=>{
        result=JSON.parse(res)
    });
     return result
}

export {
    get,
    getHeader,
    getHeaders
}

