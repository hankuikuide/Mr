/* ***********************************************
 * author :  sunqiang
 * function: 
 * history:  created by sunqiang 2016/6/30 16:53:05 
 * ***********************************************/
Ext.define('CisApp.store.shared.Diagnosis', {
    extend: 'Fm.base.Store',
    alias: 'store.shared_diagnosis',
    pageSize: 50,
    model: 'CisApp.model.shared.DiagnosisResult',
    proxy: {
        api: {
            read: '/shared/basedata/diseasequery'
        }
    }
});