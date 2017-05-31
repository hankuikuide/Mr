/* ***********************************************
 * author :  李辛
 * function: 
 * history:  created by 李辛 2016/4/20 15:44:24 
 * ***********************************************/
Ext.define('CisApp.model.drgsapi.report.InspectionDetail', {
    extend: 'Fm.base.Model',
    fields: [
         { name: 'AId' },
        { name: 'CheckId' }, 
    { name: 'CheckCode' },
    { name: 'CheckName' },
    { name: 'CheckResult' },
    { name: 'ResultMax' },
    { name: 'ResultMin' },
    { name: 'MeasuremenUnit' },
    { name: 'Abnormal' },
     { name: 'AbnormalName' }
    ],
    validators: {
        CheckCode: [
              { type: 'presence', message: '检验明细编号必填' },
                { type: 'length', min: 1, max: 128 }
        ],
        CheckName: [
             { type: 'presence', message: '检验明细名称必填' },
               { type: 'length', min: 1, max: 128 }
        ],
        CheckResult: [
             { type: 'presence', message: '检验结果必填' },
               { type: 'length', min: 1, max: 128 }
        ],
        ResultMax: [
             { type: 'presence', message: '结果正常最大值' },
               { type: 'length', min: 1, max: 128 }
        ],
        ResultMin: [
             { type: 'presence', message: '结果正常最小值' },
               { type: 'length', min: 1, max: 128 }
        ],
        MeasuremenUnit: [
             { type: 'presence', message: '计量单位' },
               { type: 'length', min: 1, max: 128 }
        ],
        Abnormal: [
             { type: 'presence', message: '异常提示' },
               { type: 'length', min: 1, max: 128 }
        ]
    }
});