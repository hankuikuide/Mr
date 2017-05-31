/* ***********************************************
 * author :  likeyi
 * function: 病案页面
 * history:  created by likeyi 2016/7/1 10:21:35 
 * ***********************************************/
Ext.define('CisApp.view.drgsapi.report.medical.medicalform.MedicalFormModel', {
    extend: 'Ext.app.ViewModel',
    requires: [
    ],
    alias: 'viewmodel.drgsapi_report_medical_medicalform',
    data: {
        medical: Ext.create("CisApp.model.drgsapi.report.Medical", { HospitalId :'1101'}),// Ext.create("CisApp.model.drgsapi.report.Medical")CisApp.model.drgsapi.report.MedicalForm
        enableListener: false
    },
    formulas: {
        btnAdd: function (get) {
            return get('medical') == null || (get('medical').get('IsUpload') == '1');
        },
        txtTradeNo: function (get) {
            return get("medical").data.TradeNo != '';
        },
        textDisable: function (get) {
            if (get("medical").data.IsDrugAllergy != 2) {

                return true;
                Ext.getCmp('allergyDrugCode').setValue('无');
                Ext.getCmp('allergyDrugName').setValue('无');
            }
            else {
                return false;
                Ext.getCmp('allergyDrugCode').setValue('');
                Ext.getCmp('allergyDrugName').setValue('');
            }
        },
        textFectedDisable: function (get) {
            if (get("medical").data.IsDrugAllergy != 2) {

                return true;
                Ext.getCmp('hospitalInfectedCode').setValue('无');
            }
            else {
                return false;
                Ext.getCmp('hospitalInfectedCode').setValue('');
            }
        }
    }
});