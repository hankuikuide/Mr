/* ***********************************************
 * author :  李辛
 * function: 
 * history:  created by 李辛 2016/4/20 18:50:46 
 * ***********************************************/
Ext.define('CisApp.view.drgsapi.report.inspectiondetail.inspectiondetailoper.InspectiondetailOperController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.drgsapi_report_inspectiondetail_inspectiondetailoper',
    close: function () {
        this.getView().up('window').close();
    },
    add: function () {
        this.getView('form').callBack();
    }
});