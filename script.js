function loop(){
	window.requestAnimationFrame(loop,tela);
	atualizaTela();
	desenhaJogo();
	console.log(pontosJogador1,pontosJogador2);
}

function atualizaTela(){
	//Movimentação da bolinha
	xBola += xVelocidade;
	yBola += yVelocidade;

	//Colisão da bolinha com a parede
	if(xBola + raio > 800 || xBola - raio< 0){
		xVelocidade *= -1;
	}
	if(yBola + raio> 600 || yBola - raio< 0){
		yVelocidade *= -1;
	}
	//Colisão da bolinha com a raquete
	if(xBola - raio < xRaquete + 10 && yBola - raio < yRaquete + 100 && yBola + raio > yRaquete){
		xVelocidade *= -1;
	}
	//Colisão da bolinha com a raquete inimigo
	if(xBola + raio > xRaqueteInimigo && yBola - raio < yRaqueteInimigo + 100 && yBola + raio > yRaqueteInimigo){
		xVelocidade *= -1;
	}
	movimentaRaquete()
	movimentaRaqueteInimigo ()
	marcaPontos ()
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
    desenhaRaquete(xRaquete, yRaquete);
    desenhaRaquete(xRaqueteInimigo, yRaqueteInimigo);
    bolinhaNaoFicaPresa()
}
function desenhaBolinha(){
	ctx.fillStyle = "Lime";
    ctx.beginPath();
    ctx.arc(xBola, yBola, raio, 0, 2 * Math.PI);
    ctx.fill();
}
function desenhaRaquete(x,y){
	ctx.fillStyle = "Lime";
    ctx.fillRect(x, y, 10, 100);
}
function movimentaRaqueteInimigo (){
	velocidadeRaqueteInimigo = yBola - yRaqueteInimigo - 100/2 - 60;
	yRaqueteInimigo += velocidadeRaqueteInimigo; 
}
function marcaPontos (){
	tempo += 1;
	if(xBola + raio > 790 && tempo > 300){
		pontosJogador1 += 1;
		tempo = 0;
	}
	if(xBola - raio < 10 && tempo > 300){
		pontosJogador2 += 1;
		tempo = 0;
	}
}
function bolinhaNaoFicaPresa(){
    if (xBola - raio< 0){
    xBola = 42;
    }
}

//teclas
let UP=38,DOWN=40;
//movimento
let mvUp = mvDown = false;
//Definem a velocidade da bolinha
let xVelocidade = 2.5;
let yVelocidade = 2.5;
//Define o tamanho da bolinha
const raio = 15;
//Definem a posição da bolinha na tela
let xBola = 400;
let yBola = 300;
//Definem a posição da raquete na tela
let xRaquete = 10;
let yRaquete = 250;
//Definem a posição da raquete do inimigo na tela
let xRaqueteInimigo = 780;
let yRaqueteInimigo = 250;
//Definem a velocidade da raquete
let velocidadeRaquete = 3;
//Definem a velocidade da raquete do inimigo
let velocidadeRaqueteInimigo = 3;
//Definem o placar do jogo
let pontosJogador1 = 0;
let pontosJogador2 = 0;
//Usada para marcar apenas um ponto a cada vez que a bola toca a parede
let tempo = 300;
//Puxa o elemento canvas do HTML para o JS
let tela = document.querySelector("canvas");
let ctx = tela.getContext("2d");
loop();