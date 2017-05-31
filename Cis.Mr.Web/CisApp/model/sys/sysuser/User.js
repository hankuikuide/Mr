/* ***********************************************
 * author :  汪振
 * function: 
 * history:  created by 汪振 2015/7/28 
 * ***********************************************/

Ext.define('CisApp.model.sys.sysuser.User', {
    extend: 'Fm.base.Model',
    fields: [
        { name: 'Id', type: 'string' },
        { name: 'Surname', type: 'string' },
        { name: 'Name', type: 'string' },
        { name: 'UserType', type: 'number' },
        { name: 'UserName', type: 'string' },
        { name: 'EmailAddress', type: 'string' },
        { name: 'LastLoginTime', type: 'string' },
        { name: 'CreationTime', type: 'string' },
        { name: 'IsActive', type: 'number' }
    ],
    idProperty: 'Id',
    validators: {
        Code: [
            { type: 'presence', message: '登录名称是必需条件' },
            { type: 'format', matcher: /^[a-zA-Z0-9_]{3,16}$/, message: '登录名称由 3-16位 字母数字下划线组成 ' }
        ],
        Name: [
            { type: 'length', min: 2, max: 20 }
        ],
        Type: { type: 'presence', message: '用户类型是必需条件' },
        Remark: [
            { type: 'length', min: 0, max: 128, bothMessage: '输入字符超过最大长度({1}个汉字)' }
        ]
    }
}
);