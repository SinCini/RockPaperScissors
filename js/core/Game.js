import { GAME_WIDTH, GAME_HEIGHT } from "./constants.js";
import { RenderSystem } from "../Systems/RenderSystem.js";

export class Game {
    constructor()
    {
        let rps = false;
        let amt = false;
        this.canvas = document.getElementById("gameCanvas");
        this.ctx = this.canvas.getContext("2d");
        this.RenderSystem = new RenderSystem(this.canvas);
        this.lastTime = 0;
        this.frameInterval = 10;
        this.lastPickedRPS = "rock";
        this.lastpickedAMT = "up";


        this.initialTime = 60;
        this.remainingTime = this.initialTime;
        this.round = 1;
        this.init();
    }
    init()
    {
        this.resizeCanvas();
        window.addEventListener('resize', () => this.resizeCanvas());
        window.addEventListener("keydown", (e)=>{this.playerInput(e)});
        //starts gameloop
        requestAnimationFrame((t)=> this.gameLoop(t));
    }
    resizeCanvas()
    {
        const ratio = 16/9;
        let w, h;
        const margin = 5;

        const availableWidth = window.innerWidth -margin * 2;
        const availableHeight = window.innerHeight -margin * 2;
        if(availableWidth/availableHeight > ratio)
        {
            h = availableHeight;
            w = h* ratio;
        } else{
            w = availableWidth;
            h = w/ratio;
        }
        this.canvas.width = GAME_WIDTH;
        this.canvas.height = GAME_HEIGHT;

        this.canvas.style.width = w + 'px';
        this.canvas.style.height = h +'px';
        this.canvas.style.margin = '${margin}px';
    }
    gameLoop(timestamp)
    {
        this.RenderSystem.render(timestamp, this.remainingTime);
        requestAnimationFrame((t)=> this.gameLoop(t));

    }
    playerInput(keyPressed)
    {
        console.log(keyPressed);
        if(rps)
        {
            var key = keyPressed.key || keyPressed.keyCode;
            if(key === "a" || key === "ArrowLeft")
            {
                this.lastPickedRPS = "Rock";
            }
            if(key === "s" || key === "ArrowDown")
            {
                this.lastPickedRPS = "Scissors";
            }
            if(key === "d" || key === "ArrowRight")
            {
                this.lastPickedRPS = "Paper"
            }
        } else if(amt)
        {
            if(key === "a" || key === "ArrowLeft")
            {
                this.lastpickedAMT = "Left"
            }
            if(key === "s" || key === "ArrowDown")
            {
                this.lastpickedAMT = "Down";
            }
            if(key === "d" || key === "ArrowRight")
            {
                console.log("Right");
            }
            if(key === "w" || key === "ArrowUp")
            {
                console.log("Up");
            }
        }
    }
    StartTimer(time)
    {
        var start = Date.now();
        setInterval(function() {
        var delta = Date.now() - start; // milliseconds elapsed since start
        output(Math.floor(delta / 1000)); // in seconds
        // alternatively just show wall clock time:
        output(new Date().toUTCString());
        }, 100); // update about every second
    }
}