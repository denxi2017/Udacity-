//禁止浏览器滚动条出现，避免在整个游戏未显示完全情况下操作键盘上下左右键出现滚动的情况！
document.body.style.overflow='hidden';
//定义创建积分函数
function createScore(){                  
		var oS=document.createElement("div");
		oS.id="score";
		oS.innerHTML="积分:<span>0</span>----关卡：<span>1</span>";
		oS.style.fontSize=25+"px";
		oS.style.marginTop=50+"px";
		document.body.appendChild(oS);
};
createScore();   //调用创建积分
//保存角色在数组中
var roles=['images/char-boy.png',        
   'images/char-cat-girl.png',
   'images/char-horn-girl.png',
   'images/char-pink-girl.png',
   'images/char-princess-girl.png'];
//每次游戏，角色随机选择  
var rolesNum=Math.floor(Math.random()*5+0);
//定义创建游戏时间函数
function creatTime(){
	var time=document.createElement("div");
	time.id="setTime";
	time.innerHTML='当前关卡剩时：<span id="dd">20</span>秒';
	document.getElementById('score').appendChild(time);
}
creatTime();//调用创建游戏时间
//创建时间秒倒计时函数
function run(){
    var s = document.getElementById("dd");
    if(s.innerHTML == 0){
        resetGame();
    };
    s.innerHTML = s.innerHTML * 1 - 1;
};
setInterval(run, 1000);   //调用秒倒计时
//定义难度系数，控制敌人速度
var level=1;   
//积分初始化
var jf=0;	
//关卡初始化
var gk=1;   
// 这是我们的玩家要躲避的敌人
var Enemy = function(x,y) {
// 要应用到每个敌人的实例的变量写在这里
this.x=x;
this.y=y; 
this.speed=Math.floor(Math.random()*100+100)*level;
// 加载敌人
this.sprite = 'images/enemy-bug.png';
};
// 此为游戏必须的函数，用来更新敌人的位置，参数: dt ，表示时间间隙
Enemy.prototype.update = function(dt) {
 // 你应该给每一次的移动都乘以 dt 参数，以此来保证游戏在所有的电脑上都是以同样的速度运行的
    this.x+=this.speed*dt;
	if(this.x>510){
	this.x=0;
	};
};
// 此为游戏必须的函数，用来在屏幕上画出敌人
Enemy.prototype.render = function() {    
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};
// 现在实现你自己的玩家类
var Player=function(x,y){     
	this.x=x;
	this.y=y;
	this.sprite = roles[rolesNum]||'images/char-boy.png';
};
// 这个类需要一个 update() 函数， render() 函数和一个 handleInput()函数
Player.prototype.update=function(){
 	if(this.x>=400){     //检测玩家右移到边界处，调整x使保持不动
 		this.x=400;
 	};
 	if(this.x<0){		//检测玩家左移到边界处，调整x使保持不动
 		this.x=0;
 	};
 	if(this.y>=400){	//检测玩家下移到边界处，调整x使保持不动
 		this.y=400;
 	};
};
//渲染角色
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};
//用方向键控制角色移动
Player.prototype.handleInput=function(keyNum){
	switch(keyNum){
		case 'left':
			this.x-=40;
			break;
		case 'up':
			this.y-=40;
			break;
		case 'right':
			this.x+=40;
			break;
		case 'down':
			this.y+=40;
			break;
		default:
			this.x=this.x;
	};
};
// 现在实例化你的所有对象，把所有敌人的对象都放进一个叫 allEnemies 的数组里面
var e1=new Enemy(0,65),
	e2=new Enemy(0,145),
	e3=new Enemy(0,230),
	allEnemies=[e1,e2,e3];
// 把玩家对象放进一个叫 player 的变量里面
var player=new Player(200,400);
// 这段代码监听游戏玩家的键盘点击事件并且代表将按键的关键数字送到 Play.handleInput()方法里面。你不需要再更改这段代码了。
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };
    player.handleInput(allowedKeys[e.keyCode]);
});
//碰撞检测
function collide(){     
	if(player.y<=60){   //到达水池，游戏胜利
		player.x=200;
		player.y=400;
		jf+=10;         //积分+10
		gk++;			//关卡+1
		level+=0.2;     //难度提升
	for (var i=0;i<allEnemies.length;i++) {       //每个敌人速度整体增加，增加量随机
		allEnemies[i].speed=Math.floor(Math.random()*100+50)*level;
	};	
	var oJ=document.getElementById('score');
	oJ.innerHTML="积分:<span>"+jf+"</span>----关卡：<span>"+gk+"</span>";
	creatTime();
	}else{            //和敌人碰撞
		for(var i=0;i<allEnemies.length;i++){
		var distanceX=Math.abs(player.x-allEnemies[i].x),
			distanceY=Math.abs(player.y-allEnemies[i].y);
		if(distanceX<=70 && distanceY<=60){    //碰撞主要用两者交叉的算法，这里取的70、60是根据实际调整的数字
			resetGame();
			};	
		};	
	};
};
//定义重置游戏函数
function resetGame(){
	alert("游戏结束！单击确定重新再来！");
    window.location.href=window.location.href;
};
//时刻检测碰撞
setInterval(collide,100);



