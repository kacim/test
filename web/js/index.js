var carSelectVal;
var startTime;
var endTime;

$().ready(function() {

   initPage();

});



function initPage() {

    $('#typeSelect').after(juicer(modelForCar.car_Tpl, { hasInfo: 1 }));
    initMenu();
    initCarSelect();
    initNorSelect();
    addMore();
    search();
    initTime();
    test();
    mainInit();
    chinaMap('china');

}


//进入主页时初始化
function mainInit() {

    //options.js
    createCharts('two', 'yyy');
    createCharts('one', 'ttt', 'china');


}


function initMenu() {


    $('.showInfo').off('click').on('click', function() {
        $('.typeTitle').removeClass('openColor');
        $(this).find('.typeTitle').addClass('openColor');
        hasInfoInit();
        initCheckCharts($(this).attr('data-content'));
    });


    $('.hasInfo').off('click').on('click', function() {

        if ($(this).hasClass('noOpen')) {
            $(this).find('.typeItem').slideDown();
            $(this).removeClass('noOpen').addClass('Open');
            $(this).find('.typeTitle').addClass('openColor');
        } else {
            $(this).find('.typeItem').slideUp();
            $(this).removeClass('Open').addClass('noOpen');
            $(this).find('.typeTitle').addClass('openColor');
        }

        event.stopPropagation();

    });


    $('.showInfoLi').off('click').on('click', function() {
        initCheckCharts($(this).attr('data-content'));
        $('.typeTitle').removeClass('openColor');
        $(this).parent().parent().find('.typeTitle').addClass('openColor');
        $('.showInfoLi').removeClass('checkColor');
        $(this).addClass('checkColor');
        $('.hasInfo').removeClass('Open').addClass('noOpen');
        $(this).parent().parent().removeClass('noOpen').addClass('Open');
        $('.noOpen').find('.typeItem').slideUp();
        event.stopPropagation();
    });

}

//日期

function initTime() {
    createPicker($('#startTime'));
    createPicker($('#endTime'));
}

function createPicker(id,type){

            let checkType = $('#timeVal').attr('data-content');
            let format;
            let startView;
            let minView;
            let startDate = new Date(-8639968443048000);

            if (checkType == 'days' || checkType == 'week') {
                format = 'yyyy-mm-dd';
                startView = 2;
                minView = 3;

            }else if(checkType == 'months'){
                format = 'yyyy-mm';
                startView = 3;
                minView = 3;
            } 

            if(type == 'end'){
               startDate = new Date($('#startTimeVal').val());
               if(checkType == 'week'){
                startDate = Date.parse(startDate) + 24*60*60*1000*7;
                startDate = new Date(startDate);
               }
            }

             id.datetimepicker({
             	     language:'cn',
                     format: format,
                     autoclose: true,
                     startView: startView,
                     minView: minView,
                     forceParse: true,
                     startDate:startDate,
              });
            
            $('#startTimeVal').off('change').on('change',function(){
                  addEndTime();
                  createPicker($('#endTime'),'end');
                  $('#startTime').removeClass('errorItem');
            })

            

            $('#endTime').off('click').on('click',function(){
                  let stTime = $('#startTimeVal').val();
                  $('#endTime').datetimepicker('hide');
                  if(stTime == undefined || stTime == ""){
                     successToolTipShow('请选择开始时间');
                     $('#startTime').addClass('errorItem');
                  }else{
                     $('#startTime').removeClass('errorItem');
                     $('#endTime').datetimepicker('show');
                  }
            })

}


function addStartTime(){

   $('#startTime').remove();
   $('#startItem').append(
   '<div class="setTime date input-group startTime" id="startTime">'+
   '     <input class="form-control" id="startTimeVal"  readonly >'+
   '     <span class="input-group-addon"><span class="glyphicon glyphicon-th"></span></span>'+
   '</div>'
    )
} 
   
function addEndTime(){

   $('#endTime').remove();
   $('#endItem').append(
   '<div class="setTime date input-group endTime" id="endTime">'+
   '     <input class="form-control" id="endTimeVal"   readonly >'+
   '     <span class="input-group-addon"><span class="glyphicon glyphicon-th"></span></span>'+
   '</div>'
    )
}



//日期end


function initCheckCharts(num) {

    switch (num) {
        case '1':
            initSalesCharts();
            break;
        case '2':
            initTotalOp();
            break;
        case '3':
            initModelOp();
            break;
    }

}


function hasInfoInit() {
    $('.typeItem').slideUp();
    $('.hasInfo').removeClass('Open').addClass('noOpen');
    $('.showInfoLi').removeClass('checkColor');
}


function initCarSelect() {


    $('.carSelectVal').off('click').on('click', function() {
        
        if ($(this).hasClass('openSelect')) {
            $(this).removeClass('openSelect');
            $(this).parent().find('.carSelect').slideUp();
            $('div').removeClass('errorItem');
            initSelectEven()
        } else {
        	initSelectEven()
            $(this).addClass('openSelect');
            $(this).parent().find('.carSelect').slideDown();

        }
        event.stopPropagation();
    });


    $('.checkIndex li').off('click').on('click', function() {

        var gotoName = $(this).attr('data-target');
        $('.listJump').scrollTop($('#' + gotoName + ''));
        var point = $('#' + gotoName + '').position().top;
        $('.listJump').scrollTop(point);
        $('div').removeClass('errorItem');
        event.stopPropagation();

    });

    $('.listJump dd').off('click').on('click', function() {

        if ($('#tb').text() == '车型') {
            $(this).parent().parent().find('.listDes').slideDown();
        } else {
            var name = $(this).attr('data-value');
            $(this).parent().parent().parent().find('.carSelectVal').text(name);
            initSelectEven();
        }
        event.stopPropagation();

    });

    $('.listDes li').off('click').on('click', function() {
        // var name = $(this).attr('data-value');
        var name = $(this).text();
        $(this).parent().parent().parent().parent().find('.carSelectVal').text(name);
        initSelectEven();
        event.stopPropagation();

    });


}


//通用选择器
function initNorSelect() {

    $('.selectValue').off('click').on('click', function() {
       
        
        if ($(this).hasClass('openSelect')) {
            $(this).removeClass('openSelect');
            $(this).parent().find('.setSelect').slideUp();
            initSelectEven();
        } else {
        	initSelectEven();
            $(this).addClass('openSelect');
            $(this).parent().find('.setSelect').slideDown();
        }
        $('div').removeClass('errorItem');
        event.stopPropagation();
    });

    $('.setSelect li').off('click').on('click', function() {

        let val = $(this).attr('data-content');
        let text = $(this).text();
        $(this).parent().slideUp();
        $(this).parent().parent().find('.selectValue').removeClass('openSelect').text(text).attr('data-content', val);

        if ($(this).parent().hasClass('carSelect')) {
            $('.carSelectVal').text('');
        } else if ($(this).parent().hasClass('timeSelect')) {

            addStartTime();
            addEndTime();
            $('.datetimepicker').remove();
            initTime();

            
        }
     
        event.stopPropagation();
    });


}

//通用选择器end

function addMore() {

    $('.addMore').off('click').on('click', function() {

        var carSelectItem = $('.carSelectItem');

        if (carSelectItem.length >= 4) {
            alert('不能大于4');
        } else {
            $("#setAddContent").append(juicer(modelForCar.car_Tpl, {}));
            initCarSelect();
            delMore();
        }

    });


}

function delMore() {

    $('.delMore').off('click').on('click', function() {

        $(this).parent().remove();

    });

}



function createRandomItemStyle() {
    return {
        normal: {
            color: 'rgb(' + [
                Math.round(Math.random() * 160),
                Math.round(Math.random() * 160),
                Math.round(Math.random() * 160)
            ].join(',') + ')'
        }
    };
}

function test() {

    var chart = echarts.init(document.getElementById('main'));
    var height = $('#main').height();
    var width = $('#main').width();

    var option = {
        tooltip: {},
        series: [{
            type: 'wordCloud',
            gridSize: 2,
            sizeRange: [12, 50],
            rotationRange: [-90, 90],
            //   shape: 'circle',
            width: width,
            height: height,
            drawOutOfBound: true,
            textStyle: {
                normal: {
                    color: function() {
                        return 'rgb(' + [
                            Math.round(Math.random() * 160),
                            Math.round(Math.random() * 160),
                            Math.round(Math.random() * 160)
                        ].join(',') + ')';
                    }
                },
                emphasis: {
                    shadowBlur: 10,
                    shadowColor: '#333'
                }
            },
            data: [{
                    name: '迪思传媒',
                    value: 9000,
                    textStyle: {
                        normal: {
                            color: 'black'
                        },
                        emphasis: {
                            color: 'red'
                        }
                    }
                },
                {
                    name: 'Macys',
                    value: 6181
                },
                {
                    name: 'Amy Schumer',
                    value: 4386
                },
                {
                    name: 'Ma',
                    value: 6181
                },
                {
                    name: 'Amy Schumer',
                    value: 4386
                },
                {
                    name: 'Macys',
                    value: 6181
                },
                {
                    name: 'Amy Schumer',
                    value: 4386
                },
                {
                    name: 'Jurassic World',
                    value: 4055
                },
                {
                    name: 'Charter Communications',
                    value: 2467
                },
                {
                    name: 'Chick Fil A',
                    value: 2244
                },
                {
                    name: 'Planet Fitness',
                    value: 1898
                },
                {
                    name: 'Pitch Perfect',
                    value: 1484
                },
                {
                    name: 'Express',
                    value: 1112
                },
                {
                    name: 'Home',
                    value: 965
                },
                {
                    name: 'Johnny Depp',
                    value: 847
                },
                {
                    name: 'Lena Dunham',
                    value: 582
                },
                {
                    name: 'Lewis Hamilton',
                    value: 555
                },
                {
                    name: 'KXAN',
                    value: 550
                },
                {
                    name: 'Mary Ellen Mark',
                    value: 462
                },
                {
                    name: 'Farrah Abraham',
                    value: 366
                },
                {
                    name: 'Rita Ora',
                    value: 360
                },
                {
                    name: 'Serena Williams',
                    value: 282
                },
                {
                    name: 'NCAA baseball tournament',
                    value: 273
                },
                {
                    name: 'Point Break',
                    value: 265
                },
                 {
                    name: ' Break',
                    value: 265
                },
                 {
                    name: 'Point ',
                    value: 265
                },

            ]
        }]
    };

    chart.setOption(option);

    window.onresize = chart.resize;

    chart.on('click', function(params) {
        //alert((params.name));
        window.open('https://www.baidu.com/s?wd=' + encodeURIComponent(params.name));

    });

}


function createDatePicker(clickEven, showPos, valId) {


    clickEven.off('click').on('click', function() {


        var a = $('#timeVal').attr('data-content');
        var b = $('#startTime').val()

        if ($('#timeVal').attr('data-content') == 'week' && $('#startTime').val() == '' && valId == '#endTime') {
            alert('请先选择维度1');
            return;
        }

        if ($('#timeVal').attr('data-content') != 'months') {
            showPos.datepicker({
                dateFormat: 'yy-mm-dd',
                dayNamesMin: ['日', '一', '二', '三', '四', '五', '六'],
                monthNames: ['1月', '2月', '3月', '4月', '5月', '6月',
                    '7月', '8月', '9月', '10月', '11月', '12月'
                ],
                showMonthAfterYear: true,
                onSelect(date) {
                    $(this).parent().find('.setTime').val(date);
                    $('.hasDatepicker').find('.ui-datepicker').remove();
                    $('.hasDatepicker').removeClass('hasDatepicker');

                    if ($(this).parent().find('.setTime').hasClass('startTime')) {
                        $('#endTime').val('');
                    }

                },
                beforeShowDay: function(date) {
                    var setGetDate;
                    var needWeek = false;
                    if ($('#startTime').val() != '' && $('#startTime').val() != null && $('#startTime').val() != undefined) {
                        setGetDate = $('#startTime').val();
                    }
                    if (valId == '#endTime') {
                        needWeek = true;
                    }

                    if ($('#timeVal').attr('data-content') == 'week' && setGetDate != undefined && needWeek) {
                        var beforeWeek = new Date(setGetDate);
                        beforeWeek = beforeWeek.getTime() - 144 * 60 * 60 * 1000;

                        var afterWeek = new Date(setGetDate);
                        afterWeek = afterWeek.getTime() + 144 * 60 * 60 * 1000;

                        if (date.getTime() <= afterWeek && date.getTime() >= beforeWeek) {
                            return [false, 'darkDate', ''];
                        } else {
                            return [true];
                        }
                    } else {
                        return [true];
                    }
                },
            });
            $('.ui-datepicker-calendar').css('display', 'block');
        } else {

            if ($(this).parent().find('.showData').hasClass('hasDatepicker')) {

                $('.hasDatepicker').removeClass('hasDatepicker');
                $('.ui-datepicker').remove();


            } else {

                showPos.datepicker({
                    dateFormat: 'yy-mm-dd',
                    dayNamesMin: ['日', '一', '二', '三', '四', '五', '六'],
                    monthNames: ['1月', '2月', '3月', '4月', '5月', '6月',
                        '7月', '8月', '9月', '10月', '11月', '12月'
                    ],
                    monthNamesShort: ['1月', '2月', '3月', '4月', '5月', '6月',
                        '7月', '8月', '9月', '10月', '11月', '12月'
                    ],
                    showMonthAfterYear: true,
                    showButtonPanel: true,
                    closeText: '关闭',
                    currentText: '当前月',
                    onSelect() {
                        $(this).parent().find('.setTime').val(date);
                        $('.hasDatepicker').find('.ui-datepicker').remove();
                        $('.hasDatepicker').removeClass('hasDatepicker');
                    },
                    onChangeMonthYear(v, s, f) {
                        $('.ui-datepicker-calendar').css('display', 'none');
                        var month = $(this).find('.ui-datepicker-month').find('option:selected').val(); //得到选中的月份值
                        var year = $(this).find('.ui-datepicker-year').find('option:selected').val(); //得到选中的年份值
                        clickEven.val(year + '-' + (parseInt(month) + 1)); //给input赋值，其中要对月值加1才是实际的月份
                        // $('.hasDatepicker').find('.ui-datepicker').remove();
                        // $('.hasDatepicker').removeClass('hasDatepicker');

                    },
                    changeMonth: true,
                    changeYear: true,
                });


                $('.ui-datepicker').addClass('hideDay');
            }

        }
        event.stopPropagation();
    })

}

//取值

function search() {

    $('.search').off('click').on('click', function() {

        if (getAndCheckValue()) {} else {

        }
    })

}


function getAndCheckValue() {

    $('div,input').removeClass('errorItem');
    var carSelect = $('.carSelectVal');
    carSelectVal = new Array();
    for (var i = 0; i < carSelect.length; i++) {
        let val = $(carSelect[i]).text();
        if (val == '' || val == null || val == undefined) {
            successToolTipShow('请选择车型');
            $(carSelect[i]).addClass('errorItem');
            return false;
        } else {
            carSelectVal.push(val);
        }
    }

    var time1 = $('#startTime').val();

    if (time1 == '' || time1 == null || time1 == undefined) {
        successToolTipShow('请选择开始时间');
        $('#startTimeVal').addClass('errorItem');
        return false;
    } else {
        startTime = time1;
    }

    var time2 = $('#endTime').val();
    if (time2 == '' || time2 == null || time2 == undefined) {
        successToolTipShow('请选择结束时间');
        $('#endTimeVal').addClass('errorItem');
        return false;
    } else {
        endTime = time2;
    }

    return true;

}

//end




var modelForCar = {
    car_Tpl: [
        '{@if hasInfo != 1}<div class="setMoreItem">{@/if}' +
        '   <div class="titleWord {@if hasInfo != 1}carSelectItemAdd{@/if}">车型:</div>' +
        '   <div class="carSelectItem   ">' +
        '                    <div class="carSelectVal"></div> ' +
        '                    <div class="carSelect">' +
        '                <ul class="checkIndex">' +
        '                    <li data-target="jump-A">A</li>' +
        '                    <li data-target="jump-B">B</li>' +
        '                    <li data-target="jump-C">C</li>' +
        '                    <li data-target="jump-D">D</li>' +
        '                    <li data-target="jump-F">F</li>' +
        '                    <li data-target="jump-G">G</li>' +
        '                    <li data-target="jump-H">H</li>' +
        '                    <li data-target="jump-I">I</li>' +
        '                    <li data-target="jump-J">J</li>' +
        '                    <li data-target="jump-K">K</li>' +
        '                    <li data-target="jump-L">L</li>' +
        '                    <li data-target="jump-M">M</li>' +
        '                    <li data-target="jump-N">N</li>' +
        '                    <li data-target="jump-O">O</li>' +
        '                    <li data-target="jump-P">P</li>' +
        '                    <li data-target="jump-Q">Q</li>' +
        '                    <li data-target="jump-R">R</li>' +
        '                    <li data-target="jump-S">S</li>' +
        '                    <li data-target="jump-T">T</li>' +
        '                    <li data-target="jump-W">W</li>' +
        '                    <li data-target="jump-X">X</li>' +
        '                    <li data-target="jump-Y">Y</li>' +
        '                    <li data-target="jump-Z">Z</li>' +
        '                </ul>' +
        '                <dl class="listJump">' +
        '                    <dt id="jump-A">A</dt>' +
        '                    <dd data-value="117" data-text="AC Schnitzer" data-target="brand">AC Schnitzer</dd>' +
        '                    <dd data-value="276" data-text="ALPINA" data-target="brand">ALPINA</dd>' +
        '                    <dd data-value="34" data-text="阿尔法·罗密欧" data-target="brand">阿尔法·罗密欧</dd>' +
        '                    <dd data-value="35" data-text="阿斯顿·马丁" data-target="brand">阿斯顿·马丁</dd>' +
        '                    <dd data-value="221" data-text="安凯客车" data-target="brand">安凯客车</dd>' +
        '                    <dd data-value="33" data-text="奥迪" data-target="brand">奥迪</dd><dt id="jump-B">B</dt>' +
        '                    <dd data-value="140" data-text="巴博斯" data-target="brand">巴博斯</dd>' +
        '                    <dd data-value="120" data-text="宝骏" data-target="brand">宝骏</dd>' +
        '                    <dd data-value="15" data-text="宝马" data-target="brand">宝马</dd>' +
        '                    <dd data-value="231" data-text="宝沃" data-target="brand">宝沃</dd>' +
        '                    <dd data-value="40" data-text="保时捷" data-target="brand">保时捷</dd>' +
        '                    <dd data-value="27" data-text="北京" data-target="brand">北京</dd>' +
        '                    <dd data-value="333" data-text="北京清行" data-target="brand">北京清行</dd>' +
        '                    <dd data-value="79" data-text="北汽昌河" data-target="brand">北汽昌河</dd>' +
        '                    <dd data-value="301" data-text="北汽道达" data-target="brand">北汽道达</dd>' +
        '                    <dd data-value="203" data-text="北汽幻速" data-target="brand">北汽幻速</dd>' +
        '                    <dd data-value="173" data-text="北汽绅宝" data-target="brand">北汽绅宝</dd>' +
        '                    <dd data-value="143" data-text="北汽威旺" data-target="brand">北汽威旺</dd>' +
        '                    <dd data-value="208" data-text="北汽新能源" data-target="brand">北汽新能源</dd>' +
        '                    <dd data-value="154" data-text="北汽制造" data-target="brand">北汽制造</dd>' +
        '                    <dd data-value="36" data-text="奔驰" data-target="brand">奔驰</dd>' +
        '                    <dd data-value="95" data-text="奔腾" data-target="brand">奔腾</dd>' +
        '                    <dd data-value="14" data-text="本田" data-target="brand">本田</dd>' +
        '                    <dd data-value="271" data-text="比速汽车" data-target="brand">比速汽车</dd>' +
        '                    <dd data-value="75" data-text="比亚迪" data-target="brand">比亚迪</dd>' +
        '                    <dd data-value="13" data-text="标致" data-target="brand">标致</dd>' +
        '                    <dd data-value="38" data-text="别克" data-target="brand">别克</dd>' +
        '                    <dd data-value="39" data-text="宾利" data-target="brand">宾利</dd>' +
        '                    <dd data-value="37" data-text="布加迪" data-target="brand">布加迪</dd><dt id="jump-C">C</dt>' +
        '                    <dd data-value="76" data-text="长安" data-target="brand">长安</dd>' +
        '                    <dd data-value="299" data-text="长安跨越" data-target="brand">长安跨越</dd>' +
        '                    <dd data-value="163" data-text="长安欧尚" data-target="brand">长安欧尚</dd>' +
        '                    <dd data-value="294" data-text="长安轻型车" data-target="brand">长安轻型车</dd>' +
        '                    <dd data-value="77" data-text="长城" data-target="brand">长城</dd>' +
        '                    <dd data-value="196" data-text="成功汽车" data-target="brand">成功汽车</dd><dt id="jump-D">D</dt>' +
        '                    <dd data-value="169" data-text="DS" data-target="brand">DS</dd>' +
        '                    <dd data-value="341" data-text="大乘汽车" data-target="brand">大乘汽车</dd>' +
        '                    <dd data-value="92" data-text="大发" data-target="brand">大发</dd>' +
        '                    <dd data-value="1" data-text="大众" data-target="brand">大众</dd>' +
        '                    <dd data-value="41" data-text="道奇" data-target="brand">道奇</dd>' +
        '                    <dd data-value="280" data-text="电咖" data-target="brand">电咖</dd>' +
        '                    <dd data-value="32" data-text="东风" data-target="brand">东风</dd>' +
        '                    <dd data-value="326" data-text="东风·瑞泰特" data-target="brand">东风·瑞泰特</dd>' +
        '                    <dd data-value="187" data-text="东风风度" data-target="brand">东风风度</dd>' +
        '                    <dd data-value="259" data-text="东风风光" data-target="brand">东风风光</dd>' +
        '                    <dd data-value="113" data-text="东风风神" data-target="brand">东风风神</dd>' +
        '                    <dd data-value="165" data-text="东风风行" data-target="brand">东风风行</dd>' +
        '                    <dd data-value="142" data-text="东风小康" data-target="brand">东风小康</dd>' +
        '                    <dd data-value="81" data-text="东南" data-target="brand">东南</dd><dt id="jump-F">F</dt>' +
        '                    <dd data-value="42" data-text="法拉利" data-target="brand">法拉利</dd>' +
        '                    <dd data-value="11" data-text="菲亚特" data-target="brand">菲亚特</dd>' +
        '                    <dd data-value="3" data-text="丰田" data-target="brand">丰田</dd>' +
        '                    <dd data-value="141" data-text="福迪" data-target="brand">福迪</dd>' +
        '                    <dd data-value="197" data-text="福汽启腾" data-target="brand">福汽启腾</dd>' +
        '                    <dd data-value="8" data-text="福特" data-target="brand">福特</dd>' +
        '                    <dd data-value="96" data-text="福田" data-target="brand">福田</dd>' +
        '                    <dd data-value="282" data-text="福田乘用车" data-target="brand">福田乘用车</dd><dt id="jump-G">G</dt>' +
        '                    <dd data-value="112" data-text="GMC" data-target="brand">GMC</dd>' +
        '                    <dd data-value="152" data-text="观致" data-target="brand">观致</dd>' +
        '                    <dd data-value="116" data-text="光冈" data-target="brand">光冈</dd>' +
        '                    <dd data-value="82" data-text="广汽传祺" data-target="brand">广汽传祺</dd>' +
        '                    <dd data-value="108" data-text="广汽吉奥" data-target="brand">广汽吉奥</dd>' +
        '                    <dd data-value="329" data-text="广汽集团" data-target="brand">广汽集团</dd>' +
        '                    <dd data-value="313" data-text="广汽新能源" data-target="brand">广汽新能源</dd>' +
        '                    <dd data-value="304" data-text="国金汽车" data-target="brand">国金汽车</dd><dt id="jump-H">H</dt>' +
        '                    <dd data-value="24" data-text="哈飞" data-target="brand">哈飞</dd>' +
        '                    <dd data-value="181" data-text="哈弗" data-target="brand">哈弗</dd>' +
        '                    <dd data-value="150" data-text="海格" data-target="brand">海格</dd>' +
        '                    <dd data-value="86" data-text="海马" data-target="brand">海马</dd>' +
        '                    <dd data-value="267" data-text="汉腾汽车" data-target="brand">汉腾汽车</dd>' +
        '                    <dd data-value="43" data-text="悍马" data-target="brand">悍马</dd>' +
        '                    <dd data-value="164" data-text="恒天" data-target="brand">恒天</dd>' +
        '                    <dd data-value="91" data-text="红旗" data-target="brand">红旗</dd>' +
        '                    <dd data-value="336" data-text="红星汽车" data-target="brand">红星汽车</dd>' +
        '                    <dd data-value="245" data-text="华凯" data-target="brand">华凯</dd>' +
        '                    <dd data-value="237" data-text="华利" data-target="brand">华利</dd>' +
        '                    <dd data-value="85" data-text="华普" data-target="brand">华普</dd>' +
        '                    <dd data-value="184" data-text="华骐" data-target="brand">华骐</dd>' +
        '                    <dd data-value="220" data-text="华颂" data-target="brand">华颂</dd>' +
        '                    <dd data-value="87" data-text="华泰" data-target="brand">华泰</dd>' +
        '                    <dd data-value="260" data-text="华泰新能源" data-target="brand">华泰新能源</dd>' +
        '                    <dd data-value="97" data-text="黄海" data-target="brand">黄海</dd><dt id="jump-I">I</dt>' +
        '                    <dd data-value="188" data-text="Icona" data-target="brand">Icona</dd><dt id="jump-J">J</dt>' +
        '                    <dd data-value="46" data-text="Jeep" data-target="brand">Jeep</dd>' +
        '                    <dd data-value="25" data-text="吉利汽车" data-target="brand">吉利汽车</dd>' +
        '                    <dd data-value="84" data-text="江淮" data-target="brand">江淮</dd>' +
        '                    <dd data-value="119" data-text="江铃" data-target="brand">江铃</dd>' +
        '                    <dd data-value="210" data-text="江铃集团轻汽" data-target="brand">江铃集团轻汽</dd>' +
        '                    <dd data-value="270" data-text="江铃集团新能源" data-target="brand">江铃集团新能源</dd>' +
        '                    <dd data-value="44" data-text="捷豹" data-target="brand">捷豹</dd>' +
        '                    <dd data-value="319" data-text="捷途" data-target="brand">捷途</dd>' +
        '                    <dd data-value="83" data-text="金杯" data-target="brand">金杯</dd>' +
        '                    <dd data-value="145" data-text="金龙" data-target="brand">金龙</dd>' +
        '                    <dd data-value="175" data-text="金旅" data-target="brand">金旅</dd>' +
        '                    <dd data-value="151" data-text="九龙" data-target="brand">九龙</dd>' +
        '                    <dd data-value="297" data-text="君马汽车" data-target="brand">君马汽车</dd><dt id="jump-K">K</dt>' +
        '                    <dd data-value="109" data-text="KTM" data-target="brand">KTM</dd>' +
        '                    <dd data-value="156" data-text="卡尔森" data-target="brand">卡尔森</dd>' +
        '                    <dd data-value="224" data-text="卡升" data-target="brand">卡升</dd>' +
        '                    <dd data-value="199" data-text="卡威" data-target="brand">卡威</dd>' +
        '                    <dd data-value="101" data-text="开瑞" data-target="brand">开瑞</dd>' +
        '                    <dd data-value="47" data-text="凯迪拉克" data-target="brand">凯迪拉克</dd>' +
        '                    <dd data-value="214" data-text="凯翼" data-target="brand">凯翼</dd>' +
        '                    <dd data-value="100" data-text="科尼赛克" data-target="brand">科尼赛克</dd>' +
        '                    <dd data-value="9" data-text="克莱斯勒" data-target="brand">克莱斯勒</dd><dt id="jump-L">L</dt>' +
        '                    <dd data-value="335" data-text="LITE" data-target="brand">LITE</dd>' +
        '                    <dd data-value="241" data-text="LOCAL MOTORS" data-target="brand">LOCAL MOTORS</dd>' +
        '                    <dd data-value="118" data-text="Lorinser" data-target="brand">Lorinser</dd>' +
        '                    <dd data-value="48" data-text="兰博基尼" data-target="brand">兰博基尼</dd>' +
        '                    <dd data-value="54" data-text="劳斯莱斯" data-target="brand">劳斯莱斯</dd>' +
        '                    <dd data-value="52" data-text="雷克萨斯" data-target="brand">雷克萨斯</dd>' +
        '                    <dd data-value="10" data-text="雷诺" data-target="brand">雷诺</dd>' +
        '                    <dd data-value="124" data-text="理念" data-target="brand">理念</dd>' +
        '                    <dd data-value="80" data-text="力帆汽车" data-target="brand">力帆汽车</dd>' +
        '                    <dd data-value="89" data-text="莲花汽车" data-target="brand">莲花汽车</dd>' +
        '                    <dd data-value="78" data-text="猎豹汽车" data-target="brand">猎豹汽车</dd>' +
        '                    <dd data-value="51" data-text="林肯" data-target="brand">林肯</dd>' +
        '                    <dd data-value="53" data-text="铃木" data-target="brand">铃木</dd>' +
        '                    <dd data-value="279" data-text="领克" data-target="brand">领克</dd>' +
        '                    <dd data-value="343" data-text="领途汽车" data-target="brand">领途汽车</dd>' +
        '                    <dd data-value="204" data-text="陆地方舟" data-target="brand">陆地方舟</dd>' +
        '                    <dd data-value="88" data-text="陆风" data-target="brand">陆风</dd>' +
        '                    <dd data-value="49" data-text="路虎" data-target="brand">路虎</dd>' +
        '                    <dd data-value="50" data-text="路特斯" data-target="brand">路特斯</dd>' +
        '                    <dd data-value="346" data-text="罗夫哈特" data-target="brand">罗夫哈特</dd><dt id="jump-M">M</dt>' +
        '                    <dd data-value="56" data-text="MINI" data-target="brand">MINI</dd>' +
        '                    <dd data-value="58" data-text="马自达" data-target="brand">马自达</dd>' +
        '                    <dd data-value="57" data-text="玛莎拉蒂" data-target="brand">玛莎拉蒂</dd>' +
        '                    <dd data-value="55" data-text="迈巴赫" data-target="brand">迈巴赫</dd>' +
        '                    <dd data-value="129" data-text="迈凯伦" data-target="brand">迈凯伦</dd>' +
        '                    <dd data-value="20" data-text="名爵" data-target="brand">名爵</dd>' +
        '                    <dd data-value="168" data-text="摩根" data-target="brand">摩根</dd><dt id="jump-N">N</dt>' +
        '                    <dd data-value="334" data-text="哪吒汽车" data-target="brand">哪吒汽车</dd>' +
        '                    <dd data-value="130" data-text="纳智捷" data-target="brand">纳智捷</dd>' +
        '                    <dd data-value="213" data-text="南京金龙" data-target="brand">南京金龙</dd><dt id="jump-O">O</dt>' +
        '                    <dd data-value="60" data-text="讴歌" data-target="brand">讴歌</dd>' +
        '                    <dd data-value="59" data-text="欧宝" data-target="brand">欧宝</dd>' +
        '                    <dd data-value="331" data-text="欧拉" data-target="brand">欧拉</dd>' +
        '                    <dd data-value="146" data-text="欧朗" data-target="brand">欧朗</dd>' +
        '                    <dd data-value="332" data-text="欧尚汽车" data-target="brand">欧尚汽车</dd><dt id="jump-P">P</dt>' +
        '                    <dd data-value="308" data-text="Polestar" data-target="brand">Polestar</dd>' +
        '                    <dd data-value="61" data-text="帕加尼" data-target="brand">帕加尼</dd><dt id="jump-Q">Q</dt>' +
        '                    <dd data-value="26" data-text="奇瑞" data-target="brand">奇瑞</dd>' +
        '                    <dd data-value="122" data-text="启辰" data-target="brand">启辰</dd>' +
        '                    <dd data-value="62" data-text="起亚" data-target="brand">起亚</dd>' +
        '                    <dd data-value="235" data-text="前途" data-target="brand">前途</dd>' +
        '                    <dd data-value="222" data-text="乔治·巴顿" data-target="brand">乔治·巴顿</dd>' +
        '                    <dd data-value="312" data-text="庆铃汽车" data-target="brand">庆铃汽车</dd>' +
        '                    <dd data-value="219" data-text="全球鹰" data-target="brand">全球鹰</dd><dt id="jump-R">R</dt>' +
        '                    <dd data-value="63" data-text="日产" data-target="brand">日产</dd>' +
        '                    <dd data-value="19" data-text="荣威" data-target="brand">荣威</dd>' +
        '                    <dd data-value="337" data-text="容大智造" data-target="brand">容大智造</dd>' +
        '                    <dd data-value="174" data-text="如虎" data-target="brand">如虎</dd>' +
        '                    <dd data-value="296" data-text="瑞驰新能源" data-target="brand">瑞驰新能源</dd>' +
        '                    <dd data-value="103" data-text="瑞麒" data-target="brand">瑞麒</dd><dt id="jump-S">S</dt>' +
        '                    <dd data-value="45" data-text="smart" data-target="brand">smart</dd>' +
        '                    <dd data-value="269" data-text="SWM斯威汽车" data-target="brand">SWM斯威汽车</dd>' +
        '                    <dd data-value="64" data-text="萨博" data-target="brand">萨博</dd>' +
        '                    <dd data-value="205" data-text="赛麟" data-target="brand">赛麟</dd>' +
        '                    <dd data-value="68" data-text="三菱" data-target="brand">三菱</dd>' +
        '                    <dd data-value="149" data-text="陕汽通家" data-target="brand">陕汽通家</dd>' +
        '                    <dd data-value="155" data-text="上汽大通" data-target="brand">上汽大通</dd>' +
        '                    <dd data-value="66" data-text="世爵" data-target="brand">世爵</dd>' +
        '                    <dd data-value="90" data-text="双环" data-target="brand">双环</dd>' +
        '                    <dd data-value="69" data-text="双龙" data-target="brand">双龙</dd>' +
        '                    <dd data-value="162" data-text="思铭" data-target="brand">思铭</dd>' +
        '                    <dd data-value="65" data-text="斯巴鲁" data-target="brand">斯巴鲁</dd>' +
        '                    <dd data-value="238" data-text="斯达泰克" data-target="brand">斯达泰克</dd>' +
        '                    <dd data-value="67" data-text="斯柯达" data-target="brand">斯柯达</dd><dt id="jump-T">T</dt>' +
        '                    <dd data-value="202" data-text="泰卡特" data-target="brand">泰卡特</dd>' +
        '                    <dd data-value="133" data-text="特斯拉" data-target="brand">特斯拉</dd>' +
        '                    <dd data-value="161" data-text="腾势" data-target="brand">腾势</dd><dt id="jump-W">W</dt>' +
        '                    <dd data-value="283" data-text="WEY" data-target="brand">WEY</dd>' +
        '                    <dd data-value="102" data-text="威麟" data-target="brand">威麟</dd>' +
        '                    <dd data-value="291" data-text="威马汽车" data-target="brand">威马汽车</dd>' +
        '                    <dd data-value="99" data-text="威兹曼" data-target="brand">威兹曼</dd>' +
        '                    <dd data-value="192" data-text="潍柴英致" data-target="brand">潍柴英致</dd>' +
        '                    <dd data-value="284" data-text="蔚来" data-target="brand">蔚来</dd>' +
        '                    <dd data-value="70" data-text="沃尔沃" data-target="brand">沃尔沃</dd>' +
        '                    <dd data-value="114" data-text="五菱汽车" data-target="brand">五菱汽车</dd>' +
        '                    <dd data-value="167" data-text="五十铃" data-target="brand">五十铃</dd><dt id="jump-X">X</dt>' +
        '                    <dd data-value="98" data-text="西雅特" data-target="brand">西雅特</dd>' +
        '                    <dd data-value="12" data-text="现代" data-target="brand">现代</dd>' +
        '                    <dd data-value="275" data-text="小鹏汽车" data-target="brand">小鹏汽车</dd>' +
        '                    <dd data-value="185" data-text="新凯" data-target="brand">新凯</dd>' +
        '                    <dd data-value="324" data-text="新特汽车" data-target="brand">新特汽车</dd>' +
        '                    <dd data-value="306" data-text="鑫源" data-target="brand">鑫源</dd>' +
        '                    <dd data-value="71" data-text="雪佛兰" data-target="brand">雪佛兰</dd>' +
        '                    <dd data-value="72" data-text="雪铁龙" data-target="brand">雪铁龙</dd><dt id="jump-Y">Y</dt>' +
        '                    <dd data-value="111" data-text="野马汽车" data-target="brand">野马汽车</dd>' +
        '                    <dd data-value="110" data-text="一汽" data-target="brand">一汽</dd>' +
        '                    <dd data-value="144" data-text="依维柯" data-target="brand">依维柯</dd>' +
        '                    <dd data-value="73" data-text="英菲尼迪" data-target="brand">英菲尼迪</dd>' +
        '                    <dd data-value="93" data-text="永源" data-target="brand">永源</dd>' +
        '                    <dd data-value="298" data-text="宇通客车" data-target="brand">宇通客车</dd>' +
        '                    <dd data-value="263" data-text="驭胜" data-target="brand">驭胜</dd>' +
        '                    <dd data-value="232" data-text="御捷" data-target="brand">御捷</dd>' +
        '                    <dd data-value="307" data-text="裕路" data-target="brand">裕路</dd>' +
        '                    <dd data-value="286" data-text="云度" data-target="brand">云度</dd>' +
        '                    <dd data-value="317" data-text="云雀汽车" data-target="brand">云雀汽车</dd><dt id="jump-Z">Z</dt>' +
        '                    <dd data-value="182" data-text="之诺" data-target="brand">之诺</dd>' +
        '                    <dd data-value="206" data-text="知豆" data-target="brand">知豆</dd>' +
        '                    <dd data-value="22" data-text="中华" data-target="brand">中华</dd>' +
        '                    <dd data-value="74" data-text="中兴" data-target="brand">中兴</dd>' +
        '                    <dd data-value="94" data-text="众泰" data-target="brand">众泰</dd>' +
        '                </dl>' +
        '                    <div class="listDes">' +
        '                         <ul class="listDesUl">' +
        '                            <li>123</li>' +
        '                            <li>456</li>' +
        '                            <li>789</li>' +
        '                            <li>101</li>' +
        '                            <li>102</li>' +
        '                         </ul>  ' +
        '                    </div>  ' +
        '                     </div>' +
        '           </div>' +
        '        {@if hasInfo != 1} <div class="delMore">删除竞品 - </div>{@/if}' +
        '{@if hasInfo != 1}</div>{@/if}'

    ].join(""),
}