/* ***********************************************
 * author :  何泽立
 * function: 
 * history:  created by 何泽立 2015/11/24 
 * ***********************************************/

Ext.define('CisApp.view.sys.sysuser.UserController', {
    extend: 'Fm.base.GridController',
    alias: 'controller.sys_sysuser_user',
    requires: [
        //'FmApp.view.sys.sysuser.useroper.UserOper',
        //'FmApp.view.sys.sysuser.allottree.AllotTree',
        //'FmApp.view.sys.sysuser.userhospital.UserHospital',
        //'FmApp.view.sys.sysuser.userregion.UserRegion',
        //'FmApp.store.sys.sysuser.AllotStore'
    ],
    autoLoad: true,

    //添加
    add: function () {
        var me = this,
            store = me.getViewModel().getStore('gridstore'),
            record = Ext.create('FmApp.model.sys.sysuser.Sysuser', {
                Id: '0',
                EnableFlag: 1,
                UserType: 1
            });

        Ext.create('Ext.window.Window', {
            title: '添加用户',
            resizable: false,
            modal: true,
            width: 480,
            height: 460,
            layout: 'fit',
            items: {
                xtype: 'sys_sysuser_useroper',
                viewModel: {
                    data: {
                        editUser: record
                    }
                },
                callback: function () {
                    store.reload();
                }
            }
        }).show();
    },

    //修改
    modify: function () {
        var me = this,
            vm = me.getViewModel(),
            store = vm.getStore('gridstore'),
            record = vm.get('focusUser');

        Ext.create('Ext.window.Window', {
            title: '修改用户',
            resizable: false,
            modal: true,
            width: 480,
            height: 460,
            layout: 'fit',
            items: {
                xtype: 'sys_sysuser_useroper',
                viewModel: {
                    data: {
                        editUser: record
                    }
                },
                callback: function () {
                    store.reload();
                }
            },
            listeners: {
                beforeclose: function () {
                    setTimeout(function () {
                        store.rejectChanges();
                    }, 300);
                }
            }
        }).show();
    },

    //删除一个用户
    toDelete: function () {
        var me = this,
            record = me.getViewModel().get('focusUser');//获取点选数据

        Ext.MessageBox.confirm('确认', '您确定要删除选中用户么，该用户关联信息将会全部清除！ ', function (result) {
            if (result === 'yes') {
                Ext.Ajax.request({
                    url: 'fmsys/User/Delete',
                    method: 'post',
                    params: record.data,
                    callback: function (option, sta, res) {
                        var result = Ext.util.JSON.decode(res.responseText);
                        if (result.IsSuccess) {
                            Fm.msg.info("选中用户及相关数据删除成功！");

                            var store = me.getStore('gridstore');//refresh
                            var searchModel = me.getViewModel().data.searchModel.data;

                            store.load({ params: searchModel });
                        }
                    }
                });
            }
        });
    },

    authorityAllot: function () {
        var me = this,
            view = me.getView(),
            vm = view.getViewModel(),
            record = vm.get('focusUser');

        var treeStore = Ext.create('FmApp.store.sys.sysuser.AllotStore');
        treeStore.getProxy().extraParams = {
            userId: record.get('Id'),
            userType: record.get('UserType'),
            appKey: me.appKey
        };
        treeStore.load();
        new Ext.window.Window({
            title: '角色分配',
            width: 360,
            height: 480,
            modal: true,
            layout: 'fit',
            resizable: false,
            items: [
                {
                    xtype: 'fmsys_sysuser_allottree',
                    viewModel: {
                        stores: {
                            treestore: treeStore
                        }
                    },
                    callBack: function (roles, view) {
                        Ext.Ajax.request({
                            url: 'fmsys/User/SaveAllot',
                            method: 'post',
                            params: {
                                userId: record.get('Id'),
                                userType: record.get('UserType'),
                                roles: roles,
                                appKey: me.appKey
                            },
                            callback: function (option, sta, res) {
                                var resText = Ext.util.JSON.decode(res.responseText);
                                if (resText.IsSuccess) {
                                    Fm.msg.info('角色分配操作成功');
                                    view.up('window').close();
                                }
                            }
                        });
                    }
                }
            ]
        }).show();
    },

    hospitalAllot: function () {
        var me = this,
            view = me.getView(),
            vm = view.getViewModel(),
            store = vm.getStore('gridstore'),
            record = vm.get('focusUser');

        Ext.create('Ext.window.Window', {
            title: '机构分配',
            resizable: false,
            width: 800,
            height: 600,
            modal: true,
            layout: 'fit',
            items: [{
                xtype: 'sys_sysuser_userhospital',
                viewModel: {
                    data: {
                        UserId: record.get('Id'),
                        Name: '当前机构名称：' + record.get('OrgName')
                    }
                },
                callback: function (select, view) {
                    me.refresh();
                }
            }]
        }).show();
    },

    regionAllot: function () {
        var me = this,
            view = me.getView(),
            vm = view.getViewModel(),
            store = vm.getStore('gridstore'),
            record = vm.get('focusUser');

        Ext.create('Ext.window.Window', {
            title: '统筹区分配',
            resizable: false,
            width: 360,
            height: 480,
            modal: true,
            layout: 'fit',
            items: [{
                xtype: 'sys_sysuser_userregion',
                viewModel: {
                    data: {
                        userId: record.get('Id')
                    }
                },
                selModel: {
                    mode: record.get('UserType') == '1' ? 'SIMPLE' : 'SINGLE',
                    selType: 'checkboxmodel',
                    allowDeselect: true,
                    bindCheckedField: 'IsAllot'
                },
                callback: function (select, view) {
                    me.refresh();
                }
            }]
        }).show();
    }
});