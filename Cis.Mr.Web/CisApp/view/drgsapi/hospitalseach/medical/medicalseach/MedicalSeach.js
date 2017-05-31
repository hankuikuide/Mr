/* ***********************************************
 * author :  likeyi
 * function: 无结算查询
 * history:  created by likeyi 2016/8/27 10:55:03 
 * ***********************************************/
Ext.define("CisApp.view.drgsapi.hospitalseach.medical.medicalseach.MedicalSeach", {
    extend: 'Fm.base.SearchForm',
    alias: 'widget.CisApp_drgsapi_hospitalseach_medical_medicalseach',
    requires: [
        'CisApp.view.drgsapi.hospitalseach.medical.medicalseach.MedicalSeachController',
        'CisApp.view.drgsapi.hospitalseach.medical.medicalseach.MedicalSeachModel',
        'Fm.ux.DateRange',
        'Fm.ux.form.ComboGrid',
        'CisApp.view.shared.hospital.Hospital'//,
    ],
    controller: 'CisApp_drgsapi_hospitalseach_medical_medicalseach',
    viewModel: {
        type: 'CisApp_drgsapi_hospitalseach_medical_medicalseach'
    },
    searchHandler: 'noBillSearch',
    configKey: 'hospitalseach.MedicalSeach.Items'
});