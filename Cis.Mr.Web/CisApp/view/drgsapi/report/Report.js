/* ***********************************************
 * author :  Vinge
 * function: 
 * history:  created by Vinge 2016/04/15 13:37:07 
 * ***********************************************/
Ext.define("CisApp.view.drgsapi.report.Report", {
    extend: 'Ext.container.Container',
    alias: 'widget.drgsapi_report',
    requires: [
       'CisApp.view.drgsapi.report.ReportController',
       'Fm.ux.grid.plugin.ClickSelection',
       'CisApp.view.drgsapi.report.check.Check',
       'CisApp.view.drgsapi.report.operation.Operation',
       'CisApp.view.drgsapi.report.operationdetail.OperationDetail',
       'CisApp.view.drgsapi.report.medical.medicalform.MedicalForm',
       'CisApp.view.drgsapi.report.hospitaldischarge.HospitaldischargeForm.HospitaldischargeForm',
       'CisApp.view.drgsapi.report.medical.medicalcontainer.MedicalContainer'
    ],
    controller: "drgsapi_report",
    autoScroll: false,
    layout: 'border',
    border: false,
    //id: 'myView',
    //scrollable: 'y',
    isDrgsgs: true,
    viewParams: { isDrgsgs: true },
    listeners: {
        afterrender: 'keyMap'
    },
    refreshByParam: function (param) {
        var me = this,
           searchView = me.down('drgsapi_report_medical_medicalseach'), //找到查询面板
           searchViewModel = searchView.getViewModel(),
           searchModel,
           medicals = me.down('drgsapi_medical'),//找到调用方法
           medicalController = medicals.getController();

        setTimeout(function () {
            searchModel = searchViewModel.get('seachData');
            searchModel.set('AdmissionDateS', param.StartDate);
            searchModel.set('AdmissionDateE', param.EndDate);
            searchModel.set('HospitalId', param.OrgCode);
            medicalController.refresh();
        }, 100);

    },
    initComponent: function () {
        Ext.JSON.encodeDate = function (d) {
            return Ext.Date.format(d, '"Y-m-d H:i:s"');
        };
        var me = this;
        if (me.viewParams != null) {
            me.isDrgsgs = me.viewParams.isDrgsgs;
        }
        me.items = [];
        me.items.push(
            {
                xtype: 'drgsapi_report_medical_medicalcontainer',
                region: 'center',
                split: true,
                style: {
                    bordertop: '1px solid #e9e9e9'
                },
                bbarHidden: !me.isDrgsgs
            }, {
                region: "south",
                xtype: 'tabpanel',
                selftype: 'drgsapi_report_tab',
                split: true,
                //id: 'drgsapi_report_tab',
                height: "45%",
                tabBarHeaderPosition: 0,
                plain: true,
                tools: [
                    { type: 'maximize', tooltip: '最大化', handler: 'onSouthFold' },
                    { type: 'restore', tooltip: '还原', handler: 'onSouthFold', hidden: true }
                ],
                items: [{
                    title: '病案',
                    xtype: 'drgsapi_report_medical_medicalform',//'drgsapi_medical'
                    formEditable: me.isDrgsgs
                }, {
                    title: '出院小结',
                    xtype: 'drgsapi_report_hospitaldischarge_HospitaldischargeForm',//'drgsapi_report_hospitaldischarge'
                    formEditable: me.isDrgsgs,
                    modelValidation: me.isDrgsgs
                }, {
                    title: '检查单',
                    xtype: 'CisApp_drgsapi_report_check',
                    bbarHidden: !me.isDrgsgs
                },
                    {
                        title: '手术信息',
                        xtype: 'container',
                        scrollable: 'y',
                        itemId: 'operationTab',
                        //autoScroll: true,

                        layout: 'border',
                        items: [{
                            region: "north",
                            //title: '手术主单',
                            xtype: 'drgsapi_report_operation',
                            bbarHidden: !me.isDrgsgs,
                            //minHeight: 300,
                            height: 300,
                            margin: '0 10 0 0'

                        }, {
                            //title: '手术明细',
                            region: "center",
                            xtype: 'tabpanel',
                            minHeight: 200,
                            items: [{
                                margin: '0 10 0 0',
                                region: "south",
                                title: '手术明细',
                                xtype: 'drgsapi_report_operationdetail',
                                bbarHidden: !me.isDrgsgs,
                                height: 275
                            }]
                        }]
                    }
                ]
            });
        if (me.isDrgsgs) {
            me.msgItems = {
                xtype: 'label',
                html: '当前机构：1101'
            };
        }
        me.callParent(arguments);
    }
});