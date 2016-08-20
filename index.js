var contianer = document.getElementById('contianer');
var list = document.getElementById('list');
var pre = document.getElementById('pre');
var next = document.getElementById('next');
var span = document.getElementById('circle').getElementsByTagName('span');
var spanlength = span.length;//底部小圆点的个数
var len = 5;//用户看到的轮播图片的数量
var index = 1;//当前显示第index张轮播图片
var timer;//定时器标识
var anmitated = false;//表示是否处于动画的过程中。
//点击切换下一张
next.onclick = function(event){
	var event = event||window.event;
	event.preventDefault();
	if(anmitated){
		return;
	}
	anmitate(-600);
	index++;
	showBtn();
};
//点击切换上一张
pre.onclick = function(event){
	var event = event||window.event;
	event.preventDefault();
	if(anmitated){
		return;
	}
	anmitate(600);
	index--;
	showBtn();
};
for(var j = 0;j<spanlength;j++){
	//点击底部圆点
	span[j].onclick = function(){
		if(anmitated){
			return;
		}
		var nextIndex = this.getAttribute('index');
		var imgWidth = 600;
		anmitate(-(nextIndex-index)*imgWidth);//图片的宽度为600
		index = nextIndex;
		showBtn();
	};
}
//切换底部小圆点
function showBtn(){
	for(var i = 0;i<spanlength;i++){
		span[i].className = '';
	}
	if(index > spanlength){
		index = 1;
	}
	if(index < 1){
		index = spanlength;
	}
	span[index - 1].className = ' on';
}
//执行动画的函数
function anmitate(offset){
	anmitated  = true;
	var newLeft = parseInt(list.style.left) + offset;
	var whiloTime = 300;//完成一张图片的切换需要的时间
	var inverTime = 10;//间隔时间
	var offSpeed = offset/(whiloTime/inverTime);
	var go = function(){
		if(offSpeed < 0&&parseInt(list.style.left) > newLeft ||offSpeed > 0&&parseInt(list.style.left) < newLeft){
			list.style.left = parseInt(list.style.left) + offSpeed +'px';
			setTimeout(go,inverTime);
		}else{
			list.style.left = newLeft + 'px';
			//第一张图片和倒数第二张图片是同一张图片，
			//第二张图片和最后一张图片是同一张图片，一共有7张图片
			//但是只想让用户认为只有5张图片，所以len==5.
			//当进入页面时要显示列表中的第二张图片；
			if(newLeft > -600){
			list.style.left = -600 * len + 'px';
			}
			if(newLeft < -3000){
				list.style.left = -600 +'px';
				}
				anmitated = false;
			}
	};
	go();
	
}
function play(){
	timer = setTimeout(function(){
		anmitate(-600);
		index++;
		showBtn();
		play();
	},3000);
}
function stop(){
	clearTimeout(timer);
}
//自动切换
play();
contianer.onmouseout = play;
contianer.onmouseover = stop;