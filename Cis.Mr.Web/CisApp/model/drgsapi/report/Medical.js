/* ***********************************************
 * author :  localadmin
 * function: 
 * history:  created by localadmin 2016/4/18 10:58:26 
 * ***********************************************/
Ext.define('CisApp.model.drgsapi.report.Medical', {
    extend: 'Fm.base.Model',
    fields: [
       { name: 'AId', type: 'string' },
       { name: 'LId', type: 'string' },
       { name: 'HospitalId', type: 'string' },
       { name: 'HospitalName', type: 'string' },
       { name: 'PatientId', type: 'string' },
       { name: 'AdmissionNo', type: 'string' },
       { name: 'OutBedNum', type: 'string' },
       { name: 'AdmissionDate', type: 'date' },
       { name: 'DischargeDate', type: 'date' },
       { name: 'DoctorCode', type: 'string' },
       { name: 'IsDrugAllergy', type: 'string' },
       { name: 'AllergyDrugCode', type: 'string' },
       { name: 'AllergyDrugName', type: 'string' },
       { name: 'PathologyCode', type: 'string' },
       { name: 'IsHospitalInfected', type: 'string' },
       { name: 'HospitalInfectedCode', type: 'string' },
       { name: 'BloodTypeS', type: 'string' },
       { name: 'BloodTypeE', type: 'string' },
       { name: 'LeaveHospitalType', type: 'string' },
       { name: 'ChiefComplaint', type: 'string' },
       { name: 'MedicalHistory', type: 'string' },
       { name: 'Height', type: 'string' },
       { name: 'Weight', type: 'string' },
       { name: 'Marriage', type: 'string' },
       { name: 'BearPregnancy', type: 'string' },
       { name: 'BearYie', type: 'string' },
       { name: 'AdmissionDiseaseId', type: 'string' },
       { name: 'AdmissionDiseaseName', type: 'string' },
       { name: 'DischargeDiseaseId', type: 'string' },
       { name: 'DischargeDiseaseName', type: 'string' },
       { name: 'OperId', type: 'string' },
       { name: 'OperDate', type: 'date' },
       { name: 'IsUpload', type: 'string' },
       { name: 'IsValid', type: 'string' },
       { name: 'Operator', type: 'string' },
       { name: 'OperatingDate', type: 'date' },
       { name: 'TradeNo', type: 'string' },
       { name: 'Tsblbs', type: 'string' },
       { name: 'DiagnosePosition1', type: 'string' },
       { name: 'DiagnosePosition2', type: 'string' },
       { name: 'SurgeryHistory', type: 'string' },
       { name: 'BloodTransHistory', type: 'string' },
       { name: 'DoctorName', type: 'string' },
       { name: 'IsPathologicalExamination', type: 'string' },
       { name: 'DiagnosisCode1', type: 'string' },
       { name: 'DiagnosisName1', type: 'string' },
       { name: 'DiagnosisCode2', type: 'string' },
       { name: 'DiagnosisName2', type: 'string' },
       { name: 'DiagnosisCode3', type: 'string' },
       { name: 'DiagnosisName3', type: 'string' },
       { name: 'DiagnosisCode4', type: 'string' },
       { name: 'DiagnosisName4', type: 'string' },
       { name: 'DiagnosisCode5', type: 'string' },
       { name: 'DiagnosisName5', type: 'string' },
       { name: 'DiagnosisCode6', type: 'string' },
       { name: 'DiagnosisName6', type: 'string' },
       { name: 'DiagnosisCode7', type: 'string' },
       { name: 'DiagnosisName7', type: 'string' },
       { name: 'DiagnosisCode8', type: 'string' },
       { name: 'DiagnosisName8', type: 'string' },
       { name: 'DiagnosisCode9', type: 'string' },
       { name: 'DiagnosisName9', type: 'string' },
       { name: 'DiagnosisCode10', type: 'string' },
       { name: 'DiagnosisName10', type: 'string' },
       { name: 'DiagnosisCode11', type: 'string' },
       { name: 'DiagnosisName11', type: 'string' },
       { name: 'DiagnosisCode12', type: 'string' },
       { name: 'DiagnosisName12', type: 'string' },
       { name: 'DiagnosisCode13', type: 'string' },
       { name: 'DiagnosisName13', type: 'string' },
       { name: 'DiagnosisCode14', type: 'string' },
       { name: 'DiagnosisName14', type: 'string' },
       { name: 'DiagnosisCode15', type: 'string' },
       { name: 'DiagnosisName15', type: 'string' },
       { name: 'DiagnosisCode16', type: 'string' },
       { name: 'DiagnosisName16', type: 'string' },
       { name: 'NewbornDate', type: 'date' },
       { name: 'NewbornWeight', type: 'string' },
       { name: 'NewbornCurrentWeight', type: 'string' },
       { name: 'BmiConveredAmount', type: 'number' },
       { name: 'TotalAmont', type: 'number' }
    ],
    validators: {
        NewbornWeight: [
            //{ type: 'range', min: 3, max: 4 }//,
            { type: 'format', matcher: /^(\d{3,4})?$/, message: '请输入正确数据' }

        ],
        NewbornCurrentWeight: [
            { type: 'format', matcher: /^(\d{3,5})?$/, message: '请输入正确数据' }
            //{ type: 'length', max: 5 }//,
            //{ type: 'format', matcher: /^\d{1,5}$/, message: '格式（整数数字）' }

        ],
        HospitalId: [
                  { type: 'presence', message: '必填项' },
                  { type: 'length', max: 128 }
        ],
        AdmissionNo: [
                  { type: 'presence', message: '必填项' },
                  { type: 'length', max: 128 }
        ],
        AdmissionDate: [
                  { type: 'presence', message: '必填项' }
        ],
        IsDrugAllergy: [
                 // { type: 'presence', message: '必填项' }
        ],
        IsHospitalInfected: [
                 // { type: 'presence', message: '必填项' }
        ],
        DischargeDate: [
                  { type: 'presence', message: '必填项' }
        ],
        PatientId: [
                  { type: 'presence', message: '必填项' },
                  { type: 'length', max: 128 }
        ],
        OutBedNum: [
                //{ type: 'presence', message: '必填项' },
                { type: 'length', max: 128 }
        ],



        AllergyDrugCode: [
                { type: 'length', max: 128 }
        ],
        AllergyDrugName: [
                { type: 'length', max: 128 }
        ],
        PathologyCode: [
                { type: 'length', max: 128 }
        ],

        HospitalInfectedCode: [
                { type: 'length', max: 128 }
        ],
        //BloodTypeS: [
        //        { type: 'length',  max: 8 }
        //],
        //BloodTypeE: [
        //        { type: 'length', max: 8 }
        //],
        LeaveHospitalType: [
                { type: 'presence', message: '必填项' }
        ],
        ChiefComplaint: [
               // { type: 'presence', message: '必填项' },
                //{ type: 'length', max: 512 }
        ],
        MedicalHistory: [
                //{ type: 'presence', message: '必填项' },
                //{ type: 'length', max: 2000 }
        ],
        Height: [
                //{ type: 'length', max: 8 },
                 //{ type: 'format', matcher: /^\d{0,8}(\.\d{1,8})?$/, message: '数字' }
                { type: 'format', matcher: /^(\d{2,3}(\.\d{1,4})?)?$/, message: '请输入正确数据' }
        ],
        Weight: [
            //{ type: 'length', max: 8 },
             { type: 'format', matcher: /^(\d{2,3}(\.\d{1,4})?)?$/, message: '请输入正确数据' }

        ],
        Marriage: [
                { type: 'presence', message: '必填项' }
                //,
                //{ type: 'format', matcher: /^[0-9]?$/, message: '' }
               // { type: 'format', matcher: /^\d{1,2}$/, message: '格式（数字）：xx' }

        ],
        BearPregnancy: [
            { type: 'length', max: 8 }
               //  { type: 'format', matcher: /^\d{1,2}$/, message: '格式（数字）：xx' }
        ],
        BearYie: [
            { type: 'length', max: 8 }
                // { type: 'format', matcher: /^\d{1,2}$/, message: '格式（数字）：xx' }
        ],
        AdmissionDiseaseId: [
                { type: 'presence', message: '必填项' },
                { type: 'length', max: 128 }
        ],
        AdmissionDiseaseName: [
                { type: 'presence', message: '必填项' },
                { type: 'length', max: 128 }
        ],
        DischargeDiseaseId: [
                { type: 'presence', message: '必填项' },
                { type: 'length', max: 128 }
        ], DischargeDiseaseName: [
            { type: 'presence', message: '必填项' },
            { type: 'length', max: 128 }
        ],
        TradeNo: [
            { type: 'length', max: 128 }
        ],
        Tsblbs: [
                //{ type: 'presence', message: '必填项' }
        ],
        DiagnosePosition1: [
                { type: 'length', max: 8 }
        ],
        DiagnosePosition2: [
               { type: 'length', max: 8 }
        ],
        SurgeryHistory: [
                  //  { type: 'presence', message: '必填项' },
                    //{ type: 'length', max: 512 }
        ],
        BloodTransHistory: [
                //  { type: 'presence', message: '必填项' },
                  //{ type: 'length', max: 512 }
        ],
        DoctorCode: [
                    { type: CisApp.Server.Config.DoctorLibrary ? 'presence' : '', message: '必填项' },
                    { type: 'length', max: 128 }
        ],
        DoctorName: [
                      { type: CisApp.Server.Config.DoctorLibrary ? 'presence' : '', message: '必填项' },
                      { type: 'length', max: 64 }
        ],
        IsPathologicalExamination: [
            //{ type: 'presence', message: '必填项' },
            //{ type: 'length',  max: 64 }
        ],
        DiagnosisCode1: [
         { type: 'length', max: 128 }
        ],
        DiagnosisName1: [
            { type: 'length', max: 128 }
        ],
        DiagnosisCode2: [
            { type: 'length', max: 128 }
        ],
        DiagnosisName2: [
            { type: 'length', max: 128 }
        ],
        DiagnosisCode3: [
            { type: 'length', max: 128 }
        ],
        DiagnosisName3: [
            { type: 'length', max: 128 }
        ],
        DiagnosisCode4: [
             { type: 'length', max: 128 }
        ],
        DiagnosisName4: [
            { type: 'length', max: 128 }
        ],
        DiagnosisCode5: [
            { type: 'length', max: 128 }
        ],
        DiagnosisName5: [
            { type: 'length', max: 128 }
        ],
        DiagnosisCode6: [
            { type: 'length', max: 128 }
        ],
        DiagnosisName6: [
            { type: 'length', max: 128 }
        ],
        DiagnosisCode7: [
            { type: 'length', max: 128 }
        ],
        DiagnosisName7: [
            { type: 'length', max: 128 }
        ],
        DiagnosisCode8: [
            { type: 'length', max: 128 }
        ],
        DiagnosisName8: [
            { type: 'length', max: 128 }
        ],
        DiagnosisCode9: [
            { type: 'length', max: 128 }
        ],
        DiagnosisName9: [
            { type: 'length', max: 128 }
        ],
        DiagnosisCode10: [
            { type: 'length', max: 128 }
        ],
        DiagnosisName10: [
            { type: 'length', max: 128 }
        ],
        DiagnosisCode11: [
             { type: 'length', max: 128 }
        ],
        DiagnosisName11: [
            { type: 'length', max: 128 }
        ],
        DiagnosisCode12: [
            { type: 'length', max: 128 }
        ],
        DiagnosisName12: [
            { type: 'length', max: 128 }
        ],
        DiagnosisCode13: [
            { type: 'length', max: 128 }
        ],
        DiagnosisName13: [
            { type: 'length', max: 128 }
        ],
        DiagnosisCode14: [
            { type: 'length', max: 128 }
        ],
        DiagnosisName14: [
            { type: 'length', max: 128 }
        ],
        DiagnosisCode15: [
            { type: 'length', max: 128 }
        ],
        DiagnosisName15: [
            { type: 'length', max: 128 }
        ],
        DiagnosisCode16: [
            { type: 'length', max: 128 }
        ],
        DiagnosisName16: [
            { type: 'length', max: 128 }
        ]
    }
});