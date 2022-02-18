import { DefaultDisplayer, CustomDisplayer } from "./displayer";

const tooltipMixin = {
    calcPosition() {
        const height = parseFloat( window.getComputedStyle(this.input).height);
        return `${this.input.offsetTop + height}px`;
    },

    setMessageText(text) {        
        this._textContent.textContent = text;
        return this;
    }
};

class DefaultTooltip extends DefaultDisplayer {
    constructor({ input, tooltip: element, toutMs = 1000 }) {        

        const textContent = document.createElement('span');
        element.append(textContent);

        super({ element: element, toutMs });
        this.input = input;
        this._textContent = textContent;        
    }    

    show() {
        this.element.style.top = this.calcPosition();
        super.show();
    }
}

Object.assign(DefaultTooltip.prototype, tooltipMixin);

class CustomTooltip extends CustomDisplayer {
    constructor({
        input,                  //element for which tooltip
        tooltip: element,       //tooltip block
        fadeinAnimation = '',   //CSS ClassName
        fadeoutAnimation = '',  //CSS ClassName
    }) {

        const textContent = document.createElement('span');
        element.append(textContent);

        super({element, fadeinAnimation, fadeoutAnimation});

        this.input = input;
        this._textContent = textContent;
    }

    show() {
        this.element.style.top = this.calcPosition();
        super.show();
    }
}

Object.assign(CustomTooltip.prototype, tooltipMixin);

function tooltipFabric({
    insertBlock,
    input,        
    tooltipStyle = '',
    fadeinAnimation = '',
    fadeoutAnimation = '',
    backgroundColor = '#6ffc03',
    toutMs = 1000
}) {
    const tooltip = document.createElement('div');

    if (tooltipStyle === '') {            

        const cssText = `
                display: none; 
                max-width: 150px;
                box-shadow: 10px 5px 5px rgba(79, 79, 79, 0.78);
                font-size: 14px;
                background-color: ${backgroundColor};                
                padding: 5px;
                position: absolute; 
                opacity: 0;`;

        tooltip.style.cssText += cssText; 

        const arrow = document.createElement('div'); //arrow for tooltip block

        //I don`t know why, but this component is not inserted in the usual way :(
       // setTimeout(() => {
            arrow.style.cssText = `
                position: absolute;
                top: -20px; 
                left: 10%;                       
                border: 10px solid transparent;
                border-bottom: 10px solid ${backgroundColor}`;

            tooltip.append(arrow);
      //  });
    } else {
        tooltip.classList.add(tooltipStyle);
    }

    console.log(insertBlock);
    insertBlock.append(tooltip);

    if(fadeinAnimation === '' || fadeoutAnimation === '') {
        
        return new DefaultTooltip({
            input, 
            tooltip, 
            toutMs
        });

    } else {
        return new CustomTooltip({
            input,
            tooltip,                  
            fadeinAnimation,
            fadeoutAnimation,            
        });
    }
}

export default tooltipFabric;