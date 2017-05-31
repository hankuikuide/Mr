/* ***********************************************
 * author :  likeyi
 * function: 结算信息
 * history:  created by likeyi 2016/6/30 18:31:05 
 * ***********************************************/
Ext.define("CisApp.view.drgsapi.report.bill.Bill", {
    extend: 'Fm.base.Grid',
    alias: 'widget.drgsapi_report_bill',
    requires: [
        'CisApp.view.drgsapi.report.bill.BillController',
        'CisApp.view.drgsapi.report.bill.BillModel',
        'Fm.ux.grid.plugin.ClickSelection',
        'Fm.ux.DateRange',
        'Fm.ux.form.ComboGrid',
    ],
    plugins: [{
        ptype: 'clickselection'
    }],
    bind: {
        clickSelection: '{clickRecord}',
        store: '{gridstore}',
        selection: '{focus}'
    },
    controller: 'drgsapi_report_bill',
    viewModel: {
        type: 'drgsapi_report_bill'
    },
    columns: [
        { xtype: 'rownumberer', text: '序号' },
        { text: '主键序列', dataIndex: 'AId' },
        { text: '出院小结id', dataIndex: 'LId' },
        { text: '确认上传标记', dataIndex: 'IsUpload' },
        { text: '定点机构编码', dataIndex: 'HospitalId' },
        { text: '住院号', dataIndex: 'AdmissionNo' },
        { text: '个人编号', dataIndex: 'PersonalNo' },
        { text: '出院床位号', dataIndex: 'OutBedNum' },

        { text: '入院时间', dataIndex: 'AdmissionDate' },
        { text: '出院时间', dataIndex: 'DischargeDate' },
        { text: '责任医生编码', dataIndex: 'DoctorCode' },
        { text: '是否药物过敏', dataIndex: 'IsDrugAllergy' },
        { text: '过敏药物编码', dataIndex: 'AllergyDrugCode' },
        { text: '过敏药物名称', dataIndex: 'AllergyDrugName' },
        { text: '病理号', dataIndex: 'PathologyCode' },
        { text: '是否院内感染', dataIndex: 'IsHospitalInfected' },
        { text: '院内感染诊断编码', dataIndex: 'HospitalInfectedCode' },
        { text: '血型（首位代码）', dataIndex: 'BloodTypeS' },
        { text: '血型（末位代码）', dataIndex: 'BloodTypeE' },
        { text: '离院方式字典表', dataIndex: 'LeaveHospitalType' },
        { text: '主诉', dataIndex: 'ChiefComplaint' },
        { text: '现病史', dataIndex: 'MedicalHistory' },
        { text: '身高（CM）', dataIndex: 'Height' },
        { text: '体重（KG）', dataIndex: 'Weight' },
        { text: '婚姻史', dataIndex: 'Marriage' },
        { text: '生育史（孕）', dataIndex: 'BearPregnancy' },
        { text: '生育史（产）', dataIndex: 'BearYie' },
        { text: '入院诊断编码', dataIndex: 'AdmissionDiseaseId' },
        { text: '入院诊断名称', dataIndex: 'AdmissionDiseaseName' },
        { text: '出院诊断编码', dataIndex: 'DischargeDiseaseId' },
        { text: '出院诊断名称', dataIndex: 'DischargeDiseaseName' },
        { text: '创建人', dataIndex: 'OperId' },
        { text: '创建时间', dataIndex: 'OperDate' },
        { text: '确认上传标记', dataIndex: 'IsUpload' },
        { text: '作废标记', dataIndex: 'IsValid' },
        { text: '作废操作人', dataIndex: 'Operator' },
        { text: '作废操作时间', dataIndex: 'OperatingDate' },
        { text: '交易流水号', dataIndex: 'TradeNo' },
        { text: '特殊病例标识字典表', dataIndex: 'Tsblbs' },
        { text: '入院诊断方位字典表', dataIndex: 'DiagnosePosition1' },
        { text: '出院诊断方位字典表', dataIndex: 'DiagnosePosition2' },
        { text: '手术史', dataIndex: 'SurgeryHistory' },
        { text: '输血史', dataIndex: 'BloodTransHistory' },
        { text: '责任医生名称', dataIndex: 'DoctorName' },
        { text: '是否有病理检查', dataIndex: 'IsPathologicalExamination' },
        { text: '其它诊断编码1', dataIndex: 'DiagnosisCode1' },
        { text: '其它诊断名称1', dataIndex: 'DiagnosisName1' },
        { text: '其它诊断编码2', dataIndex: 'DiagnosisCode2' },
        { text: '其它诊断名称2', dataIndex: 'DiagnosisName2' },
        { text: '其它诊断编码3', dataIndex: 'DiagnosisCode3' },
        { text: '其它诊断名称3', dataIndex: 'DiagnosisName3' },
        { text: '其它诊断编码4', dataIndex: 'DiagnosisCode4' },
        { text: '其它诊断名称4', dataIndex: 'DiagnosisName4' },
        { text: '其它诊断编码5', dataIndex: 'DiagnosisCode5' },
        { text: '其它诊断名称5', dataIndex: 'DiagnosisName5' },
        { text: '其它诊断编码6', dataIndex: 'DiagnosisCode6' },
        { text: '其它诊断名称6', dataIndex: 'DiagnosisName6' },
        { text: '其它诊断编码7', dataIndex: 'DiagnosisCode7' },
        { text: '其它诊断名称7', dataIndex: 'DiagnosisName7' },
        { text: '其它诊断编码8', dataIndex: 'DiagnosisCode8' },
        { text: '其它诊断名称8', dataIndex: 'DiagnosisName8' },
        { text: '其它诊断编码9', dataIndex: 'DiagnosisCode9' },
        { text: '其它诊断名称9', dataIndex: 'DiagnosisName9' },
        { text: '其它诊断编码10', dataIndex: 'DiagnosisCode10' },
        { text: '其它诊断名称10', dataIndex: 'DiagnosisName10' },
        { text: '其它诊断编码11', dataIndex: 'DiagnosisCode11' },
        { text: '其它诊断名称11', dataIndex: 'DiagnosisName11' },
        { text: '其它诊断编码12', dataIndex: 'DiagnosisCode12' },
        { text: '其它诊断名称12', dataIndex: 'DiagnosisName12' },
        { text: '其它诊断编码13', dataIndex: 'DiagnosisCode13' },
        { text: '其它诊断名称13', dataIndex: 'DiagnosisName13' },
        { text: '其它诊断编码14', dataIndex: 'DiagnosisCode14' },
        { text: '其它诊断名称14', dataIndex: 'DiagnosisName14' },
        { text: '其它诊断编码15', dataIndex: 'DiagnosisCode15' },
        { text: '其它诊断名称15', dataIndex: 'DiagnosisName15' },
        { text: '其它诊断编码16', dataIndex: 'DiagnosisCode16' },
        { text: '其它诊断名称16', dataIndex: 'DiagnosisName16' },
        { text: '新生儿出生日期', dataIndex: 'NewbornDate' },
        { text: '新生儿出生体重', dataIndex: 'NewbornWeight' },
        { text: '新生儿当前体重', dataIndex: 'NewbornCurrentWeight' },
        { text: '上传日期', dataIndex: 'IsUploadDate' },
        { text: '月结分组', dataIndex: 'IsFinalGrouped' },
        { text: '是否分组', dataIndex: 'IsGrouped' }
    ],
    listeners: {
        itemclick: 'select'
    },
    tbar: {
        padding: CisApp.Design.SearchPanel.Padding,
        width: '100%',
        //defaults: {
        //    labelAlign: 'right',
        //    margin: CisApp.Design.SearchPanel.Items.Margin
        //},
        items: [
        {
            xtype: 'textfield',
            fieldLabel: '住院号',
            width: 186,
            labelWidth: 66,
            bind: '{seachData.AdmissionNo}'
        }, {
            xtype: 'textfield',
            fieldLabel: '社保卡号',
            width: 180,
            labelWidth: 66,
            bind: '{seachData.BmiNo}'
            //listeners: {
            //    change: 'filter'
            //}
        }, {
            xtype: 'combo',
            fieldLabel: '上传状态',
            width: 180,
            labelWidth: 60,
            bind: '{seachData.IsUpload}',
            store: CisApp.Common.Factory.Data.getDataStore('EnumIsUpload'),
            displayField: 'Text',
            valueField: 'Value'
        }, {

            xtype: 'daterange',
            fieldLabel: '入院时间',
            labelWidth: 60,
            items: [
                {
                    format: "Y-m-d",
                    editable: false,
                    bind: '{seachData.AdmissionDateS}'
                }, {
                    labelSeparator: "",
                    format: "Y-m-d",
                    editable: false,
                    bind: '{seachData.AdmissionDateE}'
                }
            ]
        },
        '->',
        {
            xtype: 'button',
            text: '查询',
            handler: 'query',
            margin: '0 0 0 10',
            width: 70,
            bind: {
                //disabled: true//'{btnquery}'
            },
            id: 'btselect'

        }
        ]
    },
    listeners: {
        itemclick: 'select',
        itemdblclick: 'modify'
    },
    initComponent: function () {
        var me = this;
        vm = me.getViewModel();
        me.callParent(arguments);
    }
});