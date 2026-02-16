const humanScore = 0;
const computerScore = 0;
function getComputerChoice()
{
    const computerChoice = Math.random();
    if(computerChoice > 1)
    {
        return "rock";
    } else if(computerChoice == 0)
    {
        return "paper";
    } else
    {
        return "scissors";
    }
}
function getHumanChoice()
{
    const humanChoice = prompt("It's your turn! Please Type in rock, paper or scissors.");
    return humanChoice;
}
function playRound(humanChoice, computerChoice)
{
    if(humanChoice === computerChoice)
    {
        console.log("Draw");
    } else 
    if((humanChoice === "scissors" && computerChoice === "rock") || 
        (humanChoice === "rock" && computerChoice === "paper") || 
        (humanChoice === "paper" && computerChoice === "scissors")){
        console.log("Computer Wins");
        computerScore++;
    } else
    {
        console.log("Player Wins");
        humanScore++;
    }
}
const humanSelection = getHumanChoice();
const computerSelection = getComputerChoice();

playRound(humanSelection, computerSelection);

function playGame()
{
    for(let i = 0; i <= 5; i++)
    {
        playRound(humanSelection, computerSelection);
    }
    console.log("Game Over!")
    if(humanScore > computerScore)
    {
        console.log("Player wins!");
    } else if (humanScore < computerScore)
    {
        console.log("Computer Wins");
    } else
        console.log("Draw");
}
