/* ***********************************************
 * author :  韩奎奎
 * function: 疾病字典
 * history:  created by 韩奎奎 2015/7/6 15:03:12 
 * ***********************************************/
Ext.define('CisApp.model.shared.DiseaseResult', {
    extend: 'Fm.base.Model',
    fields: [
       { name: 'Icd' },
       { name: 'Name', type: 'string' },
       { name: 'DiseaseClass' }
    ]
});