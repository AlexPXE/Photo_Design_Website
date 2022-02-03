import EasySlider from "../classes/classslider";


export default function({blockSelector, itemsSelector, delay}) {

    const styleArrows = `
                position: absolute; 
                width: 40px; 
                height: 40px; 
                background-color: #03f4fc; 
                z-index: 1; 
                border-radius: 50%; 
                font-size: 20px;
                font-weight: 900;
                text-align: center; 
                line-height: 44px;
                top: 50%;
                opacity: .5;`;

    const rightBtn = document.createElement('div');
    const leftBtn = document.createElement('div');

        rightBtn.textContent = '>';
        leftBtn.textContent ='<';
        rightBtn.style.cssText = styleArrows;
        leftBtn.style.cssText = styleArrows;
        rightBtn.style.left = `93.7%`;

    const mainBlock = document.querySelector(blockSelector);

    mainBlock.append(leftBtn, rightBtn);


    const slider = new EasySlider({
        mainBlock: mainBlock, 
        itemsNodeList: document.querySelectorAll(itemsSelector),
        left: leftBtn,
        right: rightBtn,
        //autoMs: delay
    });

    
}