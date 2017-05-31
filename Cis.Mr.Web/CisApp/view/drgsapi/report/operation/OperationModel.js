/* ***********************************************
 * author :  localadmin
 * function: 手术界面
 * history:  created by localadmin 2016/4/25 15:47:08 
 * ***********************************************/
Ext.define('CisApp.view.drgsapi.report.operation.OperationModel', {
    extend: 'Ext.app.ViewModel',
    requires: [
        'CisApp.store.drgsapi.report.Operation'
    ],
    alias: 'viewmodel.drgsapi_report_operation',
    stores: {
        gridstore: {
            type: 'drgsapi_report_operation',
            listeners: {
                load: 'dataLoaded'
            }
        }
    },
    data: {
        focus: null,
        clickRecord: null,
        medicalRecord: null,
        enableListener: false
    },
    formulas: {
        btnDisabled: function (get) {
            return get('focus') == null || (get('medicalRecord').get('IsUpload') == '1');
        },
        btnDisabledAdd: function (get) {
            return get('medicalRecord') == null || (get('medicalRecord').get('IsUpload') == '1');
        }
    }
});