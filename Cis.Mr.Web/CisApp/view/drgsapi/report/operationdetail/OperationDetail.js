/* ***********************************************
 * author :  sunqiang
 * function: 手术详细界面
 * history:  created by sunqiang 2016/6/21 15:12:57 
 * ***********************************************/
Ext.define("CisApp.view.drgsapi.report.operationdetail.OperationDetail", {
    extend: 'Fm.base.Grid',
    alias: 'widget.drgsapi_report_operationdetail',
    requires: [
        'CisApp.view.drgsapi.report.operationdetail.OperationDetailController',
        'CisApp.view.drgsapi.report.operationdetail.OperationDetailModel',
        'Fm.ux.grid.plugin.ClickSelection'
    ],
    //id: 'drgsapi_report_operationdetail',
    bbarHidden: false,
    controller: 'drgsapi_report_operationdetail',
    viewModel: {
        type: 'drgsapi_report_operationdetail'
    },
    bind: {
        store: '{gridstore}',
        selection: '{focus}'
    },
    plugins: [
        {
            ptype: 'clickselection'
        }
    ],
    isPage: false,
    columns: [
        { xtype: 'rownumberer', text: '序号' },
        { header: '手术序号', dataIndex: 'OperationNo', showTip: true },
        //{ header: '手术编码', dataIndex: 'OperationCode' },
        { header: '手术名称', dataIndex: 'OperationName', showTip: true },
        { header: '手术等级', dataIndex: 'OperationLevel', showTip: true, renderer: CisApp.Common.Util.dataCodeToTextRender(CisApp.Server.Datas.OperationLevel) },
        { header: '手术切口分类', dataIndex: 'OperationIncisionClass', showTip: true, renderer: CisApp.Common.Util.dataCodeToTextRender(CisApp.Server.Datas.Incisiongroup) },
        { header: '手术愈合分级', dataIndex: 'OperationHealClass', showTip: true, renderer: CisApp.Common.Util.dataCodeToTextRender(CisApp.Server.Datas.Healing) },
        { header: '主次标志', dataIndex: 'IsMajorIden', renderer: Fm.Common.Util.dataTextRender(CisApp.Server.Datas.EnumMajorIden) },
        { header: '是否医源性手术', dataIndex: 'IsIatrogenic', renderer: Fm.Common.Util.dataTextRender(CisApp.Server.Datas.EnumIsIatrogenic), minWidth: 200, flex: 1 }
    ],
    listeners: {
        itemdblclick: 'modifyOperationDetail',
        itemkeydown: 'griditemkeydown'
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
                handler: 'addOperationDetail',
                bind: {
                    disabled: '{btnDisabledAdd}'
                }
            }, {
                xtype: 'button',
                text: '修改',
                tabIndex: 1,
                handler: 'modifyOperationDetail',
                bind: {
                    disabled: '{btnDisabled}'
                }
            }, {
                xtype: 'button',
                text: '删除',
                tabIndex: 2,
                handler: "deleteOperationDetail",
                bind: {
                    disabled: '{btnDisabled}'
                }
            });
        }
        me.callParent(arguments);
    }
});