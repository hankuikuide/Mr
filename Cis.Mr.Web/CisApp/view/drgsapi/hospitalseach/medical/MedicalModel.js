/* ***********************************************
 * author :  likeyi
 * function: 无结算查询
 * history:  created by likeyi 2016/8/27 10:42:28 
 * ***********************************************/
Ext.define('CisApp.view.drgsapi.hospitalseach.medical.MedicalModel', {
    extend: 'Ext.app.ViewModel',
    requires: [
        'CisApp.store.drgsapi.hospitalseach.Medical'
    ],
    alias: 'viewmodel.CisApp_drgsapi_hospitalseach_medical',
    stores: {
        gridstore: {
            type: 'hospitalseach_medical',
            listeners: {
                load: 'dataLoaded',
                beforeload: 'beforeDataload'
            }
        }
    },
    data: {
        title: '病案主页',
        focus: Ext.create("CisApp.model.drgsapi.report.Medical"),// null,
        selectionFocus: null,// null,
        seachData: null,
        uploadDelete: null,
        valid: null
    }
});