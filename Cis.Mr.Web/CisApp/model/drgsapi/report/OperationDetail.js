/* ***********************************************
 * author :  sunqiang
 * function: 
 * history:  created by sunqiang 2016/6/21 17:34:17 
 * ***********************************************/
Ext.define('CisApp.model.drgsapi.report.OperationDetail', {
    extend: 'Fm.base.Model',
    fields: [
        { name: 'AId', type: 'string' },
        { name: 'OperationRecordNo', type: 'string' },//
        { name: 'OperationCode', type: 'string' },
        { name: 'OperationName', type: 'string' },
        { name: 'OperationLevel', type: 'string' },
        { name: 'OperationIncisionClass', type: 'string' },
        { name: 'OperationHealClass', type: 'string' },
        { name: 'OperationNo', type: 'string' },
        { name: 'IsMajorIden', type: 'string' },
        { name: 'IsIatrogenic', type: 'string' },
        { name: 'AdmissionNo', type: 'string' },
        { name: 'HospitalId', type: 'string' },
        { name: 'PersonalNo', type: 'string' },
        { name: 'OperId', type: 'string' },
        { name: 'OperDate', type: 'date' },
        { name: 'OperationId ' }
    ],
    validators: {
        OperationNo: [
           { type: 'length',  max: 128 }
        ],
        OperationCode: [
           { type: 'presence', message: '必填' },
           { type: 'length', min: 1, max: 128 }
        ],
        OperationName: [
           { type: 'presence', message: '必填' },
           { type: 'length', min: 1, max: 128 }
        ],
        OperationLevel: [
           { type: 'presence', message: '必填' }
        ],
        OperationIncisionClass: [
           { type: 'presence', message: '必填' }
        ],
        OperationHealClass: [
           { type: 'presence', message: '必填' }
        ],
        IsMajorIden: [
           { type: 'presence', message: '必填' }
        ]
    }
});