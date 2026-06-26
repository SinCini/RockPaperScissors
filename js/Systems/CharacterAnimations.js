import { GAME_WIDTH, GAME_HEIGHT, GRID_SIZE } from "../core/constants.js";
import { Game } from "../core/Game.js";
export class OpponentAnimations
{
    constructor(renderSystem, game)
    {
        this.renderSystem = renderSystem;
        //#region opponent sprite animation variables
        this.oppImage = document.getElementById("Yshtola");
        this.oppSpriteWidth = 1025;
        this.oppSpriteHeight = 1139;
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
        this.animate = true;
        //#endregion
        //#region opponent sprite animation checks

        this.introAnimActive = false;
        this.introAnimFinished = false;
        this.rpsAnimActive = true;
        this.rpsAnimFinished = false;
        this.rpsChoiceAnimFinished = false;
        this.amtAnimActive = false;
        this.amtPeek = false;
        this.amtAnimFinished = false;
        this.amtChoiceAnimFinished = false;
        //#endregion
        this.rpsStatus = null;
        this.game = game;
        //#region Animation Order Arrays
        this.introAnimOrder = [];
        this.rpsThrowAnimOrder = [1,2,3,4,1,2,3,4,1,2,3,4,5];
        this.amtChoiceUpOrder = [0,1,2,3,4];
        this.amtChoiceDownOrder = [0,5,6,7,8];
        this.amtChoiceLeftOrder = [0,9,10,11,12];
        this.amtChoiceRightOrder = [0,13,14,15,16];
        this.amtPeekUpOrder = [0,4];
        this.amtPeekDownOrder = [0,8];
        this.amtPeekLeftOrder = [0,12];
        this.amtPeekRightOrder = [0,13];
        this.amtPeekOrder = [];
        this.amtOrder = [];
        //#endregion
        //temp RPS values
        this.introSpriteWidth;
        this.rpsThrowWidth = 1025;
        this.rpsSpriteWidth = 1035;
        this.rpsSpriteHeight;
        this.amtChoiceWidth = 942;
        this.amt;
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
            this.oppX,this.oppY + 20, 
            this.oppWidth*this.oppScale, this.oppHeight*this.oppScale);
    }

    updateOppSprite()
    {
        if(this.rpsAnimActive)
        {
            console.log("rps anim active:"+this.rpsAnimActive)
            if(!this.rpsAnimFinished)
            {
                console.log("rpsAnimation in oppspriteupdate")
                this.rpsAnimation();
            } else
            {
                if(!this.rpsChoiceAnimFinished)
                {
                    if(this.rpsStatus === "loss")
                    {
                        this.oppFrameX++;
                        this.rpsChoiceAnimFinished = true; 
                    } else if(this.rpsStatus === "draw")
                    {
                        this.oppFrame = 0;
                        this.setOppAnimation(0, this.rpsThrowWidth);
                        this.rpsAnimFinished = false;
                        this.oppFrameX = this.rpsThrowAnimOrder[this.oppFrame];
                        this.game.compChoiceRPS = "";
                        this.game.compRPSStatus = null;
                    } else
                        this.rpsChoiceAnimFinished = true;

                }
            }
        }
        if(this.amtAnimActive)
        {
            if(!this.amtAnimFinished)
            {
                this.amtAnimation();
            }
        }
    }
    setOppAnimation(oppFrameY, spriteWidth)
    {
        this.oppFrameY = oppFrameY;
        this.oppSpriteWidth = spriteWidth;
    }
    changeOppSpriteSheet(character)
    {
        this.oppImage = document.getElementById(character);
    }
    rpsAnimation()
    {
        console.log("rps Animation");
        if(this.oppFrame < this.rpsThrowAnimOrder.length-1) 
        {
            this.oppFrame++;
            this.oppFrameX = this.rpsThrowAnimOrder[this.oppFrame];
        }
        else 
        {
            this.rpsAnimFinished = true;
        }


    }
    resetRPS()
    {
        //console.log("reset called");
        this.amtAnimActive = false;
        this.rpsChoiceAnimFinished = false;
        console.log(this.amtAnimActive);        
        this.rpsAnimActive = true;
        this.setOppAnimation(0, this.rpsThrowWidth);
        this.rpsAnimFinished = false;
        this.amtAnimFinished = false;
        this.oppFrame = 0;
    }
    amtAnimation()
    {
        if(this.rpsStatus === "win")
        {
            if(this.oppFrame < this.amtOrder.length-1) 
            {
                this.oppFrame++;
                this.oppFrameX = this.amtOrder[this.oppFrame];
            }
            else 
            {
                this.amtAnimFinished = true;
            }
        } else if(this.rpsStatus ==="loss")
        {
            if(this.amtPeek)
            {
                if(this.oppFrame < this.amtPeekOrder.length-1) 
                {
                    this.oppFrame++;
                    this.oppFrameX = this.amtPeekOrder[this.oppFrame];
                } else
                {
                    this.amtPeek = false;
                }
            } else
            {
                if(this.oppFrame < this.amtOrder.length-1) 
                {
                    this.oppFrame++;
                    this.oppFrameX = this.amtOrder[this.oppFrame];
                }
                else 
                {
                    this.amtAnimFinished = true;
                }
            }
        }
    }
    toggleAnimation()
    {
        this.animate = !this.animate;
    }
    rpsChoice(choice, status)
    {
        this.rpsStatus = status;
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
    amtChoice(choice)
    {
        if(this.rpsStatus === "win")
        {
            switch(choice)
            {
                case "up":
                    this.amtOrder = this.amtChoiceUpOrder;
                    break;
                case "down":
                    this.amtOrder = this.amtChoiceDownOrder;
                    break;
                case "left":
                    this.amtOrder = this.amtChoiceLeftOrder;
                    break;
                case "right":
                    this.amtOrder = this.amtChoiceRightOrder;
                    break;
            }
            this.oppFrame = 0;
            this.setOppAnimation(2, this.amtChoiceWidth);
        } else if(this.rpsStatus === "loss")
        {
            switch(choice)
            {
                case "up":
                    this.amtPeek = this.amtPeekUpOrder;
                    this.amtOrder = this.amtChoiceUpOrder;
                    break;
                case "down":
                    this.amtPeek = this.amtPeekDownOrder;
                    this.amtOrder = this.amtChoiceDownOrder;
                    break;
                case "left":
                    this.amtPeek = this.amtPeekLeftOrder;
                    this.amtOrder = this.amtChoiceLeftOrder;
                    break;
                case "right":
                    this.amtPeek = this.amtPeekRightOrder;
                    this.amtOrder = this.amtChoiceRightOrder;
                    break;
            }
            this.oppFrame = 0;
            this.setOppAnimation(2, this.amtChoiceWidth);
            this.amtPeek = true;
        }
    }
    //#region RPS Anim Methods
    oppRock()
    {
        this.setOppAnimation(1, this.rpsSpriteWidth);
        this.oppFrameX = 0;
        //this.oppFrameY = 1;

    }
    oppScissors()
    {
        this.setOppAnimation(1, this.rpsSpriteWidth);
        this.oppFrameX = 4;
        //this.oppFrameY = 1;
    }
    oppPaper()
    {
        this.setOppAnimation(1, this.rpsSpriteWidth);
        this.oppFrameX = 2;
        //this.oppFrameY = 1;
    }
    //#endregion
    //#region AMT Anim Methods
}