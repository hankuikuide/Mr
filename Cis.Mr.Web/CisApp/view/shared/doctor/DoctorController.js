/* ***********************************************
 * author :  韩奎奎
 * function: DoctorController
 * history:  created by 韩奎奎 
 * ***********************************************/
Ext.define('CisApp.view.shared.doctor.DoctorController', {
    extend: 'Fm.base.GridController',
    alias: 'controller.shared_doctor',
    autoLoad: true,
    //查询
    getRefreshParams: function() {
        var me = this,
            vm = me.getViewModel(),
            search = vm.get('searchModel');

        if (search) {
            return search.data;

        }
        return {};
    }
});