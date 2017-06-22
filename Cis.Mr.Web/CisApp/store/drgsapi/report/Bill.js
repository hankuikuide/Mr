/* ***********************************************
 * author :  
 * function: 
 * history:  
 * ***********************************************/
Ext.define('CisApp.store.drgsapi.report.Bill', {
    extend: 'Fm.base.Store',
    alias: 'store.drgsapi_bill',
    model: 'CisApp.model.drgsapi.report.Bill',
    proxy: {
        type: "ajax",
        api: {
            read: '/api/services/CisApi/medical/GetMedicals'
        }
    }
});