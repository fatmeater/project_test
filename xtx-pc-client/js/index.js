window.addEventListener('load', function () {
    // 1.获取左右按钮
    var prov = document.querySelector('.prov');
    var after = document.querySelector('.after');
    var banner = document.querySelector('.banner');
    var total = document.querySelector('.total');
    var bannerWidth = banner.offsetWidth; //轮播图的图片宽度
    // 2.！！注册事件  处理程序：鼠标经过 就显示隐藏左右按钮
    total.addEventListener('mouseenter', function () {
        prov.style.display = 'block';
        after.style.display = 'block';
        // 清除定时器 timer 实现鼠标经过 停止自动播放轮播图功能
        clearInterval(timer);
        timer = 0;
    })
    total.addEventListener('mouseleave', function () {
        prov.style.display = 'none';
        after.style.display = 'none';
        // 添加定时器 实现鼠标离开 自动播放轮播图功能
        timer = setInterval(function () {
            after.click();
        }, 2000)
    });
    //！！动态生成小圆圈 
    var ul = banner.querySelector('ul');
    var ol = total.querySelector('.indicator');
    // for循环 
    for (var i = 0; i < ul.children.length; i++) {
        // 创建一个小li
        var li = document.createElement('li');
        // 设置一个自定义属性 来记录小圆圈li的索引号
        li.setAttribute('index', i);
        // 插入节点li
        ol.appendChild(li);
        // 小圆圈排他思想 在创建li的同时 为他绑定点击事件（所以写在了for循环里面）
        li.addEventListener('click', function () {
            // 干掉所有人 把所有的小li的active类清除 需要for循环
            for (var i = 0; i < ol.children.length; i++){
                ol.children[i].className = '';
            }
            // 留下我自己 给当前的 小li设置active类
            this.className = 'active';

            // ！！点击小圆圈 让图片滚动 是让ul动  而不是li
            // target是 ul移动的距离 用li的index索引号 乘以 图片的宽
            // target = - index * bannerWidth
            //点击小圆圈li的时候 获取li的索引号(在上面创建li的时候 已经定义了index自定义属性)
            var index = this.getAttribute('index');
            // 当点击了某个小li就把当前的索引号给num 来解决按钮和下一张不对应的问题
            num = index;
            //当点击某个小li 就把当前的索引号给circle  
            circle = index;
            // var bannerWidth = banner.offsetWidth; 因为是在函数里面定义的  所以是局部变量  可以把它放在 外面 成为全局变量
            animate(ul, - index * bannerWidth);

        })
    }
    // 让第一个小圆圈加上active类
    ol.children[0].className = 'active';
   
    // ！！克隆第一张图片 也就是克隆ul的第一个小li 然后将这个克隆的图片添加到ul的最后
    var first = ul.children[0].cloneNode(true);
    ul.appendChild(first);

    // ！！点击右侧按钮 图片向左滚动一张 声明一个变量num 
    // 再声明一个变量circle 当点击左右按钮时 小圆圈也会跟着变化
    var circle = 0; //注意是全局变量 左右按钮都要用到
    var num = 0;
    after.addEventListener('click', function () {
        // 复制第一个图片 然后放在ul的最后面 做判断 如果划到了最后一张 就将ul的left值改成0，并且把num的值设为0
        if(num === ul.children.length -1){
            ul.style.left = 0;
            num = 0;
        }
        num++;
        animate(ul, - num * bannerWidth);

        // ！！让右按钮和下面的小圆圈关联
        circle++;  //circle自增
        /* // 判断条件 用于重新让circle回到第一个再 进行自增
        if (circle == ol.children.length) {
            circle = 0; 
        } */
        // 上面可以改成三元表达式 更简单
        circle = circle == ol.children.length ? 0 : circle;
        //调用函数    
        circleChange();
    })



    prov.addEventListener('click', function () {
        // 复制最后一张图片 然后放在ul的最前面 做判断 如果划到了第一张 就将ul的left值改成划过的所有banner图的总长度，并且把num的值设为
        if (num === 0) {
            num = ul.children.length - 1;
            ul.style.left = -num * bannerWidth + 'px';
            // num = ul.children.length - 1;
        }
        num--;
        animate(ul, -num * bannerWidth);

        // ！！让右按钮和下面的小圆圈关联
        circle--;  //circle自增
        /* // 判断条件 用于重新让circle回到第一个再 进行自增
        if (circle < 0) {
            circle = ol.children.length - 1;
        } */
        // 上面代码改成三元表达式更简单
        circle = circle < 0 ? ol.children.length - 1 : circle;
        // 调用函数
        circleChange();
    });

    // 可以封装一个函数circleChange()
    function circleChange() {
        // 排他思想 干掉所有人 让所有的li 去掉类名
        for (i = 0; i < ol.children.length; i++) {
        ol.children[i].className = '';
        }
        // 留下我自己 让当前circle变量 的类 加上active类
        ol.children[circle].className = 'active';
    }
       
    // 设置一个定时器 用于自动播放
    var timer = setInterval(function () {
        // 手动调用右侧按钮的点击事件
        after.click();
    },2000)
})