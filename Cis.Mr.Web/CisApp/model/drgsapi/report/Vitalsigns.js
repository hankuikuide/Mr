/* ***********************************************
 * author :  Vinge
 * function: 生命体征
 * history:  created by Vinge 2016/04/21 18:01:36 
 * ***********************************************/
Ext.define('CisApp.model.drgsapi.report.Vitalsigns', {
    extend: 'Fm.base.Model',
    fields: [
        { name: 'AId' },
        { name: 'MedicalId' },
        { name: 'VitalsignsId' },
        { name: 'OutBedNum' },
        { name: 'AdmissionDate', type: 'date' },
        { name: 'DischargeDate', type: 'date' },
        { name: 'MeasureDate', type: 'date' },
        { name: 'SystolicPressure' },
        { name: 'DiastolicPressure' },
        { name: 'Temperature' },
        { name: 'HeartRate' },
        { name: 'Breathing' }
    ],
    validators: {
        VitalsignsId: [
               { type: 'presence', message: '必填项' },
               { type: 'length', min: 1, max: 128 }
        ],
        OutBedNum: [
              { type: 'presence', message: '必填项' },
              { type: 'length', min: 1, max: 128 }
        ],
        AdmissionDate: [
             { type: 'presence', message: '必填项' }
        ],
        DischargeDate: [
            { type: 'presence', message: '必填项' }
        ],
        MeasureDate: [
            { type: 'presence', message: '必填项' }
        ],
        SystolicPressure: [
            { type: 'presence', message: '必填项' },
            { type: 'length', min: 1, max: 8 }//,
            // { type: 'format', matcher: /^\d{1,4}$/, message: '格式（数字）：xxxx' }

        ],
        DiastolicPressure: [
            { type: 'presence', message: '必填项' },
            { type: 'length', min: 1, max: 8 }//,
            // { type: 'format', matcher: /^\d{1,4}$/, message: '格式（数字）：xxxx' }
        ],
        Temperature: [
            { type: 'presence', message: '必填项' },
            { type: 'length', min: 1, max: 8 }//,
             //{ type: 'format', matcher: /^\d{1,2}(\.\d{1,2})?$/, message: '格式（数字）：xx.xx' }
        ],
        HeartRate: [
            { type: 'presence', message: '必填项' },
            { type: 'length', min: 1, max: 8 }//,
            // { type: 'format', matcher: /^\d{1,4}$/, message: '格式（数字）：xxxx' }
        ],
        Breathing: [
            { type: 'presence', message: '必填项' },
            { type: 'length', min: 1, max: 8 }//,
            // { type: 'format', matcher: /^\d{1,4}$/, message: '格式（数字）：xxxx' }
        ]
    }
});