import { CONTACT_URL } from "../config"; 
import ContactModel from "./model";
    export default class Collection {
        constructor(url) {
          this.list = [];
          this.setData = this.setData.bind(this);
        }
        get(id) {
          return this.list.find(item => item.id == id);
        }
      
        fetch() {
          return fetch(CONTACT_URL)
            .then(response => response.json())
            .then(this.setData);
        }
      
        setData(list) {
          return (this.list = list.map(el => new ContactModel(CONTACT_URL, el)));
        }
      
        delete(id) {
          const model = this.get(id);
          return model.delete().then(() => this.list.filter(user => user !== model));
        }
      }
   


