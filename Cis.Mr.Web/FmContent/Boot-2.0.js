window.FmApp = { Server: { Datas: {} } };
function fmAppCallback(data) {
    window.Fm.Server = data;
    window.FmApp.Server.Datas = data.Datas;
}

(function () {
    function addCssByLink(url) {
        var doc = document;
        var link = doc.createElement("link");
        link.setAttribute("rel", "stylesheet");
        link.setAttribute("type", "text/css");
        link.setAttribute("href", (AppConfig.urlStartWith + url).replace('//', '/'));

        var heads = doc.getElementsByTagName("head");
        if (heads.length)
            heads[0].appendChild(link);
        else
            doc.documentElement.appendChild(link);
    }

    var fmVersion = '2.0';
    var fmParam = AppConfig.isDev ? new Date().getTime() : fmVersion;
    var appParam = AppConfig.isDev ? new Date().getTime() : AppConfig.version;

    document.title = AppConfig.appTitle;

    addCssByLink('/FmContent/css/fm/fm.css?v=' + fmParam);

    var mainDiv = document.createElement('div');
    mainDiv.id = 'start_main';
    mainDiv.innerHTML = '<div class="index-main"><b id="start_main_msg" class="index-main-msg">15% 正在加载主题文件...</b>' + AppConfig.maskHtml + '</div>';
    document.body.appendChild(mainDiv);

    //var _login = Cookie.get(AppConfig.loginCookieName + "_sign");
    //if (!_login) {
    //    window.location.href = AppConfig.loginUrl;
    //}

    //加载css
    var bootCss = [
        '/FmContent/css/theme-6.21/classic/resources/FmApp-all' + (AppConfig.isDev ? "" : ".min") + '.css?_v=' + fmParam,
        '/FmContent/css/fm/extcommon.css?_v=' + fmParam,
        '/FmContent/css/iconfont/iconfont.css?_v=' + fmParam
    ];

    if (AppConfig.isUseUeditor) {
        bootCss.push('/FmContent/lib/ueditor/themes/default/css/ueditor' + (AppConfig.isDev ? "" : ".min") + '.css?_v=' + fmParam);
    }

    if (AppConfig.isUseMindMap) {
        bootCss.push('/FmContent/lib/jsmind/style/jsmind.css?_v=' + fmParam);
    }

    for (var i = 0; i < bootCss.length; i++) {
        addCssByLink(bootCss[i]);
    }

    //加载js
    var bootScript = [
        {
            url: '/fmshared/basedata/getserverdata?_t=' + new Date().getTime(),
            size: 100,
            description: '数据'
        },
        {
            url: '/FmContent/lib/extjs621/build/ext-all' + (AppConfig.isDev ? "-debug" : "") + '.js?_v=' + fmParam,
            size: 800,
            description: '框架'
        }, {
            url: '/FmContent/lib/extjs621/build/theme-triton' + (AppConfig.isDev ? "-debug" : "") + '.js?_v=' + fmParam,
            size: 20,
            description: '框架'
        }, {
            url: '/FmContent/lib/extjs621/build/locale-zh_CN' + (AppConfig.isDev ? "-debug" : "") + '.js?_v=' + fmParam,
            size: 10,
            description: '语言'
        }
    ];

    if (AppConfig.enableGridClickCopy && !Fm.Browser.isIE8) {
        bootScript.push({
            url: '/FmContent/lib/clipboard/clipboard' + (AppConfig.isDev ? "" : ".min") + '.js?v=' + fmParam,
            size: 30,
            description: '插件'
        });
    }

    if (AppConfig.isUseRsa) {
        bootScript.push({
            url: '/FmContent/lib/jsencrypt/jsencrypt.min.js?_v=' + fmParam,
            size: 20,
            description: '插件'
        });
    }

    if (AppConfig.isUseJsZip) {
        bootScript.push({
            url: '/FmContent/lib/jszip/jszip.min.js?_v=' + fmParam,
            size: 20,
            description: '插件'
        });
    }

    if (AppConfig.isUseUeditor) {
        bootScript.push({
            url: '/FmContent/lib/ueditor/ueditor.config.js?_v=' + fmParam,
            size: 10,
            description: '插件'
        });
        bootScript.push({
            url: '/FmContent/lib/ueditor/ueditor.all' + (AppConfig.isDev ? "" : ".min") + '.js?_v=' + fmParam,
            size: 300,
            description: '插件'
        });
        bootScript.push({
            url: '/FmContent/lib/ueditor/cisupdate.js?_v=' + fmParam,
            size: 5,
            description: '插件'
        });
        bootScript.push({
            url: '/FmContent/lib/ueditor/lang/zh-cn/zh-cn.js?_v=' + fmParam,
            size: 5,
            description: '插件'
        });
    }

    if (AppConfig.isUseMindMap) {
        bootScript.push({
            url: '/FmContent/lib/jsmind/js/jsmind.js?_v=' + fmParam,
            size: 5,
            description: '插件'
        });
    }

    if (AppConfig.isUseEcharts) {
        bootScript.push({
            url: '/FmContent/lib/echarts-2.2.7/build/dist/echarts-all.js?_v=' + fmParam,
            size: 800,
            description: '插件'
        });
    }

    bootScript.push({
        url: '/FmContent/lib/jqurey/jquery.js?_v=' + fmParam,
        size: 100,
        description: '插件'
    });

    if (AppConfig.isUseUpload) {
        bootScript.push({
            url: '/FmContent/lib/webuploader/webuploader.min.js?_v=' + fmParam,
            size: 200,
            description: '插件'
        });
    }

    bootScript.push({
        url: '/fmapp/build/_enumdata.js?_v=' + fmParam,
        size: 20,
        description: '数据'
    });
    bootScript.push({
        url: '/FmContent/build/_viewconfig.js?_v=' + new Date().getTime(),
        size: 50,
        description: '数据'
    });
    bootScript.push({
        url: '/FmContent/build/_lang.js?_v=' + new Date().getTime(),
        size: 20,
        description: '资源'
    });
    bootScript.push({
        url: '/FmContent/build/fmlib-2.0.all' + (AppConfig.isDev ? "" : ".min") + '.js?_v=' + fmParam,
        size: 100,
        description: '启动'
    });

    var getMsgFn = function (msg) {
        return '<script type="text/javascript">document.getElementById("start_main_msg").innerHTML="' + msg + '";</script>';
    };
    var allSize = 0,
        nowPro = 40;
    for (var i = 0; i < bootScript.length; i++) {
        allSize += bootScript[i].size;
    }
    var jsStr = '';
    for (var i = 0; i < bootScript.length; i++) {
        jsStr += getMsgFn(nowPro + '% 正在加载' + bootScript[i].description + '组件...');
        var newUrl = (AppConfig.urlStartWith + bootScript[i].url).replace('//', '/');
        jsStr += '<script src="' + newUrl + '" type="text/javascript"> </script>';
        nowPro += Math.floor((bootScript[i].size / allSize) * 50);
    }
    jsStr += getMsgFn('90% 正在初始化界面...');

    document.write(jsStr);
})();