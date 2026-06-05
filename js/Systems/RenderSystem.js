import { GAME_WIDTH, GAME_HEIGHT, GRID_SIZE } from "../core/constants.js";

export class RenderSystem{
    constructor(canvas){
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');

        this.targetFPS = 15; // desired framerate limit
        this.frameInterval = 1000 / this.targetFPS; 
        this.lastTime = 0;

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
        this.oppmaxFrame = 5;
        this.oppFrame = 0;
        this.oppFrameX = 1;
        this.oppFrameY = 0;
        this.animate = false;

    }
    render(timestamp, time)
    {
        //background
        this.ctx.fillStyle = "#0f3460";
        this.ctx.fillRect(0,0,GAME_WIDTH,GAME_HEIGHT);

        //this.renderGrid();
        const deltaTime = timestamp - this.lastTime;
        this.renderOpponent();
        if(this.animate)
        {
            if(deltaTime >= this.frameInterval)
            {
                this.lastTime = timestamp -(deltaTime % this.frameInterval);
                this.updateOppSprite();
            }
        }
        this.renderTimer(time);
    }
    renderTimer(time)
    {
        this.ctx.font = "100px Arial";
        this.ctx.strokeText(time, GAME_WIDTH - 150, 100);
    }
    //Methods to render opponent
    renderOpponent()
    {
        //Draw image(image, 
        // sx:x coord to start clipping, sy:y coord to start clipping, 
        // swidth:width of image, sheight:height of image
        //x: coord to place image, y: coord to place image
        //width: of image to use, height: of image to use)
        this.ctx.drawImage(this.oppImage,
            this.oppFrameX* this.oppSpriteWidth, this.oppFrameY* this.oppSpriteHeight,
            this.oppSpriteWidth, this.oppSpriteHeight,
            this.oppX,this.oppY, 
            this.oppWidth*this.oppScale, this.oppHeight*this.oppScale);
    }
    updateOppSprite()
    {
        if(this.oppFrameX < 4) this.oppFrameX++
        else this.oppFrameX = 1;
        this.oppframe = this.frame < this.maxFrame ? this.frame +1 : this.oppMinFrame;
        this.oppFrameX = this.oppFrame % 5;
        this.oppframeY = Math.floor(this.frame/5);
    }
    setOppAnimation(newMinFrame, newMaxFrame, )
    {
        this.oppMinFrame = newMinFrame;
        this.oppmaxFrame = newMaxFrame;
        this.frame = this.oppMinFrame;
    }
    changeOppSpriteSheet(character)
    {
        this.oppImage = document.getElementById(character);
        console.log(this.oppImage);
    }
    toggleAnimation()
    {
        this.animate = !this.animate;
    }
    renderGrid()
    {
        this.ctx.strokeStyle = "rgba(255,255,255,0.2)";
        this.ctx.lineWidth = 1;
        for(let i = 0; i < GAME_WIDTH; i += GRID_SIZE)
        {
            this.ctx.beginPath();
            this.ctx.moveTo(i, 0);
            this.ctx.lineTo(i, GAME_HEIGHT);
            this.ctx.stroke();
        }
        for(let i= 0; i < GAME_HEIGHT; i += GRID_SIZE)
        {
            this.ctx.beginPath();
            this.ctx.moveTo(0,i);
            this.ctx.lineTo(GAME_WIDTH, i);
            this.ctx.stroke();
        }
    }

}