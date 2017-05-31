/* ***********************************************
 * author :  何泽立
 * function: 角色管理 controller
 * history:  created by 何泽立 2015/7/24 
 * ***********************************************/

Ext.define('CisApp.view.sys.sysmenu.MenuController', {
    extend: 'Ext.app.ViewController',
    requires: [

    ],
    alias: 'controller.sys_sysmenu',

    init: function () {
       // this.search();
    },
    itemclick: function (obj, record, c, d, e) {
        var me = this,
            vm = me.getViewModel();

        vm.set('operationtype', 'update');
    },
    search: function () {
        var me = this,
            view = me.getView(),
            vm = view.getViewModel(),
            store = vm.getStore('menutreestore'),
            appKey = vm.get('appKey');

        var data = [];
        Ext.Ajax.request({
            url:'/api/services/CisApi/menu/GetMenus',
            params: { name: appKey },
            callback: function (option, sta, response) {
                var res = Ext.JSON.decode(response.responseText);
                
                if (res.Success) {
                    data = res.Result;
                    store.setRoot({
                        expanded: true,
                        Name: "新版本审核系统",
                        Id: 0,
                        children: []
                    });
                    var children = Fm.Array.tier(data, 'Id', 'ParentId',{ expanded: true, Id: 0 }, true).children;
                    store.root.appendChild(children || []);
                }
            }
        });
    },

    onAddMenu: function () {
        var me = this,
            view = me.getView(),
            vm = view.getViewModel(),
            store = vm.getStore('menustore'),
            record = vm.get('focusMenu'),
            parentId = '0';

        vm.set('operationtype', 'create');
    },

    onSave:function () {
        var me = this,
        view = me.getView(),
        vm = view.getViewModel(),
        selection = vm.get('selection'),
        operationtype = vm.get('operationtype'),
        treestore = vm.getStore('menutreestore'),
        url,params,msg;

        if (operationtype ==="create") {
            url = "/sys/menu/createmenu";
            params = selection.data;
            params.ParentId = params.Id;
            msg = "添加成功";

        } else {
            url = "/sys/menu/updatemenu";
            params = selection.data;
            msg = "修改成功"
        }

        Ext.Ajax.request({
            url: url,
            params: params,
            method: 'post',
            callback: function (req, sta, res) {
                if (sta) {
                    var result = Ext.JSON.decode(res.responseText);
                    if (result.Success) {
                        Fm.msg.info(msg);
                    }
                    //if (record) {
                    //    if (model.get('ParentId') != record.get('Id')) {
                    //        record = record.parentNode;
                    //    }
                    //    if (isAdd) {
                    //        model.set('Id', Ext.JSON.decode(res.responseText).Result);
                    //        record.set('leaf', false);
                    //        record.appendChild([model.data]);
                    //    }
                    //} else {
                    //    treestore.root.appendChild([model.data]);
                    //}
                    treestore.commitChanges();
                    //view.close();
                }
            }
        });

    },
    onDelete: function () {
        var me = this,
            view = me.getView(),
            vm = view.getViewModel(),
            store = vm.getStore('menustore'),
            record = vm.get('selection');

        if (!record.get('leaf') && record.childNodes.length > 0) {
            Fm.msg.info('删除菜单或目录必须先删除所有子菜单和功能！');
            return;
        }
        Ext.MessageBox.confirm("提示", "请您确认是否删除此菜单！", function (btn) {
            if (btn === 'yes') {
                Ext.Ajax.request({
                    url: '/sys/menu/deletemenu',
                    method: 'post',
                    params: { menuId: record.get('Id') },
                    callback: function (req, sta, res) {
                        if (sta && res.responseJson.IsSuccess) {
                            var pNode = record.parentNode;
                            pNode.removeChild(record);
                            if (pNode.childNodes.length == 0 && pNode.get('OperationType') != '0') {
                                pNode.set('leaf', true);
                            }
                            Fm.msg.info('菜单信息删除成功！');
                        }
                    }
                });
            }
        });
    }
});