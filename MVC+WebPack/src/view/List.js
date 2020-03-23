import '../style.css';


export default class List {
    constructor(){
        this.el = document.createElement('ul');
        this.el.classList.add('stateTodos')
    }
    

    render(list){
        this.el.innerHTML = list.map(this.createTemplate).join('\n')
    }

    createTemplate(item){
        function isDone(item){
            if( item == true){
                return "done" ;
            } else {
                return "" ;
            }
        }
        const state = isDone(item.completed);
        return `<li class= ${state} >${item.title}</li>`;
    }
}