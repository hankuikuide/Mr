/* ***********************************************
 * author :  韩奎奎
 * function: 医生
 * history:  created by 韩奎奎 2015/7/29 
 * ***********************************************/

Ext.define('CisApp.store.shared.Doctor', {
    extend: 'Fm.base.Store',
    model: 'CisApp.model.shared.DoctorResult',
    alias: 'store.shared_doctor',
    //autoLoad: true,
    proxy: {
        api: {
            read: '/shared/BaseData/GetDoctors'
        }
    }
})