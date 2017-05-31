/* ***********************************************
 * author :  李辛
 * function: 
 * history:  created by 李辛 2016/4/19 9:28:30 
 * ***********************************************/
Ext.define('CisApp.view.drgsapi.report.inspection.inspectionoper.InspectionOperModel', {
    extend: 'Ext.app.ViewModel',
    requires: [
    ],
    alias: 'viewmodel.drgsapi_inspection_inspectionoper',
    data: {
        inspection: Ext.create("CisApp.model.drgsapi.report.Inspection")
    },
    formulas: {
        CheckDisabled: function (get) {
            return get('inspection').get('CheckId') != '';
        }
    }
});