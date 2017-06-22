/* ***********************************************
 * author :  localadmin
 * function: 
 * history:  created by localadmin 2016/4/18 13:55:40 
 * ***********************************************/
Ext.define('CisApp.view.drgsapi.report.medical.medicaloper.MedicalOperController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.drgsapi_medical_medicaloper',
    close: function () {
        this.getView().up('window').close();
    },
    add: function () {
        this.getView('form').callBack();
    },

    //新增病案主页窗口->查询
    onSearchDataByAD: function () {
        var me = this,
            data = me.getView().getViewModel().getData().medical.getData();
        record = {
                HospitalId: Fm.Server.CurrentUser.OrgId,
                AdmissionNo: data.AdmissionNo
            },
        application.showMask('drgsapi_medical_medicaloper');
        Ext.Ajax.request({
            method: 'post',
            params: { iParams: Ext.util.JSON.encode(record) },
            url: '/api/services/CisApi/medical/GetMedicals',
            success: function (resp) {

            }
        });
    },
    onChange: function (obj, newValue, oldValue) {
        if (newValue != 1) {
            Ext.getCmp('allergyDrugCode').setDisabled(true);
            Ext.getCmp('allergyDrugName').setDisabled(true);
            Ext.getCmp('allergyDrugCode').setValue('无');
            Ext.getCmp('allergyDrugName').setValue('无');
        }
        else {

            Ext.getCmp('allergyDrugCode').setDisabled(false);
            Ext.getCmp('allergyDrugName').setDisabled(false);
            Ext.getCmp('allergyDrugCode').setValue('');
            Ext.getCmp('allergyDrugName').setValue('');
        }

    },
    isFectedChange: function (obj, newValue, oldValue) {
        if (newValue != 1) {
            Ext.getCmp('hospitalInfectedCode').setDisabled(true);
            Ext.getCmp('hospitalInfectedCode').setValue('无');
        }
        else {

            Ext.getCmp('hospitalInfectedCode').setDisabled(false);
            Ext.getCmp('hospitalInfectedCode').setValue('');
        }

    },
    keyDownBearYie: function (me, newValue, oldValue) {

        if (parseInt(newValue) >parseInt( Ext.getCmp('bearPregnancy').getValue())) {
            me.setValue(Ext.getCmp('bearPregnancy').getValue());
        }
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