import { CONTACT_URL } from "../config";
import Model from "./model";


export default class Collection {
    constructor(){
        console.log('collec')
    }

    fetch(){
        return fetch(CONTACT_URL)
            .then(res => res.json())
            .then(data => this.setData(data));
    }

    setData(data){
        this.list = data.map(item => new Model(item));  
    }
}