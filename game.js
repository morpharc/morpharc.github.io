
var pjs = new PointJS('2D', 1280 / 2, 720 / 2, { // 16:9
 // if need
});
pjs.system.initFullPage(); // for Full Page mode
// pjs.system.initFullScreen(); // for Full Screen mode (only Desctop)

var log    = pjs.system.log;     // log = console.log;
var game   = pjs.game;           // Game Manager
var point  = pjs.vector.point;   // Constructor for Point
var camera = pjs.camera;         // Camera Manager
var brush  = pjs.brush;          // Brush, used for simple drawing
var OOP    = pjs.OOP;            // Object's manager
var math   = pjs.math;           // More Math-methods
var levels = pjs.levels;         // Levels manager

var width  = game.getWH().w; // width of scene viewport
var height = game.getWH().h; // height of scene viewport

var key   = pjs.keyControl.initKeyControl();
var mouse = pjs.mouseControl.initMouseControl();
// var touch = pjs.touchControl.initTouchControl();
// var act   = pjs.actionControl.initActionControl();

var r = game.getResolution();

var createBackground = function(imageName, cords, onload){
	return game.newImageObject({
		x: (cords) ? cords.x + cords.w : 0,
		y : 0,
		file : 'img/' + imageName+ '.png',
		h: height,
		onload : onload
	})
}

var fon1 =  createBackground('background01', undefined, function(){ fon2.x = fon1.x + fon1.w });

var fon2 = createBackground('background01', {x : fon1.x, w:fon1.w});

var fon3 =  createBackground('Steampunk', undefined, function(){ fon4.x = fon3.x + fon3.w });

var fon4 = createBackground('Steampunk', {x : fon3.x, w:fon3.w});

var fon5 =  createBackground('Outerspace', undefined, function(){ fon6.x = fon5.x + fon5.w });

var fon6 = createBackground('Outerspace', {x : fon5.x, w:fon5.w});


var player = game.newAnimationObject({
	x : width / 5, y : 0,
	h : 250*r, w : 200*r,
	animation : pjs.tiles.newAnimation('img/ninja_run.png', 363, 454, 10),
	delay : 1, scale : 0.3
});

var musicOn = game.newImageObject({
	x : 20, y : 7,
	file : 'img/music_off.png',
	h : 35*r, w : 35*r
});

var musicOff = game.newImageObject({
	x : 20, y : 7,
	file : 'img/music_on.png',
	h : 35*r, w : 35*r
});

var xp = game.newImageObject({
	x : 600, y : 200,
	file : 'img/xp.png',
	h : 200*r, w : 200*r
});


var exitToMainMenu = game.newTextObject({
	x : width/3, y : height/3 + 100*r,
	text : 'Exit to main menu',
	size : 30*r, color : 'black',
	strokeColor : 'white',
	strokeWidth : 1*r
});

var backgroundAudio = pjs.audio.newAudio('mp3/Childhood1.mp3');
var jump = pjs.audio.newAudio('mp3/jump.mp3');
var punch = pjs.audio.newAudio('mp3/punch.wav');
var airBomb = pjs.audio.newAudio('mp3/bomb.wav');
var eating = pjs.audio.newAudio('mp3/food.wav');
var win = pjs.audio.newAudio('mp3/win.wav');
var paused = pjs.audio.newAudio('mp3/pause.wav');


var moveBackground = function (s, fon1, fon2) {
	fon1.move(point(-s/2, 0));
	fon2.move(point(-s/2, 0));

	if (fon1.x + fon1.w < 0) {
		fon1.x = fon2.x + fon2.w;
	}
	if (fon2.x + fon2.w < 0) {
		fon2.x = fon1.x + fon1.w;
	}
}

player.gr = 1;
player.speed = point(0, 0);
player.health = 100;

pjs.system.setTitle('THE BEST GAME EVER'); // Set Title for Tab or Window

var map = {
	width : 45*r,
	height : 45*r,
	source : [
		'',
		'',
		'',
		'',
		'           2                2                        2                  2             2                    2             2                            2             2            2    2           2',
		'',
		'             1     1               1        1        1            1                1    1            1                 1           11    1          1    11       1       1           1       11          111           1   1            1        1        3',
		'000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000'
	]
};

var map1 = {
	width : 45*r,
	height : 45*r,
	source : [
		'',
		'',
		'',
		'',
		'           2                2                                          2                                 2                                         2             2                2           2                                       2                                   2                      2',
		'',
		'             1     1               1        1        11            1                1    1            1                 11           11    1          1    11       1       1           1       11          111           1   1            11        1                   111                1                1                      3',
		'0000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000'
	]
};

var map2 = {
	width : 45*r,
	height : 45*r,
	source : [
		'',
		'',
		'',
		'',
		'           2                2                        2                               2                                 2                            2             2             2              2                               2             2                2                2                                 2                2                  2                     2                  2                  2                          2                  2                           2',
		'',
		'             11               1        1        11            1       111         1    1            1         11        1           11    1          1    11       1       1           1       11          111           1   1            1        1            111               1                 11             111        1       1      1             1    1            111                11        11      11       1 11    111             111     111       1      1         11               3',
		'000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000'
	]
};

var walls = [];
var enemies = [];
var foods = [];
var flag = [];

var walls1 = [];
var enemies1 = [];
var foods1 = [];
var flag1 = [];

var walls2 = [];
var enemies2 = [];
var foods2 = [];
var flag2 = [];



OOP.forArr(map.source, function (string, Y) {
	OOP.forArr(string, function (symbol, X) {
		if (!symbol || symbol == ' ') return;

		if (symbol == '0') {
			walls.push(game.newImageObject({
				file : "img/Fa.png",
				w : map.width, h : map.height,
				x : map.width*X , y : map.height*Y
			}));
		}

		if (symbol == '1') {
			enemies.push(game.newAnimationObject({
				animation : pjs.tiles.newAnimation('img/cactus.png', 83, 89, 6),
				w : map.width, h : map.height,
				x : map.width*X , y : map.height*Y
			}));
		}

		if (symbol == '2') {
			foods.push(game.newImageObject({
				file : "img/shavuha.png",
				w : map.width, h : map.height,
				x : map.width*X , y : map.height*Y
			}));
		}

		if (symbol == '3') {
			flag.push(game.newAnimationObject({
				animation : pjs.tiles.newAnimation('img/flag.png', 30, 60, 3),
				w : map.width, h : map.height,
				x : map.width*X , y : map.height*Y
			}));
		}

	})
});


OOP.forArr(map1.source, function (string, Y) {
	OOP.forArr(string, function (symbol, X) {
		if (!symbol || symbol == ' ') return;

		if (symbol == '0') {
			walls1.push(game.newImageObject({
				file : "img/Fa.png",
				w : map.width, h : map.height,
				x : map.width*X , y : map.height*Y
			}));
		}

		if (symbol == '1') {
			enemies1.push(game.newAnimationObject({
				animation : pjs.tiles.newAnimation('img/cactus.png', 83, 89, 6),
				w : map.width, h : map.height,
				x : map.width*X , y : map.height*Y
			}));
		}

		if (symbol == '2') {
			foods1.push(game.newImageObject({
				file : "img/shavuha.png",
				w : map.width, h : map.height,
				x : map.width*X , y : map.height*Y
			}));
		}

		if (symbol == '3') {
			flag1.push(game.newAnimationObject({
				animation : pjs.tiles.newAnimation('img/flag.png', 30, 60, 3),
				w : map.width, h : map.height,
				x : map.width*X , y : map.height*Y
			}));
		}

	})
});


OOP.forArr(map2.source, function (string, Y) {
	OOP.forArr(string, function (symbol, X) {
		if (!symbol || symbol == ' ') return;

		if (symbol == '0') {
			walls2.push(game.newImageObject({
				file : "img/Fa.png",
				w : map.width, h : map.height,
				x : map.width*X , y : map.height*Y
			}));
		}

		if (symbol == '1') {
			enemies2.push(game.newAnimationObject({
				animation : pjs.tiles.newAnimation('img/cactus.png', 83, 89, 6),
				w : map.width, h : map.height,
				x : map.width*X , y : map.height*Y
			}));
		}

		if (symbol == '2') {
			foods2.push(game.newImageObject({
				file : "img/shavuha.png",
				w : map.width, h : map.height,
				x : map.width*X , y : map.height*Y
			}));
		}

		if (symbol == '3') {
			flag2.push(game.newAnimationObject({
				animation : pjs.tiles.newAnimation('img/flag.png', 30, 60, 3),
				w : map.width, h : map.height,
				x : map.width*X , y : map.height*Y
			}));
		}

	})
});

var kunai = [];

var timer = OOP.newTimer(2000, function () {
	kunai.push(game.newAnimationObject({
		animation : pjs.tiles.newAnimation('img/bomb.png', 91, 99, 4),
		x : math.random(0, width - 50*r),
		y : -math.random(-50*r, 500*r),
		w : 40*r, h : 40*r
	}));
});


var timer1 = OOP.newTimer(1500, function () {
	kunai.push(game.newAnimationObject({
		animation : pjs.tiles.newAnimation('img/bomb.png', 91, 99, 4),
		x : math.random(0, width - 50*r),
		y : -math.random(-50*r, 500*r),
		w : 40*r, h : 40*r
	}));
});


var timer2 = OOP.newTimer(1000, function () {
	kunai.push(game.newAnimationObject({
		animation : pjs.tiles.newAnimation('img/bomb.png', 91, 99, 4),
		x : math.random(0, width - 50*r),
		y : -math.random(-50*r, 500*r),
		w : 40*r, h : 40*r
	}));
});

var heart = game.newImageObject({
	file : "img/heart.png",
	w : 35*r, h : 35*r,
	x : width/7 - 36*r , y : 2.5*r
});

function setGameLoop(gameName, timer, walls, enemies, foods, flag, fon1, fon2, nextGameName, level, pause){
	musicOn.setVisible(false);
	game.newLoop(gameName, function () {
		var dirty = false;
		fon1.draw();
		fon2.draw();
		player.draw();
		heart.draw();
		timer.restart();
		musicOff.draw();
		musicOn.draw();
		if (mouse.isPeekObject('LEFT', musicOn) && !musicOff.visible) {
			musicOn.setVisible(false);
			musicOff.setVisible(true);
			backgroundAudio.pause();
			dirty = true;
		}

		if (mouse.isPeekObject('LEFT', musicOff) && !musicOn.visible && !dirty) {
			backgroundAudio.play();
			musicOff.setVisible(false);
			musicOn.setVisible(true);
		}



		OOP.forArr(kunai, function (el) {
			el.draw();
			el.move(point(0, 1.5*r));

			if (el.isStaticIntersect(player)) {
					if(el.visible === true){
						if(player.health < 20){
							player.health = 0;
						} else{
						player.health -= 20;
						}
					}
					el.setVisible(false);
					airBomb.play();
			}

			if (el.isStaticIntersect(walls)) {
					el.setVisible(false);			
			}

		});

		OOP.drawArr(walls, function (wall) {
			if (wall.isInCameraStatic()) {
				if (wall.isStaticIntersect(player)) {
					if (player.speed.y > 0) {
						if (key.isDown('UP')) {
							player.speed.y = -12*r;
							jump.play();
						}else {
							player.y = wall.y - player.h; 
							player.speed.y *= -0.3;
						}
					}
				}
			}
		});

		OOP.drawArr(enemies, function (enemy) {
			if (enemy.isInCameraStatic()) {
				if (enemy.isStaticIntersect(player)) {
					if(enemy.visible === true){
						if (player.health < 15){
							player.health = 0;
						} else {
						player.health -= 15;
						}
					}
					enemy.setVisible(false);
					punch.play();	
				}
			}
		});

		OOP.drawArr(foods, function (food) {
			if (food.isInCameraStatic()) {
				if (food.isStaticIntersect(player)) {
					if(food.visible === true){
						if (player.health > 90) {
						player.health = 100;			
						}  else {
					       player.health += 10;
					   	}
					}
					food.setVisible(false);
					eating.play();
				}
			}
		});

		OOP.forArr(walls, function (el) {
			el.draw();
			el.move(point(-5*r, 0));
		});

		OOP.forArr(enemies, function (el) {
			el.draw();
			el.move(point(-5*r, 0));
		});

		OOP.forArr(foods, function (el) {
			el.draw();
			el.move(point(-5*r, 0));
		});

		OOP.forArr(flag, function (el) {
			el.draw();
			el.move(point(-5*r, 0));

			if (el.isStaticIntersect(player) || el.x < player.x) {
					brush.drawText({
						x : width/5, y : height/3,
						text : 'You have passed the ' + level + ' level!!!',
						size : 40*r,
						color : 'red', strokeColor : 'white',
						strokeWidth : 1.5*r
					});
					backgroundAudio.stop();
					win.play();
					setTimeout(function(){
						player.health = 100;
						game.setLoop(nextGameName);
					}, 1000);


			}

		});
		
		brush.drawText({
			x : width/7, y : 8*r,
			text : Math.floor(player.health),
			size : 18*r,
			color : '#98D1CC',
			strokeColor : 'black',
			strokeWidth : 1*r
		});

		player.speed.y += player.gr;

		if (key.isPress('RIGHT')) {
			player.speed.x += 5;
		}
		if (key.isPress('LEFT')) {
			player.speed.x += -5;
		}
		if (key.isUp('LEFT') || key.isUp('RIGHT')) {
			player.speed.x = 0;
		}

		if (key.isPress('ESC')) {
			paused.play();
			game.setLoop(pause);
		}
	 
		if (player.speed.y) {
			player.y += player.speed.y;
		}

		if (player.speed.x) {
			player.x += player.speed.x;
		}

		if (player.health == 0) {
			backgroundAudio.stop();
			game.setLoop('lose');
		}

		if (key.isDown('LEFT') && player.x < 10){
	  		player.x += 5;
	  	}

	  	if (key.isDown('RIGHT') && player.x > (width - 100)){
	  		player.x -= 5;
	  	}

	  	
	  	if (key.isPress('CTRL')){
	  		if (backgroundAudio.playing) {
		
				backgroundAudio.stop();
				
			} else {
				
				backgroundAudio.play();
				
			}
	  	}

		moveBackground(8, fon1, fon2);
		timer.start();
	});
}

setGameLoop('game', timer, walls, enemies, foods, flag, fon1, fon2, 'game1', 1, 'pause');
setGameLoop('game1', timer1, walls1, enemies1, foods1, flag1, fon3, fon4, 'game2', 2, 'pause1');
setGameLoop('game2', timer2, walls2, enemies2, foods2, flag2, fon5, fon6,'menu', 3, 'pause2');

game.newLoop('pause', function () {
	brush.drawText({
		x : width/3, y : height/3,
		text : 'Game paused',
		size : 40*r, color : 'white',
		strokeColor : 'red',
		strokeWidth : 2*r
	});

	brush.drawText({
		x : width/3, y : height/3 + 50*r,
		text : 'Press <escape> for resume',
		size : 30*r, color : 'white',
		strokeColor : 'red',
		strokeWidth : 1*r
	});

	if (key.isPress('ESC')) {
		game.setLoop('game');
	}
});


game.newLoop('pause1', function () {
	brush.drawText({
		x : width/3, y : height/3,
		text : 'Game paused',
		size : 40*r, color : 'white',
		strokeColor : 'red',
		strokeWidth : 2*r
	});

	brush.drawText({
		x : width/3, y : height/3 + 50*r,
		text : 'Press <escape> for resume',
		size : 30*r, color : 'white',
		strokeColor : 'red',
		strokeWidth : 1*r
	});

	if (key.isPress('ESC')) {
		game.setLoop('game1');
	}
});

game.newLoop('pause2', function () {
	brush.drawText({
		x : width/3, y : height/3,
		text : 'Game paused',
		size : 40*r, color : 'white',
		strokeColor : 'red',
		strokeWidth : 2*r
	});

	brush.drawText({
		x : width/3, y : height/3 + 50*r,
		text : 'Press <escape> for resume',
		size : 30*r, color : 'white',
		strokeColor : 'red',
		strokeWidth : 1*r
	});

	if (key.isPress('ESC')) {
		game.setLoop('game2');
	}
});

game.newLoop('lose', function () {

	brush.drawText({
		x : width/5, y : height/3,
		text : 'GAME OVER!!! YOU LOSE.',
		size : 40*r, color : 'white',
		strokeColor : 'red',
		strokeWidth : 2*r
	});

});

var createText = function(text){
	return game.newTextObject({
			x : width/7, y : 8*r,
			text : text,
			size : 18*r,
			color : '#98D1CC',
			strokeColor : 'black',
			strokeWidth : 1*r
		});
}

var texts = [{
	visible : true,
	text  : createText('Press LEFT to move Left')
},
{
	visible : false,
	text : createText('Press RIGHT to move Right')
},
{
	visible : false,
	text : createText('Press UP to jump')
},
{
	visible : false,
	text : createText('Press ESC to pass menu')
}];
game.newLoop('instruct', function () {
	fon1.draw();
	fon2.draw();
	player.speed.y += player.gr;
	for(var i = 0; i < texts.length; i++){
		if(texts[i].visible){
			brush.drawText(texts[i].text);
		}else{
			texts[i].text.setVisible(false);
		}
	}
	if(texts[3].visible){
		xp.draw();
	}


	OOP.drawArr(walls, function (wall) {
			if (wall.isInCameraStatic()) {
				if (wall.isStaticIntersect(player)) {
					if (player.speed.y > 0) {
						if (key.isDown('UP')) {
							player.speed.y = -12*r;
							jump.play();
						}else {
							player.y = wall.y - player.h; 
							player.speed.y *= -0.3;
						}
					}
				}
			}
		});
	player.draw();
	OOP.forArr(walls, function (el) {
		el.draw();
		el.move(point(-5*r, 0));
	});
	player.speed.y += player.gr;

	if (key.isPress('LEFT')) {
		if(texts[0].visible){
			texts[0].visible = false;
			texts[1].visible = true;			
		}
		player.speed.x += -5;
	}

	if (key.isPress('RIGHT')) {
		player.speed.x += 5;
		if(texts[1].visible){
			texts[1].visible = false;
			texts[2].visible = true;			
		}
	}

	if (key.isPress('UP') && texts[2].visible) {
		texts[2].visible = false;
		texts[3].visible = true;
	}

	if (key.isUp('LEFT') || key.isUp('RIGHT')) {
		player.speed.x = 0;
	}

	if (key.isPress('ESC')) {
		paused.play();
		game.setLoop('menu');
	}
 
	if (player.speed.y) {
		player.y += player.speed.y;
	}

	if (player.speed.x) {
		player.x += player.speed.x;
	}

	if (player.health == 0) {
		backgroundAudio.stop();
		game.setLoop('lose');
	}

	if (key.isDown('LEFT') && player.x < 10){
  		player.x += 5;
  	}

  	if (key.isDown('RIGHT') && player.x > (width - 100)){
  		player.x -= 5;
  	}
	moveBackground(8, fon1, fon2);
});

game.newLoopFromClassObject('menu', new Menu(pjs, {
	name  : 'THE BEST GAME EVER',
	author : 'BeerkO inc. All rights reserved©',
	radius : 15,
	items : {
		game  : 'Start level 1',
		game1 : 'Start level 2',
		game2 : 'Start level 3',
		instruct : 'How to play'
	}
}));

game.startLoop('menu');