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
//主界面
var left_warp = document.getElementById('left-warp');
var right_warp = document.getElementById('right-warp');
var down_warp = document.getElementById('down-warp');
var often = document.getElementById('often');
//渲染
var darwing = document.getElementById('drawing');
///beijing
var box = document.getElementById('box');
//锁屏
var lock_hold = document.getElementById('lock-hold');
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
			    		    for (var i=0;i<password_list.length;i++) {
				    			_span[i].className = '';
				    		}
				    		//密码不正确就清空数据，
				    		password_list = [];
				    		strr ='';
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
var scroll = new IScroll('.interface-left',{
	 hScroll:false, 
	 vScroll:false,
	 bounce:true
});
//锁屏
lock_hold.addEventListener('touchstart',function(){
	lock_screen.style.opacity = '1';
	lock_screen.style.display = 'block';	
},true);


//主界面渲染页
render();
function render(ele){
	
	data.forEach(function(ele){
		if(ele.type=='three'){
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
			often.appendChild(div);
		}
	})
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
}
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
//通过哈希去渲染内容		
window.onhashchange = function(){
	var hash = window.location.hash.split('=')[1];
	if(hash=='counter'){
		counter();
	}else if(hash=='claender'){
		kalendar();
	}else if(hash=='photo'){
		photo();
	}
};

//计算器
function counter(){
    darwing.style.display = 'block';
	var CounterStr='';
	var numresult;
	CounterStr = `
	    <div class="counter">
	        <span id = 'back'>返回</span>
			<input type="text" value="" class="num-num"/>
			<div class="counter-key">
				<a class = "del-num">AC</a>
				<a class = "key-num">.</a>
				<a class = "key-num">/</a>
				<a class = "key-num">7</a>
				<a class = "key-num">8</a>
				<a class = "key-num">9</a>
				<a class = "key-num">*</a>
				<a class = "key-num">4</a>
				<a class = "key-num">5</a>
				<a class = "key-num">6</a>
				<a class = "key-num">-</a>
				<a class = "key-num">1</a>
				<a class = "key-num">2</a>
				<a class = "key-num">3</a>
				<a class = "key-num">+</a>
				<a class = "key-num">0</a>
				<a class = "equal-num">=</a>
			</div>
		</div>
	`;
	darwing.innerHTML = CounterStr;
	var num_num = document.getElementsByClassName('num-num')[0];
	var del_num = document.getElementsByClassName('del-num')[0];
	var key_num = document.getElementsByClassName('key-num');
	var equal_num = document.getElementsByClassName('equal-num')[0];
	var back = document.getElementById('back');
	
	back.addEventListener('touchstart',function(){
		darwing.style.display = 'none';
	},true);
	for (var i=0;i<key_num.length;i++) {
		key_num[i].addEventListener('touchstart',function(){
			Countnum(this.innerHTML);	
		},true);
	}
	del_num.addEventListener('touchstart',function(){
		delnum();
	},true);
	equal_num.addEventListener('touchstart',function(){
		equalnum();
	},true)
	function Countnum(nums) { 
		num_num.value += num_num.innerHTML + nums; 
	};
	function delnum(){
		num_num.value = '';
	}
	function equalnum(){
		numresult = eval(num_num.value);
		num_num.value = numresult;
	}
};

//日历

function kalendar()	{
	darwing.style.display = 'block';
	var KalendarStr = '';
	KalendarStr = `
        <div class="kalendar">
			<div class="kalendar-back">
				<span class="back-back" id="back-back"><</span>
					<p class="back-year" id="back-year" >2017年--4月</p>
			</div>
			<div class="week">
				<span>一</span>
				<span>二</span>
				<span>三</span>
				<span>四</span>
				<span>五</span>
				<span>六</span>
				<span>日</span>
			</div>
			<div class="days" id="days"></div>
			<div class="cut">
				<span class="prev" id="prev"><上一月</span>
				<span class="next" id="next">下一月></span>
			</div>
		</div>
	`;
	drawing.innerHTML = KalendarStr;
	var back_back = document.getElementById('back-back');
	var back_year = document.getElementById('back-year');
	var days = document.getElementById('days');
	
	var prev = document.getElementById('prev');
	var next = document.getElementById('next');
	
	var date = new Date();
	var month = date.getMonth();
	var toDay = date.getDate();
	var len = 42;
	var num = month;
	
	time(month,toDay);
	back_back.addEventListener('touchstart',function(){
		darwing.style.display = 'none';
	},true);
	
	//下个月
	next.addEventListener('touchstart',function(){
		num++;
		if(num==month){
			time(month,toDay);
		}else{
			time(num);
		}
		fn(back_year);
	},true);
	//上个月
	prev.addEventListener('touchstart',function(){
		num--;
		if(num==month){
			time(month,toDay);
		}else{
			time(num);
		}
		fn(back_year);
	},true);

	function time(month,toDay){
		//填充上个月日期
		var date = new Date();
		date.setDate(1);
		console.log(date);
		date.setMonth(month);
		//回到上个月最后一天
		date.setDate(0);
		//上个月最后一天是周几
		var week = date.getDay();
		//上个月最后一天是几号
		var day = date.getDate();
		
		var TimeStr = '';
		//生成上个月
		for(var i=1;i<=week;i++){
			TimeStr +='<span class="old">'+(day-week+i)+'</span>';
		}
		
		//生成当月
		var now = new Date();
		//设置到当月的一号，防止日子超出，累计到月。
		now.setDate(1);
		now.setMonth(month);
		//设置到下一个月
		now.setMonth(now.getMonth()+1);
		//回到本月最后一天
		now.setDate(0);
		//获取本月最后一天是几号
		var nowDate  = now.getDate();
		//生成本月时间
		for(var i=1;i<=nowDate;i++){
			TimeStr+='<span>'+i+'</span>';
		}
		//下个月
		for(var i=1;i<=len-nowDate-week;i++){
			TimeStr+='<span class="old">'+i+'</span>';
		}
		
		days.innerHTML = TimeStr;
		
		var spans = days.getElementsByTagName('span');
		
		if(toDay){
			spans[toDay+week-1].className = 'active';
		}
	};
	function fn(obj){
		var date = new Date();
		date.setDate(1);
		date.setMonth(num);
		obj.innerHTML = date.getFullYear()+'年--'+(date.getMonth()+1)+'月';
	};
}
//照片
function photo(){
	darwing.style.display = 'block';
	var PhotoStr = '';
	PhotoStr = `
	    <div class="photo" id="photo">
			<p class="photo-top">
				<span class="photo-back"><</span>
				<span class="screen-bg">屏保背景</span>
				<span class="interface-bg">界面背景</span>
			</p>
			<div class="photo-img" id="photo-img">
			</div>
		</div>
	   `;
	   darwing.innerHTML = PhotoStr;
	   var photo = document.getElementById('photo');
	   var photo_img = document.getElementById('photo-img');
	   var photo_back = document.getElementsByClassName('photo-back')[0];
	   var screen_bg = document.getElementsByClassName('screen-bg')[0];
	   var interface_bg = document.getElementsByClassName('interface-bg')[0];
	   var photo_span = photo_img.getElementsByTagName('span');
	   images.forEach(function(ele){
	   	    var span = document.createElement('span')
	   	    var img = document.createElement('img');
	   	    img.src = ele.src;
	   	    var divs = document.createElement('div');
	   	    
	   	    divs.appendChild(span);
	   	    divs.appendChild(img);
	   	    photo_img.appendChild(divs);
	   	    
	   	    span.onOff = false;
	   	    
	   	    span.addEventListener('touchstart',function(){
			   	if(!this.onOff){
			   		this.onOff = true;
			   		this.className = 'span_true';
			   	}else{
			   		this.onOff = false;
			   		this.className = '';
			   	}
		    },true);
	   });
	    screen_bg.addEventListener('touchstart',function(){
	    	for (var i=0;i<photo_span.length;i++) {
	    		if(photo_span[i].className=='span_true'){
	    			photo_span[i].className = '';
	    			lock_screen.style.backgroundImage = 'url('+images[i].src+')';
	    		}
	    	}
	    },true);
	    interface_bg.addEventListener('touchstart',function(){
	    	for (var i=0;i<photo_span.length;i++) {
	    		if(photo_span[i].className=='span_true'){
	    			photo_span[i].className = '';
	    			box.style.backgroundImage = 'url('+images[i].src+')';
	    		}
	    	}
	    },true)
	    photo_back.addEventListener('touchstart',function(){
	   	    darwing.style.display = 'none';
	    },true);

}