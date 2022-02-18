import { SimpleForm } from "../classes/formclass";
import tooltipFabric from "../classes/inputtooltipclass";

export default function formControl({form, submitBtn}) {
    const sForm = new SimpleForm({ form, options: {
        email:{
            reg: /^[-_0-9a-z]{1,20}@[-0-9a-z]{1,10}.[a-z]{2,3}$/i, 
            message:'Не верный email! Пример: box_-123@boxmail.xx'
        },
        phone: {
            reg: /^(8|\+7)(-| )?\(?\d{3,3}\)?(-| )?\d{3,3}(-| )?\d{2,2}(-| )?\d{2,2}$/i, 
            message:'Не верный номер телефона! Пример: 8(123) 456-33-22. Либо просто цифры: 81234563322'
        },
        name: {
            reg: /^\p{L}{2,20}( \p{L}{2,20})?( \p{L}{2,20})?$/iu,
            message:'Не верное имя! Примеры: Петр, Петр Петров, Петр Константинович, Петр Константинович Петров. Не более 60 символов.'
        }
    }});

    const statusMessage = tooltipFabric({
        insertBlock: form, 
        input: submitBtn
    });

    const messageHandler = ({element, status}) => {
        switch (status) {            
            case 1:
                element.setMessageText('Выполняется отправка данных...')
                        .show();
                
                return;
            case 2:
                element.setMessageText('Данные успешно отправлены. Спасибо, наш менеджер скоро свяжется с вами!');
            default:                
            element.setMessageText('Ошибка отправки данных! Попробуйте позже.');
        }
        
        setTimeout(() => {                        
            element.hide();
                  
        }, 3000);

        return;
    };

    sForm.subscribe(statusMessage, messageHandler);

    submitBtn.addEventListener('click', (e) => {
        e.preventDefault();

        if(sForm.validate()) {
            sForm.submit('http://localhost:3000/');
        }
        
    });
}