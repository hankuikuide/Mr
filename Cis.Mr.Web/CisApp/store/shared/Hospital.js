/* ***********************************************
 * author :  孙强
 * function: 医疗机构查询
 * history:  created by 孙强 2015/10/19 
 * ***********************************************/
Ext.define('CisApp.store.shared.Hospital', {
    extend: 'Fm.base.Store',
    alias: 'store.shared_Hospital',
    autoDestroy: false,
    groupField: 'Level',
    groupDir:'Desc',
    model: 'CisApp.model.shared.Hospital',
    proxy: {
        api: {
            read: '/shared/basedata/gethospital'
        }
    }
})