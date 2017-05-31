/* ***********************************************
 * author :  何泽立
 * function: 
 * history:  created by 何泽立 2015/11/24 
 * ***********************************************/

Ext.define('CisApp.view.sys.sysuser.UserModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.sys_sysuser_user',
    requires: [
        'CisApp.store.sys.sysuser.User'
    ],
    stores: {
        gridstore: {
            autoLoad: true,
            type: 'sys_sysuser'
        }
        //usertype: fmAppFactory.Data.getAllDataStore('UserType')
    },

    data: {
        searchModel: {
            Type: null,
            Code: '',
            Name: ''
        },
        appKey: Fm.Server.Config.AppKey,
        focusUser: null
    },
    formulas: {
        allotBtnDisabled: function (get) {
            return get('focusUser') == null;
        },
        hospitalBtnDisabled: function (get) {
            return get('allotBtnDisabled') || get('focusUser').get('UserType') == '1';
        },
        userBtnDisabled: function (get) {
            return get('allotBtnDisabled') || get('focusUser').get('UserType') == '2';
        }
    }
});