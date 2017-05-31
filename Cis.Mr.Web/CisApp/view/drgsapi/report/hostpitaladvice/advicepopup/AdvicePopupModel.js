/* ***********************************************
 * author :  sunqiang
 * function: 
 * history:  created by sunqiang 2016/4/20 9:49:49 
 * ***********************************************/
Ext.define('CisApp.view.drgsapi.report.hostpitaladvice.advicepopup.AdvicePopupModel', {
    extend: 'Ext.app.ViewModel',
    requires: [
    ],
    alias: 'viewmodel.drgsapi_report_hostpitaladvice_advicepopup',
    data: {
        hostpitaladvice: Ext.create("CisApp.model.drgsapi.report.HospitalAdvice"),
        medicalRecord: null
    },
    formulas: {
        txtTradeNo: function (get) {
            return get("hostpitaladvice").data.OutBedNum != '';
        }
    }
    
});