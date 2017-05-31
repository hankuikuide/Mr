/* ***********************************************
 * author :  sunqiang
 * function: 手术详细信息添加
 * history:  created by sunqiang 2016/6/21 15:13:55 
 * ***********************************************/
Ext.define('CisApp.view.drgsapi.report.operationdetail.operationdetailoper.OperationDetailOperModel', {
    extend: 'Ext.app.ViewModel',
    requires: [
    ],
    alias: 'viewmodel.drgsapi_report_operationdetail_operationdetailoper',
    data: {
        operationdetail: null//Ext.create("CisApp.model.drgsapi.report.OperationDetail")
    }
});