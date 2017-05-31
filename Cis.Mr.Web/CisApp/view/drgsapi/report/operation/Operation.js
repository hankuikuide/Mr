/* ***********************************************
 * author :   李克一
 * function: 手术信息
 * history:  created by localadmin 2016/4/25 15:47:08 
 * ***********************************************/
Ext.define("CisApp.view.drgsapi.report.operation.Operation", {
    extend: 'Fm.base.Grid',
    alias: 'widget.drgsapi_report_operation',
    requires: [
        'CisApp.view.drgsapi.report.operation.OperationController',
        'CisApp.view.drgsapi.report.operation.OperationModel',
        'Fm.ux.form.ComboGrid',
        'Fm.ux.grid.plugin.ClickSelection'
    ],
    plugins: [{
        ptype: 'clickselection',
        singleClick: true
    }],
    bbarHidden: false,
    controller: 'drgsapi_report_operation',
    viewModel: { type: 'drgsapi_report_operation' },
    bind: {
        store: '{gridstore}',
        selection: '{focus}',
        clickSelection: '{clickRecord}'
    },
    isPage: false,
    columns: [
        { xtype: 'rownumberer', text: '序号' },
        //{ text: '手术记录序号', dataIndex: 'OperationId' },
        { text: '手术记录序号', dataIndex: 'OperationRecordNo', showTip: true },
        //{ text: '手术医师编码', dataIndex: 'OperationDoctorCode' },
        { text: '手术医师', dataIndex: 'OperationDoctorName', showTip: true },
        //{ text: '手术医师I助编码', dataIndex: 'FirstOperdoctorcode' },
        { text: '手术医师I助', dataIndex: 'FirstOperdoctorname', showTip: true },
        //{ text: '手术医师II助编码', dataIndex: 'SecondOperdoctorcode' },
        { text: '手术医师II助', dataIndex: 'SecondOperdoctorname', showTip: true },
        //{ text: '麻醉师编码', dataIndex: 'AnesthesiologistCode' },
        { text: '麻醉师', dataIndex: 'AnesthesiologistName', showTip: true },
        { text: '执行开始时间', dataIndex: 'OperationDate', renderer: Fm.Common.Util.dateTextRender(), width: 150, showTip: true },
        { text: '执行完成时间', dataIndex: 'OperationFinishDate', renderer: Fm.Common.Util.dateTextRender(), width: 150, showTip: true },
        //{ text: '手术完成时间', dataIndex: 'OperationDate', renderer: Fm.Common.Util.dateTextRender(), width: 150 },
        { text: '麻醉方式', dataIndex: 'AnaesthesiaType', showTip: true, renderer: CisApp.Common.Util.dataCodeToTextRender(CisApp.Server.Datas.Anaesthesia) },
        //{ text: '是否有手术并发症', dataIndex: 'ComplicationCode' },
        //{ text: '手术并发症编码', dataIndex: 'ComplicationCode' },
        { text: '并发症', dataIndex: 'ComplicationName', showTip: true },
        //{ text: '记录医师编码', dataIndex: 'RecordDoctorCode' },
        { text: '记录医师', dataIndex: 'RecordDoctorName', showTip: true },
        //{ text: '方位', dataIndex: 'DiagnosePositionName' },
         {
            text: '手术记录',
            dataIndex: 'OperationRecord',
            xtype: 'widgetcolumn',
            widget: {
                xtype: 'label',
                cls: 'x-link',
                handler: 'showRemarkContent'
            }, minWidth: 200, flex: 1
        }
    ],
    listeners: {
        itemdblclick: 'modifyOperation',
        itemclick: 'itemclick',
        itemkeydown: 'griditemkeydown',
        afterlayout: 'dataLoaded'
    },
    initComponent: function () {
        var me = this;
        me.buttons = [];
        me.getViewModel().data.enableListener = me.bbarHidden;
        if (!me.bbarHidden) {
            me.buttons.push({
                xtype: 'button',
                text: '新增',
                tabIndex: 0,
                handler: 'addOperation',
                bind: {
                    disabled: '{btnDisabledAdd}'
                }
            }, {
                xtype: 'button',
                text: '修改',
                tabIndex: 1,
                handler: 'modifyOperation',
                bind: {
                    disabled: '{btnDisabled}'
                }
            }, {
                xtype: 'button',
                text: '删除',
                tabIndex: 2,
                handler: "deleteOperation",
                bind: {
                    disabled: '{btnDisabled}'
                }
            });
        }
        me.callParent(arguments);
    }
});