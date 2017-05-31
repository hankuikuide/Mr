/* ***********************************************
 * author :  Vinge
 * function: 生命体征
 * history:  created by Vinge 2016/04/21 20:31:14 
 * ***********************************************/
Ext.define('CisApp.store.drgsapi.report.Vitalsigns', {
    extend: 'Fm.base.Store',
    alias: 'store.drgsapi_report_vitalsigns',
    model: 'CisApp.model.drgsapi.report.Vitalsigns',
    proxy: {
        type: 'ajax',
        api: {
            read: '/Group/Vitalsigns/GetVitalsigns'
        } 
    }
});