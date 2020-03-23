import Collection from '../model/Collection';
import List from '../view/List';

export default class Controller {
    constructor(){
        console.log('init');

        this.listView = new List();
        this.container = document.getElementById('todos');

        this.todosCollection = new Collection();



        this.todosCollection.fetch().then(() => this.listView.render(this.todosCollection.list));

       

        this.container.append(this.listView.el);


        

        console.log(this.listView);
    }
}