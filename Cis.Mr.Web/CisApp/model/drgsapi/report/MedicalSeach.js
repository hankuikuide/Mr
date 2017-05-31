/* ***********************************************
 * author :  localadmin
 * function: 
 * history:  created by localadmin 2016/4/19 12:20:26 
 * ***********************************************/
Ext.define('CisApp.model.drgsapi.report.MedicalSeach', {
    extend: 'Fm.base.Model',
    fields: [
        { name: 'AdmissionNo' },
        { name: 'BmiNo' },
        { name: 'IsUpload' },
        { name: 'DataValidateFlag' },
        { name: 'AdmissionDateS' },
        { name: 'AdmissionDateE' },
        { name: 'PatientName' },
        { name: 'BmiNo' },
        { name: 'HospitalId' },
        { name: 'BenefitGroupIds' }
    ]
});