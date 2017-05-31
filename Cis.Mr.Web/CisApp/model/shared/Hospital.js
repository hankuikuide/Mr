/* ***********************************************
 * author :  孙强
 * function: 医疗机构查询
 * history:  created by 孙强 2015/10/19 
 * ***********************************************/
Ext.define('CisApp.model.shared.Hospital', {
    extend: 'Ext.data.Model',
    fields: [
        { name: 'Id', type: 'string' },
        { name: 'GpId', type: 'string' },
        { name: 'DetailId', type: 'string' },
        { name: 'DetailName', type: 'string' },
        { name: 'Level' },
        { name: 'Type', type: 'string', convert: Fm.Common.Util.dataTextRender(CisApp.Server.Datas.EnumHospitalType) },
        { name: 'OperId', type: 'string' },
        { name: 'Region', type: 'string' },
        { name: 'IsChecked', type: 'bool' },
        { name: 'IsAlloted', type: 'bool' },
        { name: 'OperDate', type: 'date', dateFormat: 'Y-m-d H:i:s' }
    ]
});