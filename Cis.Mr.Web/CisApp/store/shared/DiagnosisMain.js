/* ***********************************************
 * author :  likeyi
 * function: 
 * history:  created by sunqiang 2016/10/12 15:04:05 
 * ***********************************************/
Ext.define('CisApp.store.shared.DiagnosisMain', {
    extend: 'Fm.base.Store',
    alias: 'store.shared_diagnosismain',
    pageSize: 50,
    model: 'CisApp.model.shared.DiagnosisResult',
    proxy: {
        api: {
            read: '/shared/basedata/diseasemainquery'
        }
    }
});