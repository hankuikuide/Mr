/* ***********************************************
 * author :  李辛
 * function: 
 * history:  created by 李辛 2016/4/20 18:50:46 
 * ***********************************************/
Ext.define('CisApp.view.drgsapi.report.inspectiondetail.inspectiondetailoper.InspectiondetailOperModel', {
    extend: 'Ext.app.ViewModel',
    requires: [
    ],
    alias: 'viewmodel.drgsapi_report_inspectiondetail_inspectiondetailoper',
    data: {
        inspectiondetail: Ext.create("CisApp.model.drgsapi.report.InspectionDetail"),
    },
    formulas: {
        CheckDisabled: function (get) {
            return get('inspectiondetail').get('CheckCode') != '';
        }
    }
});