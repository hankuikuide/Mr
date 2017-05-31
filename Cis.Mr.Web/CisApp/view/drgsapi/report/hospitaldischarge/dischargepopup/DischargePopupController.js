/* ***********************************************
 * author :  sunqiang
 * function: 
 * history:  created by sunqiang 2016/4/21 18:52:57 
 * ***********************************************/
Ext.define('CisApp.view.drgsapi.report.hospitaldischarge.dischargepopup.DischargePopupController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.drgsapi_report_hospitaldischarge_dischargepopup',
    close: function () {
        this.getView().up('window').close();
    },
    add: function () {
        var me = this,
            form = me.getView('form'),
            vm = me.getView('form').getViewModel().get('hostpitaldischarge');
        if (!form.isValid()) {
            var errMsg = Fm.Common.Util.getFormErrorMsg(form);
            if (errMsg !== null) {
                Fm.msg.error(errMsg);
                return false;
            }
        }
        me.getView('form').callBack(vm);
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