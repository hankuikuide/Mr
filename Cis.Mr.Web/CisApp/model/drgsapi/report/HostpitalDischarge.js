/* ***********************************************
 * author :  sunqiang
 * function: 
 * history:  created by sunqiang 2016/4/22 9:30:33 
 * ***********************************************/
Ext.define('CisApp.model.drgsapi.report.HostpitalDischarge', {
    extend: 'Fm.base.Model',
    fields: [
        { name: 'AId', type: 'string' },//id
        { name: 'MedicalId', type: 'string' },// 病案主页的id 
        { name: 'DischargeOutcome', type: 'string' },// '出院转归',
        { name: 'HospitalizationSituation', type: 'string' },// '入院情况',
        { name: 'DtProcess', type: 'string' },// '诊疗过程',
        { name: 'LeaveHospitalStatus', type: 'string' },// '出院情况',
        { name: 'LeaveDoctorAdvice', type: 'string' },// '出院医嘱'
        { name: 'HospitalId', type: 'string' },
        { name: 'PersonalNo', type: 'string' },
        { name: 'AdmissionNo', type: 'string' }
    ],
    validators: {    
        DischargeOutcome: [
         //{ type: 'presence', message: '必填项' },
         //{ type: 'length', min: 1, max: 128 }
        ],
        HospitalizationSituation: [
         { type: 'presence', message: '必填项' }//,
         //{ type: 'length', min: 1, max: 2000 }
        ],
        DtProcess: [
         { type: 'presence', message: '必填项' }//,
        // { type: 'length', min: 1, max: 2000 }
        ],
        LeaveHospitalStatus: [
         { type: 'presence', message: '必填项' }//,
         //{ type: 'length', min: 1, max: 2000 }
        ],
        LeaveDoctorAdvice: [
         { type: 'presence', message: '必填项' }//,
        // { type: 'length', min: 1, max: 2000 }
        ]
    }
});