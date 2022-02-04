//Array de cores disponíveis
var buttonColours = ["red", "blue", "green", "yellow"];

//Arrays de sequencia do jogo e do jogador
var gamePattern = [];
var userClickedPattern = [];


var level = 0;
var started = false;

//Detectar uma tecla para começar o jogo, chamando a função nextSequence
$(document).keydown(function(){
    if(!started){
    //Mudar título para acompanhar os níveis do jogo
    $("#level-title").text("Level" + level);
    nextSequence();

    started = true;
    }
});

//Identificar a cor escolhida pelo usuário, atribuído pelo id da cor, armazenado em array do jogador
$(".btn").click(function(){
    var userChosenColour = $(this).attr("id");

    userClickedPattern.push(userChosenColour);

    playSound(userChosenColour);
    animatePress(userChosenColour);

    checkAnswer(userClickedPattern.length-1);
});

//Compara a ultima resposta e o tamanho dos dois arrays
function checkAnswer(currentLevel){
    
        if(gamePattern[currentLevel] === userClickedPattern[currentLevel]){
            if(gamePattern.length === userClickedPattern.length){
                setTimeout(function(){
                    nextSequence();
                }, 1000);
            }
            
        }else{
            playSound("wrong");
            $("#level-title").text("Game over! Press a key to restart!");
    
            $("body").addClass("game-over");
    
            setTimeout(function(){
                $("body").removeClass("game-over");
            }, 200);
    
            
            startOver();
        }
    
    }

//Próxima cor gerada aleatoriamente na sequencia, armazenado no array do jogo
function nextSequence(){
    //Esvazia o array pra inserir a próxima sequencia.
    userClickedPattern = [];
    level++;

    $("#level-title").text("Level " + level);
    var randomNumber = Math.floor(Math.random()*4);
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);

    $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);

    playSound(userChosenColour);
    
}

//Tocar o som de cada cor escolhida
function playSound(name){

    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}

//Animar a cor clicada com box shadow CSS
function animatePress(currentColour){

    $("#" + currentColour).addClass("pressed");

    setTimeout(function(){
        $("#" + currentColour).removeClass("pressed");

    },100);

}

//Recomeça o jogo zerando o nivel e esvaziando o array da sequencia do jogo
function startOver(){
    level = 0;
    gamePattern = [];
    started = false;
}

