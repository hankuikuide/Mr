/* ***********************************************
 * author :  sunqiang
 * function: 
 * history:  created by sunqiang 2016/4/21 18:52:57 
 * ***********************************************/
Ext.define('CisApp.view.drgsapi.report.hospitaldischarge.dischargepopup.DischargePopupModel', {
    extend: 'Ext.app.ViewModel',
    requires: [
    ],
    alias: 'viewmodel.drgsapi_report_hospitaldischarge_dischargepopup',
    data: {
        hostpitaldischarge: Ext.create("CisApp.model.drgsapi.report.HostpitalDischarge"),
        medicalRecord: null
    },
    formulas: {
        txtTradeNo: function (get) {
            return get("hostpitaldischarge").data.OutBedNum != '';
        }
    }
});