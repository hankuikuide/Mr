/* ***********************************************
 * author :  李克一
 * function: 
 * history:  created by 李克一 2016/12/13 13:08:55 
 * ***********************************************/
Ext.define('CisApp.store.drgsapi.report.WebLog', {
    extend: 'Fm.base.Store',
    alias: 'store.drgsapi_report',
    model: 'CisApp.model.drgsapi.report.WebLog',
    proxy: {
        type: 'ajax',
        api: {
            read: '/group/WebLog/GetMedicalLog'
        }
    }
});