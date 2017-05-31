/* ***********************************************
 * author :  Vinge
 * function: 生命体征
 * history:  created by Vinge 2016/04/21 13:32:25 
 * ***********************************************/
Ext.define('CisApp.view.drgsapi.report.vitalsigns.VitalsignsModel', {
    extend: 'Ext.app.ViewModel',
    requires: [
        'CisApp.store.drgsapi.report.Vitalsigns'
    ],
    alias: 'viewmodel.drgsapi_report_vitalsigns',

    stores: {
        gridstore: {
            type: 'drgsapi_report_vitalsigns'
        }
    },
    data: {
        title: '生命体征',
        focus: null,
        medicalRecord: null
    },
    formulas: {
        btnDisabled: function (get) {
            return get('focus') == null||get('medicalRecord') == null || (get('medicalRecord').get('IsUpload') == '1');
        },
        btnDisabledAdd: function (get) {
            return get('medicalRecord') == null || (get('medicalRecord').get('IsUpload') == '1');
        }
    }

    
});