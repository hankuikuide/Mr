/* ***********************************************
 * author :  李辛
 * function: 
 * history:  created by 李辛 2016/4/18 14:30:54 
 * ***********************************************/
Ext.define('CisApp.view.drgsapi.report.inspection.InspectionModel', {
    extend: 'Ext.app.ViewModel',
    requires: [
           'CisApp.store.drgsapi.report.Inspection'
    ],
    alias: 'viewmodel.drgsapi_inspection',
    stores: {
        gridstore: {
            type: 'drgsapi_inspection'
        }
    },
    data: {
        title: '检验单',
        focus: null,
        clickRecord: null,
        medicalRecord: null  // 选中病案
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