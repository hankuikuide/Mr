/* ***********************************************
 * author :  sunqiang
 * function: 手术详细界面
 * history:  created by sunqiang 2016/6/21 15:12:57 
 * ***********************************************/
Ext.define('CisApp.view.drgsapi.report.operationdetail.OperationDetailModel', {
    extend: 'Ext.app.ViewModel',
    requires: [
        'CisApp.store.drgsapi.report.OperationDetail'
    ],
    alias: 'viewmodel.drgsapi_report_operationdetail',
    stores: {
        gridstore: {
            type: 'drgsapi_report_operationdetail'
        }
    },
    data: {
        focus: null,
        medicalRecord: null,
        operation: null,
        enableListener: false  
    },
    formulas: {
        btnDisabled: function (get) { 
            return get('focus') == null || (get('medicalRecord').get('IsUpload') == '1');
        },
        btnDisabledAdd: function (get) {
            return get('operation') == null || (get('medicalRecord').get('IsUpload') == '1');
        }
    }
});