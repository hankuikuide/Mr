/* ***********************************************
 * author :  likeyi
 * function: 无结算查询
 * history:  created by likeyi 2016/8/27 10:54:25 
 * ***********************************************/
Ext.define("CisApp.view.drgsapi.hospitalseach.medical.medicalcontainer.MedicalContainer", {
    extend: 'Ext.container.Container',
    alias: 'widget.CisApp_drgsapi_hospitalseach_medical_medicalcontainer',
    requires: [
        'CisApp.view.drgsapi.hospitalseach.medical.medicalcontainer.MedicalContainerController',
        'CisApp.view.drgsapi.hospitalseach.medical.medicalcontainer.MedicalContainerModel',
        'CisApp.view.drgsapi.hospitalseach.medical.medicalseach.MedicalSeach',
        "CisApp.view.drgsapi.hospitalseach.medical.Medical"

    ],
    controller: 'CisApp_drgsapi_hospitalseach_medical_medicalcontainer',
    viewModel: {
        type: 'CisApp_drgsapi_hospitalseach_medical_medicalcontainer'
    },
    layout: "border",
    autoScroll: false,
    bbarHidden: false,
    initComponent: function () {
        var me = this;

        me.items = [];
        me.items.push(
            {
                region: "north",
                xtype: 'CisApp_drgsapi_hospitalseach_medical_medicalseach',
                cls: 'x-panel-split-bottom'
            }, {
                region: 'center',
                xtype: 'CisApp_drgsapi_hospitalseach_medical',
                bbarHidden: me.bbarHidden
            });
        me.callParent(arguments);
    }
});