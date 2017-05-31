/* ***********************************************
 * author :  sunqiang
 * function: 
 * history:  created by sunqiang 2016/7/4 14:36:44 
 * ***********************************************/
Ext.define('CisApp.model.shared.OperationResult', {
    extend: 'Fm.base.Model',
    fields: [
        { name: 'Code', type: 'string' },
        {
            name: 'CodeName', type: 'string', convert: function (val, model) {
                return model.get('Code') + '>||<' + model.get('Name');
            }
        },// 需求 是 返回2个值 = 一个值 用 '>||<' 连接  需要后台 处理
        { name: 'Name', type: 'string' }
    ],
    validators: {
    }
});