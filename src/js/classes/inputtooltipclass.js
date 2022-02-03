export default class InputTooltip {
    constructor({
        insertBlock,
        input,
        tooltipStyle = '',
        fadeinAnimation = '',
        fadeoutAnimation = ''
    }) {

        const tooltip = document.createElement('div');
        const backgroundColor = '#6ffc03';

        if (tooltipStyle === '') {            

            tooltip.style.cssText = `
                    display: none; 
                    background-color: ${backgroundColor};
                    padding: 5px;
                    position: absolute; 
                    opacity: 0;`;
                    

            const arrow = document.createElement('div');

            setTimeout(() => {
                arrow.style.cssText = `
                    position: absolute;
                    top: -20px; 
                    left: 10%;                       
                    border: 10px solid transparent;
                    border-bottom: 10px solid ${backgroundColor}`;

                tooltip.append(arrow);
            });
        } else {
            tooltip.classList.add(tooltipStyle);
        }


        if(fadeoutAnimation === '' || fadeinAnimation === '') {
            console.warn('InputTooltip: Animation parameters were not passed to the class constructor. Animation is set by default.');
            
            this._timeoutID = 0;
            this.transitionTime = 1700;

            this.show = InputTooltip.defaultShow;
            this.hide = InputTooltip.defaultHide;

            tooltip.style.transition = `opacity ${this.transitionTime/1000}s`;
        } else {            
            this.fadeinAnimation = fadeinAnimation;
            this.fadeoutAnimation = fadeoutAnimation;  

            this.show = InputTooltip.customShow;
            this.hide = InputTooltip.customHide;
        }

        insertBlock.append(tooltip);

        this.input = input;
        this.tooltip = tooltip;        
    }

    calcPosition() {
        const height = parseFloat(window.getComputedStyle(this.input).height);
        return `${this.input.offsetTop + height}px`;
    }
    

    setMessageText(text) {        
        this.tooltip.textContent = text;
        return this;
    }    

    static defaultShow() {
        this.tooltip.style.top = this.calcPosition();

        this.tooltip.style.display = 'block';
         setTimeout(() => {
            this.tooltip.style.opacity = 1;
        });
    }

    static defaultHide() {
        this.tooltip.style.opacity = 0;

        setTimeout(() => {
            console.log(this.transitionTime);
            this.tooltip.style.display = 'none';
        }, this.transitionTime);      

    }

    static customShow() {
        this.tooltip.style.top = this.calcPosition();

        this.tooltip.classList.add(this.fadeinAnimation);
        this.tooltip.classList.remove(this.fadeoutAnimation);
    }

    static customHide() {
        this.tooltip.classList.add(this.fadeoutAnimation);
        this.tooltip.classList.remove(this.fadeinAnimation);
    }
    
}