/* ***********************************************
 * author :  localadmin
 * function: 
 * history:  created by localadmin 2016/4/15 14:04:43 
 * ***********************************************/
Ext.define('CisApp.view.drgsapi.report.check.CheckModel', {
    extend: 'Ext.app.ViewModel',
    requires: [
        'CisApp.store.drgsapi.report.Check'
    ],
    alias: 'viewmodel.check',
    stores: {
        gridstore: {
            type: 'check',
            listeners: {
                load: 'dataLoaded'
            }
        }
    },
    data: {
        title: '检查单',
        focus: null,
        medicalRecord: null,
        enableListener: false
    },
    formulas: {
        btnDisabled: function (get) {
            return get('focus') == null || get('medicalRecord') == null || (get('medicalRecord').get('IsUpload') == '1');
        },
        btnDisabledAdd: function (get) {
            return get('medicalRecord') == null || (get('medicalRecord').get('IsUpload') == '1');
        }
    }
});