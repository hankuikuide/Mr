/* ***********************************************
 * author :  sunqiang
 * function: 
 * history:  created by sunqiang 2016/6/21 17:20:29 
 * ***********************************************/
Ext.define('CisApp.store.drgsapi.report.OperationDetail', {
    extend: 'Fm.base.Store',
    alias: 'store.drgsapi_report_operationdetail',
    model: 'CisApp.model.drgsapi.report.OperationDetail',
    proxy: {
        type: 'ajax',
        api: {
            read: '/group/operationdetail/GetOperationdetail'
        }
    }
});