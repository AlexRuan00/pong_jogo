function loop(){
	window.requestAnimationFrame(loop,tela);
	atualizaTela();
	desenhaJogo();
	console.log(mvDown);
}

function atualizaTela(){
	//Movimentação da bolinha
	xBola += xVelocidade;
	//yBola += yVelocidade;

	//Colisão da bolinha com a parede
	if(xBola + raio > 800 || xBola - raio< 0){
		xVelocidade *= -1;
	}
	if(yBola + raio> 600 || yBola - raio< 0){
		yVelocidade *= -1;
	}
	//Colisão da bolinha com a raquete
	if(xBola - raio < xRaquete && yBola - raio < yRaquete + 100 && yBola + raio > yRaquete){
		xVelocidade *= -1;
	}
	movimentaRaquete()
}
function movimentaRaquete(){
	if(mvUp){
		yRaquete -= velocidadeRaquete;
	}
	if(mvDown){
		yRaquete += velocidadeRaquete;
	}
}
//Ativa o evento de pressionar as teclas.
window.addEventListener("keydown",function (e){
    var key = e.keyCode;
    switch (key){
        case UP:
        mvUp = true;
        break;
        case DOWN:
        mvDown = true;
        break; 
    }
}, false)
//Ativa o evento de soltar as teclas.
window.addEventListener("keyup",function (e){
    var key = e.keyCode;
    switch (key){
        case UP:
        mvUp = false;
        break;
        case DOWN:
        mvDown = false;
        break; 
    }
}, false)

function desenhaJogo(){
	//Limpa tela
	ctx.clearRect(0, 0, 800, 600);
	//Pinta o fundo
	ctx.fillStyle = "black";
    ctx.fillRect(0, 0, 800, 600);
    desenhaBolinha();
    desenhaRaquete();
}
function desenhaBolinha(){
	ctx.fillStyle = "white";
    ctx.beginPath();
    ctx.arc(xBola, yBola, raio, 0, 2 * Math.PI);
    ctx.fill();
}
function desenhaRaquete(){
	ctx.fillStyle = "white";
    ctx.fillRect(xRaquete, yRaquete, 10, 100);
}







//teclas
var UP=38,DOWN=40;
//movimento
var mvUp = mvDown = false;
//Definem a velocidade da bolinha
var xVelocidade = 1;
var yVelocidade = 1;
//Define o tamanho da bolinha
const raio = 15;
//Definem a posição da bolinha na tela
var xBola = 400;
var yBola = 300;
//Definem a posição da raquete na tela
var xRaquete = 10;
var yRaquete = 250;
//Definem a velocidade da raquete
var velocidadeRaquete = 3;
//Puxa o elemento canvas do HTML para o JS
let tela = document.querySelector("canvas");
let ctx = tela.getContext("2d");
loop();