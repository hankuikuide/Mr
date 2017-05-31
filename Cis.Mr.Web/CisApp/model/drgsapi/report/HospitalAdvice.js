/* ***********************************************
 * author :  孙强
 * function: 
 * history:  created by 孙强 2016/4/19
 * ***********************************************/
Ext.define('CisApp.model.drgsapi.report.HospitalAdvice', {
    extend: 'Fm.base.Model',
    fields: [
        { name: 'AId', type: 'string' },//病案主页的id
    { name: 'MedicalId', type: 'string' },// 定点机构编码 
    { name: 'DoctorAdviceNo', type: 'string' },// 医嘱序号
    { name: 'DoctorAdviceSNo', type: 'string' },// 医嘱子序号
    { name: 'DoctorAdviceState' },// 医嘱状态
    { name: 'IsLDoctorAdvice' },// 长期医嘱标识
    { name: 'DoctorAdviceType' },// 医嘱类别
    { name: 'DoctorAdviceContent' },// 医嘱正文
    { name: 'DoctorAdviceCode' },// 医嘱代码
    { name: 'DrugsMetering' },// 药品一次使用剂量
    { name: 'MeteringUnit' },// 剂量单位
    { name: 'MeteringChannel' },// 给药途径
    { name: 'MeteringChannelName' },// 给药途径
    { name: 'StartDate', type: 'date' },// 起始日期时间
    { name: 'EndDate', type: 'date' },// 停止日期时间
    { name: 'ContinuedDate' },// 持续时间
    { name: 'ContinuedDateUnit' },// 持续时间单位
    { name: 'Frequency' },// 使用频次
    { name: 'FrequencyName' },// 使用频次
    { name: 'Department' },// 开医嘱科室
    { name: 'StartDepartmentDoctor' },// 开医嘱医生
    { name: 'EndDepartmentDoctor' },// 停医嘱医生
    { name: 'StartDepartmentNurse' },// 开医嘱校对护士姓名
    { name: 'EndDepartmentNurse' },// 停医嘱校对护士姓名
    { name: 'StartDoctorAdviceDate', type: 'date' },// 开医嘱录入日期时间
    { name: 'EndDoctorAdviceDate' ,type:'date'},//,// 停医嘱录入日期时间
    //{ name: 'TradeNo' }// 交易流水号
    { name: 'StartDepartmentDoctorName' },// 开医嘱医生
    { name: 'EndDepartmentDoctorName' }//,// 停医嘱医生
    ],
    validators: {
        StartDepartmentDoctorName: [
                { type: 'presence', message: '必填项' },
                { type: 'length', min: 1, max: 128 }
        ],
        EndDepartmentDoctorName: [
           { type: 'presence', message: '必填项' },
           { type: 'length', min: 1, max: 128 }
        ],
        DoctorAdviceNo: [
           { type: 'presence', message: '必填项' },
           { type: 'length', min: 1, max: 128  }
        ],
        DoctorAdviceSNo: [
           { type: 'presence', message: '必填项' },
           { type: 'length', min: 1, max: 128  }
        ],
        Frequency: [
           { type: 'presence', message: '必填项' }
        ],
        DrugsMetering: [
           { type: 'presence', message: '必填项' },
           { type: 'length', min: 1, max: 128  }
        ],
        DoctorAdviceCode: [
           { type: 'presence', message: '必填项' },
           { type: 'length', min: 1, max: 128  }
        ],
        ContinuedDate: [
           { type: 'presence', message: '必填项' }
        ],
        EndDate: [
           { type: 'presence', message: '必填项' }
        ],
        StartDoctorAdviceDate: [
           { type: 'presence', message: '必填项' }
        ],
        EndDoctorAdviceDate: [
           { type: 'presence', message: '必填项' }
        ],
        StartDate: [
           { type: 'presence', message: '必填项' }
        ], 
        OrgCode: [
                { type: 'presence', message: '必填项' },
                { type: 'length', min: 1, max: 128 }
        ],
        PatientId: [
                { type: 'presence', message: '必填项' },
                { type: 'length', min: 1, max: 128 }
        ],
        AdmissionNo: [
                { type: 'presence', message: '必填项' },
                { type: 'length', min: 1, max: 128 }
        ],
        DoctorAdviceState: [
                { type: 'presence', message: '必填项' },
                { type: 'length', min: 1, max: 128  }
        ],
        IsLDoctorAdvice: [
                { type: 'presence', message: '必填项' } 
        ],
        DoctorAdviceType: [
                { type: 'presence', message: '必填项' } 
        ],
        DoctorAdviceContent: [
                { type: 'presence', message: '必填项' },
                { type: 'length', min: 1, max: 512 }
        ],
        MeteringUnit: [
               { type: 'presence', message: '必填项' },
               { type: 'length', min: 1, max: 128 }
        ],
        MeteringChannel: [
              { type: 'presence', message: '必填项' } 
        ],
        ContinuedDate: [
             { type: 'presence', message: '必填项' },
             { type: 'length', min: 1, max: 128 }
        ],
        ContinuedDateUnit: [
            { type: 'presence', message: '必填项' },
            { type: 'length', min: 1, max: 128 }
        ],
        Department: [
            { type: 'presence', message: '必填项' },
            { type: 'length', min: 1, max: 128 }
        ],
        StartDepartmentDoctor: [
            { type: 'presence', message: '必填项' },
            { type: 'length', min: 1, max: 128 }
        ],
        EndDepartmentDoctor: [
           { type: 'presence', message: '必填项' },
           { type: 'length', min: 1, max: 128 }
        ],
        StartDepartmentNurse: [
           { type: 'presence', message: '必填项' },
           { type: 'length', min: 1, max: 128 }
        ],
        EndDepartmentNurse: [
           { type: 'presence', message: '必填项' },
           { type: 'length', min: 1, max: 128 }
        ]
    }
});