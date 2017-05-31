/* ***********************************************
 * author :  sunqiang
 * function: 
 * history:  created by sunqiang 2016/7/4 14:37:21 
 * ***********************************************/
Ext.define('CisApp.store.shared.Operation', {
    extend: 'Fm.base.Store',
    alias: 'store.shared_operation',
    model: 'CisApp.model.shared.OperationResult',
    proxy: {
        api: {
            read: '/shared/basedata/getoperations'
        }
    }
});