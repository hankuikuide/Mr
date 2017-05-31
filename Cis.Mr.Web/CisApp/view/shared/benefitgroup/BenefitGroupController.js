/* ***********************************************
 * author :  hankk
 * function: 
 * history:  created by hankk 2016/7/1 14:45:48 
 * ***********************************************/
Ext.define('CisApp.view.shared.benefitgroup.BenefitGroupController', {
    extend: 'Fm.base.GridController',
    alias: 'controller.shared_benefitgroup',
    config: {
        control: {
            //默认执行搜索
            'shared_benefitgroup': {
                afterrender: function () {
                    var me = this,
                       children = [],
                       view = me.getView(),
                       vm = me.getViewModel();                    
                    children = me.getForData(CisApp.Server.Datas['BenefitGroups']);

                    if (children && children.length === 1) {
                        vm.set('benefitgroup', Ext.create('Ext.data.TreeStore', {
                            fields: ['value', 'text'],
                            root:
                            {
                                text: children[0]['text'],
                                value: -1,
                                expanded: true,
                                checked: children[0]['checked'],
                                children: children[0]['children']
                            }
                        }));
                    } else {
                        vm.set('benefitgroup', Ext.create('Ext.data.TreeStore', {
                            fields: ['value', 'text'],
                            root:
                            {
                                text: '全部',
                                value: -1,
                                expanded: true,
                                checked: false,
                                children: children
                            }
                        }));
                    }
                }
            }
        }
    },
    getForData: function (data) {
        var getArray = function (data, _text) {
            var cg = [],
                index = 0;

            for (var i = 0; i < data.length; i++) {
                //判断是否有权限
                if (data[i].IsAlloted === true) {

                    if (Ext.isArray(data[i].Children)) {
                        cg[index] = {
                            value: data[i].Id,
                            text: data[i].Name,
                            leaf: data[i].Children.length > 0 ? false : true,
                            checked: false,
                            children: getArray(data[i].Children, data[i].Name)
                        };
                    }
                    else {
                        var items = [];
                        Ext.each(data, function (item) {
                            var childenItem = {
                                value: item.Id,
                                text: item.Name,
                                Id: item.Id,
                                leaf: true,
                                checked: false
                            };
                            items.push(childenItem);
                        });
                        return items;
                    }

                    index = index + 1;
                }
            }
            return cg;
        };
        return getArray(data);

    }
});