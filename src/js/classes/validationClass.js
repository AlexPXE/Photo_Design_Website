class ValidationClass {
    constructor() {
        if(!ValidationClass.instance) {
            ValidationClass.instance = this;
        }

        return ValidationClass.instance;
    }

    email(str) {
        
    }

    name(str) {

    }

    phone(str) {

    }
}