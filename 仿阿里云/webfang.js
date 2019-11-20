var h1_li=document.getElementsByClassName('h-1')[0].getElementsByTagName('li');
var h2_int=document.getElementsByClassName('int')[0].getElementsByTagName('div');
var h3_li=document.getElementsByClassName('h-3')[0].getElementsByTagName('li');
var head=document.getElementsByTagName('header')[0];
var sec=document.getElementById('sec');
var l_li=document.getElementsByClassName('leftmenue')[0].getElementsByTagName('li');
var button=document.getElementById('buttons').getElementsByTagName('span');
var img=document.getElementById('img-list');
var c_img=document.getElementsByClassName('c-img')[0];
var a_left=document.getElementById('a-left');
var a_right=document.getElementById('a-right');
var topback=document.getElementById('topback');
//首部input切换
function headInt_c(){
    for(var i=0;i<h1_li.length;i++){
        h1_li[i].index=i;
        h1_li[i].onclick=function(){
            for(var i=0;i<h1_li.length;i++){
                h1_li[i].className='';
            }
            this.className='one';
            for(var j=0;j<h2_int.length;j++){
                h2_int[j].className='hidden';
            }
            h2_int[this.index].className='show'; 
        }
    }
}
//首部二级导航菜单
function H_menu(){
    for(var i=0;i<h3_li.length;i++){
        h3_li[i]=i;
        h3_li[i].onmouseover=function(){
            this.className='lihover';
            var head_H=head.offsetHeight;
            var H=document.documentElement.clientHeight||document.body.clientHeight;
            //固定首部二级导航菜单位置
            var secLeft=sec.offsetLeft;
            this.getElementsByClassName('submenu')[0].style.left=secLeft+'px';
            this.getElementsByClassName('submenu')[0].style.height=(H-head_H)+'px';
        }
        h3_li[i].onmouseout=function(){
            this.className='';
        }
    }
}

//轮播图
var index=1;
var animated=false;
var timer;
function showButton(){
    for(var i=0;i<button.length;i++){
        button[i].className='';
    }
    button[index-1].className='on';
}
//图片移动&&动画
function change(value){
    animated=true;
    var time=300;//总时间
    var interval=30;//时间间隔
    var speed=value/(time/interval);//每次位移距离
    var newleft=parseInt(img.style.left)+value;//总距离
    function animation(){
        if(speed<0&&parseInt(img.style.left)>newleft||speed>0&&parseInt(img.style.left)<newleft){
            img.style.left=parseInt(img.style.left)+speed+'px';
            setTimeout(animation,interval);
        }else{
            animated=false;
            img.style.left=newleft+'px';
            if(newleft<-4550){
                img.style.left=-910+'px';
            }else if(newleft>-910){
                img.style.left=-4550+'px';
            }
        }
    }
    animation();
}
function play(){
    timer=setInterval(function(){
        a_right.onclick();
    },3000)
}
function stop(){
    clearInterval(timer);
}
// *************************************************
window.onload=function(){
    headInt_c();
    H_menu();
    //轮播图
    //向左切换
    a_left.onclick=function(){
        
        
        if(animated==false){
            if(index==1){
                index=5;
            }else{
                index--;
            }
            showButton();
            change(910);
        }
    }
    //向右切换
    a_right.onclick=function(){
        
       
        if(animated==false){
            if(index==5){
                index=1;
            }else{
                index++;
            }
        showButton();
        change(-910);
        }
    }
    for(var i=0;i<button.length;i++){
        button[i].onclick=function(){
            if(this.className=='on'){
                return;
            }
            var myindex=parseInt(this.getAttribute('index'));
            var value=(-910)*(myindex-index);
            index=myindex;
            change(value);
            showButton();
        }
    }
    c_img.onmouseout=play;
    c_img.onmouseover=stop;
//返回头顶功能悬浮窗
var timertop;
topback.onclick=function(){
    var speed=0;//速度
    var src_H=0;//距离顶部距离
    timertop=setInterval(function(){
        src_H=document.body.scrollTop||document.documentElement.scrollTop;
        speed=Math.ceil(-src_H/2);//速度越来越慢,必须向上取值，不然最后会一直是-1
        document.body.scrollTop = document.documentElement.scrollTop-=(speed+src_H);
        if (speed===0){
            clearInterval(timertop);
        }
    },30);
}
document.onscroll=function(){
    var src_H=document.body.scrollTop||document.documentElement.scrollTop;
    if(src_H<=0){
        topback.style.display='none';
    }else{
        topback.style.display='block';
    }
}
}