/* ***********************************************
 * author :  李克一
 * function: 检验单添加界面
 * history:  created by 李克一 2016/4/15 14:09:35 
 * ***********************************************/
Ext.define("CisApp.view.drgsapi.report.check.checkoper.CheckOper", {
    extend: 'Ext.form.Panel',
    alias: 'widget.check_checkoper',
    requires: [
        'CisApp.view.drgsapi.report.check.checkoper.CheckOperController',
        'CisApp.view.drgsapi.report.check.checkoper.CheckOperModel',
        'Fm.ux.form.DateTimeField',
        'Fm.ux.form.ComboTreeGrid',
        'CisApp.view.shared.department.Department'
    ],
    controller: 'check_checkoper',
    viewModel: { type: 'check_checkoper' },
    bodyPadding: 10,
    layout: 'column',
    fieldDefaults: {
        labelAlign: 'right'
    },
    modelValidation: true,
    autoScroll: true,
    items: [
        {
            autoHeight: true,
            layout: 'column',
            border: false,
            defaults: { margin: '5 0 5 0' },
            items: [
                {
                    xtype: 'textfield', fieldLabel: '检查单号', afterLabelTextTpl: '<font color=red>*</font>', bind: '{check.CheckId}', emptyText: '',
                    allowBlank: false,
                    bind: {
                        value: '{check.CheckId}'
                    }
                }, {
                    xtype: 'datetimefield', fieldLabel: '申请时间', afterLabelTextTpl: '<font color=red>*</font>', bind: '{check.ApplyDatetime}', emptyText: '', editable: false, format: "Y-m-d H:i:s", name: 'sDate',
                    listeners: {
                        select: 'selectSDate'
                    }
                }, {
                    xtype: 'datetimefield', fieldLabel: '报告时间', afterLabelTextTpl: '<font color=red>*</font>', bind: '{check.ReportDatetime}', emptyText: '', editable: false, format: "Y-m-d H:i:s", name: 'eDate',
                    listeners: {
                        select: 'selectEDate'
                    }
                }, {
                    xtype: 'combo', fieldLabel: '异常提示', bind: '{check.Abnormal}', emptyText: '请选择',
                    store: appFactory.Data.getDataStore('AbnormalTip'),// Ext.create('CisApp.store.drgsapi.report.DictAbnormal'),
                    displayField: 'Text',
                    valueField: 'Code'
                }, {
                    xtype: 'shared_departmentcombo',//shared_departmentcombo/shared_DepartmentTree
                    fieldLabel: '申请科室',
                    afterLabelTextTpl: '<font color=red>*</font>',
                    emptyText: '请选择',
                    bind: {
                        value: '{check.DepartmentName}'
                    },
                    name: 'departmentName',
                    listeners: {
                        change: 'setDepartment'
                    }, focusEnable: true
                },
                { xtype: 'textfield', hidden: true, name: 'departmentCode', fieldLabel: '申请科室名称', bind: '{check.DepartmentCode}', emptyText: '' },
                //{ xtype: 'textfield', hidden: true, id: 'departmentName1', fieldLabel: '申请科室名称1', bind: '{check.DepartmentName1}', emptyText: '' },
                //{ xtype: 'textfield', hidden: true, id: 'departmentName2', fieldLabel: '申请科室名称2', bind: '{check.DepartmentName2}', emptyText: '' },
                //{ xtype: 'textfield', hidden: true, id: 'departmentName3', fieldLabel: '申请科室名称3', bind: '{check.DepartmentName3}', emptyText: '' },
                //{ xtype: 'textfield', hidden: true, id: 'departmentName4', fieldLabel: '申请科室名称4', bind: '{check.DepartmentName4}', emptyText: '' },
                //{ xtype: 'textfield', hidden: true, id: 'departmentName5', fieldLabel: '申请科室名称5', bind: '{check.DepartmentName5}', emptyText: '' },
                {
                    xtype: 'shared_doctorcombo', fieldLabel: '申请医师', name: 'docName', afterLabelTextTpl: '<font color=red>*</font>', bind: '{check.ApplyDoctorName}', emptyText: '请选择',
                    listeners: {
                        change: 'setDoc'
                    }, focusEnable: true
                },
                { xtype: 'textfield', fieldLabel: '申请医师编码', hidden: true, name: 'docCode', afterLabelTextTpl: '<font color=red>*</font>', bind: '{check.ApplyDoctor}', emptyText: '' },
                { xtype: 'textfield', fieldLabel: '申请项目编码', afterLabelTextTpl: '<font color=red>*</font>', bind: '{check.ApplyProjectCode}', emptyText: '' },
                { xtype: 'textfield', fieldLabel: '申请项目名称', afterLabelTextTpl: '<font color=red>*</font>', bind: '{check.ApplyProjectName}', emptyText: '' },
                {
                    xtype: 'combo', fieldLabel: '检查部位', afterLabelTextTpl: '<font color=red>*</font>', bind: '{check.CheckPositionCode}', emptyText: '请选择',
                    store: appFactory.Data.getDataStore('CheckPoint'),// Ext.create('CisApp.store.drgsapi.report.DictCheckPoint'),
                    displayField: 'Text',
                    valueField: 'Code',
                    tpl: Ext.create('Ext.XTemplate',
                        '<ul class="x-list-plain"><tpl for="."><li role="option" class="x-boundlist-item" title="{Value}">{Text}</li></tpl></ul>'),
                }, {
                    xtype: 'combo', fieldLabel: '检查部位1', bind: '{check.CheckPositionCode1}', emptyText: '请选择',
                    store: appFactory.Data.getDataStore('CheckPoint'),// Ext.create('CisApp.store.drgsapi.report.DictCheckPoint'),
                    displayField: 'Text',
                    valueField: 'Code',
                    tpl: Ext.create('Ext.XTemplate',
                        '<ul class="x-list-plain"><tpl for="."><li role="option" class="x-boundlist-item" title="{Value}">{Text}</li></tpl></ul>'),

                }, {
                    xtype: 'combo', fieldLabel: '检查部位2', bind: '{check.CheckPositionCode2}', emptyText: '请选择',
                    store: appFactory.Data.getDataStore('CheckPoint'),//Ext.create('CisApp.store.drgsapi.report.DictCheckPoint'),
                    displayField: 'Text',
                    valueField: 'Code',
                    tpl: Ext.create('Ext.XTemplate',
                       '<ul class="x-list-plain"><tpl for="."><li role="option" class="x-boundlist-item" title="{Value}">{Text}</li></tpl></ul>'),

                }
              //,
              //{
              //    xtype: 'combo', fieldLabel: '检查部位3', bind: '{check.CheckPositionCode3}', emptyText: '请选择',
              //    store: appFactory.Data.getDataStore('CheckPoint'),//Ext.create('CisApp.store.drgsapi.report.DictCheckPoint'),
              //    displayField: 'Text',
              //    valueField: 'Code'
              //},
              //{
              //    xtype: 'combo', fieldLabel: '检查部位4', bind: '{check.CheckPositionCode4}', emptyText: '请选择',
              //    store:appFactory.Data.getDataStore('CheckPoint'),// Ext.create('CisApp.store.drgsapi.report.DictCheckPoint'),
              //    displayField: 'Text',
              //    valueField: 'Code'
              //},
              //{
              //    xtype: 'combo', fieldLabel: '检查部位5', bind: '{check.CheckPositionCode5}', emptyText: '请选择',
              //    store:appFactory.Data.getDataStore('CheckPoint'),// Ext.create('CisApp.store.drgsapi.report.DictCheckPoint'),
              //    displayField: 'Text',
              //    valueField: 'Code'
              //}
            ]
        },
        { xtype: 'textareafield', margin: '5 0 5 0', height: 210, width: 550, fieldLabel: '报告结果', afterLabelTextTpl: '<font color=red>*</font>', bind: '{check.CheckResult}', emptyText: '' }
    ],
    buttons: [
        { text: '保  存', formBind: true, handler: 'addCheck' },
        { text: '关  闭', handler: 'closeWin' }
    ],
    listeners: {
        afterrender: 'keyMap'
    },
    initComponent: function () {
        var me = this,
           vm = me.getViewModel();
        vm.set('check', me.paramModel);
        me.callParent();
    }
});