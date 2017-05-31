/* ***********************************************
 * author :  sunqiang
 * function: 
 * history:  created by sunqiang 2016/4/20 9:49:49 
 * ***********************************************/
Ext.define("CisApp.view.drgsapi.report.hostpitaladvice.advicepopup.AdvicePopup", {
    extend: 'Ext.form.Panel',
    alias: 'widget.drgsapi_report_hostpitaladvice_advicepopup',
    requires: [
        'CisApp.view.drgsapi.report.hostpitaladvice.advicepopup.AdvicePopupController',
        'CisApp.view.drgsapi.report.hostpitaladvice.advicepopup.AdvicePopupModel',
        'Fm.ux.form.DateTimeField'
    ],
    controller: 'drgsapi_report_hostpitaladvice_advicepopup',
    viewModel: {
        type: 'drgsapi_report_hostpitaladvice_advicepopup'
    },

    bodyPadding: 10,
    modelValidation: true,
    fieldDefaults: {
        labelAlign: 'right', labelWidth: 120
    },
    layout: 'anchor',
    defaults: {
        anchor: '100%'
    },
    scrollable: true,
    items: [
             {
                 xtype: 'textfield', fieldLabel: '医嘱序号', allowBlank: false, bind: {
                     value: '{hostpitaladvice.DoctorAdviceNo}'
                     //, disabled: '{txtTradeNo}'
                 }, emptyText: ''
             },
            { xtype: 'textfield', fieldLabel: '医嘱子序号', bind: '{hostpitaladvice.DoctorAdviceSNo}', emptyText: '' },
            { xtype: 'textfield', fieldLabel: '医嘱状态', bind: '{hostpitaladvice.DoctorAdviceState}', emptyText: '' },
            { xtype: 'textfield', fieldLabel: '长期医嘱标识', bind: '{hostpitaladvice.IsLDoctorAdvice}', emptyText: '' },
            { xtype: 'textfield', fieldLabel: '医嘱类别', bind: '{hostpitaladvice.DoctorAdviceType}', emptyText: '' },
            { xtype: 'textfield', fieldLabel: '医嘱正文', bind: '{hostpitaladvice.DoctorAdviceContent}', emptyText: '' },
            { xtype: 'textfield', fieldLabel: '医嘱代码', bind: '{hostpitaladvice.DoctorAdviceCode}', emptyText: '' },
            { xtype: 'textfield', fieldLabel: '药品一次使用剂量', bind: '{hostpitaladvice.DrugsMetering}', emptyText: '' },
            { xtype: 'textfield', fieldLabel: '剂量单位', bind: '{hostpitaladvice.MeteringUnit}', emptyText: '' },
            {
                xtype: 'combo', fieldLabel: '给药途径', editable: false,
                //multiSelect: true,
                bind: { value: '{hostpitaladvice.MeteringChannel}' },
                //store: Ext.create('CisApp.store.drgsapi.report.DictTaketype'),
                displayField: 'Name',
                valueField: 'Code'
            },
            {
                xtype: 'datetimefield', fieldLabel: '起始日期时间', bind: '{hostpitaladvice.StartDate}', format: "Y-m-d H:i:s", editable: false, emptyText: '请选择', id: 'sDate1',
                listeners: {
                    select: 'selectSDate1'
                }
            },
            {
                xtype: 'datetimefield', fieldLabel: '停止日期时间', bind: '{hostpitaladvice.EndDate}', format: "Y-m-d H:i:s", editable: false, emptyText: '请选择', id: 'eDate1',
                listeners: {
                    select: 'selectEDate1'
                }
            },
            { xtype: 'textfield', fieldLabel: '持续时间', bind: '{hostpitaladvice.ContinuedDate}', emptyText: '' },
            { xtype: 'textfield', fieldLabel: '持续时间单位', bind: '{hostpitaladvice.ContinuedDateUnit}', emptyText: '' },
            {
                xtype: 'combo', fieldLabel: '使用频次', editable: false,
                //multiSelect: true,
                bind: { value: '{hostpitaladvice.Frequency}' },
                //store: Ext.create('CisApp.store.drgsapi.report.DictFrequency'),
                displayField: 'Name',
                valueField: 'Code'
            },
            { xtype: 'textfield', fieldLabel: '开医嘱科室', bind: '{hostpitaladvice.Department}', emptyText: '' },
            { xtype: 'textfield', fieldLabel: '开医嘱医生编码', bind: '{hostpitaladvice.StartDepartmentDoctor}', emptyText: '' },
            { xtype: 'textfield', fieldLabel: '开医嘱医生姓名', bind: '{hostpitaladvice.StartDepartmentDoctorName}', emptyText: '' },
            { xtype: 'textfield', fieldLabel: '停医嘱医生编码', bind: '{hostpitaladvice.EndDepartmentDoctor}', emptyText: '' },
            { xtype: 'textfield', fieldLabel: '停医嘱医生姓名', bind: '{hostpitaladvice.EndDepartmentDoctorName}', emptyText: '' },
            { xtype: 'textfield', fieldLabel: '开医嘱校对护士姓名', allowBlank: false, bind: { value: '{hostpitaladvice.StartDepartmentNurse}' }, emptyText: '' },
            { xtype: 'textfield', fieldLabel: '停医嘱校对护士姓名', bind: '{hostpitaladvice.EndDepartmentNurse}', emptyText: '' },
            {
                xtype: 'datetimefield', fieldLabel: '开医嘱录入日期时间', bind: '{hostpitaladvice.StartDoctorAdviceDate}', format: "Y-m-d H:i:s", editable: false, emptyText: '请选择', id: 'sDate2',
                listeners: {
                    select: 'selectSDate2'
                }
            },
            {
                xtype: 'datetimefield', fieldLabel: '停医嘱录入日期时间', bind: '{hostpitaladvice.EndDoctorAdviceDate}', format: "Y-m-d H:i:s", editable: false, emptyText: '请选择', id: 'eDate2',
                listeners: {
                    select: 'selectEDate2'
                }
            }

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
        vm.set('hostpitaladvice', me.medicalRecord);
        me.callParent();
    }
});