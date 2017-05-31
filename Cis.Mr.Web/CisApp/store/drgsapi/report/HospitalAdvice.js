Ext.define('CisApp.store.drgsapi.report.HospitalAdvice', {
    extend: 'Fm.base.Store',
    model: 'CisApp.model.drgsapi.report.HospitalAdvice',
    alias: 'store.drgsapi_report_hospitaladvice',
    proxy: {
        api: {
            read: Fm.Server.ApiUrl+'/group/Docadvice/GetDocadvice'
        }
    }
})