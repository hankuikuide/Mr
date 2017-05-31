/* ***********************************************
 * author :  localadmin
 * function: 
 * history:  created by localadmin 2016/4/15 14:08:05 
 * ***********************************************/
Ext.define('CisApp.model.drgsapi.report.Check', {
    extend: 'Fm.base.Model',
    fields: [
    { name: 'AId' },
    { name: 'MedicalId' },
    { name: 'CheckId' },
    { name: 'DepartmentCode' },
    { name: 'DepartmentName' },
    //{ name: 'DiagnosticCode' },
    //{ name: 'DiagnosticName' },
    { name: 'ApplyProjectCode' },
    { name: 'ApplyProjectName' },
    { name: 'ApplyDoctor' },
    { name: 'ApplyDoctorName' },
    { name: 'ApplyDatetime', type: 'date' },
    { name: 'ReportDatetime', type: 'date' },
    { name: 'CheckPositionCode' },
    { name: 'CheckResult' },
    { name: 'Abnormal' },
    { name: 'TradeNo' },
    { name: 'CheckPositionCodeName' },
    { name: 'DepartmentName1' },
    { name: 'DepartmentName2' },
    { name: 'DepartmentName3' },
    { name: 'DepartmentName4' },
    { name: 'DepartmentName5' },
    { name: 'DepartmentCode1' },
    { name: 'DepartmentCode2' },
    { name: 'DepartmentCode3' },
    { name: 'DepartmentCode4' },
    { name: 'DepartmentCode5' },
    { name: 'CheckPositionCode1' },
    { name: 'CheckPositionCode2' },
    { name: 'CheckPositionCode3' },
    { name: 'CheckPositionCode4' },
    { name: 'CheckPositionCode5' },
    { name: 'AbnormalName' }
    ],
    validators: {
        CheckId: [
                //{ type: 'presence', message: '必填项' },
                { type: 'length',  max: 128 }
        ],
        DepartmentCode: [
                { type: 'presence', message: '必填项' }
        ],
        DepartmentName: [
                { type: 'presence', message: '必填项' }
        ],
        //DiagnosticCode: [
        //        { type: 'presence', message: '必填项' },
        //        { type: 'length', min: 1, max: 128 }
        //],
        //DiagnosticName: [
        //        { type: 'presence', message: '必填项' },
        //        { type: 'length', min: 1, max: 128 }
        //],
        ApplyProjectCode: [
                { type: 'presence', message: '必填项' },
                { type: 'length', max: 128 }
        ],
        ApplyProjectName: [
                { type: 'presence', message: '必填项' },
                { type: 'length',  max: 128 }
        ],
        ApplyDoctor: [
                { type: 'presence', message: '必填项' },
                { type: 'length',  max: 128 }
        ],
        ApplyDoctorName: [
                { type: 'presence', message: '必填项' },
                { type: 'length',  max: 128 }
        ],
        ApplyDatetime: [
                { type: 'presence', message: '必填项' }
        ],
        ReportDatetime: [
                { type: 'presence', message: '必填项' }
        ],
        CheckPositionCode: [
                { type: 'presence', message: '必填项' }
        ],
        CheckResult: [
                { type: 'presence', message: '必填项' }//,
               // { type: 'length', min: 1, max: 2000 }
        ],
        Abnormal: [
               // { type: 'presence', message: '必填项' }
        ],
        DepartmentName1: [
        { type: 'length', max: 128 }
        ],
        DepartmentName2: [
        { type: 'length', max: 128 }
        ],
        DepartmentName3: [
        { type: 'length',  max: 128 }
        ],
        DepartmentName4: [
        { type: 'length',  max: 128 }
        ],
        DepartmentName5: [
        { type: 'length',  max: 128 }
        ],
        DepartmentCode1: [
        { type: 'length',  max: 128 }
        ],
        DepartmentCode2: [
        { type: 'length',  max: 128 }
        ],
        DepartmentCode3: [
        { type: 'length',  max: 128 }
        ],
        DepartmentCode4: [
        { type: 'length',  max: 128 }
        ],
        DepartmentCode5: [
        { type: 'length',  max: 128 }
        ]
        //,
        //CheckPositionCode1: [
        //{ type: 'presence', message: '必填项' }
        //],
        //CheckPositionCode2: [
        //{ type: 'presence', message: '必填项' }
        //],
        //CheckPositionCode3: [
        //{ type: 'presence', message: '必填项' }
        //],
        //CheckPositionCode4: [
        //{ type: 'presence', message: '必填项' }
        //],
        //CheckPositionCode5: [
        //{ type: 'presence', message: '必填项' }
        //]
    }
});