//////////////////////////////////////////////////////////////////////////////
//                                                                          //
// 3DS Browser SDK - Raycasting Class v1.8.11 2011-07-20                    //
// (c) 2007-2011 Daniel Gump. All Rights Reserved.                          //
// http://3dspaint.com                                                      //
// hullbreach@hullbreachonline.com                                          //
//                                                                          //
//  Nintendo 3DS is a trademark of Nintendo Co., Ltd.  This software        //
//  package is not associated with Nintendo but was created to support      //
//  their products                                                          //
//                                                                          //
//  Redistribution and use in source and binary forms, with or without      //
//  modification, are permitted provided that the following conditions      //
//  are met:                                                                //
//    * Redistributions of source code must retain the above copyright      //
//      notice, this list of conditions and the following disclaimer.       //
//    * Redistributions in binary form must reproduce the above copyright   //
//      notice, this list of conditions and the following disclaimer in     //
//      the documentation and/or other materials provided with the          //
//      distribution.                                                       //
//    * Neither this software nor the names of contributors may be used to  //
//      endorse or promote products derived from this software without      //
//      specific prior written permission.                                  //
//    * If the explicit purpose of the software is not to support the       //
//      Nintendo 3DS Internet browser, then the names of such must          //
//      not be used in any derived product. The name shall be the           //
//      HULLBREACH LITE SDK with a reference link to                        //
//      http://hullbreachonline.                                            //
//                                                                          //
//  THIS SOFTWARE IS PROVIDED BY Daniel Gump ''AS IS'' AND ANY EXPRESS OR   //
//  IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED          //
//  WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE  //
//  DISCLAIMED. IN NO EVENT SHALL Daniel Gump BE LIABLE FOR ANY DIRECT,     //
//  INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES      //
//  (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR      //
//  SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION)      //
//  HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT,     //
//  STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING   //
//  IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE      //
//  POSSIBILITY OF SUCH DAMAGE.                                             //
//////////////////////////////////////////////////////////////////////////////
function RayCast(){
	//Canvas size
	WIDTH=312; HEIGHT=205;
	//Player's coordinates
	X=1.5; Y=1.5;
	U=0; V=1;
	PLANEU=1; PLANEV=0;
	ANGLE=0;
	ROTATESPEED=.2; MOVESPEED=.2;
	WALLSCENE=[]; TEXTURES=[]; TELEPORTS=[];
	CANVAS=null;
	SKYFILL='rgb(0,0,0)'; GROUNDFILL='rgb(0,0,0)';
	SKYIMAGE = 0;
	COLLISION=0;
}
RayCast.prototype.generateScene = function(){
	CANVAS.fillStyle=SKYFILL;
	CANVAS.fillRect(0,0, WIDTH,HEIGHT>>1);
	CANVAS.fillStyle=GROUNDFILL;
	CANVAS.fillRect(0,HEIGHT>>1, WIDTH,HEIGHT);
	if(SKYIMAGE){
		CANVAS.drawImage(TEXTURES[SKYIMAGE], -ANGLE*WIDTH/(2*Math.PI),-20);
		CANVAS.drawImage(TEXTURES[SKYIMAGE], (2*Math.PI-ANGLE)*WIDTH/(2*Math.PI),-20);
	}

	//Player location
	var rayX=X, rayY=Y;
	//Ray length data
	var sideDistX, sideDistY;
	//Stepping data
	var stepX, stepY;
	var side, hit;

	for(var column=WIDTH, camerastep = 2/WIDTH; column>=0; column-=6){
		//Ray length
		var deltaDistX = Math.sqrt(1+((rayV=V+PLANEV*(cameraX = column*camerastep-1))*rayV)/((rayU=U+PLANEU*cameraX)*rayU));
		var deltaDistY = Math.sqrt(1+(rayU*rayU)/(rayV*rayV));

		//Find initial side dist
		stepX = stepY = -1;
		sideDistX = rayX-(mapX=X|0);
		sideDistY = rayY-(mapY=Y|0);

		if(rayU>=0){
			stepX = 1;
			sideDistX = 1-sideDistX;
		}
		if(rayV>=0){
			stepY = 1;
			sideDistY = 1-sideDistY;
		}
		sideDistX*=deltaDistX;
		sideDistY*=deltaDistY;

		//Step DDA
		do{
			if(sideDistX<sideDistY){
				sideDistX+=deltaDistX;
				mapX+=stepX;
				side=0;
			}else{
				sideDistY+=deltaDistY;
				mapY+=stepY;
				side=1;
			}
		}while(!(hit=WALLSCENE[mapX][mapY]));

		var drawStart = ((HEIGHT-(lineHeight=HEIGHT/((perpWallDist=(!side)?(mapX-rayX+(1-stepX)*.5)/rayU:(mapY-rayY+(1-stepY)*.5)/rayV)>>31?-perpWallDist:perpWallDist)))>>1)+(walkBounce=HEIGHT/(10*perpWallDist));
		var drawEnd = ((lineHeight+HEIGHT)>>1)-drawStart;
		var wallX = side?rayX+perpWallDist*rayU:rayY+perpWallDist*rayV;
		var texX = ((wallX-(wallX|0))*(texture=TEXTURES[WALLSCENE[mapX][mapY]]).width)|0;
		if((!side && rayU>0) || (side && rayV<0)) texX = texture.width-texX-1;
		CANVAS.drawImage(texture, texX,0, 1,texture.height, column,drawStart, 6,drawEnd);
	}
}
RayCast.prototype.loadScene = function(array){
	if(WALLSCENE = array.split(';')) for (i=WALLSCENE.length;--i>=0;) WALLSCENE[i] = WALLSCENE[i].split(',');
}
RayCast.prototype.moveForward = function(){
	COLLISION=1;
	if(!WALLSCENE[(X+U*MOVESPEED)|0][Y|0]){
		X+=U*MOVESPEED;
		COLLISION=0;
	}
	if(!WALLSCENE[X|0][(Y+V*MOVESPEED)|0]){
		Y+=V*MOVESPEED;
		COLLISION=0;
	}
}
RayCast.prototype.moveBackward = function(){
	COLLISION=1;
	if(!WALLSCENE[(X-U*MOVESPEED)|0][Y|0]){
		X-=U*MOVESPEED;
		COLLISION=0;
	}
	if(!WALLSCENE[X|0][(Y-V*MOVESPEED)|0]){
		Y-=V*MOVESPEED;
		COLLISION=0;
	}
}
RayCast.prototype.moveLeft = function(){
	COLLISION=1;
	if(!WALLSCENE[(X-V*MOVESPEED)|0][Y|0]){
		X-=V*MOVESPEED;
		COLLISION=0;
	}
	if(!WALLSCENE[X|0][(Y+U*MOVESPEED)|0]){
		Y+=U*MOVESPEED;
		COLLISION=0;
	}
}
RayCast.prototype.moveRight = function(){
	COLLISION=1;
	if(!WALLSCENE[(X+V*MOVESPEED)|0][Y|0]){
		X+=V*MOVESPEED;
		COLLISION=0;
	}
	if(!WALLSCENE[X|0][(Y-U*MOVESPEED)|0]){
		Y-=U*MOVESPEED;
		COLLISION=0;
	}
}

RayCast.prototype.checkTeleports = function(){
	for(tele=TELEPORTS.length;--tele>=0;){
		if(TELEPORTS[tele][0]==.5+(Y|0) && TELEPORTS[tele][1]==.5+(X|0)){
			if(TELEPORTS[tele][4]) document.location.href = TELEPORTS[tele][4];
			Y = TELEPORTS[tele][2];
			X = TELEPORTS[tele][3];
		}
	}
}
RayCast.prototype.isCollided = function(){ return COLLISION; }
RayCast.prototype.setAltitude = function(alt){ ALTITUDE=alt>=-5*HEIGHT?(alt<=5*HEIGHT?alt:5*HEIGHT):-5*HEIGHT; }
RayCast.prototype.setDirection = function(angle){
	U = Math.sin(ANGLE=angle*0.0174533);
	V = Math.cos(ANGLE);
	PLANEU = Math.sin(ANGLE+1.5707963);
	PLANEV = Math.cos(ANGLE+1.5707963);
}
RayCast.prototype.setGroundColor = function(r,g,b){ GROUNDFILL="rgb("+(r<0?0:(r>255?255:r|0))+","+(g<0?0:(g>255?255:g|0))+","+(b<0?0:(b>255?255:b|0))+")"; }
RayCast.prototype.setLocation = function(x,y){ X=y; Y=x; }
RayCast.prototype.setSize = function(w,h){ WIDTH=w; HEIGHT=h; }
RayCast.prototype.setSkyColor = function(r,g,b){ SKYFILL="rgb("+(r<0?0:(r>255?255:r|0))+","+(g<0?0:(g>255?255:g|0))+","+(b<0?0:(b>255?255:b|0))+")"; }
RayCast.prototype.setTeleports = function(teleports){ TELEPORTS=teleports; }
RayCast.prototype.setTextures = function(textures){ TEXTURES=textures; }
RayCast.prototype.setWalls = function(Walls){ WALLSCENE = Walls; }
RayCast.prototype.initialize = function(canvas){ CANVAS = canvas.getContext("2d"); }
RayCast.prototype.setSkyImage = function(img){ SKYIMAGE=img; }

RayCaster = new RayCast();