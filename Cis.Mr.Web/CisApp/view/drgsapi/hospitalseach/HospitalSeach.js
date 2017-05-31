/* ***********************************************
 * author :  likeyi
 * function: 无结算查询
 * history:  created by likeyi 2016/8/27 10:17:34 
 * ***********************************************/
Ext.define("CisApp.view.drgsapi.hospitalseach.HospitalSeach", {
    extend: 'Ext.container.Container',
    alias: 'widget.CisApp_drgsapi_hospitalseach',
    requires: [
        'CisApp.view.drgsapi.hospitalseach.HospitalSeachController',
        'CisApp.view.drgsapi.hospitalseach.HospitalSeachModel',
        'Fm.ux.grid.plugin.ClickSelection',
        'CisApp.view.drgsapi.hospitalseach.medical.Medical',
        'CisApp.view.drgsapi.report.check.Check',
        'CisApp.view.drgsapi.report.hospitaldischarge.HospitaldischargeForm.HospitaldischargeForm',
        'CisApp.view.drgsapi.report.operation.Operation',
        'CisApp.view.drgsapi.report.operationdetail.OperationDetail',
        'CisApp.view.drgsapi.hospitalseach.medical.medicalcontainer.MedicalContainer'
    ],
    controller: 'CisApp_drgsapi_hospitalseach',
    isDrgsgs: true,
    viewParams: { isDrgsgs: true },
    autoScroll: false,
    layout: 'border',
    border: false,
    initComponent: function () {
        var me = this;
        if (me.viewParams != null) {
            me.isDrgsgs = me.viewParams.isDrgsgs;
        }
        if (me.isDrgsgs) {
            me.msgItems = {
                xtype: 'label',
                html: '当前机构：' + Fm.Server.CurrentUser.OrgName + "(" + Fm.Server.CurrentUser.OrgId + ")"
            };
        }
        me.items = [];
        me.items.push({
            xtype: 'CisApp_drgsapi_hospitalseach_medical_medicalcontainer',
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
            height: "45%",
            tabBarHeaderPosition: 0,
            plain: true,
            tools: [
                { type: 'maximize', tooltip: '最大化', handler: 'onSouthFold' },
                { type: 'restore', tooltip: '还原', handler: 'onSouthFold', hidden: true }
            ],
            items: [{
                title: '出院小结',
                xtype: 'drgsapi_report_hospitaldischarge_HospitaldischargeForm',
                formEditable: false,
                modelValidation: false
            }, {
                title: '检查单',
                xtype: 'CisApp_drgsapi_report_check',
                bbarHidden: true


            }, {
                title: '手术信息',
                xtype: 'container',
                scrollable: 'y',
                itemId: 'operationTab',

                layout: 'border',
                items: [{
                    region: "north",
                    //title: '手术主单',
                    xtype: 'drgsapi_report_operation',
                    bbarHidden: true,
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
                        bbarHidden: true,
                        height: 275
                    }]
                }]
            }
            ]
        });
        me.callParent(arguments);
    },
    //参数刷新
    refreshByParam: function (param) {
        var me = this,
           searchView = me.down('CisApp_drgsapi_hospitalseach_medical_medicalseach'), //找到查询面板
           searchViewModel = searchView.getViewModel(),
           searchModel,
           medicals = me.down('CisApp_drgsapi_hospitalseach_medical'),//找到调用方法
           medicalController = medicals.getController();
        setTimeout(function () {
            searchModel = searchViewModel.get('seachData');
            searchModel.set('AdmissionDateS', param.StartDate);
            searchModel.set('AdmissionDateE', param.EndDate);
            searchModel.set('HospitalId', param.OrgCode);
            medicalController.refresh();
        }, 100);
    }
});