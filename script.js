let canvas = document.getElementById("snake");
let context = canvas.getContext("2d");
let box = 36;
let fundo = new Image();
fundo.src = 'img/floresta-amazonica.jpg'
let arvore = [];
arvore[0] = {
    x: 1 * box,
    y: 1 * box
}
let direction = "right";
let fogo = {
    x: Math.floor(Math.random() * 15 + 1) * box,
    y: Math.floor(Math.random() * 15 + 1) * box
}


function criarBG(){
    context.fillStyle ='lightgreen';
    context.fillRect(0, 0, 16 * box, 16 * box);
    context.drawImage(fundo, 0, 0);
    
    
}

function criarArvore(){
    for(i=0; i < arvore.length; i++){
        context.fillStyle = '#076907'
        context.font='36px FontAwesome';
        context.fillText('\uf1bb', arvore[i].x, arvore[i].y);
    }
}

function drawFogo (){
    context.fillStyle ='#e40000';
    context.font = '36px FontAwesome';
    context.fillText('\uf06d', fogo.x, fogo.y);
}

document.addEventListener('keydown', update);

function update(event){
    if(event.keyCode == 65 && direction !="right") direction = "left";
    if(event.keyCode == 87 && direction !="down") direction = "up";
    if(event.keyCode == 68 && direction !="left") direction = "right";
    if(event.keyCode == 83 && direction !="up") direction = "down";
}

function iniciarJogo(){
    if(arvore[0].x > 15 * box && direction == "right") arvore[0].x = 0;
    if(arvore[0].x < 0 && direction == "left") arvore[0].x = 16 * box;
    if(arvore[0].y > 15 * box && direction == "down") arvore[0].y = 0;
    if(arvore[0].y < 0   && direction == "up") arvore[0].y = 16  * box;

    for(i = 1; i < arvore.length; i++ ){
        if(arvore[0].x == arvore[i].x && arvore[0].y == arvore[i].y){
            clearInterval(jogo);
            alert('Game Over :(');
        }
    }

    criarBG();
    criarArvore();
    drawFogo();

    let arvoreX = arvore[0].x;
    let arvoreY = arvore[0].y;

    if(direction == "right") arvoreX += box;
    if(direction == "left") arvoreX -= box;
    if(direction == "up") arvoreY -= box;
    if(direction =="down") arvoreY += box;

    if(arvoreX != fogo.x || arvoreY != fogo.y){
        arvore.pop();

        }else{fogo.x = Math.floor(Math.random() * 15 + 1) * box;
            fogo.y = Math.floor(Math.random() * 15 + 1) * box;
        }

    let newHead = {
        x: arvoreX,
        y: arvoreY
    }

    arvore.unshift(newHead);
}

let jogo = setInterval(iniciarJogo, 150);
