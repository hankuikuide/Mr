/* ***********************************************
 * author :  Vinge
 * function: 
 * history:  created by Vinge 2016/04/21 17:26:53 
 * ***********************************************/
Ext.define('CisApp.view.drgsapi.report.vitalsigns.vitalsignsoper.VitalsignsOperController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.drgsapi_report_vitalsigns_vitalsignsoper',
    close: function () {
        this.getView().up('window').close();
    },
    add: function () {
        this.getView('form').callBack();
    },
    onChange: function (me, newValue, oldValue) {

        if (parseInt(newValue) >parseInt( Ext.getCmp('systolicPressure').getValue())) {
            me.setValue(Ext.getCmp('systolicPressure').getValue());
        }
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