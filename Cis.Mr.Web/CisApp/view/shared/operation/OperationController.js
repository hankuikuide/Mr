/* ***********************************************
 * author :  sunqiang
 * function: 
 * history:  created by sunqiang 2016/7/4 14:35:41 
 * ***********************************************/
Ext.define('CisApp.view.shared.operation.OperationController', {
    extend: 'Fm.base.GridController',
    alias: 'controller.shared_operation',
    autoLoad: true,
    getGridStore: function () {
        var me = this;
        var store = me.getStore('operation');
        return store;
    }
});