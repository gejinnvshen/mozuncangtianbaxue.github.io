$(document).ready(function(){

	//轮播器初始化
	$('.left-inner img').hide();
	$('.left-inner img').eq(0).show();
	$('.left-inner img').css('opacity','0');
	$('.left-inner img').eq(0).css('opacity','100');

	//手动轮播器
	$('.panagation img').click(function(){
		var num=$('.panagation img').index(this);    
		$('.left-inner a img').hide();
		$('.left-inner a img').eq(num).show().css('opacity','100');

		//var img=$(this).attr('src');
		//alert(img);
		//$('.left-inner img').attr('src','img'); 
	});
	//自动轮播
	var banner_index=1;   //轮播器计数器
	setInterval(banner_fn,4000);
	function banner_fn(){
		var prev=banner_index==0 ? $('.left-inner img').length-1:banner_index-1;   //获取元素的前一个位置
		
		if(banner_index>=$('.left-inner a img').length) banner_index=0;
		$('.left-inner img').hide();
		$('.left-inner img').eq(prev).show().animate({opacity:'0'},4000).css('z-index',1);
		$('.left-inner img').eq(banner_index).show().animate({opacity:'100'},4000).css('z-index',2);

		$('.left-inner img').css('opacity','0');
		
		banner_index++;
	}

})



















