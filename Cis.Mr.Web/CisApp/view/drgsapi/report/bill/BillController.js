/* ***********************************************
 * author :  likeyi
 * function: 结算信息
 * history:  created by likeyi 2016/6/30 18:31:05 
 * ***********************************************/
Ext.define('CisApp.view.drgsapi.report.bill.BillController', {
    extend: 'Fm.base.GridController',
    alias: 'controller.drgsapi_report_bill',
    select: function () {
        var me = this,
           vm = me.getViewModel(),
           store = vm.getStore('gridstore'),
           record = vm.get('focus');
        var vmform = this.getView().up("drgsapi_report").down('drgsapi_report_medical_medicalform').getViewModel();
        vmform.set('medical', record);
        this.refreshInfo();
    },
    query: function () {
        var me = this,
            view = me.getView(),
            store = view.getView().getStore();
        var seachData = me.getView().getViewModel().data.seachData.data;
        seachData.HospitalId = Fm.Server.CurrentUser.OrgId;
        store.load({ params: { iParams: Ext.util.JSON.encode(seachData) } });
    },
    init: function () {
        var me = this;
    }
});