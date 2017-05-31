/* ***********************************************
 * author :  李辛
 * function: 
 * history:  created by 李辛 2016/4/18 14:09:15 
 * ***********************************************/
Ext.define('CisApp.model.drgsapi.report.Inspection', {
    extend: 'Fm.base.Model',
    fields: [
    { name: 'AId' },
    { name: 'MedicalId' },
    { name: 'CheckId' },
    { name: 'DepartmentCode' },
    { name: 'DepartmentName' },
    { name: 'DiagnosticCode' },
    { name: 'DiagnosticName' },
    { name: 'ApplyProjectCode' },
    { name: 'ApplyProjectName' },
    { name: 'ApplyDoctor' },
    { name: 'ApplyDatetime', type: 'date' },
    { name: 'ReportDatetime', type: 'date' },
    { name: 'SpecimenCode' },
    { name: 'SpecimenCodeName' },
    { name: 'SpecimenName' } ,
    { name: 'ApplyDoctorName' }
    ],
    validators: {
        ApplyDoctorName: [
              { type: 'presence', message: '申请医师姓名必填' },
                { type: 'length', min: 1, max: 128 }
        ],
        CheckId: [
              { type: 'presence', message: '检验单号必填' },
                { type: 'length', min: 1, max: 128 }
        ],
        DepartmentCode: [
             { type: 'presence', message: '申请科室代码必填' },
               { type: 'length', min: 1, max: 128 }
        ],
        DepartmentName: [
             { type: 'presence', message: '申请科室名称必填' },
               { type: 'length', min: 1, max: 128 }
        ],
        DiagnosticCode: [
             { type: 'presence', message: '临床诊断编码必填' },
               { type: 'length', min: 1, max: 128 }
        ],
        DiagnosticName: [
             { type: 'presence', message: '临床诊断名称必填' },
               { type: 'length', min: 1, max: 128 }
        ],
        ApplyProjectCode: [
             { type: 'presence', message: '申请项目编码必填' },
               { type: 'length', min: 1, max: 128 }
        ],
        ApplyProjectName: [
             { type: 'presence', message: '申请项目名称必填' },
               { type: 'length', min: 1, max: 128 }
        ],
        ApplyDoctor: [
             { type: 'presence', message: '申请医师编码必填' },
               { type: 'length', min: 1, max: 128 }
        ],
        ApplyDatetime: [
             { type: 'presence', message: '申请时间必填' }
        ],
        ReportDatetime: [
             { type: 'presence', message: '报告时间必填' }
        ],
        SpecimenCode: [
             { type: 'presence', message: '标本代码必填' },
               { type: 'length', min: 1, max: 8 }
        ],
        SpecimenName: [
             { type: 'presence', message: '标本名称必填' },
               { type: 'length', min: 1, max: 128 }
        ]
    }
});