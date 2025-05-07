let highestZ = 1;
// this variable will control the highest value of Z

class Paper{

    holdingPaper = false;
    //this var will tell us if we are holding the paper or not. Initially, the value is false as when paper is loaded, we are not holding any paper.

    previousMouseX = 0;
    previousMouseY = 0;
    //these variables tell us the value of the previous position of the mouse which is 0.


    mouseX = 0;
    mouseY = 0;
    //These variabels are going to tell us the value of current position of the mouse.

    currentPaperX = 0;
    currentPaperY = 0;
     // This was giving error as these variables were not initialised.


    init(paper){
        paper.addEventListener('mousedown', (e) =>{
            
            this.holdingPaper = true;
            paper.style.zIndex = highestZ;
            highestZ += 1;

            //We want the button of our event e,  to be the left button and for left click => 0, scroll => 1, right click => 0
            if(e.button == 0){
                this.previousMouseX = this.mouseX;
                this.previousMouseY = this.mouseY;

                console.log(this.previousMouseX);
                console.log(this.previousMouseY);
            }
        }
        )

        document.addEventListener('mousemove', (e) => {
            
            this.mouseX = e.clientX;
            this.mouseY = e.clientY;
            //every window size of every person is different. so here, we are giving the value of the current posi of the mouse according to the client's window to the variables which show the current posi of the mouse.

            this.velocityX = this.mouseX - this.previousMouseX;
            this.velocityY = this.mouseY - this.previousMouseY;
            //We calculate the velocity my subtracting the current mouse position from the previous mouse position.

            if(this.holdingPaper){
                this.currentPaperX  += this.velocityX;
                this.currentPaperY += this.velocityY;
                //this is the current position of our element

                this.previousMouseX = this.mouseX;
                this.previousMouseY = this.mouseY;
                //Now whereever our element is right now becomes the previous position of our mouse. As we have to tell the program that the element has gone from there to there or else it will just keep moving our element.

                paper.style.transform = `translateX(${this.currentPaperX}px) translateY(${this.currentPaperY}px)` ;
            }


        })


        window.addEventListener('mouseup', (e) =>{
            console.log('mouse button is released.')
            this.holdingPaper = false;
        })
    }
}

const papers = Array.from(document.querySelectorAll('.paper'))
//document.querySelectorAll('.paper') will select all the elements from the document which are in the class Paper
//Since there are many elements, we need to have an array

//for each elements in const papers, let's call it paper, we create a object of the paper class and then call the init method for that object p. We have to tell init method for which object we are calling the init method.
papers.forEach(paper =>{
    const p = new Paper();
    p.init(paper);
})