//var UrlDo = "apaipian.com";
var UrlDo = "localhost";
//var UrlDo = "test.apaipian.com";

//var Url = "https://www.apaipian.com:8087/";

var Url = "http://localhost:7070";
//var Url = "http://192.168.0.142:8080/";

//var httpsUrl = "https://www.apaipian.com:7070/";
var httpsUrl = "https://test.apaipian.com:7070/";

var successIntervalObj; // timer变量，控制时间
$().ready(function() {

   selectEven();

});

function selectEven(){


      $('body').off('click').on('click',function(){
           initSelectEven();
           return;
      })

}

function initSelectEven(){
            //常用选择框
           $('.openSelect').parent().find('.setSelect').slideUp();
          //多选字母选择框
           $('.openSelect').parent().find('.carSelect').slideUp();
           $('.openSelect').removeClass('openSelect');
           $('.listDes').hide();
           
}


function getUrl() {
    return UrlDo;
}

function getUrlTask() {
    if (document.location.protocol == "https:") {
        return httpsUrl;
    } else {
        return Url;
    }
}

function debug(obj) {

    var linebreak = "\r\n";
    // var linebreak = "; ";
    var msg = "OBJECT->" + linebreak;
    msg += obj + linebreak;
    for (var e in obj) {
        msg += e + "=" + obj[e] + linebreak;
    }
    return alert(msg);
}

//获取项目路径
function getContextPath() {
    var path = document.location.pathname.substr(1);
    path = "/" + path.substr(0, path.indexOf("/"));
    return '';
}

//AJAX GET
function getData(Func, url) {
    $.ajax({
        url: url,
        type: 'GET',
        cache: false,
        dataType: 'json',
        success: function(data) {
            Func(data);
        },
        error: function(jqXHR, textStatus, errorThrown) {
            console.error('ajax(' + url + ')[' + jqXHR.status + ']' + jqXHR.statusText);
            console.error(jqXHR.responseText);
            console.error('[' + textStatus + ']' + errorThrown);
        }
    });
}

// AJAX POST
function loadData(Func, url, param) {
    $.ajax({
        url: url,
        type: 'POST',
        data: param,
        dataType: 'json',
        cache: false,
        contentType: 'application/json; charset=UTF-8',
        success: function(data) {
            Func(data);
        },
        error: function(jqXHR, textStatus, errorThrown) {
            console.error('ajax(' + url + ')[' + jqXHR.status + ']' + jqXHR.statusText);
            console.error(jqXHR.responseText);
            console.error('[' + textStatus + ']' + errorThrown);
        }
    });
}
//AJAX POST 
function loadData2(Func, url, param) {
    $.ajax({
        url: url,
        type: 'POST',
        cache: false,
        data: param,
        dataType: 'json',
        success: function(data) {
            Func(data);
        },
        error: function(jqXHR, textStatus, errorThrown) {
            console.error('ajax(' + url + ')[' + jqXHR.status + ']' + jqXHR.statusText);
            console.error(jqXHR.responseText);
            console.error('[' + textStatus + ']' + errorThrown);
        }
    });
}
// ajax submit form
function submitForm(Func, url, param, checkElement) {
    var processing = $(checkElement).hasClass('X');
    var rtoken = $('#rtoken').val();
    // 页面存在rtoken添加在提交的参数内
    if (rtoken != undefined && rtoken != null && rtoken != '') {
        var obj = $.evalJSON(param);
        obj.rtoken = rtoken;
        param = $.toJSON(obj);
    }
    if (!processing) {
        $(checkElement).addClass('X');
        $.ajax({
            url: url,
            type: 'POST',
            data: param,
            cache: false,
            dataType: 'json',
            contentType: 'application/json; charset=UTF-8',
            success: function(data) {
                $(checkElement).removeClass('X');
                Func(data);
            },
            error: function(jqXHR, textStatus, errorThrown) {
                $(checkElement).removeClass('X');
                console.error('ajax(' + url + ')[' + jqXHR.status + ']' + jqXHR.statusText);
                console.error(jqXHR.responseText);
                console.error('[' + textStatus + ']' + errorThrown);
            }
        });
    } else {
        console.log('处理中请勿重复点击！');
    }
}

//AJAX POST
function syncLoadData(Func, url, param) {
    $.ajax({
        url: url,
        type: 'POST',
        data: param,
        dataType: 'json',
        async: false,
        contentType: 'application/json; charset=UTF-8',
        success: function(data) {
            Func(data);
        },
        error: function(jqXHR, textStatus, errorThrown) {
            console.error('ajax(' + url + ')[' + jqXHR.status + ']' + jqXHR.statusText);
            console.error(jqXHR.responseText);
            console.error('[' + textStatus + ']' + errorThrown);
        }
    });
}

//导出excel
function download(url, condition) {
    $.growlUI('报表输出中…', '正在为您输出报表，请稍等。。。');
    var inputHTML = '<input type="hidden" name="json" value="' + htmlSpecialCharsEntityEncode(decodeURIComponent(condition)) + '" />';
    $('<form action="' + getContextPath() + url + '" method="POST">' + inputHTML + '</form>').appendTo('body').submit().remove();
}

var htmlSpecialCharsRegEx = /[<>&\r\n"']/gm;

var htmlSpecialCharsPlaceHolders = {
    '<': 'lt;',
    '>': 'gt;',
    '&': 'amp;',
    '\r': "#13;",
    '\n': "#10;",
    '"': 'quot;',
    "'": 'apos;' /*single quotes just to be safe*/
};

function htmlSpecialCharsEntityEncode(str) {
    return str.replace(htmlSpecialCharsRegEx, function(match) {
        return '&' + htmlSpecialCharsPlaceHolders[match];
    });
}

/**
 * 获取文件名
 */
function getFileName(val) {
    var arr = val.split('/');
    var imgName = '';
    for (var i = 0; i < arr.length; i++) {
        if (i == arr.length - 1) {
            imgName = arr[i]
        }
    }
    return imgName;
}

/**
 * 获取 主机名
 * @returns http://localhost:8080
 */
function getHostName() {

    return window.location.protocol + '//' + window.location.host;
}
/**
 * 获取 dfs的主机名
 */
function getDfsHostName() {
    var rPath = $('#storage_node').val();
    return rPath == undefined ? "http://resource.apaipian.com/resource/" : rPath;
}
/**
 * 获取图片地址
 */
function getResourcesName() {
    //var rPath = "http://resource.apaipian.com/resource/";
    var rPath = "https://file1.apaipian.com:8000/";
    return rPath;
}
/**
 * 数据加分隔符
 * @param number
 * @returns
 */
function thousandCount(number) {
    var tableData;
    if (number == 0) {
        tableData = 0;
    } else {
        if (number != undefined) {
            tableData = number.toLocaleString();
            var indexOf = tableData.indexOf(".");
            if (indexOf > -1) {
                tableData = tableData.substring(0, indexOf);
            }
        }
    }
    return tableData;
}
/**
 * 去掉千分位显示
 */
function DisThousandCount(number) {
    var tableData;
    if (number == 0) {
        tableData = 0;
    } else {
        tableData = number.toLocaleString();
        var indexOf = tableData.indexOf(".");
        if (indexOf > -1) {
            tableData = tableData.substring(0, tableData.indexOf("."));
        }
        tableData = tableData.replace(',', '');
    }
    return tableData;
}
// 重新编码
function htmlSpecialCharsEntityEncode(str) {
    return str.replace(htmlSpecialCharsRegEx, function(match) {
        return '&' + htmlSpecialCharsPlaceHolders[match];
    });
}
var htmlSpecialCharsRegEx = /[<>&\r\n"']/gm;
var htmlSpecialCharsPlaceHolders = {
    '<': 'lt;',
    '>': 'gt;',
    '&': 'amp;',
    '\r': "#13;",
    '\n': "#10;",
    '"': 'quot;',
    "'": 'apos;' /*single quotes just to be safe*/
};

/**
 * 验证 手机号
 * @param str
 */
function checkMobile(str) {
    var reg = /^(0|86|17951)?(13[0-9]|15[012356789]|17[0135678]|18[0-9]|14[57])[0-9]{8}$/;
    if (str.match(reg)) {
        return true;
    } else {
        return false;
    }
}

/**
 * 
 *验证 电话号
 */
function checkphone(str) {
    var reg = /^((0\d{2,3})-)(\d{7,8})(-(\d{3,}))?$/;
    if (str.match(reg)) {
        return true;
    } else {
        return false;
    }
}


/**
 * 验证 邮箱地址
 */
function checkEmail(str) {
    reg = /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
    if (str.match(reg))
        return true;
    else {
        return false;
    }

}

/*
 * 验证 数字
 */
function checkNumber(str) {
    reg = /^[1-9]+[0-9]*]*$/;
    if (str.match(reg))
        return true;
    else
        return false;
}

function checkDecimal(str) {
    reg = /^\d+(\.\d+)?$/;
    if (str.match(reg))
        return true;
    else
        return false;
}
/**
 * 检验 用户名格式
 * @param name 用户名
 */
function checkUserName(name) {
    var reg = /^[a-zA-Z0-9_]{6,16}$/;
    if (name.match(reg))
        return true;
    else
        return false;
}
/**
 * 加密
 * @param word
 * @returns
 */
function Encrypt(word) {
    var cryptKey = '0102030405060708';
    var key = CryptoJS.enc.Utf8.parse(cryptKey);
    var iv = CryptoJS.enc.Utf8.parse(cryptKey);
    var srcs = CryptoJS.enc.Utf8.parse(word);
    var encrypted = CryptoJS.AES.encrypt(srcs, key, { iv: iv, mode: CryptoJS.mode.CBC });
    return encrypted.toString();
}
//使用方法
/*
 webupload({
	 auto:true,
	 server: '',//url
	 pick: '',//点击弹窗
	 submitBtn:'',//提交按钮
	 formData : {},//参数
	 fileQueued:function(file){//选中后执行
	 },
	 uploadProgress:function(file, percentage){},//进度显示
	 uploadSuccess:function( file ,response){//成功回调
	 },
	 uploadComplete:function(file){},
	 uploadError:function(file){}
});
*/

function GMTToStr(time){
    let date = new Date(time)
    let Str=date.getFullYear() + '-' +
    (date.getMonth() + 1) + '-' + 
    date.getDate() + ' ' + 
    date.getHours() + ':' + 
    date.getMinutes() + ':' + 
    date.getSeconds()
    return Str
}



function webupload(param) {
    uploader && uploader.destroy(); //及时销毁,避免,切换导致按钮增大
    var auto = param.auto;
    var submitBtn = param.submitBtn;
    var accept = param.accept;
    var fileNumLimit = param.fileNumLimit;
    var server = param.server;
    var pick = param.pick;
    var data = param.formData;
    var chunked = param.chunked;
    var resize = param.resize;
    if (auto != true) {
        auto = false;
    }
    if (chunked == null || chunked == undefined) {
        chunked = false;
    }
    if (resize == null || resize == undefined) {
        resize = false;
    }
    if (fileNumLimit == null && fileNumLimit == undefined) {
        fileNumLimit = 9999;
    }
    uploader = WebUploader.create({
        auto: auto,
        // swf文件路径
        swf: '/resources/lib/webuploader/Uploader.swf',
        // 文件接收服务端。
        server: server,
        // 选择文件的按钮。可选。
        // 内部根据当前运行是创建，可能是input元素，也可能是flash.
        pick: pick,
        accept: accept,
        // 不压缩image, 默认如果是jpeg，文件上传前会压缩一把再上传！
        resize: resize,

        fileNumLimit: fileNumLimit,
        // 开起分片上传。
        chunked: chunked,
        formData: data,
        duplicate: true //允许重复上传同一个
    });
    // 当有文件被添加进队列的时候
    uploader.on('beforeFileQueued', function(file) {
        if (param.beforeFileQueued) {
            param.beforeFileQueued(file);
        } else {}
    });
    // 当有文件被添加进队列的时候
    uploader.on('fileQueued', function(file) {
        if (param.fileQueued) {
            param.fileQueued(file);
        } else {
            //$('.uploader-list').append('<div id="' + file.id + '" class="item">'
            //			+ '<h4 class="info">' + file.name + '</h4>'
            //			+ '<p class="state">等待上传...</p>' + '</div>');
            //uploader.md5File(file)
            // 及时显示进度
            //.progress(function(percentage) {
            //	console.log('Percentage:', percentage);
            //})
            // 完成
            //.then(function(val) {
            //	console.log('md5 result:', val);
            //});
        }
    });
    // 文件上传过程中创建进度条实时显示。
    uploader.on('uploadProgress', function(file, percentage) {
        if (param.uploadProgress) {
            param.uploadProgress(file, percentage);
        } else {
            /*var $li = $('#' + file.id), $percent = $li
            .find('.progress .progress-bar');
            // 避免重复创建
            if (!$percent.length) {
            	$percent = $(
            			'<div class="progress progress-striped active">'
            					+ '<div class="progress-bar" role="progressbar" style="width: 0%">'
            					+ '</div>' + '</div>')
            			.appendTo($li).find('.progress-bar');
            }
            $li.find('p.state').text('上传中');
            $percent.css('width', percentage * 100 + '%');*/
        }
    });
    uploader.on('uploadSuccess', function(file, response) {
        if (param.uploadSuccess) {
            param.uploadSuccess(file, response);
        } else {}
    });
    uploader.on('uploadError', function(file) {
        if (param.uploadError) {
            param.uploadError(file);
        } else {
            //$('#' + file.id).find('p.state').text('上传出错');
        }
    });

    uploader.on('uploadComplete', function(file) {
        if (param.uploadComplete) {
            param.uploadComplete(file);
        } else {
            //$( '#'+file.id ).find('p.state').text('已上传');
            //$('#' + file.id).find('.progress').fadeOut();
        }
    });
    $(submitBtn).on('click', function() {
        uploader.upload();
        //uploader.stop();
    });
}


//错误提示
function successToolTipShow(error){
        window.clearInterval(successIntervalObj);
        $('.tooltip-success-show').slideDown();
        $(".tooltip-success-show").text(error);
        $(window.parent.parent.parent.document).find('html').scrollTop(0);
        $(window.parent.parent.parent.document).find('body').scrollTop(0);
        successIntervalObj = window.setInterval(hideSuccessTooltip, 3000);
    }
    
function hideSuccessTooltip(){
        $('.tooltip-success-show').slideUp();
    }


// 分享
var share = {
    init: function(url, title, img) {
        mobShare.config({

            debug: true, // 开启调试，将在浏览器的控制台输出调试信息

            appkey: '8c49c537a706', // appkey

            params: {
                url: url, // 分享链接
                title: title, // 分享标题
                description: '拍片网-中国领先的视频营销服务平台', // 分享内容
                pic: img, // 分享图片，使用逗号,隔开
            },

            callback: function(plat, params) {

            }
        });
    }
}