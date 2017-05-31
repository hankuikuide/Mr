/* ***********************************************
 * author :  localadmin
 * function: 
 * history:  created by localadmin 2016/4/18 10:53:03 
 * ***********************************************/
Ext.define('CisApp.view.drgsapi.report.medical.MedicalModel', {
    extend: 'Ext.app.ViewModel',
    requires: [
        'CisApp.store.drgsapi.report.Medical'
    ],
    alias: 'viewmodel.drgsapi_medical',
    stores: {
        gridstore: {
            type: 'drgsapi_medical',
            listeners: {
                load: 'dataLoaded',
                beforeload: 'beforeload'
            }
        }
    },
    data: {
        title: '病案主页',
        focus: Ext.create("CisApp.model.drgsapi.report.Medical"),// null,
        selectionFocus: null,// null,
        seachData: null,
        uploadDelete: null,
        valid:null
    },
    formulas: {
        btnQuery: function (get) {
            var q = 0;
        },
        btnDelete: function (get) {
            if (get('uploadDelete') == null) {
                return true;
            }
            return false;
        },
        btnUpLoad: function (get) {
            if (get('uploadDelete') == null) {
                return true;
            }
            return false;
        },
        btnVali: function (get) {
            if (get('valid') == null) {
                return true;
            }
            return false;
        },
        seachData: function () {
            var startDate = Ext.Date.format(Ext.Date.parse(CisApp.Server.Config.SearchMonthStartDay, "Y-m-d"), 'Y-m-d');//Ext.Date.format(Ext.Date.getFirstDateOfMonth(new Date()), 'Y-m-d');
            var endDate = Ext.Date.format(Ext.Date.parse(CisApp.Server.Config.SearchMonthEndDay, "Y-m-d"), 'Y-m-d');// Ext.Date.format(Ext.Date.getLastDateOfMonth(new Date()), 'Y-m-d');
            return Ext.create('CisApp.model.drgsapi.report.MedicalSeach', {
                AdmissionDateS: startDate,
                AdmissionDateE: endDate
            })
        }
    }
});