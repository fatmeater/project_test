function animate(obj,target,callback){
    //先清除以前的定时器，只保留当前一个定时器的执行
    clearInterval(obj.timer);
    obj.timer = setInterval(function(){
        //步长值写到定时器的里面
        // 把步长值改成整数，不要出现小数的情况
        var step = (target - obj.offsetLeft) / 10;
        step = step > 0 ? Math.ceil(step) : Math.floor(step);
        if (step.offsetLeft == target) {
            //停止动画 本质是停止定时器
            clearInterval(obj.timer);
            // 回调函数写到定时器结束里面
            /* if (callback) {
                callback();
            } */
            callback && callback();
        }
        //把 现在盒子的位置赋值给obj
        obj.style.left = obj.offsetLeft + step + 'px';
    }, 15)

}