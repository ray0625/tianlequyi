$(function (){
	var body_minw = window.screen.width - 25;
	$('body').css('min-width', body_minw + 'px');
	
	/*var navi_length = 0;
	for (var i = 0; i < $('.navi_outer p').length; i++) {
		navi_length += $('.navi_outer p').eq(i).width();
	};
	var naviRight = window.screen.width - navi_length - 55;
	$('.navi_outer p').css('marginRight', naviRight/9 + 'px');
	$('.navi_outer .navi_first').css('marginLeft', naviRight/9 + 'px');*/
	
	/**********************顶部舞台效果********************/
	var stagei = 100, screentimer = null, lhimg_num = 0, screenswftime = null;
	stagetime = setInterval(function(){
		stagei--;
		$('.screen_left').css('left',stagei + 'px');
		$('.screen_right').css('right',stagei + 'px');
		if (stagei == -280) {
			clearInterval(stagetime);
		};
	},10);
	function autoMove(){
		screentimer = setInterval(function (){
			lhimg_num++;
			if (lhimg_num >= $('.changecon img').length) {
				lhimg_num = 0;
			};
			$('.changecon li').eq(lhimg_num).fadeIn().siblings().hide();
		},3000);
	}
	screenswftime = setTimeout(autoMove,2800);

	/**********************大图滚动效果********************/
	var imgW = $('.scroll_cont img').width() + parseInt($('.scroll_cont img').css('marginRight'));
	var anm = true, gdimg_num = 0, rollertimer1 = null;

	$('.scroll_right').click(function (){
		clearInterval(rollertimer1);
		if (anm) {
			anm = false;
			gdimg_num--;
			if (gdimg_num < 0) {
				gdimg_num = $('.scroll_cont img').length/2-1;
				$('.scroll_outer').scrollLeft(imgW * (gdimg_num + 1));
			};
			move();
		};
		gdautoMove();
	});

	$('.scroll_left').click(function (){
		clearInterval(rollertimer1);
		if (anm) {
			anm = false;
			gdimg_num++;
			if (gdimg_num >= $('.scroll_cont img').length/2+1) {
				gdimg_num = 1;
				$('.scroll_outer').scrollLeft(0);
			};
			move();
		};
		gdautoMove();
	});

	function gdautoMove(){
		clearInterval(rollertimer1);
		rollertimer1 = setInterval(function (){
			gdimg_num++;
			if ($('.scroll_outer').scrollLeft() >= imgW*4) {
				gdimg_num = 1;
				$('.scroll_outer').scrollLeft(0);
			};
			move();
		},2000)
	}
	gdautoMove();//进入页面执行

	function move(){
		$('.scroll_outer').stop().animate({scrollLeft:imgW*gdimg_num},function (){
			anm = true;
		});
	}

	$('.scroll_outer').hover(function(){
		clearInterval(rollertimer1);
	},function(){
		gdautoMove();
	})


	/**********************新闻动态中间大图滚动效果********************/
	var newsCenterImgW=$('.con img').width();
	var x=1;
	var newsCenterAnm=true;
	var n=0;
	var timer1=null;
	
	$('#out').scrollLeft(newsCenterImgW);//初始位置

	var fir=$('.con img:first').clone();
	var las=$('.con img:last').clone();
	$('.con').append(fir);
	$('.con').prepend(las);

	$('.left').click(function (){
		clearInterval(timer1);
		if (newsCenterAnm) {
			newsCenterAnm=false;
			x--;
			if (x<0) {
				x=$('.con img').length-3;
				$('#out').scrollLeft(newsCenterImgW*(x+1));
			};
			n--;
			if (n<0) {
				n=$('.nav li').length-1;
			};
			newsCenterMove();
		};
		newsCenterAutoMove();
	});

	$('.right').click(function (){
		clearInterval(timer1);
		if (newsCenterAnm) {
			newsCenterAnm=false;
			x++;
			if (x>=$('.con img').length) {
				x=2;
				$('#out').scrollLeft(newsCenterImgW);
			};
			n++;
			if (n>=$('.nav li').length) {
				n=0;
			};
			newsCenterMove();
		};
		newsCenterAutoMove();
	});

	$('.nav li').click(function (){
		clearInterval(timer1);
		n=$('.nav li').index(this);
		x=n+1;
		newsCenterMove();
		newsCenterAutoMove();
	})

	$('#out').hover(function(){
		$('.right').show();
		$('.left').show();
	},function(){
		$('.right').hide();
		$('.left').hide();
	})

	function newsCenterAutoMove(){
		timer1=setInterval(function (){
			x++;
			if (x>=$('.con img').length) {
				x=2;
				$('#out').scrollLeft(newsCenterImgW);
			};
			n++;
			if (n>=$('.nav li').length) {
				n=0;
			};
			newsCenterMove();
		},2000)
	}
	newsCenterAutoMove();//进入页面执行

	function newsCenterMove(){
		$('.nav li').eq(n).addClass('select').siblings().removeClass('select');
		$('.news_center_content p').eq(n).addClass('selectp').siblings().removeClass('selectp');
		$('#out').stop().animate({scrollLeft:newsCenterImgW*x},function (){
			newsCenterAnm=true;
		});
	}
})