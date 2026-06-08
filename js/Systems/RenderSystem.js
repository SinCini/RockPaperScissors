import { GAME_WIDTH, GAME_HEIGHT, GRID_SIZE } from "../core/constants.js";
import { OpponentAnimations } from "./CharacterAnimations.js";
export class RenderSystem{
    constructor(canvas){
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');

        this.targetFPS = 10; // desired framerate limit
        this.frameInterval = 1000 / this.targetFPS; 
        this.lastTime = 0;
        this.gamePaused = false;
        this.opp = new OpponentAnimations(this);
        this.animateOpp = true;
    }
    render(timestamp, time)
    {
        //background
        this.ctx.fillStyle = "#0f3460";
        this.ctx.fillRect(0,0,GAME_WIDTH,GAME_HEIGHT);

        const deltaTime = timestamp - this.lastTime;
        this.renderMainMenu();
        //Section for handling opponent animation
        this.opp.renderOpponent();
        if(this.animateOpp)
        {
            if(deltaTime >= this.frameInterval)
            {
                this.lastTime = timestamp -(deltaTime % this.frameInterval);
                this.opp.updateOppSprite();
            }
        }
        this.renderTimer(time);
        if(this.gamePaused)
        {
            this.renderPauseMenu();
        }
    }
    changeFPS(newFPS)
    {
        this.targetFPS = newFPS;
    }
    togglePause(pause)
    {
        this.gamePaused = pause;
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
    renderPauseMenu()
    {

    }
    renderTimer(time)
    {
        this.ctx.font = "100px Arial";
        this.ctx.strokeText(time, GAME_WIDTH - 150, 100);
    }
    renderMainMenu()
    {
        this.ctx.font = "100px Arial";
        this.ctx.fillStyle = "red";
        this.ctx.fillText("ジャンケンポン", GAME_WIDTH/4, 100);
        this.ctx.fillText("あっちむいてホイ！", GAME_WIDTH/4 - 100, 200);
    }
    
}
