$(document).ready(function(){

	//�ֲ�����ʼ��
	$('.left-inner img').hide();
	$('.left-inner img').eq(0).show();
	$('.left-inner img').css('opacity','0');
	$('.left-inner img').eq(0).css('opacity','100');

	//�ֶ��ֲ���
	$('.panagation img').click(function(){
		var num=$('.panagation img').index(this);    
		$('.left-inner a img').hide();
		$('.left-inner a img').eq(num).show().css('opacity','100');

		//var img=$(this).attr('src');
		//alert(img);
		//$('.left-inner img').attr('src','img'); 
	});
	//�Զ��ֲ�
	var banner_index=1;   //�ֲ���������
	setInterval(banner_fn,4000);
	function banner_fn(){
		var prev=banner_index==0 ? $('.left-inner img').length-1:banner_index-1;   //��ȡԪ�ص�ǰһ��λ��
		
		if(banner_index>=$('.left-inner a img').length) banner_index=0;
		$('.left-inner img').hide();
		$('.left-inner img').eq(prev).show().animate({opacity:'0'},4000).css('z-index',1);
		$('.left-inner img').eq(banner_index).show().animate({opacity:'100'},4000).css('z-index',2);

		$('.left-inner img').css('opacity','0');
		
		banner_index++;
	}


	//��������
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
	//ע��
	$('#personal .reg').click(function(){
		$('#zhuce').show();
	})
	$('#zhuce h2 img').click(function(){
		$('#zhuce').hide();
	})

	//��¼
	$('#personal .login').click(function(){
		$('#login').show();
	})
	$('#login h2 img').click(function(){
		$('#login').hide();
	})

	

	//������
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
	//��ȡ����.���ajaxҪд��click�����⣬����ˢ��һ��ҳ���������ʧ
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



















