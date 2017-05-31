/* ***********************************************
 * author :  
 * function: 
 * history:  created by   
 * ***********************************************/
Ext.ns('CisApp.Common').Core = {
    Shared: {
        getMenuData: function () {
            var _data = CisApp.Server.Datas.Menus;

            var getSub = function (_pid, noIcon) {
                var _temp = Ext.Array.filter(_data, function (item, index) {
                    return item.ParentId === _pid && item.Name !== '_';
                });

                for (var i = 0; i < _temp.length; i++) {
                    var item = _temp[i];
                    if (!noIcon) {
                        if (item.Icon && Ext.String.trim(item.Icon) != '') {
                            item.iconCls = item.Icon;
                        } else {
                            item.iconCls = 'fa fa-chevron-right';
                        }
                    }
                    //item.Icon = undefined;
                    if (item.ViewParams && typeof item.ViewParams === 'string') {
                        item.ViewParams = Ext.JSON.decode(item.ViewParams);
                    }
                    item.text = item.Name;

                    var _sub = getSub(item.Id, true);
                    if (_sub.length > 0) {
                        item.children = _sub
                    } else {
                        item.leaf = true;
                    }
                }
                return _temp;
            }

            return getSub(0);
        },
        getForData: function (data) {
            var getarray = function (data, _text) {
                if (!data) {
                    return;
                }
                var cg = [];
                for (var i = 0; i < data.length; i++) {
                    if (Ext.isArray(data[i].Value)) {
                        cg[i] = {
                            text: data[i].Text,
                            leaf: false,
                            checked: false,
                            children: getarray(data[i].Value, data[i].Text)
                        };
                    } else {
                        var childen = [];
                        for (var j = 0; j < data.length; j++) {
                            childen[j] = {
                                GroupRuleBit: _text + '|' + data[j].RuleBit,
                                RuleBit: data[j].RuleBit,
                                value: data[j].RuleBit,
                                text: data[j].Name,
                                Id: data[j].Id,
                                leaf: true,
                                checked: false
                            };
                        }
                        return childen;
                    }
                }
                return cg;
            };
            return getarray(data);

        }
    }
}