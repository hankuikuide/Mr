/* ***********************************************
 * author :  李克一
 * function: 
 * history:  created by 李克一 2016/12/13 12:48:28 
 * ***********************************************/
Ext.define("CisApp.view.drgsapi.report.medical.log.MedicalLog", {
    extend: 'Fm.base.Grid',
    alias: 'widget.drgsapi_report_medical_log',
    requires: [
        'CisApp.view.drgsapi.report.medical.log.MedicalLogController',
        'CisApp.view.drgsapi.report.medical.log.MedicalLogModel'
    ],
    controller: 'drgsapi_report_medical_log',
    viewModel: {
        type: 'drgsapi_report_medical_log'
    },
    loadMask: true,
    isPage: false,
    bind: {
        store: '{gridstore}'
    },
    webLogParams: null,
    columns: [
        { xtype: 'rownumberer', text: '序号', width: 40 },
        { header: '用户', dataIndex: 'UserName', width: 70 },
        { header: '操作时间', dataIndex: 'OperDate', renderer: Fm.Common.Util.dateTextRender(), width: 150 },
        { header: '操作类型', dataIndex: 'OperType', renderer: CisApp.Common.Util.dataCodeToTextRender(CisApp.Server.Datas.EnumOperType), width: 70 },
        { header: '单据类型', dataIndex: 'BillType', renderer: CisApp.Common.Util.dataCodeToTextRender(CisApp.Server.Datas.EnumBillType), width: 70 },
        {
            header: '操作内容', dataIndex: 'OperContent', showTip: true,
            renderer: CisApp.Common.Util.jsonDataToTextRender(CisApp.Server.Datas.DtoFiledNameDict),
            minWidth: 100, flex: 1
        }
    ],
    initComponent: function () {
        var me = this;

        me.callParent(arguments);
    }
});