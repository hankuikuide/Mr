/* ***********************************************
 * author :  韩奎奎
 * function: 医生
 * history:  created by 韩奎奎 2015/7/6 15:03:12 
 * ***********************************************/
Ext.define('CisApp.model.shared.DoctorResult', {
    extend: 'Fm.base.Model',
    fields: [
       { name: 'DoctorCode' },
       { name: 'DoctorName', type: 'string' },
       {
           name: 'CombineName', type: 'string', convert: function (val, model) {
               return model.get('DoctorCode') + '>||<' + model.get('DoctorName');
           }
       },
       {name :'HospitalName', type: 'string' },
       { name: 'HospitalId', type: 'string' },
       { name: 'DoctorSex', type: 'string' },
       { name: 'DoctorLevel', type: 'string' },
       { name: 'DoctorTitle', type: 'string' }
    ]
});