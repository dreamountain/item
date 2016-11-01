/**
 * Created by Administrator on 2016/9/19 0019.
 */
$(function () {
    //�ֲ�ͼ
    banner();
    //ҳǩ
    selfLabel();
    //������ʼ����ʾ����
    $('[data-toggle="tooltip"]').tooltip();
});
//�ֲ�ͼ
function banner() {
    /*
     * 1.׼�����ݣ�ģ���̨����
     * 2.��̬��Ⱦ
     * 2.1����̨����ת����html��ʽ
     * 2.2�жϵ�ǰ�豸���ƶ��˻��Ƿ��ƶ���
     * 2.3��ת�õ�html�ṹ��Ⱦ��ʾ������
     * 3.ģ������ն�
     * 4.���ƶ��ˣ����Դ�������
     * */
    //1.׼�����ݣ�ģ���̨����
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
    //2.��̬��Ⱦ
    var change = function () {

        //* 2.2�жϵ�ǰ�豸���ƶ��˻��Ƿ��ƶ���
        var width = $(window).width();
        var isMobile = width > 768 ? false : true;

        //2.1����̨����ת����html��ʽ

        //��ȡģ������
        var imgChangeContent = $("#picImg").html();
        var pointChangeContent = $("#point").html();

        //��template����ת����ģ�巽��
        var imgChangeFuc = _.template(imgChangeContent);
        var pointChangeFuc = _.template(pointChangeContent);

        //ģ�巽��  �������� ת����html�ṹ
        var imgChangeHtml = imgChangeFuc({model: data, isM: isMobile});
        var pointChangeHtml = pointChangeFuc({model: data});

        //* 2.3��ת�õ�html�ṹ��Ⱦ��ʾ������
        $(".carousel-indicators").html(pointChangeHtml);
        $(".carousel-inner").html(imgChangeHtml);

    }
    change();

    //3.ģ������ն�
    $(window).on('resize', function () {
        change();
    }).trigger('resize');

    //4.���ƶ��ˣ����Դ�������
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
       * 1.������
       * 2.�������볬������
       * */
        if(isMove&&Math.abs(distanceX)>50){
            //����
            if(distanceX>0){
                //��һ��
                $(".carousel").carousel('prev');
            }else{
                //��һ��
                $(".carousel").carousel('next');
            }
        }
        //����
        startX=0;
        moveX=0;
        distanceX=0;
        isMove=false;
    });

}

//�Զ���ҳǩ����Ӧ����
function selfLabel() {
    /*
     * 1.����һ�������ӣ�����Ӧ��Ļ��� ����������أ�
     * 2.�����ӱ�ǩ����Ӧ��ʾ�����ؿ��Ի�����ʾ
     * 3.��ȡ���е�ҳǩ�Ŀ��֮�� �ſ��Ա�֤
     * 4.���û������
     * */


    //��ȡ����Ԫ��  ��װul�ĺ���
    var parent = $(".wjs_product_parent");
    //��ȡ�Ӽ�Ԫ��  ��ul
    var child = parent.find("ul");
    //��ȡ���е���
    var lis = child.find("li");
    //��ȡ���

    //����ul�Ŀ�ȣ��������Ŀ��֮��----outerWidth������߾�
    var width = 0;

    $.each(lis, function () {
        width += $(this).outerWidth(true);
    });
    //������������ul�Ŀ��
    child.width(width);

    itcast.iScroll({
       swipeDom:parent.get(0),//����ȡ������ת��jquery����
        swipeType:'x',
        swipeDistance:50
    });
}