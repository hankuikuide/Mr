/* ***********************************************
 * author :  李克一
 * function: 
 * history:  created by 李克一 2016/12/13 13:10:38 
 * ***********************************************/
Ext.define('CisApp.model.drgsapi.report.WebLog', {
    extend: 'Fm.base.Model',
    fields: [
        { name: "UserName" },
        { name: "OperDate", type: "date" },
        { name: "BillType" },
        { name: "OperType" },
        { name: "OperContent" }
    ],
    validators: {
    }
});