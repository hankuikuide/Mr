///* ***********************************************
// * author :  苗建龙
// * function: 
// * history:  created by FeiLong 2015/5/11 16:21:57 
// * ***********************************************/
Ext.ns('CisApp.Common').Util = {
    //drgs 需要提示 加参数 true 为显示 默认空不显示
    getCcFlagClassify: function (tips) {
        return function (data, metadata, record) {
            var value = data.replace("0", "无").replace("1", "普通").replace("2", "严重");
            if (tips && metadata !== null) {
                metadata.tdAttr = 'data-qtip="' + value + '"';
            }
            return value;
        }
    },
    //drgs 需要添加drgs 类型
    getDrgType: function (tips) {
        return function (data, metadata, record) {
            var value = data.replace("M", "内科").replace("S", "外科");
            if (tips && metadata !== null) {
                metadata.tdAttr = 'data-qtip="' + value + '"';
            }
            return value;
        }
    },
    //CodeToText
    dataCodeToTextRender: function (datas) {
        return function (v) {
            if (v !== undefined && v !== null && v !== "") {
                var _item = Ext.Array.findBy(datas, function (item, index) {
                    return item.Code == v;
                });
                if (_item) {
                    return _item.Text
                }
            }
            return '';
        }
    },
    jsonDataToTextRender: function (datas) {
        return function (jsonData) {
            var values = Ext.decode(jsonData);
            var res = "";
            if (values) {
                for (var prop in values) {
                    var _item = Ext.Array.findBy(datas, function (item, index) {
                        return item.Value == prop;
                    });
                    if (_item) {
                        var _value = values[prop];
                        if (_value.trim() !== "") {
                            if (_item.IsEnum) {
                                _value = CisApp.Common.Util.dataCodeToTextRender(Ext.ns("CisApp.Server.Datas")[_item.EnumName])(values[prop]);
                            }
                        } else {
                            _value = "修改为空";
                        }
                        res += _item.Text + ":" + _value + ";";
                    }
                }
                if (res.length < 1) {
                    res = "未修改内容";
                }
            } else {
                res = "未修改内容";
            }
            return res;
        }
    }
}