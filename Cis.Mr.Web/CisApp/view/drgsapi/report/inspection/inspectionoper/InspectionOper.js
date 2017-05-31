/* ***********************************************
 * author :  李辛
 * function: 
 * history:  created by 李辛 2016/4/19 9:28:30 
 * ***********************************************/
Ext.define("CisApp.view.drgsapi.report.inspection.inspectionoper.InspectionOper", {
    extend: 'Ext.form.Panel',
    alias: 'widget.drgsapi_inspection_inspectionoper',
    requires: [
        'CisApp.view.drgsapi.report.inspection.inspectionoper.InspectionOperController',
        'CisApp.view.drgsapi.report.inspection.inspectionoper.InspectionOperModel',
        'Fm.ux.form.DateTimeField'
    ],
    controller: 'drgsapi_inspection_inspectionoper',
    viewModel: {
        type: 'drgsapi_inspection_inspectionoper'
    },
    bodyPadding: 10,
    modelValidation: true,
    fieldDefaults: {
        labelAlign: 'right', labelWidth: 80
    },
    layout: 'anchor',
    defaults: {
        anchor: '100%'
    },
    items: [
        {
            xtype: 'textfield', fieldLabel: '检验单号', allowBlank: false, bind: {
                //disabled: '{CheckDisabled}',
                value: '{inspection.CheckId}'
            },
            emptyText: ''
        },
            { xtype: 'textfield', fieldLabel: '申请科室代码', bind: '{inspection.DepartmentCode}', emptyText: '' },
            { xtype: 'textfield', fieldLabel: '申请科室名称', bind: '{inspection.DepartmentName}', emptyText: '' },
            { xtype: 'textfield', fieldLabel: '临床诊断编码', bind: '{inspection.DiagnosticCode}', emptyText: '' },
            { xtype: 'textfield', fieldLabel: '临床诊断名称', bind: '{inspection.DiagnosticName}', emptyText: '' },
            { xtype: 'textfield', fieldLabel: '申请项目编码', bind: '{inspection.ApplyProjectCode}', emptyText: '' },
            { xtype: 'textfield', fieldLabel: '申请项目名称', bind: '{inspection.ApplyProjectName}', emptyText: '' },
            { xtype: 'textfield', fieldLabel: '申请医师编码', bind: '{inspection.ApplyDoctor}', emptyText: '' },
             { xtype: 'textfield', fieldLabel: '申请医师姓名', bind: '{inspection.ApplyDoctorName}', emptyText: '' },
            {
                xtype: 'datetimefield', fieldLabel: '申请时间', bind: '{inspection.ApplyDatetime}', format: "Y-m-d H:i:s", editable: false, emptyText: '请选择', id: 'sDate',
                listeners: {
                    select: 'selectSDate'
                }
            },
            {
                xtype: 'datetimefield', fieldLabel: '报告时间', bind: '{inspection.ReportDatetime}', format: "Y-m-d H:i:s", editable: false, emptyText: '请选择', id: 'eDate',
                listeners: {
                    select: 'selectEDate'
                }
            },
            {
                xtype: 'combo', fieldLabel: '标本代码', editable: false, bind: { value: '{inspection.SpecimenCode}' },
                //store: Ext.create('CisApp.store.drgsapi.report.DictSpecimen'),
                displayField: 'Name',
                valueField: 'Code',
                listeners: {
                    select: function (obj, record) {
                        Ext.getCmp('specimenname').setValue(record.data.Name);
                    }
                }
            },
    {
        xtype: 'textfield', id: 'specimenname', hidden: true, fieldLabel: '标本名称', bind: '{inspection.SpecimenName}', emptyText: ''
    }
    ],
    buttons: [
        {
            text: '保  存', formBind: true, handler: 'add'
        },
        { text: '关  闭', handler: 'close' }
    ],
    initComponent: function () {
        var me = this;
        vm = me.getViewModel();
        vm.set('inspection', me.paramModel);
        me.callParent();
    }

});