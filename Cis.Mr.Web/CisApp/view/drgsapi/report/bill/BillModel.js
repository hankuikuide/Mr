/* ***********************************************
 * author :  likeyi
 * function: 结算信息
 * history:  created by likeyi 2016/6/30 18:31:05 
 * ***********************************************/
Ext.define('CisApp.view.drgsapi.report.bill.BillModel', {
    extend: 'Ext.app.ViewModel',
    requires: [
    //'CisApp.store.drgsapi.report.Medical'
    'CisApp.store.drgsapi.report.Bill'
    ],
    alias: 'viewmodel.drgsapi_report_bill',
    stores: {
        gridstore: {
            //type: 'drgsapi_medical'
            type: 'drgsapi_bill'
        }
    },
    data: {
        title: 'bill',
        focus: null,
        clickRecord: null,
        seachData: null
    },
    formulas: {
        seachData: function () {
            var startDate = Ext.Date.format(Ext.Date.getFirstDateOfMonth(new Date()), 'Y-m-d');
            var endDate = Ext.Date.format(Ext.Date.getLastDateOfMonth(new Date()), 'Y-m-d');
            return Ext.create('CisApp.model.drgsapi.report.MedicalSeach', {
                AdmissionDateS: startDate,
                AdmissionDateE: endDate
            })
        }
    }
});