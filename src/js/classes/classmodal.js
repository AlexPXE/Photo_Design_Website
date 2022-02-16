'use strict'
import { DefaultDisplayer } from "./displayer";

export default class ModalClass extends DefaultDisplayer {    
    constructor({modal: element, closeButton, timeMs = 1000}) {
        super({element, timeMs});
        this.closeButton = closeButton;

        this.closeButtonHandler = (e) => {

            const {target} = e;
            const {closeButton, element} = this;            

            if((target === closeButton) || (target === element)) {
                this.hide();
            }
        };
    }

    show() {
        this.element.addEventListener('click', this.closeButtonHandler);
        this.overflow = 'hidden';
        this.margin = `${this.YScrollWidth}px`;    
        super.show();
    }

    hide() {
        super.hide();        
        this.element.removeEventListener('click', this.closeButtonHandler);
        setTimeout(() => {
            this.margin = '';  
            this.overflow = '';
        }, this.toutMs);
    }

    get overflow() {
        return this.style.overflow;
    }

    set overflow(str) {
        this.style.overflow = str;
    }

    get margin() {
        return  this.style.marginRight;
    }

    set margin(str) {
        this.style.marginRight = str;
    }

    get YScrollWidth() {
        return this.constructor.calcYScrollWidth();
    }

    get style() {
        return this.constructor.bodyStyle;
    }    

    static calcYScrollWidth() {        
        const {testBlock} = this;        
        document.body.append(testBlock);
        const {clientWidth, offsetWidth} = testBlock;
        const YScrollWidth = offsetWidth - clientWidth;
        testBlock.remove();
        return YScrollWidth;
    }
}

const testBlock = document.createElement('div');
testBlock.style.cssText = 'width: 50px; height: 50px; overflow-Y: scroll; visibility: hidden';
ModalClass.testBlock = testBlock;
ModalClass.bodyStyle = document.body.style;

