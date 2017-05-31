/* ***********************************************
 * author :  韩奎奎
 * function: 医生Model
 * history:  created by 韩奎奎 
 * ***********************************************/
Ext.define('CisApp.view.shared.doctor.DoctorModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.shared_doctor',
    requires: [
        'CisApp.store.shared.Doctor'
    ],
    stores: {
        doctorStore: {
            type: 'shared_doctor'
        }
    },
    formulas: {
        searchModel: function () {
            return Ext.create('CisApp.model.shared.DoctorSearch');
        }
    }
});