import '../style.css';
import {itemTemplate,viewTemplate} from '../template'; 
import {createElementFromHtml} from '../utils'; 

export default class ContactView {
    constructor(config) {
        this.el = this.createElement();
        this.config = config; // {onDelete: () => {}}

        this.el.addEventListener('submit',this.onFormSubmit.bind(this));

        this.list = this.el.querySelector('tbody'); 

        this.list.addEventListener('click',this.onListClick.bind(this));
        this.inputs =  this.el.querySelectorAll('input');

    }

    onFormSubmit(e) {
        e.preventDefault();

        this.config.onSave();
    }

    createElement() {
        return createElementFromHtml(viewTemplate);
    }

    fillForm(user) {
        Array.prototype.forEach.call(this.inputs, (input) => {
            input.value = user[input.name]
        });
    }

    onListClick(e) {
        console.log(e, this);
        switch (true) {
            case e.target.classList.contains('delete-btn'):
                this.config.onDelete(e.target.closest('.user-item').dataset.id);
                break;
            case e.target.classList.contains('edit-item'):
                this.config.onEdit(e.target.closest('.user-item').dataset.id);
                break;
        } 
    }


    

    render(data) {
        this.el.innerHTML = data.map(this.renderItem).join('\n');
    }

    renderItem(user) {
        return itemTemplate
        .replace('{{id}}', user.id)
        .replace('{{name}}', user.name)
        .replace('{{surname}}', user.surname)
        .replace('{{email}}', user.email);
} 
    
}