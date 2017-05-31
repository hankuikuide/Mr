/* ***********************************************
 * author :  韩奎奎
 * function: 参保人
 * history:  created by 韩奎奎 2015/7/29 
 * ***********************************************/

Ext.define('CisApp.store.shared.Patient', {
    extend: 'Fm.base.Store',
    alias: 'store.shared_patient',
    model: 'CisApp.model.shared.PatientResult',
    proxy: {
        api: {
            read: '/shared/BaseData/GetPatients'
        }
    }
})