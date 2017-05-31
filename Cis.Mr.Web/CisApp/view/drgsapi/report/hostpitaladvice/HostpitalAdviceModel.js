/* ***********************************************
 * author :  sunqiang
 * function: 
 * history:  created by sunqiang 2016/4/19 13:46:04 
 * ***********************************************/
Ext.define('CisApp.view.drgsapi.report.hostpitaladvice.HostpitalAdviceModel', {
    extend: 'Ext.app.ViewModel',
    requires: [
        'CisApp.store.drgsapi.report.HospitalAdvice'
    ],
    stores: {
        hostpitalAdvice: {
            type: 'drgsapi_report_hospitaladvice'
        }
    },
    data: {
        medicalRecord: null,  // 选中病案
        hospitaladviceRecord: null// 选中医嘱
    },
    alias: 'viewmodel.drgsapi_report_hostpitalAdvice',
    formulas: {
        btnDisabled: function (get) {
            return get('hospitaladviceRecord') == null || get('medicalRecord') == null || (get('medicalRecord').get('IsUpload') == '1');
        },
        btnDisabledAdd: function (get) {
            return get('medicalRecord') == null || (get('medicalRecord').get('IsUpload') == '1');
        }
    }
});