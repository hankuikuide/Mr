/* ***********************************************
 * author :  李辛
 * function: 
 * history:  created by 李辛 2016/4/20 16:04:15 
 * ***********************************************/
Ext.define('CisApp.store.drgsapi.report.InspectionDetail', {
    extend: 'Fm.base.Store',
    alias: 'store.drgsapi_inspectiondetail',
    model: 'CisApp.model.drgsapi.report.InspectionDetail',
    proxy: {
        type: "ajax",
        api: {
            read: '/group/InspectionDetail/GetInspectionDetail'
        } 
    }
});