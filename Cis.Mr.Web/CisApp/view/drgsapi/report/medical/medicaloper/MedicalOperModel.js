/* ***********************************************
 * author :  localadmin
 * function: 
 * history:  created by localadmin 2016/4/18 13:55:40 
 * ***********************************************/
Ext.define('CisApp.view.drgsapi.report.medical.medicaloper.MedicalOperModel', {
    extend: 'Ext.app.ViewModel',
    requires: [
    ],
    alias: 'viewmodel.drgsapi_medical_medicaloper',
    data: {
        medical: Ext.create("CisApp.model.drgsapi.report.Medical"),
    },
    formulas: {
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