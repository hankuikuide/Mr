/* ***********************************************
 * author :  Vinge
 * function: 添加修改生命体征
 * history:  created by Vinge 2016/04/21 17:26:53 
 * ***********************************************/
Ext.define("CisApp.view.drgsapi.report.vitalsigns.vitalsignsoper.VitalsignsOper", {
    extend: 'Ext.form.Panel',
    alias: 'widget.drgsapi_report_vitalsigns_vitalsignsoper',
    requires: [
        'CisApp.view.drgsapi.report.vitalsigns.vitalsignsoper.VitalsignsOperController',
        'CisApp.view.drgsapi.report.vitalsigns.vitalsignsoper.VitalsignsOperModel',
        'Fm.ux.form.DateTimeField'
    ],
    controller: 'drgsapi_report_vitalsigns_vitalsignsoper',
    viewModel: { type: 'drgsapi_report_vitalsigns_vitalsignsoper' },
    bodyPadding: 10,
    layout: 'anchor',
    defaults: {
        anchor: '100%'
    },
    fieldDefaults: {
        labelAlign: 'right',
        labelWidth: 115
    },
    modelValidation: true,
    autoScroll: true,

    items: [
            {
                xtype: 'textfield', fieldLabel: '生命体征流水号', emptyText: '', bind: {
                    value: '{Vitalsigns.VitalsignsId}'
                    //, disabled: '{txtTradeNo}'
                }
            },
            //{ xtype: 'textfield', fieldLabel: '定点机构编码', bind: '{Vitalsigns.OrgCode}', emptyText: '' },
            //{ xtype: 'textfield', fieldLabel: '社保卡号', bind: '{Vitalsigns.PatientId}', emptyText: '' },
            //{ xtype: 'textfield', fieldLabel: '住院号', bind: '{Vitalsigns.AdmissionNo}', emptyText: '' },
            { xtype: 'textfield', fieldLabel: '出院床位号', bind: '{Vitalsigns.OutBedNum}', emptyText: '', allowBlank: false },
            {
                xtype: 'datetimefield', fieldLabel: '入院时间', bind: '{Vitalsigns.AdmissionDate}', emptyText: '', format: "Y-m-d H:i:s", editable: false, id: 'sDate',
                listeners: {
                    select: 'selectSDate'
                }
            },
            {
                xtype: 'datetimefield', fieldLabel: '出院时间', bind: '{Vitalsigns.DischargeDate}', emptyText: '', format: "Y-m-d H:i:s", editable: false, id: 'eDate',
                listeners: {
                    select: 'selectEDate'
                }
            },
            { xtype: 'datetimefield', fieldLabel: '测量日期时间', bind: '{Vitalsigns.MeasureDate}', emptyText: '', format: "Y-m-d H:i:s", editable: false },
            { xtype: 'textfield', fieldLabel: '血压值（收缩压）', bind: '{Vitalsigns.SystolicPressure}', emptyText: '', id: 'systolicPressure' },
            { xtype: 'textfield', fieldLabel: '血压值（舒张压）', bind: '{Vitalsigns.DiastolicPressure}', emptyText: '', listeners: { change: 'onChange' } },
            { xtype: 'textfield', fieldLabel: '体温（℃）', bind: '{Vitalsigns.Temperature}', emptyText: '' },
            { xtype: 'textfield', fieldLabel: '心率（次/分）', bind: '{Vitalsigns.HeartRate}', emptyText: '' },
            { xtype: 'textfield', fieldLabel: '呼吸（次/分）', bind: '{Vitalsigns.Breathing}', emptyText: '' }
            //,{ xtype: 'textfield', fieldLabel: '交易流水号', bind: '{Vitalsigns.TradeNo}', emptyText: '' }
    ],
    buttons: [
        {
            text: '保  存', formBind: true, handler: 'add'
        },
        { text: '关  闭', handler: 'close' }
    ],

    //initComponent: function () {
    //    var me = this;

    //    me.callParent(arguments);
    //}
    initComponent: function () {
        var me = this,
           vm = me.getViewModel();
        vm.set('Vitalsigns', me.paramModel);
        me.callParent();
    }
});