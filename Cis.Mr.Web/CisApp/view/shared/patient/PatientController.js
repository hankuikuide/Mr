/* ***********************************************
 * author :  韩奎奎
 * function: 参保人controller
 * history:  created by 韩奎奎 
 * ***********************************************/
Ext.define('CisApp.view.shared.patient.PatientController', {
    extend: 'Fm.base.GridController',
    alias: 'controller.shared_patient',
    autoLoad: true,
    //查询
    getRefreshParams: function () {
        var me = this,
            vm = me.getViewModel(),
            search = vm.get('searchModel');

        return search.data;
    }

});