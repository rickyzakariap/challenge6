const rockBack = document.getElementById('rockBack');
const paperBack = document.getElementById('paperBack');
const scissorBack = document.getElementById('scissorBack');

//show computer choice
const rockBackCom = document.getElementById('rockBack-com');
const paperBackCom = document.getElementById('paperBack-com');
const scissorBackCom = document.getElementById('scissorBack-com');

const versus = document.getElementById('versus') //to remove VS sign
const resultBox = document.getElementById('result-box') //to show result sign

var Enabled = true;

//generate choices 
function compChoice(){
    const comp = Math.random();
    if (comp < 0.34){
        setTimeout(function(){
            rockBackCom.style.background = "#C4C4C4";
            rockBackCom.style.borderRadius = '30px';
        }, 300)
        return 'rock';
    }else if (comp >= 0.34 && comp <=0.67){
        setTimeout(function(){
            paperBackCom.style.background = "#C4C4C4";
            paperBackCom.style.borderRadius = '30px';
        }, 300)
        return 'paper';
    } else{
        setTimeout(function(){
            scissorBackCom.style.background = "#C4C4C4";
            scissorBackCom.style.borderRadius = '30px';
        }, 300)
        
        return 'scissor';
    }
}

//setup rules
function gameResult(player, comp){
    if(player == comp){
        return draw();
    }
    else if(player == 'rock'){
        return (comp == 'paper') ? lose() : win();
    }
    else if (player == 'paper'){
        return (comp == 'scissor') ? lose() : win();
    }
    else if(player == 'scissor'){
        return (comp == 'rock') ? lose() : win();
    }
}

//If player lose, win, and Draw
function lose(){
    console.log("COM WIN!") //consolo.log is for debugging to make sure code works
    setTimeout(function(){
        resultBox.style.display = 'block';
        versus.style.display = 'none';
        document.getElementById('result').innerHTML = 'COM WIN!';
    },600)
}

function win(){
    console.log("PLAYER 1 WIN")
    setTimeout(function(){
        resultBox.style.display = 'block';
        versus.style.display = 'none';
        document.getElementById('result').innerHTML = 'PLAYER 1 WIN!';
    }, 600)
}

function draw(){
    console.log("DRAW")
    setTimeout(function(){
        resultBox.style.display = 'block';
        versus.style.display = 'none';
        document.getElementById('result').innerHTML = 'DRAW';        
    },600)
}


//if player choose rock
const playerRock = document.getElementById('rock'); //take the input
playerRock.addEventListener('click', function(){
    //show player choice
    if(Enabled == true){ //no overlap choice
        const playerAction = playerRock.id;
        const compAction = compChoice();
        gameResult(playerAction, compAction); //get result 
        
        rockBack.style.background = "#C4C4C4"; //state that we choice Rock
        rockBack.style.borderRadius = '30px';

        console.log('comp :' + compAction); //this is for debugging in case of error
        console.log("p :" + playerAction);
        
        Enabled = false;
    }

})

//if player choose paper
const playerPaper = document.getElementById('paper'); 
playerPaper.addEventListener('click', function(){

    if(Enabled == true){
        const compAction = compChoice();
        const playerAction = playerPaper.id;
        gameResult(playerAction, compAction);
    
        paperBack.style.background = "#C4C4C4";
        paperBack.style.borderRadius = '30px';
    
        console.log('comp :' + compAction);
        console.log("p :" + playerAction);
        
    
        Enabled = false;
    }
})

//if player choose scissor
const playerScissor = document.getElementById('scissor');
playerScissor.addEventListener('click', function(){
    if(Enabled == true){
        const compAction = compChoice();
        const playerAction = playerScissor.id;
        gameResult(playerAction, compAction);
    
        scissorBack.style.background = "#C4C4C4";
        scissorBack.style.borderRadius = '30px';
    
        console.log('comp :' + compAction);
        console.log("p :" + playerAction);
        
    
        Enabled = false;
    }   
})

const refresh = document.getElementById('refresh'); //take refresh input
refresh.addEventListener('click', function(){
    if(confirm("Play Again??")){
        location.reload();
    }
});

