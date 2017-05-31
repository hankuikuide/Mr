/* ***********************************************
 * author :  likeyi
 * function: 
 * history:  created by likeyi 2016/7/8 13:28:22 
 * ***********************************************/
Ext.define("CisApp.view.drgsapi.report.medical.medicalseach.MedicalSeach", {
    extend: 'Fm.base.SearchForm',
    alias: 'widget.drgsapi_report_medical_medicalseach',
    requires: [
        'CisApp.view.drgsapi.report.medical.medicalseach.MedicalSeachController',
        'CisApp.view.drgsapi.report.medical.medicalseach.MedicalSeachModel',
        'Fm.ux.DateRange',
        'Fm.ux.form.ComboGrid',
        'CisApp.view.shared.hospital.Hospital',
        'CisApp.view.shared.benefitgroup.BenefitGroup'
    ],
    controller: 'drgsapi_report_medical_medicalseach',
    viewModel: {
        type: 'drgsapi_report_medical_medicalseach'
    },
    searchHandler: 'searchBill',
    configKey: 'drgsapi.MedicalSeach.Items'
});