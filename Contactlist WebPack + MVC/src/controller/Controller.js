import Collection from '../model/collection';
import { CONTACT_URL } from '../config';
import ContactView from '../view/List';


export default class Controller {
    constructor() {
        this.collection = new Collection(CONTACT_URL);
        this.contactView = new ContactView({
            onDelete: id => {
                this.collection.delete(id).then(() => this.renderData());
            },
            onEdit: id => {
                this.collection
                    .get(id)
                    .edit(id)
                    .then(() => this.renderData());
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