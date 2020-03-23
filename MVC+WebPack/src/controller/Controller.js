import Collection from '../model/Collection';
import List from '../view/List';
import FormView from '../view/form';

export default class Controller {
    constructor(){
        console.log('init');

        this.listView = new List();
        this.formView = new FormView();
        this.container = document.getElementById('todos');

        this.todosCollection = new Collection();



        this.todosCollection.fetch().then(() => this.listView.render(this.todosCollection.list));

       

        this.container.append(this.listView.el);
        this.container.append(this.formView.el);


        

        console.log(this.listView);
    }
}