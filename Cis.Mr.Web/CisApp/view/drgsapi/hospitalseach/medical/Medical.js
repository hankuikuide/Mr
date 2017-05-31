/* ***********************************************
 * author :  likeyi
 * function: 无结算查询
 * history:  created by likeyi 2016/8/27 10:42:28 
 * ***********************************************/
Ext.define("CisApp.view.drgsapi.hospitalseach.medical.Medical", {
    extend: 'Fm.base.Grid',
    alias: 'widget.CisApp_drgsapi_hospitalseach_medical',
    requires: [
        'CisApp.view.drgsapi.hospitalseach.medical.MedicalController',
        'CisApp.view.drgsapi.hospitalseach.medical.MedicalModel',
        'Fm.ux.grid.plugin.ClickSelection'
    ],
    controller: 'CisApp_drgsapi_hospitalseach_medical',
    viewModel: {
        type: 'CisApp_drgsapi_hospitalseach_medical'
    },
    plugins: [
        {
            ptype: 'clickselection'
        }
    ],
    bind: {
        store: '{gridstore}',
        clickSelection: '{focus}'
    },
    bbarHidden: false,
    isPage: true,
    listeners: {
        itemclick: 'selectItem'
    },
    initComponent: function () {
        var me = this;
        me.columns = [];
        me.columns.push(
            { xtype: 'rownumberer', text: '序号', hasCustomRenderer: true },
            { text: '机构号', dataIndex: 'HospitalId', showTip: true, hidden: !me.bbarHidden },
            { text: '机构名称', dataIndex: 'HospitalName', showTip: true, hidden: !me.bbarHidden },
            { text: '住院号', dataIndex: 'AdmissionNo', showTip: true },
            { text: '入院诊断', dataIndex: 'AdmissionDiseaseName', showTip: true },
            { text: '入院诊断方位', dataIndex: 'DiagnosePosition1', renderer: CisApp.Common.Util.dataCodeToTextRender(CisApp.Server.Datas.EnumPosition) },
            { text: '出院诊断', dataIndex: 'DischargeDiseaseName', showTip: true },
            { text: '出院诊断方位', dataIndex: 'DiagnosePosition2', renderer: CisApp.Common.Util.dataCodeToTextRender(CisApp.Server.Datas.EnumPosition) },
            { text: '入院时间', dataIndex: 'AdmissionDate', renderer: Fm.Common.Util.dateTextRender(), width: 150, showTip: true },
            { text: '出院时间', dataIndex: 'DischargeDate', renderer: Fm.Common.Util.dateTextRender(), width: 150, showTip: true },
            { text: '离院方式', dataIndex: 'LeaveHospitalType', renderer: CisApp.Common.Util.dataCodeToTextRender(CisApp.Server.Datas.LeaveHospital) },
            { text: '特殊病例标识', dataIndex: 'Tsblbs', renderer: CisApp.Common.Util.dataCodeToTextRender(CisApp.Server.Datas.Tsbllbs) },
            { text: '婚姻史', dataIndex: 'Marriage', renderer: CisApp.Common.Util.dataCodeToTextRender(CisApp.Server.Datas.EnumMarriage) },
            { text: '责任医生名称', dataIndex: 'DoctorName' },
            { text: '出院床位号', dataIndex: 'OutBedNum' },
            { text: '过敏药物', dataIndex: 'AllergyDrugName' },
            { text: '病理号', dataIndex: 'PathologyCode' },
            { text: '血型（首位代码）', dataIndex: 'BloodTypeS', renderer: CisApp.Common.Util.dataCodeToTextRender(CisApp.Server.Datas.BloodAbo) },
            { text: '血型（末位代码）', dataIndex: 'BloodTypeE', renderer: CisApp.Common.Util.dataCodeToTextRender(CisApp.Server.Datas.BloodRh) },
            {
                text: '主诉',
                dataIndex: 'ChiefComplaint',
                xtype: 'widgetcolumn',
                widget: {
                    xtype: 'label',
                    cisBindProperty: {
                        html: {
                            dataIndex: 'ChiefComplaint',
                            renderer: function (v) {
                                return '<a href="javascript:void(0)">' + v + '</a>';
                            }
                        }
                    },
                    handler: 'showChiefComplaint'
                }
            }, {
                text: '手术史',
                dataIndex: 'SurgeryHistory',
                xtype: 'widgetcolumn',
                widget: {
                    xtype: 'label',
                    cisBindProperty: {
                        html: {
                            dataIndex: 'SurgeryHistory',
                            renderer: function (v) {
                                return '<a href="javascript:void(0)">' + v + '</a>';
                            }
                        }
                    },
                    handler: 'showSurgeryHistory'
                }
            }, {
                text: '输血史',
                dataIndex: 'BloodTransHistory',
                xtype: 'widgetcolumn',
                widget: {
                    xtype: 'label',
                    cisBindProperty: {
                        html: {
                            dataIndex: 'BloodTransHistory',
                            renderer: function (v) {
                                return '<a href="javascript:void(0)">' + v + '</a>';
                            }
                        }
                    },
                    handler: 'showBloodTransHistory'
                }
            }, {
                text: '现病史',
                dataIndex: 'MedicalHistory',
                xtype: 'widgetcolumn',
                widget: {
                    xtype: 'label',
                    cisBindProperty: {
                        html: {
                            dataIndex: 'MedicalHistory',
                            renderer: function (v) {
                                return '<a href="javascript:void(0)">' + v + '</a>';
                            }
                        }
                    },
                    handler: 'showMedicalHistory'
                }
            },
            { text: '身高（CM）', dataIndex: 'Height' },
            { text: '体重（KG）', dataIndex: 'Weight' },
            { text: '生育史（孕）', dataIndex: 'BearPregnancy' },
            { text: '生育史（产）', dataIndex: 'BearYie' },
            { text: '新生儿出生日期', dataIndex: 'NewbornDate', renderer: Fm.Common.Util.dateTextRender() },
            { text: '新生儿出生体重', dataIndex: 'NewbornWeight' },
            { text: '新生儿当前体重', dataIndex: 'NewbornCurrentWeight' },
            { text: '上传完成日期', dataIndex: 'IsUploadDate', renderer: Fm.Common.Util.dateTextRender() },
            { text: '诊断1', dataIndex: 'DiagnosisName1' },
            { text: '诊断2', dataIndex: 'DiagnosisName2' },
            { text: '诊断3', dataIndex: 'DiagnosisName3' },
            { text: '诊断4', dataIndex: 'DiagnosisName4' },
            { text: '诊断5', dataIndex: 'DiagnosisName5' },
            { text: '诊断6', dataIndex: 'DiagnosisName6' },
            { text: '诊断7', dataIndex: 'DiagnosisName7' },
            { text: '诊断8', dataIndex: 'DiagnosisName8' },
            { text: '诊断9', dataIndex: 'DiagnosisName9' },
            { text: '诊断10', dataIndex: 'DiagnosisName10' },
            { text: '诊断11', dataIndex: 'DiagnosisName11' },
            { text: '诊断12', dataIndex: 'DiagnosisName12' },
            { text: '诊断13', dataIndex: 'DiagnosisName13' },
            { text: '诊断14', dataIndex: 'DiagnosisName14' },
            { text: '诊断15', dataIndex: 'DiagnosisName15' },
            { text: '诊断16', dataIndex: 'DiagnosisName16' }
        );
        me.callParent(arguments);
    }
});