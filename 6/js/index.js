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

	//登录    登录框居中
	$('#personal .login').click(function(){
		$('#login').show();
		//$('#login').css("style", "position:fixed;top:20px;left:50px;z-index:1;");
		$('#login').css('left','450px');//弹出框居中
		$('#login').css('top','100px');
	})
	$('#login h2 img').click(function(){
		$('#login').hide();
	})

	//拖拽
	$('#blog').draggable();
	$('#zhuce').draggable();
	$('#login').draggable();

	//返回顶部
	$('#top').goToTop();

  	$(document).scroll(function(){
		var a=$(document).scrollTop();//花了我好长时间，一直在纠结某个元素到顶部的距离，可是距离好像不变。最右边滚动条到顶部的距离
		if(a==0){
  			$('#top').hide();
		}else{
			$('#top').show();
		}
  	});
  		
	//做一个自动计数的东西
	//点击上传图片，调用电脑的文件夹
	//在右边做一个分类的东西

	//发表博文
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
				$("#blog").hide();

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
			};

		},
		async:true
	});

	//展开收缩
	//$("#main .main-right .zhan").click(function(){
	//	$("#main .main-right .zhan li").toggle();
	//})

	//点击次数
	var count=0;
	$('.tuijian li a').eq(0).click(function(){
		count=count+1;
		$('.tuijian li span')[0].innerHTML="点击次数:"+count;
	});

	$(document).scroll(function(){
		var scrollTop=$(document).scrollTop();//花了我好长时间，一直在纠结某个元素到顶部的距离，可是距离好像不变。最右边滚动条到顶部的距离
		//var b=$('#nav').height();
		//var top=$("#nav").offset().top; //元素到顶部的距离 167px
		//alert(top);
		//alert(a);
		if(scrollTop>167){  //167改为top会出现闪屏的现象
			$("#nav").attr("style", "position:fixed;top:-5px;left:175px;z-index:3;");
			//alert('de');
		}else{
			//alert('de');
			$("#nav").attr("style", "position:relative;top:0;left:0;z-index:3;");

		}
		
  	});

 	//获取地理位置
    $.getScript('http://int.dpool.sina.com.cn/iplookup/iplookup.php?format=js', function(_result) {
        if (remote_ip_info.ret == '1') {  
            //alert('国家：' + remote_ip_info.country +'\n'+'省：' + remote_ip_info.province + '\n市：' + remote_ip_info.city + '\n区：' + remote_ip_info.district + '<BR>ISP：' + remote_ip_info.isp + '<BR>类型：' + remote_ip_info.type + '<BR>其他：' + remote_ip_info.desc);
        } else {
            //alert('没有找到匹配的IP地址信息！');
        }
    });

    //后台管理之发文
	$('#main .submit').click(function(){
	
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
				//$("#blog").hide();

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
			};

		},
		async:true
	});    

	//后台管理之上传图片
	//http://jingyan.baidu.com/article/2009576192663bcb0721b49e.html
	$('#photoimg').change(function(){ //再添加onchange事件，这个当用户选择一个或多个图片后点击打开时，会触发这个事件，我们就是要在这个事件上调用异步方法上传数据到服务器，并做相应的代码处理；
		//ajaxFileUpload();
		var status = $("#up_status");  
        var btn = $("#up_btn");  
        $("#imageform").ajaxForm({  
            target: '#preview',   
            beforeSubmit:function(){  
                status.show();  
                alert('de');
                btn.hide();  
            },   
            success:function(){  
                status.hide();  
                btn.show();  
            },   
            error:function(){  
                status.hide();  
                btn.show();  
        } }).submit(); 
	})
	/*function ajaxFileUpload(){
		//alert('de');
		$.ajaxFileUpload({
			url:"upload.php",
			secureurl:false,
			fileElementId:'photoimg',
			success:function(data){
				var str=$(data).find("body").text();
				alert(str);
			}
		})
	}*/

    //分类管理怎么写


    //密码登录/退出后台/密码修改

    //留言板的内容显示，后台能修改


    //博客内的搜索功能如何实现
})

//一个EMLOG免费个人网站管理后台模板




