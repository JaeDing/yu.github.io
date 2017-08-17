/**
 * Created by 丁宇 on 2017/8/16.
 */

//缓动函数封装
function animate(ele,json,time){

        var bool=true;

        if(time){
            time=time;
        }else {
            time=15;
        }
        //console.log(k + json[k]);
        //要用定时器，先清定时器
        clearInterval(ele.timer);
        ele.timer=setInterval(function(){
            for (var k in json){//for in循环要写在定时器内
                if(k === "opacity"){//透明度特殊处理
                    //
                    leader = getStyle(ele, k)*100 || 1;
                }else{
                    var leader = parseInt(getStyle(ele, k)) || 0;//获取当前值
                }
                var step=(json[k] - leader)/10;//计算步长
                step = step>0?Math.ceil(step):Math.floor(step);//步长取整，否则可能无法停止
                leader = leader + step;//当前值变化
                if(k === "opacity"){
                    ele.style[k]=leader/100;
                }else if(k === "z-index"){
                    //c层级不需要缓动
                    ele.style[k]=json[k];
                }else{
                    ele.style[k] = leader + "px";
                }

                if(json[k] !== leader){
                    bool = false;
                }
                if(bool){
                    clearInterval(ele.timer);
                }
            }
        },time)

}


//获取元素属性方法封装
function getStyle(ele,attr){
    if(window.getComputedStyle){
        return window.getComputedStyle(ele, null)[attr];
    }
    return ele.currentStyle[attr];
}

//盒子显示和隐藏
function show(ele){
    ele.style.display="block";
}
function hide(ele){
    ele.style.display="none";
}