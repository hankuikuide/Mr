/* ***********************************************
 * author :  韩奎奎
 * function: 参保人Model
 * history:  created by 韩奎奎 
 * ***********************************************/
Ext.define('CisApp.view.shared.patient.PatientModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.shared_patient',
    requires: [
        'CisApp.store.shared.Patient'
    ],
    stores: {
        patientStore: {
            type: 'shared_patient'
        }
    },
    data: {
        searchModel: Ext.create('CisApp.model.shared.PatientSearch')
    }
});