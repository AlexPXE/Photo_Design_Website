import { SimpleForm } from "../classes/formclass";

export default function formControl({form, submitBtn}) {
    const sForm = new SimpleForm({ form, options: {
        email:{
            reg: /sdsdsd/, 
            message:'Не верный email! Пример: box_-123@boxmail.xx'
        },
        phone: {
            reg: /sdsdsd/, 
            message:'Не верный номер телефона! Пример: 8(123) 456-33-22. Либо просто цифры: 81234563322'
        },
        name: {
            reg: /sdsdsd/, 
            message:'Не верное имя! Пример: Петр, Петр Петров, Петр Константинович Петров. Не более 100 символов.'
        }
    }});

    submitBtn.addEventListener('click', (e) => {
        e.preventDefault();
        sForm.validate();
    });
}