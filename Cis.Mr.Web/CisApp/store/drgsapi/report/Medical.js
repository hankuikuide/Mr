﻿/* ***********************************************
 * author :  localadmin
 * function: 
 * history:  created by localadmin 2016/4/18 10:57:06 
 * ***********************************************/
Ext.define('CisApp.store.drgsapi.report.Medical', {
    extend: 'Fm.base.Store',
    alias: 'store.drgsapi_medical',
    model: 'CisApp.model.drgsapi.report.Medical',
    proxy: {
        type: "ajax",
        api: { 
            read: '/group/Medical/SearchDataByAD' //SearchDataByAD//GetAllMedical
        }
    }
});