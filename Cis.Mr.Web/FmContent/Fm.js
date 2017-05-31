window.String.prototype.trim = function () { return this.replace(/(^\s*)|(\s*$)/g, ""); }
window.String.prototype.lTrim = function () { return this.replace(/(^\s*)/g, ""); }
window.String.prototype.rTrim = function () { return this.replace(/(\s*$)/g, ""); }
if (!Array.prototype.indexOf) {
    Array.prototype.indexOf = function (elt /*, from*/) {
        var len = this.length >>> 0;
        var from = Number(arguments[1]) || 0;
        from = (from < 0)
	         ? Math.ceil(from)
	         : Math.floor(from);
        if (from < 0)
            from += len;
        for (; from < len; from++) {
            if (from in this &&
                this[from] === elt)
                return from;
        }
        return -1;
    };
}

var Cookie = {
    set: function (name, value, expiredays, path, domain, secure) {
        var str = name + "=" + escape(value);
        if (!expiredays) {
            expiredays = 7;
        }
        var expires = new Date();
        expires.setDate(expires.getDate() + expiredays);
        str += "; expires=" + expires.toGMTString();
        if (path) {
            str += "; path=" + path;
        }
        else {
            str += "; path=/";
        }
        if (domain) {
            str += "; domain=" + domain;
        }
        if (secure) {
            str += "; secure";
        }
        document.cookie = str;
    },
    //获取
    get: function (cookieName) {
        var c = document.cookie + ";";
        var re = /\s?(.*?)=(.*?);/g;
        while ((matches = re.exec(c)) != null) {
            if (matches[1] == cookieName) {
                return unescape(matches[2]);
            }
        }
        return "";
    },
    //删除
    del: function (cookieName) {
        var expires = new Date();
        expires.setDate(expires.getDate() - 1); //将expires设为一个过去的日期，浏览器会自动删除它
        document.cookie = cookieName + "=; expires=" + expires.toGMTString();
    }
};

var __crossDomainTick = 0;
function crossDomain(type, url, onsuccess, onerror, oncomplete) {
    var head = document.getElementsByTagName("head")[0];

    // 设置回调为
    var callbackName = "prefixcallback" + new Date().getTime() + __crossDomainTick;
    __crossDomainTick++;

    // 创建回调函数
    if (type == "jsonp") {
        window[callbackName] = function () {
            if (onsuccess) { onsuccess(arguments[0]); }
            if (oncomplete) { oncomplete(); }
        }
    }

    // 创建一个 script 的 DOM 对象
    var script = document.createElement("script");
    script.reload = '1';
    script.type = 'text/javascript';
    // 设置其同步属性
    script.async = true;

    // 设置其地址
    if (url) {
        script.src = url.replace(/#.*$/, "") + (/\?/.test(url) ? "&" : "?") + "callback=" + callbackName;
    }

    // 监听
    script.onload = script.onreadystatechange = function () {
        if (!script.readyState || /loaded|complete/.test(script.readyState)) {
            script.onload = script.onreadystatechange = null;
            
            // 移除该 script 的 DOM 对象
            if (script.parentNode) {
                script.parentNode.removeChild(script);
            }

            // 删除函数或变量
            window[callbackName] = null;
        }
    }

    script.onerror = function () {
        if (onerror) {
            onerror();
        }

        if (oncomplete) {
            oncomplete();
        }

        if (script.parentNode) {
            script.parentNode.removeChild(script);
        }

        window[callbackName] = null;
    }

    // 插入head
    head.appendChild(script);
}

/**
*获取URL参数
*name:参数名
*/
function getQueryString(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) {
        return unescape(r[2]);
    }
    return null;
}

(function () {
    var ua = navigator.userAgent.toLowerCase(),
        isIE = (!!window.ActiveXObject || "ActiveXObject" in window);
    var Fm = window.Fm = {
        //框架配置
        Config: {
            //框架版本号
            version: 'v1.0',
            clientDate: new Date()
        },
        //浏览器
        Browser: {
            isIE: isIE,
            isIE8: isIE && ua.indexOf("msie") > -1 && parseInt(ua.match(/msie ([\d.]+)/)[1]) === 8.0,
            isIE9: isIE && ua.indexOf("msie") > -1 && parseInt(ua.match(/msie ([\d.]+)/)[1]) === 9.0,
            isIE10: isIE && ua.indexOf("msie") > -1 && parseInt(ua.match(/msie ([\d.]+)/)[1]) === 10.0
        },
        Data: {
            //主题
            Themes: [
                { backColor: '#0E9C94', cssPath: 'all' },
                { backColor: '#498FBD', cssPath: 'blue' },
                { backColor: '#2C3E50', cssPath: 'hierapolis' },
                { backColor: '#A75252', cssPath: 'red' },
                { backColor: '#C37E37', cssPath: 'orange' }
            ]
        }
    };
})();
