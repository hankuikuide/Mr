/* ***********************************************
 * author :  李辛
 * function: 
 * history:  created by 李辛 2016/4/20 18:50:46 
 * ***********************************************/
Ext.define("CisApp.view.drgsapi.report.inspectiondetail.inspectiondetailoper.InspectiondetailOper", {
    extend: 'Ext.form.Panel',
    alias: 'widget.drgsapi_report_inspectiondetail_inspectiondetailoper',
    requires: [
        'CisApp.view.drgsapi.report.inspectiondetail.inspectiondetailoper.InspectiondetailOperController',
        'CisApp.view.drgsapi.report.inspectiondetail.inspectiondetailoper.InspectiondetailOperModel'
    ],
    controller: 'drgsapi_report_inspectiondetail_inspectiondetailoper',
    viewModel: {
        type: 'drgsapi_report_inspectiondetail_inspectiondetailoper'
    },
    bodyPadding: 10,
    modelValidation: true,
    fieldDefaults: {
        labelAlign: 'right', labelWidth:100
    },
    layout: 'anchor',
    defaults: {
        anchor: '100%'
    },
    items: [
        {
            xtype: 'textfield', fieldLabel: '检验明细编号', allowBlank: false, bind: {
                //disabled: '{CheckDisabled}',
                value: '{inspectiondetail.CheckCode}'
            }, emptyText: ''
        },
            { xtype: 'textfield', fieldLabel: '检验明细名称', bind: '{inspectiondetail.CheckName}', emptyText: '' },
            { xtype: 'textfield', fieldLabel: '检验结果', bind: '{inspectiondetail.CheckResult}', emptyText: '' },
            { xtype: 'textfield', fieldLabel: '结果正常最大值', bind: '{inspectiondetail.ResultMax}', emptyText: '' },
            { xtype: 'textfield', fieldLabel: '结果正常最小值', bind: '{inspectiondetail.ResultMin}', emptyText: '' },
            { xtype: 'textfield', fieldLabel: '计量单位', bind: '{inspectiondetail.MeasuremenUnit}', emptyText: '' },
            {
                 xtype: 'combo', fieldLabel: '异常提示', editable: false, bind: { value: '{inspectiondetail.Abnormal}' },
                 //store: Ext.create('CisApp.store.drgsapi.report.DictAbnormal'),
                 displayField: 'Name',
                 valueField: 'Code'
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
        vm.set('inspectiondetail', me.paramModel);
        me.callParent();
    }
});