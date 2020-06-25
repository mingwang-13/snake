//自调用游戏对象。游戏的构造函数
(function () {
    var that=null;//用来改变后边计时器中this的指向（本来默认this指向window），可用bind方法使用
    function Game(map) {
        this.food=new Food();//食物对象
        this.snake=new Snake();//小蛇对象
        this.map=map;//地图
        that=this;//此时就把this的指向给了that
    }//游戏对象的构造函数
    Game.prototype.init=function() {

        this.food.init(this.map);//食物初始化
        this.snake.init(this.map);//小蛇初始化
        this.runSnake(this.food,this.map);//调用自动移动小蛇的方法
        // setInterval(function () {
        //     that.snake.move(that.food,that.map);//让小蛇走一步
        //     that.snake.init(that.map);//先在地图上看见小蛇
        // },150);
        this.bindKey();//调用按键方法
    };//    原型方法游戏初始化
    Game.prototype.runSnake=function(food,map){
        var timeId= setInterval(function () {
            this.snake.move(food,map);
            this.snake.init(map);
            var maxX=map.offsetWidth/this.snake.width;//横坐标的最大值
            var maxY=map.offsetHeight/this.snake.height;//纵坐标的最大值
            //   获得当前蛇头的坐标
            var headX=this.snake.body[0].x;
            var headY=this.snake.body[0].y;
            //   判断是否出界，显示游戏结束
            if (headX<0||headX>=maxX){
                clearInterval(timeId);
                alert("游戏结束！");
            }
            if (headY<0||headY>=maxY){
                clearInterval(timeId);
                alert("游戏结束！");
            }
        }.bind(that),150);
    };//    原型方法小蛇自动跑起来
    Game.prototype.bindKey=function(){
        //    获取用户按键，改变小蛇的方向
        document.addEventListener("keydown",function (e) {
            //这里的this是触发keydown事件的对象，document
            switch (e.keyCode) {
                case 37:this.snake.direction="left";break;
                case 38:this.snake.direction="top";break;
                case 39:this.snake.direction="right";break;
                case 40:this.snake.direction="bottom";break;
            }
        }.bind(that),false);
    };  //原型方法，设置用户按键，改变小蛇移动方向
    window.Game=Game;
}());