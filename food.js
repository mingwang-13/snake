// 食物的自调用函数
(function () {
    var  elements=[];
    // 食物就是一个对象有宽高颜色位置
    function Food(x,y,width,height,color) {
        //   横纵坐标
        this.x=x||0;
        this.y=y||0;
        //    宽和高
        this.width=width||20;
        this.height=height||20;
        //    背景颜色
        this.color=color||"green";
    }
    //为原型添加初始化的方法（作用：在页面上显示食物）
    Food.prototype.init=function(map){
        //先删除这个小食物
        remove();
        //    创建div小方块，(食物)，并加入到地图中
        var div=document.createElement("div");
        map.appendChild(div);
        //    设置div的样式
        div.style.width=this.width+"px";
        div.style.height=this.height+"px";
        div.style.backgroundColor=this.color;
        div.style.position="absolute";
        //    横纵坐标需要随机产生
        this.x=parseInt(Math.random()*(map.offsetWidth/this.width))*this.width;
        this.y=parseInt(Math.random()*(map.offsetHeight/this.height))*this.height;
        div.style.left=this.x+"px";
        div.style.top=this.y+"px";
        //    把div加入到elements中
        elements.push(div);
    };
    //私有的函数，用来删除食物
    function remove(){
        for (var i=0;i<elements.length;i++){
            var ele=elements[i];
            //    找到这个子元素的父元素，然后删除这个子元素
            ele.parentNode.removeChild(ele);
            //    再把elements中的这个元素也删除
            elements.splice(i,1);
        }
    }
    //把Food暴露给window，使外部能够使用
    window.Food=Food;
}());