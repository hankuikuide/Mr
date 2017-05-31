/* ***********************************************
 * author :  李辛
 * function: 手术界面
 * history:  created by 李辛 2016/4/25 15:48:44 
 * ***********************************************/
Ext.define("CisApp.view.drgsapi.report.operation.operationoper.OperationOper", {
    extend: 'Ext.form.Panel',
    alias: 'widget.drgsapi_report_operation_operationoper',
    requires: [
        'CisApp.view.drgsapi.report.operation.operationoper.OperationOperController',
        'CisApp.view.drgsapi.report.operation.operationoper.OperationOperModel',
        'Fm.ux.form.DateTimeField',
        "CisApp.view.shared.diagnosis.Diagnosis"
    ],
    controller: 'drgsapi_report_operation_operationoper',
    viewModel: {
        type: 'drgsapi_report_operation_operationoper'
    },
    bodyPadding: 10,
    modelValidation: true,
    layout: 'column',//anchor
    defaults: {
        labelAlign: 'right' // anchor: '100%'
    },
    autoScroll: true,
    items: [
        {
            autoHeight: true,
            layout: 'column',
            border: false,
            defaults: {
                labelAlign: 'right', labelWidth: 110, margin: '5 0 5 0'
            },
            items: [
                { xtype: 'textfield', fieldLabel: '手术记录序号', afterLabelTextTpl: '<font color=red>*</font>', bind: '{operation.OperationRecordNo}', allowBlank: false, emptyText: '' },
                { xtype: 'textfield', fieldLabel: '手术医师编码', hidden: true, name: 'operationDoctorCode', afterLabelTextTpl: '<font color=red>*</font>', bind: '{operation.OperationDoctorCode}', emptyText: '' },
                {
                    xtype: 'shared_doctorcombo', fieldLabel: '手术医师', name: 'operationDoctorName', afterLabelTextTpl: '<font color=red>*</font>', bind: '{operation.OperationDoctorName}', emptyText: '请选择',
                    listeners: {
                        change: 'setOperationDoctor'
                    }, focusEnable: true
                },
                { xtype: 'textfield', name: 'complicationCode', hidden: true, fieldLabel: '手术并发症', bind: '{operation.ComplicationCode}', emptyText: '' },
                {
                    xtype: 'shared_diagnosiscombo', name: 'complicationName',
                    //afterLabelTextTpl: '<font color=red>*</font>',
                    multiSelect: false, fieldLabel: '并发症', bind: '{operation.ComplicationName}', emptyText: '请选择',
                    listeners: {
                        change: 'setComplicationCode'
                    }, focusEnable: true
                },
                { xtype: 'textfield', fieldLabel: '记录医师编码', hidden: true, name: 'recordDoctorCode', afterLabelTextTpl: '<font color=red>*</font>', bind: '{operation.RecordDoctorCode}', emptyText: '' },
                {
                    xtype: 'shared_doctorcombo', fieldLabel: '记录医师', name: 'recordDoctorName', bind: '{operation.RecordDoctorName}', emptyText: '请选择',
                    listeners: {
                        change: 'setRecordDoctor'
                    }, focusEnable: true
                },
                {
                    xtype: 'combo', fieldLabel: '麻醉方式',
                    //afterLabelTextTpl: '<font color=red>*</font>',
                    emptyText: '请选择', editable: false,
                    bind: '{operation.AnaesthesiaType}',
                    store: appFactory.Data.getDataStore('Anaesthesia'),// Ext.create('CisApp.store.drgsapi.report.DictAnaesthesia'),
                    displayField: 'Text',
                    valueField: 'Code'
                    //listeners: {
                    //    afterRender: function (combo) {
                    //        var firstValue = this.getStore().getData().items[0].getData().Code;
                    //        this.setValue(firstValue);
                    //    }
                    //}
                },
                { xtype: 'textfield', fieldLabel: '麻醉师编码', hidden: true, name: 'anesthesiologistCode', afterLabelTextTpl: '<font color=red>*</font>', bind: '{operation.AnesthesiologistCode}', emptyText: '' },
                {
                    xtype: 'shared_doctorcombo', fieldLabel: '麻醉师', name: 'anesthesiologistName', bind: '{operation.AnesthesiologistName}', emptyText: '请选择',
                    listeners: {
                        change: 'setAnesthesiologist'
                    }, focusEnable: true//, afterLabelTextTpl: '<font color=red>*</font>'
                },
                {
                    xtype: 'datetimefield', fieldLabel: '执行开始时间', afterLabelTextTpl: '<font color=red>*</font>', name: 'sDate', bind: '{operation.OperationDate}', editable: false, format: "Y-m-d H:i:s",
                    listeners: {
                        select: 'selectSDate'
                    }
                },
                {
                    xtype: 'datetimefield', fieldLabel: '执行结束时间', afterLabelTextTpl: '<font color=red>*</font>', name: 'eDate', bind: '{operation.OperationFinishDate}', editable: false, format: "Y-m-d H:i:s",
                    listeners: {
                        select: 'selectEDate'
                    }
                },
                { xtype: 'textfield', fieldLabel: '手术医师I助编码', hidden: true, name: 'firstOperdoctorCode', bind: '{operation.FirstOperdoctorcode}', emptyText: '' },
                {
                    xtype: 'shared_doctorcombo', fieldLabel: '手术医师I助', name: 'firstOperdoctorName', bind: '{operation.FirstOperdoctorname}', emptyText: '请选择',
                    listeners: {
                        change: 'setFirstOperdoctor'
                    }, focusEnable: true
                },
                { xtype: 'textfield', fieldLabel: '手术医师II助编码', hidden: true, name: 'secondOperdoctorCode', bind: '{operation.SecondOperdoctorcode}', emptyText: '' },
                {
                    xtype: 'shared_doctorcombo', fieldLabel: '手术医师II助', name: 'secondOperdoctorName', bind: '{operation.SecondOperdoctorname}', emptyText: '请选择',
                    listeners: {
                        change: 'setSecondOperdoctor'
                    }, focusEnable: true
                }
            ]
        },
        { xtype: 'textareafield', labelWidth: 110, margin: '5 0 5 0', height: 210, width: 570, fieldLabel: '手术记录', bind: '{operation.OperationRecord}', emptyText: '' }
    ],
    buttons: [
        {
            text: '保  存', formBind: true, handler: 'addOperation',
        },
        { text: '关  闭', handler: 'closeWin' }
    ],
    listeners: {
        afterrender: 'keyMap'
    },
    initComponent: function () {
        var me = this;
        vm = me.getViewModel();
        vm.set('operation', me.paramModel);
        //debugger;
        me.callParent();
    }
});