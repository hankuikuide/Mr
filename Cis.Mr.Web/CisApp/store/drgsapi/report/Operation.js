/* ***********************************************
 * author :  localadmin
 * function: 
 * history:  created by localadmin 2016/4/25 15:49:23 
 * ***********************************************/
Ext.define('CisApp.store.drgsapi.report.Operation', {
    extend: 'Fm.base.Store',
    alias: 'store.drgsapi_report_operation',
    model: 'CisApp.model.drgsapi.report.Operation',
    proxy: {
        type: 'ajax',
        api: {
            read: '/group/operation/GetOperation'
        } 
    }
});