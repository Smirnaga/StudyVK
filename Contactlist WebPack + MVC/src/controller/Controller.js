import Collection from '../model/collection';
import { CONTACT_URL } from '../config';
import ContactView from '../view/View';


export default class Controller {
    constructor() {
        this.collection = new Collection(CONTACT_URL);
        this.contactView = new ContactView({
            onDelete: id => {
                this.collection.delete(id).then(() => this.renderData());
            },
            onEdit: id => {
               const model = this.collection.get(id);

               this.contactView.fillForm(model);

            },
            onSave: data => {
                this.collection.add(data).then(() => this.renderData());
            }
        });


        this.container = document.getElementById('root');

        this.container.append(this.contactView.el);

        this.refreshData();
    }

    refreshData() {
        this.collection.fetch().then(() => this.renderData());
    }

    renderData() {
        this.contactView.render(this.collection.list);
        console.log(this.collection.list);
    }
}