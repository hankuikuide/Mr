/* ***********************************************
 * author :  何泽立
 * function: 角色管理 model
 * history:  created by 何泽立 2015/7/24 
 * ***********************************************/

Ext.define('CisApp.view.sys.sysmenu.MenuModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.sys_sysmenu',
    stores: {
        //menustore: {
        //    type: 'sys_sysmenu'
        //},
        menutreestore: new Ext.data.TreeStore({
            text: '.',
            root: { expand: true }
        })
    },
    data: {
        appKey: Fm.Server.Config.AppKey,
        selection: null,
        operationtype: 'update'
    },
    formulas: {
        parentDisabled: function (get) {
            return get('operationtype') === 'update';
        },
        //删除
        deletedisabled: function (get) {
            return get('disabled') || !get('focusMenu').get('leaf');
        }
    }
})