import { GAME_WIDTH, GAME_HEIGHT } from "./constants.js";
import { RenderSystem } from "../Systems/RenderSystem.js";
import { ComputerDecisions } from "./RockPaperScissors.js";
export class Game {
    constructor()
    {
        //#region game variables
        this.gameStarted = false;
        this.gamePaused = false;
        this.RPSstatuses = ["win", "loss", "draw"];
        this.score = 0;
        this.rps = false;
        this.amt = false;

        this.initialTime = 60;
        this.remainingTime = 60;
        this.round = 1;
        this.maxRound = 5;
        this.lastPickedRPS = "rock";
        this.lastpickedAMT = "up";
        this.timerStarted = false;


        this.comp = new ComputerDecisions();
        this.compChoiceRPS = "";
        this.compChoiceAMT = "";

        this.compRPSStatus = null;
        this.compAMTStatus = null;
        
        //#endregion
        this.canvas = document.getElementById("gameCanvas");
        this.ctx = this.canvas.getContext("2d");
        this.RenderSystem = new RenderSystem(this.canvas);
        this.init();

        this.lastTime = 0;
        this.frameInterval = 10;
        //Array for random order
        this.OpponentArray = [];
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
        
        //console.log(this.remainingTime);
        const deltaTime = timestamp - this.lastTime;

        //console.log(deltaTime);

        if(!this.gamePaused)
        {
            if(this.remainingTime === 0)
            {
                if(this.round < this.maxRound)
                this.nextRound();
                else
                this.endGame();
            } else
            {
                this.CountdownTimer(deltaTime, timestamp);
                if(this.rps)
                {
                    this.RPS();
                }
                if(this.amt)
                {
                    this.AMT();
                }
            }
        } else
        {

        }
    }
    playerInput(keyPressed)
    {
        if(this.gameStarted)
        {
                var key = keyPressed.key || keyPressed.keyCode;
                if(key === "Escape" || key === "ArrowLeft")
                {
                    this.gamePaused = !this.gamePaused;
                }
        }
        if(!this.gameStarted)
        {
            var key = keyPressed.key || keyPressed.keyCode;
            if(key === "Enter")
            {
                this.StartGame();
            }
        }
        if(!this.gamePaused)
        {
            console.log(keyPressed);
            if(this.rps)
            {
                var key = keyPressed.key || keyPressed.keyCode;
                if(key === "a" || key === "ArrowLeft")
                {
                    this.lastPickedRPS = "rock";
                }
                if(key === "s" || key === "ArrowDown")
                {
                    this.lastPickedRPS = "scissors";
                }
                if(key === "d" || key === "ArrowRight")
                {
                    this.lastPickedRPS = "paper"
                }
            } else if(this.amt)
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
    }
    StartGame()
    {
        if(!this.gameStarted)
        {
            this.RenderSystem.gameStarted = true;
            this.timerStarted = true;
            this.gameStarted = true;
            this.rps = true;
        }
    }
    CountdownTimer(deltaTime, timestamp)
    {
        if(this.timerStarted)
        {
            if(deltaTime >= 1000 && this.remainingTime > 0)
            {
                this.lastTime = timestamp;
                this.remainingTime--;
            }
        }
    }

    //#region Methods that trigger events in-game
    nextRound()
    {
        this.round++;
    }
    endGame()
    {

    }
    fillOpponentArray()
    {
        this.OpponentArray.push("Miqo");
        this.OpponentArray.push("Yshtola");
        this.OpponentArray.push("Estinien");
        this.OpponentArray.push("Sphene");
        this.OpponentArray.push("Emet");
        this.OpponentArray.push("Yotsuyu");
        this.OpponentArray.sort(function(){return 0.5 -Math.random()});
    }
    //#endregion
    //#region RPS/AMT methods
    RPS()
    {
        if(this.compChoiceRPS === "")
        {
            this.compChoiceRPS = this.comp.getRPSChoice();
        } else
        //console.log(this.RenderSystem.opp.rpsAnimFinished);
        if(this.RenderSystem.opp.rpsAnimFinished === true)
        {
            //console.log("compare RPS running");
            if(this.compRPSStatus === null)
            this.compareRPS();
        }
        if(this.RenderSystem.opp.rpsChoiceAnimFinished === true)
        {
            rps = false;
            this.compChoiceRPS = "";
            this.compRPSStatus = null;
            amt = true;
            this.RenderSystem.opp.rpsAnimActive = false;
            this.RenderStatem.opp.amtAnimActive = true;
        }
    }
    AMT()
    {
        if(this.compChoiceAMT === "")
        {
            this.compChoiceAMT = this.comp.getAMTChoice();
        }
        if(this.RenderSystem.opp.amtAnimFinished === true)
        {
            if(this.RenderSystem.opp.amtChoiceAnimFinished)
            {
                if(this.compAMTstatus === null)
                {
                    this.compareAMT();
                }
            }
        }
        if(this.RenderSystem.opp.amtChoiceAnimFinished === true)
        {
            rps = true;
            this.compChoiceAMT = "";
            this.compAMTStatus = null;
            amt = false;
            this.RenderSystem.opp.rpsAnimActive = true;
            this.RenderStatem.opp.amtAnimActive = false;
        }
    }
    compareRPS()
    {
        switch(this.compChoiceRPS)
        {
        case "rock":
            if(this.lastPickedRPS === "rock")
            {
                this.compRPSStatus = this.RPSstatuses[2];
            } else if(this.lastPickedRPS === "scissors")
            {
                this.compRPSStatus = this.RPSstatuses[1];
            } else if(this.lastPickedRPS === "paper")
            {
                this.compRPSStatus = this.RPSstatuses[0];
            }
            break;
        case "scissors":
            if(this.lastPickedRPS === "rock")
            {
                this.compRPSStatus = this.RPSstatuses[1];
            } else if(this.lastPickedRPS === "scissors")
            {
                this.compRPSStatus = this.RPSstatuses[2];
            } else if(this.lastPickedRPS === "paper")
            {
                this.compRPSStatus = this.RPSstatuses[0];
            }
            break;
        case "paper":
            if(this.lastPickedRPS === "rock")
            {
                this.compRPSStatus= this.RPSstatuses[0];
            } else if(this.lastPickedRPS === "scissors")
            {
                this.compRPSStatus = this.RPSstatuses[1];
            } else if(this.lastPickedRPS === "paper")
            {
                this.compRPSStatus = this.RPSstatuses[2];
            }
            break;
        }
        this.RenderSystem.opp.rpsChoice(this.compChoiceRPS, this.compRPSStatus);
        this.comp.setRPSStatus(this.compRPSStatus);
    }
    compareAMT()
    {
        if(this.compChoiceAMT === this.lastpickedAMT)
        {
            this.compAMTStatus = this.RPSstatuses[1];
        } else
        {
            this.compAMTStatus = this.RPSstatuses[0];
        }
        this.RenderSystem.opp.amtChoice(this.compChoiceAMT, this.compAMTstatus);
        this.comp.setAMTWin(this.compAMTStatus);
    }
    //#endregion
}