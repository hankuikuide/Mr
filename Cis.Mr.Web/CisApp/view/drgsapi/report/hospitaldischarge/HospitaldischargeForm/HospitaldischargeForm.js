/* ***********************************************
 * author :  likeyi
 * function: 出院小结
 * history:  created by likeyi 2016/7/1 11:12:48 
 * ***********************************************/
Ext.define("CisApp.view.drgsapi.report.hospitaldischarge.HospitaldischargeForm.HospitaldischargeForm", {
    extend: 'Ext.form.Panel',
    alias: 'widget.drgsapi_report_hospitaldischarge_HospitaldischargeForm',
    requires: [
        'CisApp.view.drgsapi.report.hospitaldischarge.HospitaldischargeForm.HospitaldischargeFormController',
        'CisApp.view.drgsapi.report.hospitaldischarge.HospitaldischargeForm.HospitaldischargeFormModel'
    ],
    controller: 'drgsapi_report_hospitaldischarge_HospitaldischargeForm',
    viewModel: {
        type: 'drgsapi_report_hospitaldischarge_HospitaldischargeForm'
    },
    formEditable: true,
    // bodyPadding: 10,
    layout: 'column',
    //defaults: { anchor: '100%' },
    fieldDefaults: {
        labelAlign: 'right', labelWidth: 60
    },
    modelValidation: true,
    scrollable: true,

    listeners: {
        activate: 'activateFocus',
        afterrender: 'keyMap'
    },
    initComponent: function () {
        var me = this;
        me.items = [];
        me.items.push({
            xtype: 'combo', fieldLabel: '出院转归', afterLabelTextTpl: '<font color=red>*</font>', emptyText: '请选择',
            bind: '{hostpitaldischarge.DischargeOutcome}',
            allowBlank: false,
            store: appFactory.Data.getDataStore('EnumDischargeOutcome'),
            displayField: 'Text', valueField: 'Value',
            margin: '10 20 0 20', name: 'DischargeOutcome',
            disabled: !me.formEditable
        }, { xtype: 'textareafield', fieldLabel: '入院情况', width: '90%', margin: '10 20 0 20', height: 150, editable: me.formEditable, afterLabelTextTpl: '<font color=red>*</font>', bind: '{hostpitaldischarge.HospitalizationSituation}', emptyText: '', flex: 1 },
            { xtype: 'textareafield', fieldLabel: '诊疗过程', width: '90%', margin: '10 20 0 20', height: 150, editable: me.formEditable, afterLabelTextTpl: '<font color=red>*</font>', bind: '{hostpitaldischarge.DtProcess}', emptyText: '', flex: 1 },
            { xtype: 'textareafield', fieldLabel: '出院情况', width: '90%', margin: '10 20 0 20', height: 150, editable: me.formEditable, afterLabelTextTpl: '<font color=red>*</font>', bind: '{hostpitaldischarge.LeaveHospitalStatus}', emptyText: '' },
            { xtype: 'textareafield', fieldLabel: '出院医嘱', width: '90%', margin: '10 20 0 20', height: 150, editable: me.formEditable, afterLabelTextTpl: '<font color=red>*</font>', bind: '{hostpitaldischarge.LeaveDoctorAdvice}', emptyText: '' });

        me.buttons = [];
        me.buttons.push('->', { text: '保  存', formBind: true, handler: 'addLeaveHospital', hidden: !me.formEditable });
        me.getViewModel().data.enableListener = !me.formEditable;
        //if (me.formEditable) {
        //    //me.listeners = {
        //    //    afterrender: 'keyMap',
        //    //    activate: 'activate'
        //    //};
        //} else {
        //    //me.defaults = {
        //    //    disabled: !me.formEditable //editable: false //margin: '0 0 0 0'//,// labelWidth: 115//, width: 255  //anchor: '90%'
        //    //}
        //}
        me.callParent(arguments);
    }
});