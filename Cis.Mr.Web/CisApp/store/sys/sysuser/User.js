
Ext.define('CisApp.store.sys.sysuser.User', {
    extend: 'Fm.base.Store',
    model: 'CisApp.model.sys.sysuser.User',
    alias: 'store.sys_sysuser',
    proxy: {
        api: {
            read: 'api/services/CisApi/user/GetUsers'
        },
        reader: {
            rootProperty: 'Result.Items',
            totalProperty: "Result.TotalCount"
        },
        limitParam: "MaxResultCount",
        startParam: 'skipCount'
    }
});