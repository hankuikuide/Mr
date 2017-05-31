/* ***********************************************
 * author :  李克一
 * function: 
 * history:  created by 李克一 2016/12/13 12:48:28 
 * ***********************************************/
Ext.define('CisApp.view.drgsapi.report.medical.log.MedicalLogModel', {
    extend: 'Ext.app.ViewModel',
    requires: [
        'CisApp.store.drgsapi.report.WebLog'
    ],
    alias: 'viewmodel.drgsapi_report_medical_log',
    stores: {
        gridstore: {
            type: 'drgsapi_report',
            sorters: [
            {
                property: 'OperDate',
                direction: 'DESC'
            }]
        }
    }
});