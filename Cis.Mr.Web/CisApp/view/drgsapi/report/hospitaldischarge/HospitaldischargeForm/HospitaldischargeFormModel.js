/* ***********************************************
 * author :  likeyi
 * function: 
 * history:  created by likeyi 2016/7/1 11:12:48 
 * ***********************************************/
Ext.define('CisApp.view.drgsapi.report.hospitaldischarge.HospitaldischargeForm.HospitaldischargeFormModel', {
    extend: 'Ext.app.ViewModel',
    requires: [
    ],
    alias: 'viewmodel.drgsapi_report_hospitaldischarge_HospitaldischargeForm',
    data: {
        hostpitaldischarge: Ext.create("CisApp.model.drgsapi.report.HostpitalDischarge"),
        billRecord: Ext.create("CisApp.model.drgsapi.report.Medical"),
        enableListener: false
    },
    formulas: {
        btnAdd: function (get) {
            return get('billRecord') == null || (get('billRecord').get('IsUpload') == '1');
        },
        txtTradeNo: function (get) {
            return get("hostpitaldischarge").data.OutBedNum != '';
        },
        defaultValue: function (get) {
            var me = this;
            var form = get('hostpitaldischarge');
            if (form.get('DischargeOutcome') == '' || form.get('DischargeOutcome') == null) {
                form.set('DischargeOutcome', '1');
            }
        }
    }
});