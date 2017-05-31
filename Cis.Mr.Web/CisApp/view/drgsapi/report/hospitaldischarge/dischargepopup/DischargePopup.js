/* ***********************************************
 * author :  sunqiang
 * function: 
 * history:  created by sunqiang 2016/4/21 18:52:57 
 * ***********************************************/
Ext.define("CisApp.view.drgsapi.report.hospitaldischarge.dischargepopup.DischargePopup", {
    extend: 'Ext.form.Panel',
    alias: 'widget.drgsapi_report_hospitaldischarge_dischargepopup',
    requires: [
        'CisApp.view.drgsapi.report.hospitaldischarge.dischargepopup.DischargePopupController',
        'CisApp.view.drgsapi.report.hospitaldischarge.dischargepopup.DischargePopupModel',
      'Fm.ux.form.DateTimeField'
    ],
    controller: 'drgsapi_report_hospitaldischarge_dischargepopup',
    viewModel: {
        type: 'drgsapi_report_hospitaldischarge_dischargepopup'
    },
    bodyPadding: 10,
    modelValidation: true,
    fieldDefaults: {
        labelAlign: 'right', labelWidth: 100
    },
    layout: 'anchor',
    defaults: {
        anchor: '100%'
    },
    scrollable: true,
    items: [
            {
                xtype: 'combo', fieldLabel: '出院转归', bind: '{hostpitaldischarge.DischargeOutcome}', allowBlank: false,
                //store: appFactory.Data.getDataStore('EnumDischargeOutcome'),
                displayField: 'Text',
                valueField: 'Value'
            },
            {
                xtype: 'textareafield', height: 65, fieldLabel: '入院情况', bind: '{hostpitaldischarge.HospitalizationSituation}', emptyText: ''
            },
            { xtype: 'textareafield', height: 65, fieldLabel: '诊疗过程', bind: '{hostpitaldischarge.DtProcess}', emptyText: '' },
            { xtype: 'textareafield', height: 65, fieldLabel: '出院情况', bind: '{hostpitaldischarge.LeaveHospitalStatus}', emptyText: '' },
            { xtype: 'textareafield', height: 65, fieldLabel: '出院医嘱', bind: '{hostpitaldischarge.LeaveDoctorAdvice}', emptyText: '' }
    ],
    buttons: [
        {
            text: '保  存', formBind: true, handler: 'add'
        },
        { text: '关  闭', handler: 'close' }
    ],
    initComponent: function () {
        var me = this,
            vm = this.getViewModel();
        vm.set('hostpitaldischarge', me.medicalRecord);
        me.callParent();
    }
});