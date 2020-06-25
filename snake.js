// 小蛇的自调用函数
(function () {
    var elements=[];//存放小蛇身体的每个部分
    //    小蛇的构造函数
    function Snake(width,height,direction) {
        //    小蛇每个部分的宽高
        this.width=width||20;
        this.height=height||20;
        //    小蛇的身体
        this.body=[
            {x:3,y:2,color:"red"},//头
            {x:2,y:2,color:"orange"},//身体
            {x:1,y:2,color:"orange"},//身体
        ];
        //    方向
        this.direction=direction||"right";
    }
    //    为原型添加小蛇的初始化方法
    Snake.prototype.init=function (map) {
        //    先删除之前的小蛇
        remove();
        //    循环遍历创建div
        for (var i=0;i<this.body.length;i++){
            //    数组中每个元素都是一个对象
            var obj=this.body[i];
            //    创建div并加入到地图当中
            var div=document.createElement("div");
            map.appendChild(div);
            //    设置div的样式
            div.style.position="absolute";
            div.style.width=this.width+"px";
            div.style.height=this.height+"px";
            //横纵坐标
            div.style.left=obj.x*this.width+"px";
            div.style.top=obj.y*this.height+"px";
            //    背景颜色
            div.style.backgroundColor=obj.color;
            //    方向暂时不定
            //    把div加入到elements数组中，目的是为了删除
            elements.push(div);
        }
    };
    //为原型添加方法 让小蛇动起来
    Snake.prototype.move=function(food,map){
        //    改变小蛇身体的坐标位置
        var i=this.body.length-1;//两块身体部分
        for (;i>0;i--){
            this.body[i].x=this.body[i-1].x;
            this.body[i].y=this.body[i-1].y;
        }

        //    判断方向，改变蛇头的位置
        switch (this.direction) {
            case "right":
                this.body[0].x+=1;
                break;
            case "left":
                this.body[0].x-=1;
                break;
            case "top":
                this.body[0].y-=1;
                break;
            case "bottom":
                this.body[0].y+=1;
                break;
        }
        // console.log(this.body[0].x); 测试蛇头移动
        //    移动过程中判断有没有吃到食物（蛇头的坐标与食物坐标一致）
        var headX=this.body[0].x*this.width;
        var headY=this.body[0].y*this.height;
        if (headX==food.x&&headY==food.y){
            //    获取小蛇的尾部，复制一份加到body中，再删除食物，即可表示吃到食物，长度加一
            var last=this.body[this.body.length-1];
            this.body.push({
                x:last.x,
                y:last.y,
                color:last.color
            });
            //    此处删除食物只需要初始化一次init方法即可，其包含有remove方法
            food.init(map);
        }
    };
    //删除小蛇的私有函数
    function remove(){
        //    获取数组
        var i=elements.length-1;
        for (;i>=0;i--){
            //    先从当前的子元素中找到该元素的父级元素，再删该子元素
            var ele=elements[i];
            //    从map上删除这个子元素的div
            ele.parentNode.removeChild(ele);
            //    数组中也把这个元素删除
            elements.splice(i,1);
        }
    }
    window.Snake=Snake;
}());