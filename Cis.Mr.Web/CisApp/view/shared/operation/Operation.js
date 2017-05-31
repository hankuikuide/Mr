/* ***********************************************
 * author :  sunqiang
 * function: ICD9编码表
 * history:  created by sunqiang 2016/7/4 14:35:41 
 * ***********************************************/
Ext.define("CisApp.view.shared.operation.Operation", {
    extend: 'Fm.base.Grid',
    alias: 'widget.shared_operation',
    requires: [
        'CisApp.view.shared.operation.OperationController',
        'CisApp.view.shared.operation.OperationModel'
    ],
    controller: 'shared_operation',
    viewModel: {
        type: 'shared_operation'
    },
    loadMask: true,
    isPage: false,
    bind: {
        store: '{operation}'
    },
    tbar: [
        {
            xtype: 'form',
            layout: {
                type: 'table',
                columns: 1
            },
            defaults: {
                margin: '5 5 5 5',
                labelAlign: "left",
                width: 200,
                labelWidth: 30
            },
            items: [
                {
                    configIndex: 0,
                    fieldLabel: '手术',
                    xtype: 'textfield',
                    emptyText: '名称、编码',
                    focusEnable: true,
                    listeners: {
                        change: 'filter'
                    },
                    filterConfig: [{
                        type: 'string',
                        operator: 'like',
                        property: 'Code'
                    }, {
                        type: 'string',
                        operator: 'like',
                        property: 'Name'
                    }]
                }
            ]
        }
    ],
    columns: [
    {
        xtype: 'rownumberer',
        text: '序号',
        align: 'center',
        width: 50
    },
    {
        dataIndex: 'Code',
        text: '编码',
        align: 'left',
        flex: 2, showTip: true
    },
    {
        dataIndex: 'Name',
        text: '名称',
        align: 'left',
        flex: 2, showTip: true
    }
    ]
});


/* ***********************************************
 * author :  孙强
 * function: ICD9编码表
 * history:  created by 孙强 
 * ***********************************************/
Ext.define('CisApp.view.shared.operation.OperationCombo', {
    extend: 'Fm.ux.form.WindowField',
    alias: 'widget.shared_operationcombo',
    fieldLabel: '手术编码',
    windowTitle: '手术编码',
    multiSelect: true,
    valueIsString: false,
    winHeight: 400,
    winWidth: 600,
    showClearTriggers: true,//是否显示清除按钮
    minPickerWidth: 500,
    displayField: 'Code',
    valueField: 'CodeName',
    triggerCls: Ext.baseCSSPrefix + 'cis-drgs-trigger',
    isPopWindow: true,
    initComponent: function () {
        var me = this;
        me.innerGrid = {
            xtype: "shared_operation",
            isShowCheck: me.multiSelect,
            width: 500,
            height: 400
        };
        me.callParent(arguments);
    }
});