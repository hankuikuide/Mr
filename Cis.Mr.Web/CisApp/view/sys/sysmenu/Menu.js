/* ***********************************************
 * author :  何泽立
 * function: 角色管理 view
 * history:  created by 何泽立 2015/7/24 
 * ***********************************************/

Ext.define('CisApp.view.sys.sysmenu.Menu', {
    extend: 'Ext.panel.Panel',
    requires: [
        'CisApp.view.sys.sysmenu.MenuController',
        'CisApp.view.sys.sysmenu.MenuModel',
        'Ext.ux.CheckColumn',
        'Fm.ux.form.ComboGrid'
    ],
    controller: 'sys_sysmenu',
    viewModel: {
        type: 'sys_sysmenu'
    },
    reserveScrollbar: true,
    layout: 'border',
    useArrows: true,
    items: [{
        xtype: 'treepanel',
        rootVisible: false,
        multiSelect: false,
        singleExpand: false,
        region: 'center',
        dockedItems: [
            {
                xtype: 'toolbar',
                width: '100%',
                defaults: {
                    labelAlign: 'right',
                },
                dock: 'top',
                items: [
                    {
                        xtype: 'combo',
                        fieldLabel: '名称',
                        emptyText: '请选择',
                        width: 200,
                        labelWidth: 34,
                        displayField: 'Text',
                        valueField: 'Value',
                        showClearTriggers: false,
                        editable: false,
                        //store: fmAppFactory.Data.getAllDataStore('System'),
                        bind: {
                            value: '{appKey}'
                        }
                    }, {
                        xtype: 'button',
                        text: '检索',
                        handler: 'search',
                        //width: AppConfig.Design.SearchPanel.SearchButtonWidth
                    }
                ]
            }
        ],
        bind: {
            store: '{menutreestore}',
            selection: '{selection}'
        },
        listeners: {
            itemclick: 'itemclick'
        },
        columns: [{
            xtype: 'treecolumn',
            text: '名称',
            width: 150,
            dataIndex: 'Name'
        }, {
            text: '编号',
            width: 50,
            dataIndex: 'Id'
        }, {
            text: '类型',
            dataIndex: 'MenuType',
            width: 100,
            renderer: function (value, model) {
                switch (model.record.get('OperationType')) {
                    case '1':
                        return '目录';
                        //case '2':
                        //    return (Ext.Array.findBy(FmApp.Server.Datas['MenuType'], function (item) {
                        //        return item.Value == value
                        //    }) || { Text: '' }).Text;
                    case '3':
                        return '功能';
                    default:
                        return '';
                }
            }
        }, {
            text: '状态',
            dataIndex: 'State',
            width: 60,
            // renderer: Fm.Common.Util.dataTextRender(Fm.Server.Datas['EnumEnableState'])
        }, {
            text: '排序号',
            dataIndex: 'Sort',
            width: 50
        }, {
            text: '菜单事件',
            dataIndex: 'Handler',
            width: 80
        }, {
            text: '视图',
            dataIndex: 'MenuView',
            width: 300
        }, {
            text: '图标',
            dataIndex: 'Icon',
            width: 120
        }, {
            text: '备注',
            dataIndex: 'Remark',
            flex: 1
        }],
        buttons: [
                    {
                        xtype: 'button',
                        text: '新增',
                        handler: 'onAddMenu'
                    },
                    {
                        xtype: 'button',
                        text: '删除',
                        handler: 'onDelete',
                        bind: {
                            disabled: '{deletedisabled}'
                        }
                    }]
    }, {
        xtype: 'panel',
        split: true,
        region: 'south',
        height:260,
        defaults: {
            margin: '20 02 02 20'
        },
        items: [{
            xtype: 'textfield',
            fieldLabel: '名称',
            bind: '{selection.Name}'
        }, {
            xtype: 'textfield',
            fieldLabel: '父节点编号',
            bind: {
                value: '{selection.Id}',
                hidden: '{parentDisabled}'
            }
        }, {
            xtype: 'textfield',
            fieldLabel: '菜单事件',
            bind: '{selection.Handler}'
        }, {
            xtype: 'textfield',
            fieldLabel: '视图',
            bind: '{selection.MenuView}'
        }, {
            xtype: 'textfield',
            fieldLabel: '图标',
            bind: '{selection.Icon}'
        }],
        buttons: [
            {
                xtype: 'button',
                text: '保存',
                handler: 'onSave',
                bind: {
                    disabled: '{deletedisabled}'
                }
            }]
    }]
});