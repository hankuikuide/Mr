/* ***********************************************
 * author :  likeyi
 * function: 
 * history:  created by likeyi 2016/7/8 13:28:22 
 * ***********************************************/
Ext.define('CisApp.view.drgsapi.report.medical.medicalseach.MedicalSeachModel', {
    extend: 'Ext.app.ViewModel',
    requires: [
    ],
    alias: 'viewmodel.drgsapi_report_medical_medicalseach',
    data: {
        seachData: null,
        orgCode: false
    },
    formulas: {
        seachData: function () {
            var startDate = Ext.Date.format(Ext.Date.parse(CisApp.Server.Config.SearchMonthStartDay, "Y-m-d"), 'Y-m-d');//Ext.Date.format(Ext.Date.getFirstDateOfMonth(new Date()), 'Y-m-d');
            var endDate = Ext.Date.format(Ext.Date.parse(CisApp.Server.Config.SearchMonthEndDay, "Y-m-d"), 'Y-m-d');// Ext.Date.format(Ext.Date.getLastDateOfMonth(new Date()), 'Y-m-d');
            return Ext.create('CisApp.model.drgsapi.report.MedicalSeach', {
                AdmissionDateS: startDate,
                AdmissionDateE: endDate,
                HospitalId: '1101' //Fm.Server.CurrentUser.OrgId
            })
        },
        comboValidateEnabled: function (get) {
            return get('comboValidateEnableFlag') === null;
        },
        orgCode: function () {
            var me = this,
                upview = me.getView().up('drgsapi_report_medical_medicalcontainer');//.down('drgsapi_medical');
            return !upview.bbarHidden;
        }
    }
});