/* ***********************************************
 * author :  sunqiang
 * function: 
 * history:  created by sunqiang 2016/6/30 16:07:45 
 * ***********************************************/
Ext.define('CisApp.view.shared.diagnosis.DiagnosisModel', {
    extend: 'Ext.app.ViewModel',
    requires: [
        //'CisApp.store.shared.Diagnosis',
        //'CisApp.store.shared.DiagnosisMain'
    ],
    alias: 'viewmodel.shared_diagnosis',
    stores: {
        diseaseList: Ext.create('CisApp.store.shared.Diagnosis'),// { type: 'shared_diagnosis' },
        diseaseMainList: Ext.create('CisApp.store.shared.DiagnosisMain')// { type: 'shared_diagnosismain' }
    },
    data: {
    },
    formulas: {
        searchModel: function () {
            return Ext.create('CisApp.model.shared.DiagnosisParam', {

            });
        }
    }
});