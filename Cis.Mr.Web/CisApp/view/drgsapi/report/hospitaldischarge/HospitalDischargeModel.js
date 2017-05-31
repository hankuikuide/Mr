/* ***********************************************
 * author :  sunqiang
 * function: 
 * history:  created by sunqiang 2016/4/19 16:44:18 
 * ***********************************************/
Ext.define('CisApp.view.drgsapi.report.hospitaldischarge.HospitalDischargeModel', {
    extend: 'Ext.app.ViewModel',
    requires: [
        'CisApp.store.drgsapi.report.HostpitalDischarge'
    ],
    alias: 'viewmodel.drgsapi_report_hospitaldischarge',
    stores: {
        hostpitalDischarge: {
            type: 'drgsapi_report_hostpitaldischarge'
        }

    },
    data: {
        hostpitalDischargeRecord: null,
        medicalRecord: null //选中的主单
    },
    formulas: {
        btnDisabled: function (get) {
            return get('hostpitalDischargeRecord') == null || get('medicalRecord') == null || (get('medicalRecord').get('IsUpload') == '1');
        },
        btnDisabledAdd: function (get) {
            return get('medicalRecord') == null || (get('medicalRecord').get('IsUpload') == '1');
        }
    }
});