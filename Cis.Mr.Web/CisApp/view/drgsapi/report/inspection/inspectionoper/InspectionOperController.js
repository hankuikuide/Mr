/* ***********************************************
 * author :  李辛
 * function: 
 * history:  created by 李辛 2016/4/19 9:28:30 
 * ***********************************************/
Ext.define('CisApp.view.drgsapi.report.inspection.inspectionoper.InspectionOperController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.drgsapi_inspection_inspectionoper',
    close: function () {
        this.getView().up('window').close();
    },
    add: function () {
        this.getView('form').callBack();
    },
    selectSDate: function () {
        var startDate = Ext.getCmp('sDate').getValue();
        var endDate = Ext.getCmp('eDate').getValue();
        Ext.getCmp('eDate').setConfig({
            'minValue': startDate
        });
    },
    selectEDate: function () {
        var startDate = Ext.getCmp('sDate').getValue();
        var endDate = Ext.getCmp('eDate').getValue();
        Ext.getCmp('sDate').setConfig({
            'maxValue': endDate
        });
    }
});