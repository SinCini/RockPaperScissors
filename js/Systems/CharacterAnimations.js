import { GAME_WIDTH, GAME_HEIGHT, GRID_SIZE } from "../core/constants.js";
export class OpponentAnimations
{
    constructor(renderSystem)
    {
        this.renderSystem = renderSystem;
        //opponent sprite animation variables
        this.oppImage = document.getElementById("Yshtola");
        this.oppSpriteWidth = 975;
        this.oppSpriteHeight = 1200;
        this.oppWidth = this.oppSpriteWidth;
        this.oppHeight = this.oppSpriteHeight
        this.oppScale = .6;
        this.oppX = GAME_WIDTH/2 - this.oppWidth *this.oppScale/2;
        this.oppY = GAME_HEIGHT/2 - this.oppHeight *this.oppScale/2;
        this.oppMinFrame = 0;
        this.oppmaxFrame = 4;
        this.oppFrame = 0;
        this.oppFrameX = 1;
        this.oppFrameY = 0;
        this.oppLoopCount = 0;
        this.oppLoopMax = 2;
        this.animate = true;
        //opponent sprite animation checks;
        this.rpsAnimOrder = [];
        this.introAnimActive = false;
        this.introAnimFinished = false;
        this.rpsAnimActive = true;
        this.rpsAnimFinished = false;
        this.rpsChoiceAnimFinished = false;
        this.amtAnimActive = false;
        this.amtAnimFinished = false;
        this.amtChoiceAnimFinished = false;

        this.rpsStatus = null;
        //temp RPS values
        this.rpsSpriteWidth = 950;
    }
    renderOpponent()
    {
        //Draw image(image, 
        // sx:x coord to start clipping, sy:y coord to start clipping, 
        // swidth:width of image, sheight:height of image
        //x: coord to place image, y: coord to place image
        //width: of image to use, height: of image to use
        this.renderSystem.ctx.drawImage(this.oppImage,
            this.oppFrameX* this.oppSpriteWidth, this.oppFrameY* this.oppSpriteHeight,
            this.oppSpriteWidth, this.oppSpriteHeight,
            this.oppX,this.oppY, 
            this.oppWidth*this.oppScale, this.oppHeight*this.oppScale);
        if(this.rpsAnimFinished && this.rpsAnimActive)
        {
            this.renderRPSReaction();
        }
        if(this.amtChoiceAnimFinished && this.amtAnimActive)
        {
            this.renderAMTReaction();
        }
    }

    updateOppSprite()
    {
        if(this.rpsAnimActive)
        {
            if(!this.rpsAnimFinished)
            {
                this.rpsAnimation();
            } else
            {
                if(!this.rpsChoiceAnimFinished)
                {

                }
            }
        }
        if(this.amtAnimActive)
        {
            if(!this.amtAnimFinished)
            {
                this.amtAnimation();
            } else
            {
                if(!this.amtChoiceAnimFinished)
                {

                }
            }
        }
    }
    setOppAnimation(newMinFrame, newMaxFrame, oppFrameY)
    {
        this.oppMinFrame = newMinFrame;
        this.oppmaxFrame = newMaxFrame;
        this.oppFrameY = oppFrameY;
        this.frame = this.oppMinFrame;
    }
    changeOppSpriteSheet(character)
    {
        this.oppImage = document.getElementById(character);
    }
    rpsAnimation()
    {
        if(this.oppFrameX < this.oppmaxFrame) 
        {
            console.log("oppframe: " + this.oppFrameX);
            this.oppFrameX++;
        }
        else 
        {
            if(this.oppLoopCount < this.oppLoopMax)
            { 
                console.log("loop count: " + this.oppLoopCount);
                this.oppLoopCount++;
                this.oppFrameX = 1;
                console.log("oppframe: in loop" + this.oppFrameX);
                console.log(this.oppmaxFrame);
            }
            else
            this.rpsAnimFinished = true;
        }
    }
    renderRPSReaction()
    {
        if(this.rpsStatus === "loss")
        {
            this.renderSystem.ctx.drawImage(this.oppImage,
            2684, 1465,
            350, 580,
            this.oppX+ 250,this.oppY + 125, 
            this.oppWidth/4, this.oppHeight/4);
        }
        if(this.rpsStatus === "win")
        {
            this.renderSystem.ctx.drawImage(this.oppImage,
            2321, 1465,
            350, 580,
            this.oppX+ 250,this.oppY + 125, 
            this.oppWidth/4, this.oppHeight/4);
        }
        if(this.rpsStatus === "draw")
        {
            this.renderSystem.ctx.drawImage(this.oppImage,
            2321, 1465,
            350, 580,
            this.oppX+ 250,this.oppY + 125, 
            this.oppWidth/4, this.oppHeight/4);
        }
    }
    amtAnimation()
    {

    }
    toggleAnimation()
    {
        this.animate = !this.animate;
    }
    rpsChoice(choice, status)
    {
        this.rpsStatus = status;
            console.log(choice);
        switch(choice){

            case "rock":
                this.oppRock();
                break;
            case "scissors":
                this.oppScissors();
                break;
            case "paper":
                this.oppPaper();
                break; 
        }
    }
    amtChoice(choice, status)
    {
        this.amtStatus = status;
        switch(choice)
        {
            case "up":
                this.amtUp();
                break;
            case "down":
                this.amtDown();
                break;
            case "left":
                this.amtLeft();
                break;
            case "right":
                this.amtRight();
                break;
        }
    }
    oppRock()
    {
        this.setOppAnimation(0,0,2);
        this.oppFrameX = 0;
        this.oppFrameY = 2;
        this.rpsChoiceAnimFinished = true;
    }
    oppScissors()
    {
        this.setOppAnimation(1,1,2);
        this.oppFrameX = 2;
        this.oppFrameY = 2;
        this.rpsChoiceAnimFinished = true;
    }
    oppPaper()
    {
        this.setOppAnimation(2,2,2);
        this.oppFrameX = 1;
        this.oppFrameY = 2;
        this.rpsChoiceAnimFinished = true;
    }
    amtUp()
    {

    }
    amtLeft()
    {

    }
    amtDown()
    {

    }
    amtRight()
    {

    }
}