let humanScore = 0;
let computerScore = 0;
export class ComputerDecisions
{
    constructor()
    {
        this.currentRPSChoice = "rock";
        this.lostLastRPSRound = false;
        this.wonLastRPSRound = false;
        this.lastRPSChoice = "";


    }
    getRPSChoice()
    {
        if(this.wonLastRPSRound)
        {
            if(this.getRandomInt(3) > 0)
            {
                this.wonRPS();
            }
            else
            {
                this.normalRPS();
            }
        } else if(this.lostLastRPSRound)
        {
            if(this.getRandomInt(3) > 0)
            {
                this.lostRPSRPS();
            }
            else
            {
                this.normalRPS();
            }
        } else
        {
            this.normalRPS();
        }
    }
    lostRPS()
    {

    }
    wonRPS()
    {

    }
    normalRPS()
    {
        let number = this.getRandomInt(3);
        if(computerChoice === 0)
        {
            this.lastRPSChoice = "rock";
            return this.lastRPSChoice;
        } else if(computerChoice === 1)
        {
            this.lastRPSChoice = "paper";
            return this.lastRPSChoice;
        } else
        {
            this.lastRPSChoice = "scissors";
            return this.lastRPSChoice;
        }
    }
    getAMTChoice()
    {
        let number = this.getRandomInt(3);
        if(computerChoice === 0)
        {
            this.currentRPSChoice = "rock";
        } else if(computerChoice === 1)
        {
            this.currentRPSChoice = "paper";
        } else
        {
            this.currentRPSChoice = "scissors";
        }
    }
    setLoss(lossStatus)
    {
        this.lostLastRPSRound = lossStatus;
    }
    setWin(winStatus)
    {
        this.winStatus = lossStatus;
    }
    // Gets random int from 0 to max-1
    getRandomInt(max) 
    {
        return Math.floor(Math.random() * max);
    }
}