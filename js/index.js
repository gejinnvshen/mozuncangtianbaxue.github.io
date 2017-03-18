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


	//个人中心
	$('#personal .member').hover(function(){
		//alert('de')
		$('#personal .person').show();
		$('#personal .person li').eq(0).click(function(){
			$('#blog').show();
		})
	},function(){
		$('#personal .person').hide();
	})

	$('#blog h2 img').click(function(){
		$('#blog').hide();
	})
	//注册
	$('#personal .reg').click(function(){
		$('#zhuce').show();
	})
	$('#zhuce h2 img').click(function(){
		$('#zhuce').hide();
	})

	//登录
	$('#personal .login').click(function(){
		$('#login').show();
	})
	$('#login h2 img').click(function(){
		$('#login').hide();
	})

	

	//发表博文
	$('#')
	$('#blog .submit').click(function(){
	
		$.ajax({
			type:'post',
			url:'add_blog.php',
			data:$('form').serialize(),
			success:function(data){
				$.ajax({
					type:'post',
					url:'get_blog.php',
					data:{},
					success:function(data){
						var json = JSON.parse(data);
						//alert(json[0].content);
						for(var i=0;i<json.length;i++){
							$('#main .content h3').eq(i).html(function(){
								return json[i].title;
							});
							$('#main .content p').eq(i).html(function(){
								return json[i].content;
							});				
						}
					},
					async:true
				});
			},
			async:true
		});
		
		

	})
	//获取博文.这个ajax要写在click方法外，否则刷新一下页面的内容消失
	$.ajax({
		type:'post',
		url:'get_blog.php',
		data:{},
		success:function(data){
			var json = JSON.parse(data);
			//alert(json[0].title);
			for(var i=0;i<json.length;i++){
				$('#main .content h3').eq(i).html(function(){
					return json[i].title;
				});
				$('#main .content p').eq(i).html(function(){
					return json[i].content;
				});
			}
			
		},
		async:true
	});


})



















