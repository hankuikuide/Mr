/* ***********************************************
 * author :  sunqiang
 * function: 
 * history:  created by sunqiang 2016/4/20 9:49:49 
 * ***********************************************/
Ext.define('CisApp.view.drgsapi.report.hostpitaladvice.advicepopup.AdvicePopupController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.drgsapi_report_hostpitaladvice_advicepopup',
    close: function () {
        this.getView().up('window').close();
    },
    add: function () {
        var me = this,
            form = me.getView('form'),
            vm = me.getView('form').getViewModel().get('hostpitaladvice');
        if (!form.isValid()) {
            var errMsg = CisApp.Common.Util.getFormErrorMsg(form);
            if (errMsg !== null) {
                Fm.msg.error(errMsg);
                return false;
            }
        }
        me.getView('form').callBack(vm);
    },
    selectSDate1: function () {
        var startDate = Ext.getCmp('sDate1').getValue();
        var endDate = Ext.getCmp('eDate1').getValue();
        Ext.getCmp('eDate1').setConfig({
            'minValue': startDate
        });
    },
    selectEDate1: function () {
        var startDate = Ext.getCmp('sDate1').getValue();
        var endDate = Ext.getCmp('eDate1').getValue();
        Ext.getCmp('sDate1').setConfig({
            'maxValue': endDate
        });
    },
    selectSDate2: function () {
        var startDate = Ext.getCmp('sDate2').getValue();
        var endDate = Ext.getCmp('eDate2').getValue();
        Ext.getCmp('eDate2').setConfig({
            'minValue': startDate
        });
    },
    selectEDate2: function () {
        var startDate = Ext.getCmp('sDate2').getValue();
        var endDate = Ext.getCmp('eDate2').getValue();
        Ext.getCmp('sDate2').setConfig({
            'maxValue': endDate
        });
    }
});