'use strict';
/* 
document.getElementById('tabs').innerHTML = '';
document.getElementById('tabs').innerHTML = `<div id="tab">
<div class="active">tab 1</div>
<div>tab 2</div>
<div>tab 3</div>
</div>
<div id="content">
            <div class="active">Content 1</div>
            <div >Content 2</div>
             <div>Content 3</div> 
        </div>
`; */


class Tabs {
    constructor(el){
        this.el = el;

        this.init();
    }

    static TABS_CLASS = 'tab';
    static TABS_ITEM_CLASS = 'tab-item';
    static TABS_ITEM_TITLE_CLASS = 'tab-item-title';
    static TABS_CONTENT_CLASS = 'tab-content';
    static TABS_ITEM_CONTENT_CLASS = 'tab-item-content';
    static TABS_ACTIVE = 'active';

    init(){
        this.bindClasses();
        this.createClasses()
        this.bindCallbacs();
    }

    bindClasses(){
        document.getElementById('tabs').classList.add(Tabs.TABS_CLASS);
        Array.prototype.forEach.call(this.el.children, itemEl => {
            itemEl.classList.add(Tabs.TABS_ITEM_CLASS);
            itemEl.children[0].classList.add(Tabs.TABS_ITEM_TITLE_CLASS);
            itemEl.children[1].classList.add(Tabs.TABS_ITEM_CONTENT_CLASS); 
        });
    }

    createClasses(){
        let title = document.getElementsByClassName('tab-item');
        let tabTitle = document.getElementsByClassName('tab-item-title');
        title.append(tabTitle);
    }

    bindCallbacs() {
        this.el.addEventListener('click', this.onTabClick.bind(this));
    }

    onTabClick(e) {
        switch (true){
            case e.target.classList.contains(Tabs.TABS_ITEM_TITLE_CLASS):
                this.onTitleCkick(e.target);
                break;

        } 
    }

    onTitleCkick (titleElement){
        this.hideAll();
        if (this.isVisible(titleElement.parentNode)) {
            this.hide(titleElement.parentNode);
        } else {
            this.show(titleElement.parentNode);
        }
       
       
        console.log(titleElement);
        
    }

    show(itemElement) {
        itemElement.classList.add(Tabs.TABS_ACTIVE);
    }

    hide(itemElement) {
        itemElement.classList.remove(Tabs.TABS_ACTIVE);
    }

    isVisible(itemElement){
        return  itemElement.classList.contains(Tabs.TABS_ACTIVE);
    }

    hideAll(){
        const visibleElement = this.el.querySelectorAll('.' + Tabs.TABS_ACTIVE );
        Array.prototype.forEach.call(visibleElement, this.hide.bind(this));
    }
}