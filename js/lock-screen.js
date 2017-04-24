//时间
var lock_time = document.getElementById('lock-time');
var time_h = lock_time.getElementsByTagName('span')[0];
var time_week = lock_time.getElementsByTagName('h5')[0];
var time_year = lock_time.getElementsByTagName('h6')[0];
var time_top = document.getElementById('time-top');
var time_down = document.getElementById('time-down');
//密码，按键
var proving = document.getElementById('proving');
var _span = proving.getElementsByTagName('span');
var proving_num = document.getElementById('num');
var _spans = proving_num.getElementsByTagName('span');
var lock_screen = document.getElementById('lock-screen');

//时间
var time_arr = ['天','一','二','三','四','五','六'];
var year_arr= ['申猴','酉鸡','戌狗','亥猪','子鼠','丑牛','寅虎','卯兔','辰龙','巳蛇','午马','未羊'];
var mon_arr = ['一','二','三','四','五','六','七','八','九','十','十一','十二','十三','十四','十五','十六','十七','十八','十九','二十','廿一','廿二','廿三','廿四','廿五','廿六','廿七','廿八','廿九','三十'];
setInterval(time, 1000);
time();
function time(){
	var date = new Date();
	var year = date.getFullYear();
	var mon = date.getMonth()+1;
	var d = date.getDate();
	var h = date.getHours();
	var min = date.getMinutes();
	var week = date.getDay();
	time_h.innerHTML = z(h)+':'+z(min);
	time_week.innerHTML = mon+'月'+d+'日'+' 礼拜'+time_arr[week];
	time_year.innerHTML = year_arr[year%12]+'年'+mon_arr[mon-1]+'月'+zz(mon_arr[d-1]);	
	time_top.innerHTML = mon+'月'+d+'日'+' 礼拜'+time_arr[week];
	time_down.innerHTML = year_arr[year%12]+'年'+mon_arr[mon-1]+'月'+zz(mon_arr[d-1]);
}
function z(n){
	return n<10?'0'+n:''+n;
}
function zz(n){
	return n<10?'初'+n:''+n;
}

//密码，按键
var str = '123456';
var password_list =[];
var strr = '';
for (var i=0;i<_spans.length;i++) {
	_spans[i].addEventListener('touchstart',function(){
		this.className = 'num-list';
		//每次按下的时候更新密码字符串和数组
		password_list.push(this.innerHTML);
		strr+=this.innerHTML;	
    	for (var j=0;j<password_list.length;j++) {
    		//根据数组的长度渲染密码显示框的
    		if(password_list.length<7){
    			_span[j].className = 'prov-list';
    			if(password_list.length==6){
    				setTimeout(function(){
    					if(strr==str){
			    		    lock_screen.style.opacity = '0';
			    		    lock_screen.style.display = 'none';
				    	}else{
				    		for (var i=0;i<password_list.length;i++) {
				    			_span[i].className = '';
				    		}
				    		//密码不正确就清空数据，
				    		password_list = [];
				    		strr ='';
				    	}	
    				},300)
    			}
    		}
    	}
	},true)
	_spans[i].addEventListener('touchend',function(){
		this.className = '';
	},true)
}
//左边滚动
//var scroll = new IScroll('.interface-left',{
//	 hScroll:false, 
//	 vScroll:false,
//	 bounce:false
//});

var left_warp = document.getElementById('left-warp');
var right_warp = document.getElementById('right-warp');
var down_warp = document.getElementById('down-warp');
//渲染页面
data.forEach(function(ele){
	if(ele.type=='one'){
		var img = document.createElement('img');
		img.src = ele.img;
		var aaa = document.createElement('a');
		aaa.href = '#page='+ele.hash+'';
		var ppp = document.createElement('p');
		ppp.innerHTML = ele.name		;
		var div = document.createElement('div');
		
		aaa.appendChild(img);
		div.appendChild(aaa);
		div.appendChild(ppp);
		left_warp.appendChild(div);
	}else if(ele.type=='two'){
		var img = document.createElement('img');
		img.src = ele.img;
		var aaa = document.createElement('a');
		aaa.href = '#page='+ele.hash+'';
		var ppp = document.createElement('p');
		ppp.innerHTML = ele.name;
		var div = document.createElement('div');
		
		aaa.appendChild(img);
		div.appendChild(aaa);
		div.appendChild(ppp);
		right_warp.appendChild(div);
	}else{
		var img = document.createElement('img');
		img.src = ele.img;
		var aaa = document.createElement('a');
		aaa.href = '#page='+ele.hash+'';
		var ppp = document.createElement('p');
		ppp.innerHTML = ele.name;
		var div = document.createElement('div');
		
		aaa.appendChild(img);
		div.appendChild(aaa);
		div.appendChild(ppp);
		down_warp.appendChild(div);
	}
});
///左滑右滑
var $interface = $('.interface', '.box').eq(0);
var threshold = 100;
var VIEWPORTWIDTH = $(window).width();
var n = 1;

$interface.on('touchstart', function(ev) {
	console.log(n);
	$(this).off('touchend');
	var oldX = ev.originalEvent.changedTouches[0].clientX;
	$(this).stop(false, true);
	$(this).on('touchend', function(ev) {
		var newX = ev.originalEvent.changedTouches[0].clientX;
		// 向左滑动
		if (newX - oldX > threshold) {
			console.log('left');
			if (n <= 0) {
				n = 0;
				return;
			}
			$(this).animate({
				left: '+='+VIEWPORTWIDTH
			}, {
				duration: 'fast',
				complete: function() {
					n--;
				}
			});
		} else if (newX - oldX < -threshold) {
		// 向右滑动
			console.log('right');
			if (n >= 2) {
				n = 2;
				return;
			}
			$(this).animate({
				left: '-='+VIEWPORTWIDTH
			}, {
				duration: 'fast',
				complete: function() {
					n++;
				}
			});
		}
		
	});
});
