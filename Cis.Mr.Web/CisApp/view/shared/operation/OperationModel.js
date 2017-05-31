/* ***********************************************
 * author :  sunqiang
 * function: 
 * history:  created by sunqiang 2016/7/4 14:35:41 
 * ***********************************************/
Ext.define('CisApp.view.shared.operation.OperationModel', {
    extend: 'Ext.app.ViewModel',
    requires: [
        'CisApp.store.shared.Operation'
    ],
    alias: 'viewmodel.shared_operation',
    stores: {
        operation: {
            type: 'shared_operation'
        }
    }
});