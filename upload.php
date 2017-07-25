<?php
$path = "uploads/"; 
 
$extArr = array("jpg", "png", "gif"); 
 echo "d";
if(isset($_POST) and $_SERVER['REQUEST_METHOD'] == "POST"){ 
    $name = $_FILES['photoimg']['name']; //图片文件名
    $size = $_FILES['photoimg']['size']; //图片文件大小
     
    if(empty($name)){   //如果文件为空
        echo '请选择要上传的图片'; 
        exit; 
    } 
    $ext = extend($name); 
    if(!in_array($ext,$extArr)){ //判断$extArr是否被存在$ext
        echo '图片格式错误！'; 
        exit; 
    } 
    if($size>(100*1024)){ 
        echo '图片大小不能超过100KB'; 
        exit; 
    } 
    $image_name = time().rand(100,999).".".$ext; 
    $tmp = $_FILES['photoimg']['tmp_name']; 
    if(move_uploaded_file($tmp, $path.$image_name)){ //如果文件合法，则将其移动为由 destination 指定的文件。第一个参数是上传的文件的文件名，第二个是移动文件到这个位置
        echo '<img src="'.$path.$image_name.'"  class="preview">';   //cs中应该要设置它
    }else{ 
        echo '上传出错了！'; 
    } 
    exit; 
} 
 
//获取文件类型后缀 
function extend($file_name){ 
    $extend = pathinfo($file_name);  //pathinfo()  返回一个关联数组包含有 path 的信息。返回关联数组还是字符串取决于 options。  返回文件的完整路径
    $extend = strtolower($extend["extension"]); //将字符串转化为小写  $extend["extension"]是文件名的后缀，如.doc
    return $extend; 
} 

?>














