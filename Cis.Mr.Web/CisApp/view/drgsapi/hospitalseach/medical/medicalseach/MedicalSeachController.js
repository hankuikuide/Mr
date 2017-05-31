/* ***********************************************
 * author :  likeyi
 * function: 无结算查询
 * history:  created by likeyi 2016/8/27 10:55:03 
 * ***********************************************/
Ext.define('CisApp.view.drgsapi.hospitalseach.medical.medicalseach.MedicalSeachController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.CisApp_drgsapi_hospitalseach_medical_medicalseach',
    //检索无结算数据
    noBillSearch: function () {
        var selectNoBill = this.getView().up("CisApp_drgsapi_hospitalseach_medical_medicalcontainer").down("CisApp_drgsapi_hospitalseach_medical").getController();
        selectNoBill.refresh();
    }
});