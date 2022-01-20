import slider from './modules/mainslider';


document.addEventListener('DOMContentLoaded', () => {
    slider({
        blockSelector: '.main-slider', 
        itemsSelector: '.main-slider-item'
    });
});