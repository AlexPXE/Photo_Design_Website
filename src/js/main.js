'use strict'
import slider from './modules/mainslider';
import tooltipFabric from './classes/inputtooltipclass';
import ModalClass from './classes/classmodal';
import formControl from './modules/formcontrol';


document.addEventListener('DOMContentLoaded', () => {
    slider({
        blockSelector: '.main-slider', 
        itemsSelector: '.main-slider-item',
        delay: 4000
    });

    const modal = document.querySelector('.popup-design');  
    const closeButton = modal.querySelector('.popup-close');  
    const form = modal.querySelector('form');
    const input = modal.querySelector('[name="name"]');   
    const btn = document.querySelector(".button.button-order.button-design");

    modal.style.opacity = 0;
    
    const modalInst = new ModalClass({modal, closeButton});

   
    

    btn.addEventListener('click', () => {
        modalInst.show();
    });    
    

    
    formControl({
        form: document.forms[3],
        submitBtn: document.forms[3].querySelector('.button.button-order')
    });
    

    /*const tt = tooltipFabric({
        insertBlock: form, 
        input: input
    });

    tt.setMessageText('Я тультипе!');    
    tt.show();

    setTimeout(() => {
        tt.hide();
    }, 9000);*/
});

