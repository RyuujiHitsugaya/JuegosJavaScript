var x = 350;
var y = 250;
var dx = 15;
var dy = 15;
var cont = 0;
var disparar = [false,false,false,
				false,false,false,
				false,false,false,
				false,false,false,
				false,false,false];
var disparos = [[dx,dy],[dx,dy],[dx,dy],
				[dx,dy],[dx,dy],[dx,dy],
				[dx,dy],[dx,dy],[dx,dy],
				[dx,dy],[dx,dy],[dx,dy],
				[dx,dy],[dx,dy],[dx,dy]];
var vida = 0;
var vidas = 0;
var duracion = 0;
var rotacion = 0;
var msg = 0;
var puntos = 0;
var puntaje = 0;
var dificultad = 0;
var asteroides = 0;
var ast = [[aleatorio(450),aleatorio(400)],
		   [aleatorio(450),aleatorio(400)],
		   [aleatorio(450),aleatorio(400)],
		   [aleatorio(450),aleatorio(400)],
		   [aleatorio(450),aleatorio(400)],
		   [aleatorio(450),aleatorio(400)],
		   [aleatorio(450),aleatorio(400)],
		   [aleatorio(450),aleatorio(400)],
		   [aleatorio(450),aleatorio(400)],
		   [aleatorio(450),aleatorio(400)]];
var heroes = [$("#heroe4")[0],$("#heroe3")[0],$("#heroe2")[0],$("#heroe1")[0]];


$(document).ready(inicio);
$(document).keydown(capturaTeclado);

function inicio(){
	var lienzo = $("#lienzo")[0];
	var contexto = lienzo.getContext("2d");
	var buffer = document.createElement("canvas");
	buffer.width = lienzo.width;
	buffer.height = lienzo.height;
	contextoBuffer = buffer.getContext("2d");
	contextoBuffer.clearRect(0,0,500,700);
	var logo = $("#logo")[0];
	contexto.clearRect(0,0,500,700);
	contexto.drawImage(logo, 0, 300);
	contexto.drawImage(buffer, 0, 0);
	$('#main')[0].loop = true;
	$('#mission')[0].loop = true;
	$('#main')[0].play();
	$("button").click(function(){
		iniciar();
	});
}

function aleatorio(tope){
	return Math.floor((Math.random() * tope) + 1);
}
function iniciar(){
		ast = [[aleatorio(450),aleatorio(400)],
				[aleatorio(450),aleatorio(400)],
				[aleatorio(450),aleatorio(400)],
				[aleatorio(450),aleatorio(400)],
				[aleatorio(450),aleatorio(400)],
				[aleatorio(450),aleatorio(400)],
				[aleatorio(450),aleatorio(400)],
				[aleatorio(450),aleatorio(400)],
				[aleatorio(450),aleatorio(400)],
				[aleatorio(450),aleatorio(400)]];
		x = 250;
		y = 630;
		dx = x+39;
		dy = y+2;
		vida = 100;
		vidas = 3;
		duracion = 0;
		puntaje = 0;
		puntos = 0;
		cont = 0;
		heroes = [$("#heroe4")[0],$("#heroe3")[0],$("#heroe2")[0],$("#heroe1")[0]];
		disparar = [false,false,false,
				false,false,false,
				false,false,false,
				false,false,false,
				false,false,false];
		disparos = [[dx,dy],[dx,dy],[dx,dy],
				[dx,dy],[dx,dy],[dx,dy],
				[dx,dy],[dx,dy],[dx,dy],
				[dx,dy],[dx,dy],[dx,dy],
				[dx,dy],[dx,dy],[dx,dy]];
		dificultad = 0;
		asteroides=0;
		run();
}
function capturaTeclado(event){
	if((event.which==39 || event.which==68)&&(x<420)){
		x += 10;
		for(i=0;i<15;i++)
		if(!disparar[i])
			disparos[i][0] += 10;
	}
	if((event.which==37 || event.which==65)&&(x>0)){
		x -= 10;
		for(i=0;i<15;i++)
		if(!disparar[i])
			disparos[i][0] -= 10;
	}
	if(event.which==32){
			disparar[cont]=true;
			cont += 1;
			cont = (15 + cont)%15;
		}
	}
function Disparo(){
	this.img = $("#disparo")[0];
    this.dibujar = function(ctx,cooX,cooY){
		var img = this.img;
		ctx.drawImage(img, cooX, cooY);
		ctx.save();
		ctx.restore();
	}
	this.colision = function(xx,yy,cooX,cooY){
		var distancia=0;
		distancia=Math.sqrt( Math.pow( (xx-cooX), 2)+Math.pow( (yy-cooY),2));
		if(distancia>20)
		   return false;
		else
		   return true;
	}
}
function Nave(){
	this.img = [$("#ship")[0],$("#explosion")[0]];

	this.dibujar = function(ctx,i){
		var img = this.img[i];
		if(i==0)
			ctx.drawImage(img, x, y);
		else
			ctx.drawImage(img, x+24, y+14);
		ctx.save();
		ctx.restore();
	}

	this.colision = function(xx,yy){
		var distancia=0;
		distancia=Math.sqrt( Math.pow( (xx-x-40), 2)+Math.pow( (yy-y-30),2));
		if(distancia>40)
		   return false;
		else
		   return true;
	}
}
function Asteroid(){
	this.img = [$("#asteroid")[0],$("#explosion")[0]];
	this.dibujar = function(ctx, x1, y1,i){
		var img = this.img[i];
		ctx.save();
		ctx.translate(x1,y1);
		ctx.rotate(rotacion*Math.PI/180);
		ctx.drawImage(img,-img.width/2,-img.height/2);
		ctx.restore();
	}
}
function run(){
	$('#main')[0].pause();
	$('#mission')[0].play();
	var lienzo = $("#lienzo")[0];
	var contexto = lienzo.getContext("2d");
	var buffer = document.createElement("canvas");
	buffer.width = lienzo.width;
	buffer.height = lienzo.height;
	contextoBuffer = buffer.getContext("2d");
	contextoBuffer.fillStyle = "#ffffff";
	if(vida <= 0){
			vida = 100;
			vidas -= 1;
			$('#dead')[0].pause();
			$("#dead")[0].currentTime = 0;
			$('#dead')[0].play();
		}
	if(vidas >= 0){
		duracion++;
		var objnave = new Nave();
		var dispar = [new Disparo(),new Disparo(),new Disparo(),
						new Disparo(),new Disparo(),new Disparo(),
						new Disparo(),new Disparo(),new Disparo(),
						new Disparo(),new Disparo(),new Disparo(),
						new Disparo(),new Disparo(),new Disparo()];
		var objasteroid = [new Asteroid(),new Asteroid(),new Asteroid(),
						   new Asteroid(),new Asteroid(),new Asteroid(),
						   new Asteroid(),new Asteroid(),new Asteroid(),
						   new Asteroid()];
		if(dificultad>=100000)
		for(i=0;i<=asteroides;i++){
			asteroides+=1;
			objasteroid += [new Asteroid()];
			ast += [[aleatorio(440)+10,aleatorio(1)]];
		}
		contextoBuffer.clearRect(0,0,500,700);
		puntaje = (parseInt(duracion/100))+puntos;
		for(i=0;i<15;i++)
		dispar[i].dibujar(contextoBuffer,disparos[i][0],disparos[i][1]);
		objnave.dibujar(contextoBuffer,0);
		rotacion -= 5;
		for(i=0;i<15;i++)
		if(disparar[i]){
					disparos[i][1] -= 10;
					if(disparos[i][1]<=0){
						disparar[i]=false;
						disparos[i][1] = y+2;
						disparos[i][0] = x+39;
					}
		}
		for(i=0;i<10+asteroides;i++){
			objasteroid[i].dibujar(contextoBuffer,ast[i][0],ast[i][1],0);
			if(objnave.colision(ast[i][0],ast[i][1])){
				vida -=3;
				objnave.dibujar(contextoBuffer,1);
				$('#explode')[0].pause();
				$("#explode")[0].currentTime = 0;
				$('#explode')[0].play();
			}
			for(j=0;j<15;j++)
			if(disparar[j])
			if(dispar[j].colision(ast[i][0],ast[i][1],disparos[j][0],disparos[j][1])){
				objasteroid[i].dibujar(contextoBuffer,ast[i][0],ast[i][1],1);
				$('#explode')[0].pause();
				$("#explode")[0].currentTime = 0;
				$('#explode')[0].play();
				ast[i] = [aleatorio(440)+10,aleatorio(1)];
				puntos += 10;
				disparar[j]=false;
				disparos[j][1] = y+2;
				disparos[j][0] = x+39;
			}
			ast[i][1] += 5 + (dificultad/1000);
			if(dificultad<100000)
						dificultad += 1;
			if(ast[i][1]>700)
				ast[i] = [aleatorio(440)+10,aleatorio(1)];
		}
		contextoBuffer.font = "bold 15px 'Lucida Console'";
		for(i=0;i<vida;i++)
		contextoBuffer.drawImage($("#life")[0], 70+i*2, 20);
		contextoBuffer.drawImage($("#lifebar")[0], 46, 18);
		contextoBuffer.drawImage(heroes[vidas], 10, 10);
		contextoBuffer.fillText(puntaje, 70, 45);
		contextoBuffer.fillText("x"+vidas, 60, 65);
		contexto.clearRect(0,0,500,700);
		contexto.drawImage(buffer, 0, 0);
		setTimeout("run()",20);
		$("button").css("display","none");
	}else{
		vida=-1;
		$('#mission')[0].pause();
		$("#main")[0].currentTime = 0;
		$('#main')[0].play();
		var over = $("#gameover")[0];
		contextoBuffer.clearRect(0,0,500,700);
	    contextoBuffer.drawImage(over, 0, 200);
		contextoBuffer.font="50px System";
		contextoBuffer.fillText(puntaje, 200, 378);
		contexto.clearRect(0,0,500,700);
		contexto.drawImage(buffer, 0, 0);
		$("#puntaje").html(puntaje);
		$("button").css("display","inline");
	}
}
