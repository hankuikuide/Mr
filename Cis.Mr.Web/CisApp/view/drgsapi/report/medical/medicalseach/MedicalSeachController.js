/* ***********************************************
 * author :  likeyi
 * function: 
 * history:  created by likeyi 2016/7/8 13:28:22 
 * ***********************************************/
Ext.define('CisApp.view.drgsapi.report.medical.medicalseach.MedicalSeachController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.drgsapi_report_medical_medicalseach',
    //查询结算
    searchBill: function () {
        var selectBill = this.getView().up("drgsapi_report_medical_medicalcontainer").down("drgsapi_medical").getController();
        selectBill.refresh();
    },
    isUploadSelected: function (field, newValue, oldValue, eOpts) {
        var me = this,
            view = me.getView(),
            vm = me.getViewModel();

        if (newValue === 0 || newValue === 1) { //填报中、填报完成
            console.dir(newValue);
            vm.set('comboValidateEnableFlag', '');

        } else {
            vm.set('comboValidateEnableFlag', null);
            view.up().down('combo[name=comboValidateSearchFlag]').clearValue();
        }
    }
});