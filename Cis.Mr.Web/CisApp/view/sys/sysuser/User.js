/* ***********************************************
 * author :  何泽立
 * function: 
 * history:  created by 何泽立 2015/11/24 
 * ***********************************************/

Ext.define("CisApp.view.sys.sysuser.User", {
    extend: 'Fm.base.Grid',
    requires: [
        'CisApp.view.sys.sysuser.UserController',
        'CisApp.view.sys.sysuser.UserModel',
        'Fm.ux.grid.plugin.ClickSelection'
    ],
    plugins: [{
        ptype: 'clickselection'
    }],
    controller: 'sys_sysuser_user',
    viewModel: 'sys_sysuser_user',
    isPage: true,
    notAutoWidth: true,
    border: 0,
    bind: {
        store: '{gridstore}',
        selection: '{focusUser}'
    },
    tbar: {
        xtype: 'toolbar',
        padding: 3,
        width: '100%',
        defaults: {
            labelAlign: 'right',
            margin: 10
        },
        items: [{
            xtype: 'combo',
            fieldLabel: '类型',
            emptyText: '请选择',
            queryMode: 'local',
            displayField: 'Text',
            labelWidth: 34,
            width: 180,
            valueField: 'Value',
            bind: {
                store: '{usertype}'
            },
            editable: false,
            listeners: {
                change: 'filter'
            },
            filterConfig: {
                type: 'string',
                operator: '=',
                property: 'UserType'
            }
        }, {
            labelWidth: 47,
            width: 180,
            xtype: 'textfield',
            fieldLabel: '登录名',
            bind: '{searchModel.Code}',
            listeners: {
                change: 'filter'
            },
            filterConfig: {
                type: 'string',
                operator: 'like',
                property: 'Code'
            }
        },
           {
               labelWidth: 34,
               width: 180,
               xtype: 'textfield',
               fieldLabel: '名称',
               bind: '{searchModel.Name}',
               listeners: {
                   change: 'filter'
               },
               filterConfig: {
                   type: 'string',
                   operator: 'like',
                   property: 'Name'
               }
           }
        ]
    },
    columns: [
            { text: '序号', xtype: 'rownumberer', align: 'left', width: 50 },
            { text: '登录名', dataIndex: 'UserName', align: 'left', width: 100 },
            { text: '名称', dataIndex: 'Name', align: 'left', width: 120 },
            { text: '别名', dataIndex: 'Surname', align: 'left', width: 120 },
            { text: '全名', dataIndex: 'FullName', align: 'left', width: 150 },
            { text: '邮件地址', dataIndex: 'EmailAddress', align: 'left', width: 220 },
            { text: '创建时间', dataIndex: 'CreationTime', align: 'left', width: 150 },
            { text: '上一次登录时间', dataIndex: 'LastLoginTime', align: 'left', width: 150 },
            { text: '状态', dataIndex: 'IsActive', align: 'left', width: 60, flex:1 }
    ],
    buttons: [
           { xtype: 'button', text: '新增', handler: 'add' },
           { xtype: 'button', text: '修改', handler: 'modify', bind: { disabled: '{allotBtnDisabled}' } },
           { xtype: 'button', text: '删除', handler: "toDelete", bind: { disabled: '{allotBtnDisabled}' } },
           { xtype: 'button', text: '角色分配', handler: 'authorityAllot', bind: { disabled: '{allotBtnDisabled}' } },
           { xtype: 'button', text: '机构分配', handler: 'hospitalAllot', bind: { disabled: '{hospitalBtnDisabled}' } }
    ],
    listeners: {
        itemdblclick: 'modify'
    }
});