
let urlWeakMap = new WeakMap();

export default class ContactModel {
    get url() {
        return urlWeakMap.get(this);
    }

    set url(val) {
        urlWeakMap.set(this, val);
    }

    constructor(CONTACT_URL, data) {
        this.url = CONTACT_URL;

        this.setData(data);

        console.log('model constructor', this.url);
    }

    setData(data) {
        Object.assign(this, data);
    }

    delete() {
        return fetch(`${this.url}/${this.id}`, {
            method: 'DELETE'
        });
    }

    /* edit() {
        this.completed = !this.completed;

        return fetch(`${this.url}/${this.id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(this)
        });
        console.log('model edit', this.id);
    } */
}
