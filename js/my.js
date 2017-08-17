/**
 * Created by 丁宇 on 2017/8/16.
 */
window.onload=function(){
    //var timer=null;
    //var test=document.getElementById("test");
    //test.onclick=function(){
    //    var json1={"left":300,"top":200,"height":200,"width":200,"opacity":30,"z-index":1};
    //    animate(test, json1);
    //}
    var ol=document.getElementById("ol");
    var olLi=ol.children;
    var ul=document.getElementById("main");
    var ulLi=ul.children;
    var height=ulLi[0].offsetHeight;


    var color=["blue","green","red","pink","yellow","blue"];
    ////利用数组给li上色
    //    for(var i=0;i<ulLi.length;i++){
    //        var color=["blue","green","red","pink","yellow"];
    //        ulLi[i].style.background = color[i];
    //        }

       //楼层跳跃
        for(var i=0;i<olLi.length;i++){
            olLi[i].index = i;
                olLi[i].onclick=function(){
                    //排他思想
                    //点击的li高亮显示
                    for(var j=0;j<olLi.length;j++){
                    olLi[j].className="";
                }
                    this.className="active";
                    var leader=document.body.scrollTop ;//获取当前位置(头部被卷去的部分)
                    var target = ulLi[this.index].offsetTop;//对应li距离有定位父盒子的顶部的位置
                 //窗口移动到对应楼层
                    clearInterval(timer);
                var timer=setInterval(function(){
                    //缓动原理
                    var step = (target-leader)/10;
                    step = step>0?Math.ceil(step):Math.floor(step);
                    leader = leader + step;
                    window.scrollTo(0,leader);//移动窗口用scrollTo
                    if(Math.abs(leader-target)<Math.abs(step)){
                        window.scrollTo(0,target);
                        clearInterval(timer);
                    }
                },15);
            }

        }

    //轮播图
    var lb=document.getElementById("lb");
    var lbUl=lb.children[0];
    var lbUlLi=lbUl.children;
    var lbOl=lb.children[1];
    var lbOlLi=lbOl.children;
    var back=document.getElementsByClassName("back")[0];
    var head=document.getElementsByClassName("head")[0];
    var timer=null;

    for(var i=0;i<lbUlLi.length;i++){
        lbUlLi[i].style["background"]=color[i];
    }
//鼠标放上ul，左右切换按钮显示
    lb.onmouseover=function(){
        show(back);
        show(head);
        clearInterval(timer);
    }
    lb.onmouseout=function(){
        hide(back);
        hide(head);
        timer=setInterval(function(){
            autoPlay();
        },3000);
    }
    //鼠标放上ol移动图片
    for(var i=0;i<lbOlLi.length;i++){
        lbOlLi[i].index=i;
        for(var j=0;j<lbOlLi.length;j++){
            lbOlLi[j].onmouseover=function(){
                var target=lbUlLi[this.index].offsetLeft;
                var json1={"left":-target};
                animate(lbUl, json1);
            }
        }
    }

    //点击左右切换按钮切换图片
    back.onclick=function(){
        if(lbUl.offsetLeft === 0){
            lbUl.style.left="-3000px";
    }
        console.log(lbUl.offsetLeft);
        switchClick(600);
    }
    head.onclick=function(){
        if(lbUl.offsetLeft === -3000 ){
            lbUl.style.left="0";
        }
        switchClick(-600);
    }


    //定时器自动播放
    function  autoPlay(){
        if(lbUl.offsetLeft === -3000 ){
            lbUl.style.left="0";
        }
        switchClick(-600);
    }

    timer=setInterval(function(){
        autoPlay();
    },3000);
    //切换函数封装
    function switchClick(data){
        var w=lbUl.offsetLeft;
        w = Math.ceil(w/600)*600;
        var target = w + data;
        var json= {"left":target};
        animate(lbUl,json,5);

    }



}
