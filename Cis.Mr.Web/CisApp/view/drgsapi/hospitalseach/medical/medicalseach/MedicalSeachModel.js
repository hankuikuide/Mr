/* ***********************************************
 * author :  likeyi
 * function: 无结算查询
 * history:  created by likeyi 2016/8/27 10:55:03 
 * ***********************************************/
Ext.define('CisApp.view.drgsapi.hospitalseach.medical.medicalseach.MedicalSeachModel', {
    extend: 'Ext.app.ViewModel',
    requires: [
    ],
    alias: 'viewmodel.CisApp_drgsapi_hospitalseach_medical_medicalseach',
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
                HospitalId: Fm.Server.CurrentUser.OrgId
            })
        },
        orgCode: function () {
            var me = this,
                upview = me.getView().up('CisApp_drgsapi_hospitalseach_medical_medicalcontainer');//.down('drgsapi_medical');
            return !upview.bbarHidden;
        }
    }
});