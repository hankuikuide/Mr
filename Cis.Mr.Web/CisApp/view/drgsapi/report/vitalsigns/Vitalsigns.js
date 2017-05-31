/* ***********************************************
 * author :  Vinge
 * function: 生命体征
 * history:  created by Vinge 2016/04/21 13:32:25 
 * ***********************************************/
Ext.define("CisApp.view.drgsapi.report.vitalsigns.Vitalsigns", {
    extend: 'Fm.base.Grid',
    alias: 'widget.drgsapi_report_vitalsigns',
    requires: [
        'CisApp.view.drgsapi.report.vitalsigns.VitalsignsController',
        'CisApp.view.drgsapi.report.vitalsigns.VitalsignsModel'
    ],
    plugins: [{
        ptype: 'clickselection'
    }],
    controller: 'drgsapi_report_vitalsigns',
    viewModel: {
        type: 'drgsapi_report_vitalsigns'
    },
    bind: {
        store: '{gridstore}',
        selection: '{focus}'
    },
    //margin: '10 10 10 10',
    isPage: false,
    columns: [
        { xtype: 'rownumberer', text: '序号' },
        { text: '生命体征流水号', dataIndex: 'VitalsignsId' },
        //{ text: '定点机构编码', dataIndex: 'OrgCode' },
        //{ text: '社保卡号', dataIndex: 'PatientId' },
        //{ text: '住院号', dataIndex: 'AdmissionNo' },
        { text: '出院床位号', dataIndex: 'OutBedNum' },
        { text: '入院时间', dataIndex: 'AdmissionDate', renderer: CisApp.Common.Util.dateTextRender(), width: 150 },
        { text: '出院时间', dataIndex: 'DischargeDate', renderer: CisApp.Common.Util.dateTextRender(), width: 150 },
        { text: '测量日期时间', dataIndex: 'MeasureDate', renderer: CisApp.Common.Util.dateTextRender(), width: 150 },
        { text: '血压值（收缩压/mmHg）', dataIndex: 'SystolicPressure' },
        { text: '血压值（舒张压/mmHg）', dataIndex: 'DiastolicPressure' },
        { text: '体温（℃）', dataIndex: 'Temperature' },
        { text: '心率（次/分）', dataIndex: 'HeartRate' },
        { text: '呼吸（次/分）', dataIndex: 'Breathing' }
        //,{ text: '交易流水号', dataIndex: 'TradeNo' },
    ],
    buttons: [{
        xtype: 'button',
        text: '新增',
        handler: 'add',
        bind: {
            disabled: '{btnDisabledAdd}'
        }
    }, {
        xtype: 'button',
        text: '修改',
        handler: 'modify',
        bind: {
            disabled: '{btnDisabled}'
        }
    }, {
        xtype: 'button',
        text: '删除',
        handler: "toDelete",
        bind: {
            disabled: '{btnDisabled}'
        }
    }],
    listeners: {
        itemdblclick: 'modify'
    },
    initComponent: function () {
        var me = this;

        me.callParent(arguments);
    }
});