/* ***********************************************
 * author :  sunqiang
 * function: 手术详细信息添加
 * history:  created by sunqiang 2016/6/21 15:13:55 
 * ***********************************************/
Ext.define("CisApp.view.drgsapi.report.operationdetail.operationdetailoper.OperationDetailOper", {
    extend: 'Ext.form.Panel',
    alias: 'widget.drgsapi_report_operationdetail_operationdetailoper',
    requires: [
        'CisApp.view.drgsapi.report.operationdetail.operationdetailoper.OperationDetailOperController',
        'CisApp.view.drgsapi.report.operationdetail.operationdetailoper.OperationDetailOperModel',
        "CisApp.view.shared.operation.Operation"
    ],
    controller: 'drgsapi_report_operationdetail_operationdetailoper',
    viewModel: {
        type: 'drgsapi_report_operationdetail_operationdetailoper'
    },
    bodyPadding: 10,
    modelValidation: true,
    fieldDefaults: {
        labelAlign: 'right', labelWidth: 110, margin: '5 0 5 0'
    },
    layout: 'anchor',
    defaults: {
        anchor: '100%'
    },
    autoScroll: true,
    items: [
            { xtype: 'textfield', fieldLabel: '手术序号', afterLabelTextTpl: '<font color=red>*</font>', bind: '{operationdetail.OperationNo}', allowBlank: false, emptyText: '' },
            { xtype: 'textfield', fieldLabel: '手术编码', afterLabelTextTpl: '<font color=red>*</font>', hidden: true, name: 'operationCode', bind: '{operationdetail.OperationCode}', emptyText: '' },
            {
                xtype: 'shared_operationcombo', afterLabelTextTpl: '<font color=red>*</font>', emptyText: '请选择', multiSelect: false, displayField: 'Name', name: 'operationName', fieldLabel: '手术名称', bind: '{operationdetail.OperationName}',
                listeners: {
                    change: 'setOperation'
                }, focusEnable: true
            },
            {
                xtype: 'combo', fieldLabel: '手术操作等级', afterLabelTextTpl: '<font color=red>*</font>', bind: '{operationdetail.OperationLevel}', emptyText: '请选择',
                store: appFactory.Data.getDataStore('OperationLevel'),// Ext.create('CisApp.store.drgsapi.report.DictOperationLevel'),
                displayField: 'Text',
                valueField: 'Code'
            },
            {
                xtype: 'combo', fieldLabel: '手术切口分类', afterLabelTextTpl: '<font color=red>*</font>', bind: '{operationdetail.OperationIncisionClass}', emptyText: '请选择',
                store: appFactory.Data.getDataStore('Incisiongroup'),// Ext.create('CisApp.store.drgsapi.report.DictIncisiongroup'),
                displayField: 'Text',
                valueField: 'Code'
            },
            {
                xtype: 'combo', fieldLabel: '手术愈合分级', afterLabelTextTpl: '<font color=red>*</font>', bind: '{operationdetail.OperationHealClass}', emptyText: '请选择',
                store: appFactory.Data.getDataStore('Healing'),
                displayField: 'Text',
                valueField: 'Code'
            },
            {
                xtype: 'combo', fieldLabel: '主次标志', afterLabelTextTpl: '<font color=red>*</font>', bind: '{operationdetail.IsMajorIden}', emptyText: '请选择',
                store: appFactory.Data.getDataStore('EnumMajorIden'),
                displayField: 'Text',
                valueField: 'Value'
            },
            {
                xtype: 'combo', fieldLabel: '是否医源性手术', bind: '{operationdetail.IsIatrogenic}', emptyText: '请选择',
                store: appFactory.Data.getDataStore('EnumIsIatrogenic'),
                displayField: 'Text',
                valueField: 'Value'
            }
    ],
    buttons: [
        { text: '保  存', formBind: true, handler: 'addOperationDetail' },
        { text: '关  闭', handler: 'closeWin' }
    ],
    listeners: {
        afterrender: 'keyMap'
    },
    initComponent: function () {
        var me = this;
        vm = me.getViewModel();
        vm.set('operationdetail', me.paramModel);
        me.callParent();
    }
});