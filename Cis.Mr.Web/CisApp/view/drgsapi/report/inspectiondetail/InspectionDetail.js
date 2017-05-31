/* ***********************************************
 * author :  李辛
 * function: 
 * history:  created by 李辛 2016/4/20 16:07:16 
 * ***********************************************/
Ext.define("CisApp.view.drgsapi.report.inspectiondetail.InspectionDetail", {
    extend: 'Fm.base.Grid',
    alias: 'widget.drgsapi_report_inspectiondetail',
    requires: [
        'CisApp.view.drgsapi.report.inspectiondetail.InspectionDetailController',
        'CisApp.view.drgsapi.report.inspectiondetail.InspectionDetailModel',
          'Fm.ux.form.ComboGrid',
        'Fm.ux.grid.plugin.ClickSelection'
    ],
    controller: 'drgsapi_inspectiondetail',
    viewModel: {
        type: 'drgsapi_inspectiondetail'
    },
    plugins: [{
        ptype: 'clickselection'
    }],
    margin: '5 0 0 0',
    bind: {
        store: '{gridstore}',
        selection: '{focus}'       
    },
    isPage: false,
    columns: [
        { xtype: 'rownumberer', text: '序号' },
        { text: '检验明细编号', dataIndex: 'CheckCode', width: 200 },
        { text: '检验明细名称', dataIndex: 'CheckName', width: 300 },
        { text: '检验结果', dataIndex: 'CheckResult', width: 200 },
        { text: '结果正常最大值', dataIndex: 'ResultMax', width: 200 },
        { text: '结果正常最小值', dataIndex: 'ResultMin', width: 200 },
        { text: '计量单位', dataIndex: 'MeasuremenUnit', width: 100 },
        { text: '异常提示', dataIndex: 'AbnormalName', width: 100 }
       
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
    }
    ],
    listeners: {
        itemdblclick: 'modify'
    },
    initComponent: function () {
        var me = this;

        me.callParent(arguments);
    }
});