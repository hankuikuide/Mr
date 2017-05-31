/* ***********************************************
 * author :  李克一
 * function: 病案的添加界面
 * history:  created by 李克一 2016/4/18 13:55:40 
 * ***********************************************/
Ext.define("CisApp.view.drgsapi.report.medical.medicaloper.MedicalOper", {
    extend: 'Ext.form.Panel',
    alias: 'widget.drgsapi_medical_medicaloper',
    requires: [
        'CisApp.view.drgsapi.report.medical.medicaloper.MedicalOperController',
        'CisApp.view.drgsapi.report.medical.medicaloper.MedicalOperModel',
       'Fm.ux.form.DateTimeField'
    ],
    controller: 'drgsapi_medical_medicaloper',
    viewModel: {
        type: 'drgsapi_medical_medicaloper'
    }, bodyPadding: 10,
    layout: 'anchor',
    defaults: {
        anchor: '100%'
    },
    fieldDefaults: {
        labelAlign: 'right', labelWidth: 115
    },
    modelValidation: true,
    autoScroll: true,
    items: [
        {
            xtype: 'textfield',
            fieldLabel: '定点机构编码',
            emptyText: '保存后不可更改',
            bind: {
                value: '{medical.HospitalId}',
                disabled: true
            }
        },
        {
            xtype: 'fieldcontainer',
            layout: 'hbox',
            items: [{
                xtype: 'textfield', fieldLabel: '住院号',
                emptyText: '保存后不可更改',
                bind: {
                    value: '{medical.AdmissionNo}',
                    disabled: '{txtTradeNo}'
                },
                validator: function (val) {
                    return /[<>&\\]/.test(val) ? '该输入项不能包含特殊字符(><&\\)!' : true;
                },
                flex:1
            }, {
                xtype: 'button',
                text: '查询',
                handler: 'onSearchDataByAD',
                width: 70
            }
            ]
        },


            { xtype: 'textfield', fieldLabel: '社保卡号', bind: '{medical.PersonalNo}' },
            {
                xtype: 'textfield', fieldLabel: '交易流水号', allowBlank: false, bind: {
                    value: '{medical.TradeNo}'
                }
            },
            {
                xtype: 'combo', fieldLabel: '按床日结算病例', bind: '{medical.Tsblbs}',
                //store: Ext.create('CisApp.store.drgsapi.report.DictTsbllbs'),
                displayField: 'Name',
                valueField: 'Code'
            },

            { xtype: 'textfield', fieldLabel: '出院床位号', bind: '{medical.OutBedNum}' },
            {
                xtype: 'datetimefield', fieldLabel: '入院时间', bind: '{medical.AdmissionDate}', editable: false, format: "Y-m-d H:i:s", id: 'sDate',
                listeners: {
                    select: 'selectSDate'
                }
            },
            {
                xtype: 'datetimefield', fieldLabel: '出院时间', bind: '{medical.DischargeDate}', editable: false, format: "Y-m-d H:i:s", id: 'eDate',
                listeners: {
                    select: 'selectEDate'
                }
            },
            { xtype: 'textfield', fieldLabel: '医生编码', bind: '{medical.DoctorCode}' },
            { xtype: 'textfield', fieldLabel: '医生姓名', bind: '{medical.DoctorName}' },
            {
                xtype: 'combo', fieldLabel: '有无药物过敏', bind: '{medical.IsDrugAllergy}',
                //store: appFactory.Data.getDataStore('EnumIsDrugAllergy'),
                displayField: 'Text',
                valueField: 'Value',
                listeners: {
                    change: 'onChange'
                }
            },
            {
                xtype: 'combo', fieldLabel: '过敏药物编码', bind: '{medical.AllergyDrugCode}',
                //store: Ext.create('CisApp.store.drgsapi.report.DictAllergicDrug'),
                id: 'allergyDrugCode',
                displayField: 'Name',
                valueField: 'Code',
                listeners: {
                    select: function (obj, record) {
                        Ext.getCmp('allergyDrugName').setValue(record.data.Name);
                    }
                }

            },
            {
                xtype: 'textfield', id: 'allergyDrugName', fieldLabel: '过敏药物名称', hidden: true,
                bind: { value: '{medical.AllergyDrugName}', disabled: '{textDisable}' }
            },
            { xtype: 'textfield', fieldLabel: '病理号', bind: '{medical.PathologyCode}' },
            {
                xtype: 'combo', fieldLabel: '是否院内感染', bind: '{medical.IsHospitalInfected}',
                //store: appFactory.Data.getDataStore('EnumIsHospitalInfected'),
                displayField: 'Text',
                valueField: 'Value',
                listeners: {
                    change: 'isFectedChange'
                }
            },
            { xtype: 'textfield', id: 'hospitalInfectedCode', fieldLabel: '院内感染诊断编码', bind: { value: '{medical.HospitalInfectedCode}', disabled: '{textFectedDisable}' } },

            {
                xtype: 'combo', fieldLabel: '血型（首位代码）', bind: '{medical.BloodTypeS}',
               // store: Ext.create('CisApp.store.drgsapi.report.DictBloodAbo'),
                //store: Ext.create('CisApp.store.drgsapi.report.DictBlood', {
                //    filters: [{
                //        property: 'Position',
                //        value: '首位代码'
                //    }]
                //}),
                displayField: 'Name',
                valueField: 'Code'
            },
            {
                xtype: 'combo', fieldLabel: '血型（末位代码）', bind: '{medical.BloodTypeE}',
                //store: Ext.create('CisApp.store.drgsapi.report.DictBloodRh'),
                //store: Ext.create('CisApp.store.drgsapi.report.DictBlood', {
                //    filters: [{
                //        property: 'Position',
                //        value: '末位代码'
                //    }]
                //}),
                displayField: 'Name',
                valueField: 'Code'
            },
            {
                xtype: 'combo', fieldLabel: '离院方式', bind: '{medical.LeaveHospitalType}',
               // store: Ext.create('CisApp.store.drgsapi.report.DictLeaveHospital'),
                displayField: 'Name',
                valueField: 'Code'
            },

            { xtype: 'textfield', fieldLabel: '主诉', bind: '{medical.ChiefComplaint}' },
            { xtype: 'textfield', fieldLabel: '现病史', bind: '{medical.MedicalHistory}' },
            { xtype: 'textfield', fieldLabel: '身高', bind: '{medical.Height}' },
            { xtype: 'textfield', fieldLabel: '体重', bind: '{medical.Weight}' },
            {
                xtype: 'combo', fieldLabel: '婚姻史', bind: '{medical.Marriage}',
               // store: appFactory.Data.getDataStore('EnumMarriage'),
                displayField: 'Text',
                valueField: 'Value'
            },
            { xtype: 'textfield', id: 'bearPregnancy', fieldLabel: '生育史（孕）', bind: '{medical.BearPregnancy}' },
            { xtype: 'textfield', fieldLabel: '生育史（产）', bind: '{medical.BearYie}', listeners: { change: 'keyDownBearYie' } },
            { xtype: 'textfield', fieldLabel: '入院诊断编码', bind: '{medical.AdmissionDiseaseId}' },
            { xtype: 'textfield', fieldLabel: '入院诊断名称', bind: '{medical.AdmissionDiseaseName}' }, {
                xtype: 'combo', fieldLabel: '入院诊断方位', bind: '{medical.DiagnosePosition1}',
               // store: appFactory.Data.getDataStore('EnumPosition'),
                displayField: 'Text',
                valueField: 'Value'
            },
            { xtype: 'textfield', fieldLabel: '出院诊断编码', bind: '{medical.DischargeDiseaseId}' },
            { xtype: 'textfield', fieldLabel: '出院诊断名称', bind: '{medical.DischargeDiseaseName}' },
            {
                xtype: 'combo', fieldLabel: '出院诊断方位', bind: '{medical.DiagnosePosition2}',
               // store: appFactory.Data.getDataStore('EnumPosition'),
                displayField: 'Text',
                valueField: 'Value'
            },
            { xtype: 'textfield', fieldLabel: '手术史', bind: '{medical.SurgeryHistory}' },
            { xtype: 'textfield', fieldLabel: '输血史', bind: '{medical.BloodTransHistory}' },
            {
                xtype: 'combo', fieldLabel: '是否有病理检查', bind: '{medical.IsPathologicalExamination}',
               // store: appFactory.Data.getDataStore('EnumIsDrugAllergy'),
                displayField: 'Text',
                valueField: 'Value'
            },
             { xtype: 'textfield', fieldLabel: '其它诊断编码1', bind: '{medical.DiagnosisCode1}' },
               { xtype: 'textfield', fieldLabel: '其它诊断名称1', bind: '{medical.DiagnosisName1}' },
                { xtype: 'textfield', fieldLabel: '其它诊断编码2', bind: '{medical.DiagnosisCode2}' },
               { xtype: 'textfield', fieldLabel: '其它诊断名称2', bind: '{medical.DiagnosisName2}' },
                { xtype: 'textfield', fieldLabel: '其它诊断编码3', bind: '{medical.DiagnosisCode3}' },
               { xtype: 'textfield', fieldLabel: '其它诊断名称3', bind: '{medical.DiagnosisName3}' },
                { xtype: 'textfield', fieldLabel: '其它诊断编码4', bind: '{medical.DiagnosisCode4}' },
               { xtype: 'textfield', fieldLabel: '其它诊断名称4', bind: '{medical.DiagnosisName4}' },
                { xtype: 'textfield', fieldLabel: '其它诊断编码5', bind: '{medical.DiagnosisCode5}' },
               { xtype: 'textfield', fieldLabel: '其它诊断名称5', bind: '{medical.DiagnosisName5}' },
                { xtype: 'textfield', fieldLabel: '其它诊断编码6', bind: '{medical.DiagnosisCode6}' },
               { xtype: 'textfield', fieldLabel: '其它诊断名称6', bind: '{medical.DiagnosisName6}' },
                { xtype: 'textfield', fieldLabel: '其它诊断编码7', bind: '{medical.DiagnosisCode7}' },
               { xtype: 'textfield', fieldLabel: '其它诊断名称7', bind: '{medical.DiagnosisName7}' },
                { xtype: 'textfield', fieldLabel: '其它诊断编码8', bind: '{medical.DiagnosisCode8}' },
               { xtype: 'textfield', fieldLabel: '其它诊断名称8', bind: '{medical.DiagnosisName8}' },
                { xtype: 'textfield', fieldLabel: '其它诊断编码9', bind: '{medical.DiagnosisCode9}' },
               { xtype: 'textfield', fieldLabel: '其它诊断名称9', bind: '{medical.DiagnosisName9}' },
                { xtype: 'textfield', fieldLabel: '其它诊断编码10', bind: '{medical.DiagnosisCode10}' },
               { xtype: 'textfield', fieldLabel: '其它诊断名称10', bind: '{medical.DiagnosisName10}' },
                { xtype: 'textfield', fieldLabel: '其它诊断编码11', bind: '{medical.DiagnosisCode11}' },
               { xtype: 'textfield', fieldLabel: '其它诊断名称11', bind: '{medical.DiagnosisName11}' },
                { xtype: 'textfield', fieldLabel: '其它诊断编码12', bind: '{medical.DiagnosisCode12}' },
               { xtype: 'textfield', fieldLabel: '其它诊断名称12', bind: '{medical.DiagnosisName12}' },
                { xtype: 'textfield', fieldLabel: '其它诊断编码13', bind: '{medical.DiagnosisCode13}' },
               { xtype: 'textfield', fieldLabel: '其它诊断名称13', bind: '{medical.DiagnosisName13}' },
                { xtype: 'textfield', fieldLabel: '其它诊断编码14', bind: '{medical.DiagnosisCode14}' },
               { xtype: 'textfield', fieldLabel: '其它诊断名称14', bind: '{medical.DiagnosisName14}' },
                { xtype: 'textfield', fieldLabel: '其它诊断编码15', bind: '{medical.DiagnosisCode15}' },
               { xtype: 'textfield', fieldLabel: '其它诊断名称15', bind: '{medical.DiagnosisName15}' },
                { xtype: 'textfield', fieldLabel: '其它诊断编码16', bind: '{medical.DiagnosisCode16}' },
               { xtype: 'textfield', fieldLabel: '其它诊断名称16', bind: '{medical.DiagnosisName16}' },
               { xtype: 'datetimefield', fieldLabel: '新生儿出生日期', bind: '{medical.NewbornDate}', editable: false, format: "Y-m-d" },
                { xtype: 'textfield', fieldLabel: '新生儿出生体重(G)', bind: '{medical.NewbornWeight}' },
                 { xtype: 'textfield', fieldLabel: '新生儿当前体重(G)', bind: '{medical.NewbornCurrentWeight}' }
    ],
    buttons: [
        {
            text: '保  存', formBind: true, handler: 'add'
        },
        { text: '关  闭', handler: 'close' }
    ],
    initComponent: function () {
        var me = this,
           vm = me.getViewModel();
        vm.set('medical', me.paramModel);
        me.callParent();
    }
});