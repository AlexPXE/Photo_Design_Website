import tooltipFabric from "./inputtooltipclass";

class FormAbstractClass {
    constructor(form) {
        if(this.constructor === FormAbstractClass) {
            throw new Error("Abstract class should not be instanciated");
        }        

        this.form = form;
    }    

    submit() {
        throw new Error('Method is not implemented');
    }

    validate() {
        throw new Error('Method is not implemented');
    }
}

class SimpleForm extends FormAbstractClass {
    constructor({form, options}) {       
        super(form);
        this.cash = new Map();
        this.notValid = new Set();

        this.mouseoverHandler = ({target}) => {
            let {notValid, cash} = this;

            if(notValid.has(target)) {
                let {tooltip} = cash.get(target);
                tooltip.show();
            }            
        };

        this.mouseoutHandler = ({target}) => {
            let {notValid, cash} = this;

            if(notValid.has(target)) {
                let {tooltip} = cash.get(target);
                tooltip.hide();
            }            
        };
        
        [...form.elements].forEach(elem => {
            let {name} = elem;

            if(options.hasOwnProperty(name)) {
                let {reg, message} = options[name];

                elem.required = false;

                let tooltip = tooltipFabric({
                    insertBlock: form,
                    input: elem,
                    toutMs: 300
                });
                tooltip.setMessageText(message);

                this.cash.set(elem, {
                    tooltip: tooltip,
                    reg: reg,
                });
            }
        });
    }

    validate() {
        for(let [element, {reg}] of this.cash) {

            let {value} = element;
            let {mouseoverHandler, mouseoutHandler} = this;

            if(reg.test(value)) {
                if(this.notValid.has(element)) {
                    element.removeEventListener('mouseover', mouseoverHandler);
                    element.removeEventListener('mouseover', mouseoutHandler);
                    element.style.backgroundColor = '';
                    this.notValid.delete(element);
                }                
                
            } else {
                if(!this.notValid.has(element)) {
                    element.addEventListener('mouseover', mouseoverHandler);
                    element.addEventListener('mouseout', mouseoutHandler);

                    element.style.backgroundColor = '#fabdb9';
                    this.notValid.add(element);        
                }                
            }
        }      
    }   
    
}

export {SimpleForm};



/*
options = {
    email: {reg:, message:''},
    name: {reg:, message:''},
    phone: {reg:, message:''},
}
*/



