import '../style.css';
import {itemTemplate,viewTemplate} from '../template'

export default class ContactView {
    constructor(config) {
        this.config = config; // {onDelete: () => {}}
        this.createElement();
    }

    createElement() {
        this.el = document.createElement('div');
        this.el.className = 'task-list u-full-width';

        this.el.addEventListener('click', this.onListClick.bind(this));
    }

    onListClick(e) {
        console.log(e, this);
        switch (true) {
            case e.target.classList.contains('delete-btn'):
                this.config.onDelete(e.target.parentNode.dataset.id);
                break;
/*             case e.target.classList.contains('task-item'):
                this.config.onToggle(e.target.dataset.id);
                break;
        } */
    }
    }

    render(data) {
        this.el.innerHTML = data.map(this.renderItem).join('\n');
    }

    renderItem(item) {
        return `<tr data-id="{{id}}">
        <td>{{name}}</td>
        <td>{{surname}}</td>
        <td>{{email}}</td>
        <td><span class="delete-btn">Delete</span></td>   
        <td><span class="edit-btn">Edit</span></td>   
    </tr>`;
    }
}