export default class EasySlider {
    constructor({mainBlock, itemsNodeList, durationMs = 800, left = null, right = null, autoMs = 0}) {        

        
        
        const track = document.createElement('div');               
        
        track.style.cssText = `
                display: flex; flex-direction: row;`;

        itemsNodeList.forEach(element => {            
            track.append(element);
        });

        track.append(itemsNodeList[0].cloneNode(true));
        track.prepend(itemsNodeList[itemsNodeList.length - 1].cloneNode(true));

        mainBlock.style.cssText = 'overflow: hidden; position: relative';        
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
        let step = 1/durationMs;
        let startTime;
        let progress = 0;
        let direction = 1;
        let slideTo = 0;


        const animation = () => {            
            
            progress = (Date.now() - startTime) * step;

            if(progress >= 1) {
                console.log(progress);
                slideTo = slideTo - 1;
                progress = 0;

                switch(this.current + direction) {
                    case 0:
                        this.current = this.totalItems;
                        break;
                    case this.totalItems + 1:
                        this.current = 1;                                         
                        break;
                    default:
                        this.current = this.current + direction;
                }

                console.log('current: ', this.current);

                startTime = Date.now();
            }

            track.style.transform = `translateX(-${(progress * direction + this.current) * scrollStep}px)`;

            if(slideTo != 0) {
                return requestAnimationFrame(animation);
            }

            console.log('stop');
            inProgress = false;

        };  

        const moveIt = (n) => {           

            if(n != 0 && !inProgress) {
                console.log('start');
                inProgress = true;
                direction = n < 0 ? -1 : 1;
                slideTo = Math.abs(n);
                progress = 0;
                startTime = Date.now();                
                requestAnimationFrame(animation);            
            }            
        };

        mainBlock.addEventListener('click', e => {

            e.preventDefault();
            if(e.target === right) {                
                moveIt(1);                
            }

            if(e.target === left) {    
                console.log('back');            
                moveIt(-1);
            }
        });

        if(autoMs !=0){
            setInterval(() => {
                moveIt(1);
            }, durationMs + autoMs);
        }
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
