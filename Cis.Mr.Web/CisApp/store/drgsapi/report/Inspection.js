/* ***********************************************
 * author :  李辛
 * function: 
 * history:  created by 李辛 2016/4/18 14:09:15 
 * ***********************************************/
Ext.define('CisApp.store.drgsapi.report.Inspection', {
    extend: 'Fm.base.Store',
    alias: 'store.drgsapi_inspection',
    model: 'CisApp.model.drgsapi.report.Inspection',
    proxy: {
        type: "ajax",
        api: {
            read: '/group/Inspection/GetInspection'
        } 
    }
});