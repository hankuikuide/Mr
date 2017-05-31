/* ***********************************************
 * author :  李辛
 * function: 
 * history:  created by 李辛 2016/4/25 15:49:36 
 * ***********************************************/
Ext.define('CisApp.model.drgsapi.report.Operation', {
    extend: 'Fm.base.Model',
    fields: [
        { name: 'OperationId' },
        { name: 'AId' },
        { name: 'OperationRecordNo' },//
        { name: 'IsComplication' },//
        { name: 'OperationFinishDate', type: 'date' },//
        { name: 'PersonalNo' },
        { name: 'MedicalId' },
        { name: 'OutBedNum' },
        { name: 'AdmissionDate', type: 'date' },
        { name: 'DischargeDate', type: 'date' },
        { name: 'OperationDoctorCode' },
        { name: 'OperationDoctorName' },
        { name: 'FirstOperdoctorCode' },
        { name: 'FirstOperdoctorName' },
        { name: 'SecondOperdoctorCode' },
        { name: 'SecondOperdoctorName' },
        { name: 'AnaesthesiaType' },
        { name: 'OperationDate', type: 'date' },
        { name: 'ComplicationCode' },
        { name: 'ComplicationName' },
        { name: 'RecordDoctorCode' },
        { name: 'RecordDoctorName' },
        { name: 'OperationRecord' },
        { name: 'DiagnosePosition' },
        { name: 'AnesthesiologistCode' },
        { name: 'AnesthesiologistName' }
    ],
    validators: {
        OperationFinishDate: [
           { type: 'presence', message: '手术执行结束时间必填' }
        ],
        OperationRecordNo: [
           //{ type: 'presence', message: '手术记录序号必填' },
             { type: 'length',  max: 128 }
        ],
        DiagnosePosition: [
           { type: 'presence', message: '方位必填' }
        ],
        OperationDoctorCode: [
           { type: 'presence', message: '手术医师编码必填' },
             { type: 'length', min: 1, max: 128 }
        ],
        OperationDoctorName: [
         { type: 'presence', message: '手术医师姓名必填' },
           { type: 'length', min: 1, max: 128 }
        ],
        FirstOperdoctorCode: [
           { type: 'presence', message: '手术医师I助编码必填' },
             { type: 'length', min: 1, max: 128 }
        ],
        FirstOperdoctorName: [
         { type: 'presence', message: '手术医师I助姓名必填' },
           { type: 'length', min: 1, max: 128 }
        ],
        SecondOperdoctorCode: [
           { type: 'presence', message: '手术医师II助编码必填' },
             { type: 'length', min: 1, max: 128 }
        ],
        SecondOperdoctorName: [
         { type: 'presence', message: '手术医师II助姓名必填' },
           { type: 'length', min: 1, max: 128 }
        ],
        AnaesthesiaType: [
           //{ type: 'presence', message: '麻醉方式必填' }
        ],
        //AnesthesiologistCode: [
        // { type: 'presence', message: '麻醉师编码必填' },
        //   { type: 'length', min: 1, max: 128 }
        //],
        //AnesthesiologistName: [
        //   { type: 'presence', message: '麻醉师姓名必填' },
        //     { type: 'length', min: 1, max: 128 }
        //],
        OperationDate: [
         { type: 'presence', message: '手术执行日期时间必填' }
        ],
        ComplicationCode: [
           //{ type: 'presence', message: '手术并发症编码必填' },
             { type: 'length',  max: 128 }
        ],
        ComplicationName: [
          //{ type: 'presence', message: '手术并发症名称必填' },
            { type: 'length', max: 128 }
        ]//,
        //RecordDoctorCode: [
        //  { type: 'presence', message: '手术记录医师编码必填' },
        //    { type: 'length', min: 1, max: 128 }
        //]//,
        //RecordDoctorName: [
        //  { type: 'presence', message: '手术记录医师姓名必填' },
        //    { type: 'length', min: 1, max: 128 }
        //],
        //OperationRecord: [
        //// { type: 'presence', message: '手术记录必填' }//,
        //  // { type: 'length', min: 1, max: 2000 }
        //]
    }
});