import tooltipFabric from "./inputtooltipclass";

class FormAbstractClass {
    constructor(form) {
        if(this.constructor === FormAbstractClass) {
            throw new Error("Abstract class should not be instanciated.");
        }

        if(this.constructor._cashForms.has(form)) {
            throw new Error("An instance with the specified form object already exists.");
        }

        this.constructor._cashForms.set(form, this);
        this.form = form;
    }    

    submit() {
        throw new Error('Method is not implemented!');
    }

    validate() {
        throw new Error('Method is not implemented!');
    }
}

FormAbstractClass._cashForms = new Map();

class SimpleForm extends FormAbstractClass {
    constructor({form, options}) {       
        super(form);
        this.cash = new Map();             //[key: input, value: {regEx, tooltip instance}]
        this.notValid = new Set();         //fields with input errors are cached here
        this._subscribers = new Map();     //[key: subscriber element, value: callback handler] (Subscribers are sent information about the status of sending the form data) 

        //hide the error tooltip when the cursor leaves the element
        this.mouseoverHandler = ({target}) => {
            let {notValid, cash} = this;

            if(notValid.has(target)) {
                let {tooltip} = cash.get(target);
                tooltip.show();
            }            
        };

        //show error tooltip when hovering over an element
        this.mouseoutHandler = ({target}) => {
            let {notValid, cash} = this;

            if(notValid.has(target)) {
                let {tooltip} = cash.get(target);
                tooltip.hide();
            }            
        };
        

        //create tooltip instance for each validated field
        [...form.elements].forEach(elem => {
            let {name} = elem;

            if(options.hasOwnProperty(name)) {
                let {reg, message} = options[name];

                elem.required = false; //cancel standard validation

                let tooltip = tooltipFabric({
                    insertBlock: form,
                    input: elem,
                    toutMs: 300,
                    backgroundColor: '#C7D1FE'
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
        
        return !this.notValid.size;
    }   

    async submit(url) {

        let {success, failure, sending} = this.constructor._statusMessage;
        this._sendMessage(sending);

        const formData = new FormData(this.form);

        let response = await fetch(url, {
            method: 'POST',
            body: formData
        });

        let {ok} = response;

        if (ok) {
            this._sendMessage(success);            
        } else {
            this._sendMessage(failure);            
        }
        
        return ok;    
    }

    
    subscribe(element, callback) {
        this._subscribers.set(element, callback);
        return this;
    }

    _sendMessage(status) {       
        for(let [element, callback] of this._subscribers) {
            let event = {element, status};
            callback(event);
        }
    }
}

SimpleForm._statusMessage = {
    sending: 1,
    success: 2,
    failure: 0,
};

export {SimpleForm};



/*
options = {
    email: {reg:, message:''},
    name: {reg:, message:''},
    phone: {reg:, message:''},
}
*/



