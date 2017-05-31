/* ***********************************************
 * author :  李辛
 * function: 
 * history:  created by 李辛 2016/4/20 16:07:16 
 * ***********************************************/
Ext.define('CisApp.view.drgsapi.report.inspectiondetail.InspectionDetailModel', {
    extend: 'Ext.app.ViewModel',
    requires: [
          'CisApp.store.drgsapi.report.InspectionDetail'
    ],
    alias: 'viewmodel.drgsapi_inspectiondetail',
    stores: {
        gridstore: {
            type: 'drgsapi_inspectiondetail'
        }
    },
    data: {
        title: '检验单明细',
        focus: null,
        medicalRecord: null,  // 选中病案
        inspectionRecord: null  // 选中检验单

    },
    formulas: {
        btnDisabled: function (get) {
            return get('focus') == null || (get('medicalRecord').get('IsUpload') == '1');
        },
        btnDisabledAdd: function (get) {
            return get('inspectionRecord') == null || (get('medicalRecord').get('IsUpload') == '1');
        }

    }

});