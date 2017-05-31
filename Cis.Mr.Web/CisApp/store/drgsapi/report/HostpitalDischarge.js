/* ***********************************************
 * author :  sunqiang
 * function: 
 * history:  created by sunqiang 2016/4/22 9:28:43 
 * ***********************************************/
Ext.define('CisApp.store.drgsapi.report.HostpitalDischarge', {
    extend: 'Fm.base.Store',
    alias: 'store.drgsapi_report_hostpitaldischarge',
    model: 'CisApp.model.drgsapi.report.HostpitalDischarge',
    proxy: {
        api: {
            read: '/group/LeaveHospital/GetLeaveHospital'
        }
    }
});