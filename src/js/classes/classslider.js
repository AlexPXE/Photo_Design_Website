export default class EasySlider {
    constructor({mainBlock, itemsNodeList, durationMs = 4000, arrows = false}) {

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
                let timePass = 0;                
                const startTime = Date.now();
                let progress = 0;                
                let currentPosition = 0;

                const animation = () => {                    
                    timePass = Date.now() - startTime;

                    if(timePass >= duration) {
                        timePass = duration;
                    }

                    progress = Math.sin(((Math.PI/2) * (timePass/duration))) * n;                    
                    currentPosition = this.current + progress;
                    track.style.transform = `translateX(-${currentPosition * scrollStep}px)`;
                    
                    if(currentPosition <= 0 || currentPosition >= (this.totalItems + 1)) {                        

                        currentPosition = n > 0 ? 1 : this.totalItems;
                        track.style.transform = `translateX(-${currentPosition * scrollStep}px)`;

                        if(timePass  < duration) {                            
                            this.current = currentPosition;
                            console.log(progress);
                            inProgress = false;
                            return moveIt(n + ~~(-progress), duration - timePass);
                        }
                    }

                    if (timePass === duration) {
                        this.current = currentPosition;
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
                moveIt(3);
                
            }

            if(e.target === leftBtn) {                
                moveIt(-3);
            }
        });

    } 
    
}



const templ = {

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



