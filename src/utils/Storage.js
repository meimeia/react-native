import {AsyncStorage} from "react-native"

class Async {
    static getItem(key){
        return AsyncStorage.getItem(key)
    }
   static setItem(key,value){
        return AsyncStorage.setItem(key,value)
    }
    static clear(){
        AsyncStorage.clear()
    }
    static getAllKeys(){
        return AsyncStorage.getAllKeys();
    }
}


export default  Async;