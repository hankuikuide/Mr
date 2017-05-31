/* ***********************************************
 * author :  likeyi
 * function: 
 * history:  created by likeyi 2016/7/8 13:58:01 
 * ***********************************************/
Ext.define("CisApp.view.drgsapi.report.medical.medicalcontainer.MedicalContainer", {
    extend: 'Ext.container.Container',
    alias: 'widget.drgsapi_report_medical_medicalcontainer',
    requires: [
        'CisApp.view.drgsapi.report.medical.medicalcontainer.MedicalContainerController',
        'CisApp.view.drgsapi.report.medical.medicalcontainer.MedicalContainerModel',
        "CisApp.view.drgsapi.report.medical.Medical",
        "CisApp.view.drgsapi.report.medical.medicalseach.MedicalSeach"
    ],
    controller: 'drgsapi_report_medical_medicalcontainer',
    viewModel: {
        type: 'drgsapi_report_medical_medicalcontainer'
    },
    layout: "border",
    autoScroll: false,
    bbarHidden: false,  
    initComponent: function () {
        var me = this;
        me.items = [];
        me.items.push({
            region: "north",
            xtype: 'drgsapi_report_medical_medicalseach',
            cls: 'x-panel-split-bottom'
        }, {
            region: 'center',
            xtype: 'drgsapi_medical',
            bbarHidden: me.bbarHidden
        });

        me.callParent(arguments);
    }
});