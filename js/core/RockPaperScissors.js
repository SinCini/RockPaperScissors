let humanScore = 0;
let computerScore = 0;
export class ComputerDecisions
{
    constructor()
    {
        this.currentRPSChoice = "rock";
        this.lastRPSStatus = "";
        this.lastRPSChoice = "";
        this.lastAMTChoice ="";
    }
    getRPSChoice()
    {
        if(this.lastRPSStatus === "win")
        {
            if(this.getRandomInt(3) > 0)
            {
                return this.wonRPS();
            }
            else
            {
                return this.normalRPS();
            }
        } else if(this.lastRPSStatus === "loss")
        {
            if(this.getRandomInt(3) > 0)
            {
                return this.lostRPS();
            }
            else
            {
                return this.normalRPS();
            }
        } else if(this.lastRPSStatus === "tie")
        {
            return this.normalRPS();
        } else
        {
            return this.normalRPS();
        }
    }
    lostRPS()
    {
        if(this.lastRPSChoice === "rock")
        {
            return "scissors"
        }
        if(this.lastRPSChoice === "scissors")
        {
            return "paper"
        }
        if(this.lastRPSChoice === "paper")
        {
            return "rock";
        }
    }
    wonRPS()
    {
        if(this.lastRPSChoice === "rock")
        {
            return "paper"
        }
        if(this.lastRPSChoice === "scissors")
        {
            return "rock"
        }
        if(this.lastRPSChoice === "paper")
        {
            return "scissors";
        }
    }
    normalRPS()
    {
        let number = this.getRandomInt(3);
        if(number === 0)
        {
            this.lastRPSChoice = "rock";
            return this.lastRPSChoice;
        } else if(number === 1)
        {
            this.lastRPSChoice = "paper";
            return this.lastRPSChoice;
        } else if(number===2)
        {
            this.lastRPSChoice = "scissors";
            return this.lastRPSChoice;
        }
    }
    getAMTChoice()
    {
        let number = this.getRandomInt(4);
        if(number === 0)
        {
            return "up";
        } else if(number === 1)
        {
            return "left";
        } else if (number === 2)
        {
            return "down";
        } else
        {
            return "right";
        } 
    }
    setRPSStatus(status)
    {
        this.lastRPSStatus = status;
    }
    setAMTWin(lossStatus)
    {
    }
    // Gets random int from 0 to max-1
    getRandomInt(max) 
    {
        return Math.floor(Math.random() * max);
    }
}