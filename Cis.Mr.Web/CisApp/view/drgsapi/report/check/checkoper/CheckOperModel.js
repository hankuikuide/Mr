/* ***********************************************
 * author :  localadmin
 * function: 
 * history:  created by localadmin 2016/4/15 14:09:35 
 * ***********************************************/
Ext.define('CisApp.view.drgsapi.report.check.checkoper.CheckOperModel', {
    extend: 'Ext.app.ViewModel',
    requires: [
    ],
    alias: 'viewmodel.check_checkoper',
    data: {
        check: Ext.create("CisApp.model.drgsapi.report.Check"),
    },
    formulas: {
        txtTradeNo: function (get) {
            return get("check").data.CheckId != '';
        }
    }
});