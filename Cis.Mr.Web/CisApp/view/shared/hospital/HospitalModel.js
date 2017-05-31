/* ***********************************************
 * author :  孙强
 * function: 医疗机构查询
 * history:  created by 孙强 2015/10/19 
 * ***********************************************/
Ext.define('CisApp.view.shared.hospital.HospitalModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.hospital',
    requires: [
        'CisApp.store.shared.Hospital'
    ],
    stores: {
        hospital: {
            type: 'shared_Hospital'
        }
    },
    data: {
      
    }
});