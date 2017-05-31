/* ***********************************************
 * author :  李辛
 * function: 手术界面
 * history:  created by 李辛 2016/4/25 15:48:44 
 * ***********************************************/
Ext.define('CisApp.view.drgsapi.report.operation.operationoper.OperationOperModel', {
    extend: 'Ext.app.ViewModel',
    requires: [
    ],
    alias: 'viewmodel.drgsapi_report_operation_operationoper',
    data: {
        operation: Ext.create("CisApp.model.drgsapi.report.Operation"),
    }
});