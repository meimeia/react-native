import {observable,action} from "mobx"

export default class Store{
    @obervable num=1
    @action plus(){
        this.num++
    }
    @action reduce(){
        this.num--
    }
}
