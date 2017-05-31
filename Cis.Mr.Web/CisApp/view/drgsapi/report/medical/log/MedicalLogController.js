/* ***********************************************
 * author :  李克一
 * function: 
 * history:  created by 李克一 2016/12/13 12:48:28 
 * ***********************************************/
Ext.define('CisApp.view.drgsapi.report.medical.log.MedicalLogController', {
    extend: 'Fm.base.GridController',
    alias: 'controller.drgsapi_report_medical_log',
    autoLoad: true,
    getRefreshParams: function () {
        var me = this,
           view = me.getView();
        return view.webLogParams;
    }
});