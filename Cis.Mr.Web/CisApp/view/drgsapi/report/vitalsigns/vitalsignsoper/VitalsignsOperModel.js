/* ***********************************************
 * author :  Vinge
 * function: 
 * history:  created by Vinge 2016/04/21 17:26:53 
 * ***********************************************/
Ext.define('CisApp.view.drgsapi.report.vitalsigns.vitalsignsoper.VitalsignsOperModel', {
    extend: 'Ext.app.ViewModel',
    requires: [
    ],
    alias: 'viewmodel.drgsapi_report_vitalsigns_vitalsignsoper',

    data: {
        Vitalsigns: Ext.create('CisApp.model.drgsapi.report.Vitalsigns')
    },
    formulas: {
        txtTradeNo: function (get) {
            return get("Vitalsigns").data.VitalsignsId != '';
        }
    }
});