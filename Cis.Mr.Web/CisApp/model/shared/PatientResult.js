/* ***********************************************
 * author :  胡亚坤
 * function: 参保人
 * history:  created by 胡亚坤 
 * ***********************************************/
Ext.define('CisApp.model.shared.PatientResult', {
    extend: 'Fm.base.Model',
    fields: [
       { name: 'PatientId' },
       { name: 'Name', type: 'string' },
       { name: 'BenefitGroupName', type: 'string' },
       { name: 'Gender', type: 'string' }
    ]
});