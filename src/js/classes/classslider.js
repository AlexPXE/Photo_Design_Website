export default class EasySlider {
    constructor({mainBlock, itemsNodeList, durationMs = 800, arrows = false}) {

        const styleArrows = `
                position: absolute; 
                width: 40px; 
                height: 40px; 
                background-color: #03f4fc; 
                z-index: 100; 
                border-radius: 50%; 
                font-size: 20px;
                font-weight: 900;
                text-align: center; 
                line-height: 44px;
                top: 50%;
                opacity: .5;`;
        
        const track = document.createElement('div');               
        const rightBtn = document.createElement('div');
        const leftBtn = document.createElement('div');

        rightBtn.textContent = '>';
        leftBtn.textContent ='<';
        rightBtn.style.cssText = styleArrows;
        leftBtn.style.cssText = styleArrows;
        rightBtn.style.left = `93.7%`;


        
        track.style.cssText = `
                display: flex; flex-direction: row;`;

        itemsNodeList.forEach(element => {            
            track.append(element);
        });

        track.append(itemsNodeList[0].cloneNode(true));
        track.prepend(itemsNodeList[itemsNodeList.length - 1].cloneNode(true));
        


        mainBlock.style.cssText = 'overflow: hidden; position: relative';
        mainBlock.append(leftBtn, rightBtn);
        mainBlock.append(track);        
        
        
        this.mainBlock = mainBlock;
        this.totalItems = itemsNodeList.length;        
        this.sliderTrack = track;
        this.current = 1;
        
        


        let scrollStep = parseInt(window.getComputedStyle(mainBlock).width);
        
        track.querySelectorAll('img').forEach( el => {
            el.style.width = `${scrollStep}px`;
        });        
        
        

        track.style.transform = `translateX(-${scrollStep}px)`;

        let inProgress = false;

        const moveIt = (n, duration = durationMs) => {

            if (!inProgress) {

                inProgress = true;                
                let timeFraction = 0;                
                const start = Date.now();
                let progress = 0;

                const animation = () => {                    
                    timeFraction = (Date.now() - start) / duration;

                    if(timeFraction >= 1){
                        timeFraction = 1;
                    }

                    progress = this.current + Math.sin(n*(Math.PI/2) * timeFraction);
                    
                    
                    if(progress <= 0 || progress >= (this.totalItems + 1)) {                        
                        progress = n > 0 ? 1 : this.totalItems;                                                
                    }

                    track.style.transform = `translateX(-${progress * scrollStep}px)`;                                      

                    if (timeFraction === 1) {
                        this.current = progress;
                        console.log(this.current);
                        inProgress = false;
                        return;
                    }

                    
                    return requestAnimationFrame(animation);
                };               

                return requestAnimationFrame(animation);
            }
        };

        mainBlock.addEventListener('click', e => {

            e.preventDefault();
            if(e.target === rightBtn) {                
                moveIt(1);
                
            }

            if(e.target === leftBtn) {                
                moveIt(-1);
            }
        });

    } 
    
}



const f = {

    next() {
        console.log('next');
    },

    prev() {

    },

    inProgress() {

    },

    __move(n) {

    },


    __inProgress:'',
    totalSlides:'number',
    current:'number',
    mainBlock:'HTMLelement',
    itemsNodeList:'NodeList',
    prevBtn:'HTMLelement',
    nextBtn:'HTMLelement'

};



