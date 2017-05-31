/* ***********************************************
 * author :  韩奎奎
 * function: 疾病字典
 * history:  created by 韩奎奎 2015/7/29 
 * ***********************************************/

Ext.define('CisApp.store.shared.Disease', {
    extend: 'Fm.base.Store',
    model: 'CisApp.model.shared.DiseaseResult',
    alias: 'store.shared_disease',
    //autoLoad: true,
    proxy: {
        api: {
            read: '/shared/BaseData/GetDiseases'
        }
    }
})