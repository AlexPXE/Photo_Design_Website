class AbstaractDisplayer {
    constructor(element) {        
        if(this.constructor === AbstaractDisplayer) {
            throw new Error('Abstract class shoud not be instanciated');
        }

        this.element = element;
    }

    show() {
        throw new Error('Method is not implemented');
    }

    hide() {
        throw new Error('Method is not implemented');
    }
}

class DefaultDisplayer extends AbstaractDisplayer {
    constructor({element, toutMs = 1000}) {

        console.log(toutMs);
        super(element);        
        element.style.transition = `opacity ${toutMs/1000}s`;
        this.toutMs = toutMs;
        this._toutID = 0;
    }

    show() {
        if(this._toutID) {
            clearInterval(this._toutID);
            this._toutID = 0;
        }

        this.element.style.display = 'block';

        setTimeout(() => {
            this.element.style.opacity = 1;
        }, 100);
    }

    hide() {
        this.element.style.opacity = 0;

        this._toutID = setTimeout(() => {
            this.element.style.display = 'none';
            this._toutID = 0;
        }, this.toutMs);
    }
}


class CustomDisplayer extends AbstaractDisplayer {
    constructor({
        element, 
        fadeinAnimation = '',
        fadeoutAnimation = '',        
    }){  
        super(element);  
        this.fadeinAnimation = fadeinAnimation;
        this.fadeoutAnimation = fadeoutAnimation;            
      }       

    show() {
        this.element.classList.add(this.fadeinAnimation);
        this.element.classList.remove(this.fadeoutAnimation);
    }

    hide() {
        this.element.classList.add(this.fadeoutAnimation);
        this.element.classList.remove(this.fadeoutAnimation);        
    }
}

export {DefaultDisplayer, CustomDisplayer};


