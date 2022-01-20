import EasySlider from "../classes/classslider";


export default function({blockSelector, itemsSelector}) {
    const slider = new EasySlider({
        mainBlock: document.querySelector(blockSelector), 
        itemsNodeList: document.querySelectorAll(itemsSelector)
    });

    
}