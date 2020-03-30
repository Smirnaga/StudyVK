import Collection from '../model/collection';
import { CONTACT_URL } from '../config';
import ContactView from '../view/View';


export default class Controller {
    constructor() {
        this.collection = new Collection(CONTACT_URL);
        this.contactView = new ContactView({
            onDelete: id => {
                this.collection.delete(id).then(() => this.refreshData());
            },
            onEdit: id => {
                const model = this.collection.get(id);
                this.contactView.fillForm(model);

            },
            onSave: () => {
                const model = this.contactView.getFormData();
                if (model.id == "") {
                  this.collection.add(this.contactView.createUser()).then(() => this.refreshData());
                } else {
                  this.collection.updateUser(model).then(() => this.refreshData());
                }
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
    }
}