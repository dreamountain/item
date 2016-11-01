/**
 * Created by Administrator on 2016/9/19 0019.
 */
$(function () {
    //轮播图
    banner();
    //页签
    selfLabel();
    //申明初始化提示工具
    $('[data-toggle="tooltip"]').tooltip();
});
//轮播图
function banner() {
    /*
     * 1.准备数据，模拟后台交互
     * 2.动态渲染
     * 2.1将后台数据转化成html格式
     * 2.2判断当前设备是移动端还是非移动端
     * 2.3将转好的html结构渲染显示在桌面
     * 3.模拟多重终端
     * 4.在移动端，可以触屏滑动
     * */
    //1.准备数据，模拟后台交互
    var data = [
        {
            mImg: 'images/slide_01_640x340.jpg',
            pImg: 'images/slide_01_2000x410.jpg'
        },
        {
            mImg: 'images/slide_02_640x340.jpg',
            pImg: 'images/slide_02_2000x410.jpg'
        },
        {
            mImg: 'images/slide_03_640x340.jpg',
            pImg: 'images/slide_03_2000x410.jpg'
        },
        {
            mImg: 'images/slide_04_640x340.jpg',
            pImg: 'images/slide_04_2000x410.jpg'
        }
    ];
    //2.动态渲染
    var change = function () {

        //* 2.2判断当前设备是移动端还是非移动端
        var width = $(window).width();
        var isMobile = width > 768 ? false : true;

        //2.1将后台数据转化成html格式

        //获取模板内容
        var imgChangeContent = $("#picImg").html();
        var pointChangeContent = $("#point").html();

        //用template方法转化成模板方法
        var imgChangeFuc = _.template(imgChangeContent);
        var pointChangeFuc = _.template(pointChangeContent);

        //模板方法  传入数据 转化成html结构
        var imgChangeHtml = imgChangeFuc({model: data, isM: isMobile});
        var pointChangeHtml = pointChangeFuc({model: data});

        //* 2.3将转好的html结构渲染显示在桌面
        $(".carousel-indicators").html(pointChangeHtml);
        $(".carousel-inner").html(imgChangeHtml);

    }
    change();

    //3.模拟多重终端
    $(window).on('resize', function () {
        change();
    }).trigger('resize');

    //4.在移动端，可以触屏滑动
    var startX=0;
    var moveX=0;
    var distanceX=0;
    var  isMove=false;

    $(".wjs_banner")
        .on("touchstart", function (e) {
        startX= e.originalEvent.touches[0].clientX;
    })
    .on("touchmove", function (e) {
        moveX= e.originalEvent.touches[0].clientX;
        distanceX=moveX-startX;
        isMove=true;
    })
    .on("touchend", function (e) {
       /*
       * 1.滑动了
       * 2.滑动距离超过多少
       * */
        if(isMove&&Math.abs(distanceX)>50){
            //向左滑
            if(distanceX>0){
                //上一张
                $(".carousel").carousel('prev');
            }else{
                //下一张
                $(".carousel").carousel('next');
            }
        }
        //重置
        startX=0;
        moveX=0;
        distanceX=0;
        isMove=false;
    });

}

//自定义页签自适应区块
function selfLabel() {
    /*
     * 1.定义一个父盒子，自适应屏幕宽度 溢出部分隐藏，
     * 2.所有子标签自适应显示，隐藏可以滑动显示
     * 3.获取所有的页签的宽度之和 才可以保证
     * 4.引用滑动组件
     * */


    //获取父集元素  即装ul的盒子
    var parent = $(".wjs_product_parent");
    //获取子集元素  即ul
    var child = parent.find("ul");
    //获取所有的例
    var lis = child.find("li");
    //获取宽度

    //计算ul的宽度，所有例的宽度之和----outerWidth包括外边距
    var width = 0;

    $.each(lis, function () {
        width += $(this).outerWidth(true);
    });
    //设置子容器即ul的宽度
    child.width(width);

    itcast.iScroll({
       swipeDom:parent.get(0),//必须取出来，转成jquery才行
        swipeType:'x',
        swipeDistance:50
    });
}