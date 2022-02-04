import slider from './modules/mainslider';
import tooltipFabric from './classes/inputtooltipclass';


document.addEventListener('DOMContentLoaded', () => {
    slider({
        blockSelector: '.main-slider', 
        itemsSelector: '.main-slider-item',
        delay: 4000
    });

    const modal = document.querySelector('.popup-design');
    modal.style.display = 'flex';    
    const form = modal.querySelector('form');
    const input = modal.querySelector('[name="name"]');   
    

    const tt = tooltipFabric({
        insertBlock: form, 
        input: input
    });

    console.log(tt.hasOwnProperty('show'));

    tt.setMessageText('Я тультипе!');    
    tt.show();

    setTimeout(() => {
        tt.hide();
    }, 9000);

});
