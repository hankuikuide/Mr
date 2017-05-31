/* ***********************************************
 * author :  likeyi
 * function: 病案页面
 * history:  created by likeyi 2016/7/1 10:21:35 
 * ***********************************************/
Ext.define("CisApp.view.drgsapi.report.medical.medicalform.MedicalForm", {
    extend: 'Ext.form.Panel',
    alias: 'widget.drgsapi_report_medical_medicalform',
    requires: [
        'CisApp.view.drgsapi.report.medical.medicalform.MedicalFormController',
        'CisApp.view.drgsapi.report.medical.medicalform.MedicalFormModel',
        'CisApp.view.shared.doctor.Doctor',
        "CisApp.view.shared.diagnosis.Diagnosis",
        'Fm.ux.form.DateTimeField'
    ],
    controller: 'drgsapi_report_medical_medicalform',
    viewModel: {
        type: 'drgsapi_report_medical_medicalform'
    },
    bodyPadding: 10,
    layout: 'column',
    //defaults: { anchor: '100%' },
    fieldDefaults: {
        labelAlign: 'right', labelWidth: 120, width: 260//, padding: 0//, emptyText: '请选择'
    },
    formEditable: true,
    modelValidation: true,
    autoScroll: true,
    listeners: {
        afterrender: 'keyMap',
        activate: 'activateFocus'
    },
    initComponent: function () {
        var me = this;
        me.items = [];
        me.items.push(
            {
                xtype: 'fieldset',
                title: '基础信息',
                layout: 'column', margin: '5 0 5 0',
                collapsible: false,
                items: [
                    {
                        xtype: 'combo', allowBlank: false, fieldLabel: '按床日结算病例', margin: '5 0 5 0', afterLabelTextTpl: '<font color=red>*</font>', bind: '{medical.Tsblbs}', store: appFactory.Data.getDataStore('Tsbllbs'), displayField: 'Text', valueField: 'Code', emptyText: '请选择', name: 'Tsbllbs'
                    }, {
                        xtype: 'datetimefield', fieldLabel: '入院时间', margin: '5 0 5 0', afterLabelTextTpl: '<font color=red>*</font>', bind: '{medical.AdmissionDate}', editable: false, format: "Y-m-d H:i:s", name: 'sDate', listeners: { select: 'selectSDate' }
                    }, {
                        xtype: 'datetimefield', fieldLabel: '出院时间', margin: '5 0 5 0', afterLabelTextTpl: '<font color=red>*</font>', bind: '{medical.DischargeDate}', editable: false, format: "Y-m-d H:i:s", name: 'eDate', listeners: { select: 'selectEDate' }
                    },  {
                        xtype: 'combo', fieldLabel: '离院方式', margin: '5 0 5 0', afterLabelTextTpl: '<font color=red>*</font>', emptyText: '请选择', bind: '{medical.LeaveHospitalType}',
                        store: appFactory.Data.getDataStore('LeaveHospital'),
                        displayField: 'Text', valueField: 'Code'
                    }, {
                        xtype: 'textfield', fieldLabel: '医生编码', hidden: true, margin: '5 0 5 0', name: 'docCode', afterLabelTextTpl: '<font color=red>*</font>', bind: '{medical.DoctorCode}'
                    }, {
                        xtype: 'textfield', fieldLabel: '医生', hidden: CisApp.Server.Config.DoctorLibrary, margin: '5 0 5 0', name: 'docTextName',  bind: '{medical.DoctorName}'
                    }, {
                        xtype: 'shared_doctorcombo', fieldLabel: '医生', hidden:!CisApp.Server.Config.DoctorLibrary, margin: '5 0 5 0', name: 'docName', afterLabelTextTpl: '<font color=red>*</font>', bind: '{medical.DoctorName}', emptyText: '请选择',
                        listeners: {
                            change: 'setDoc'
                        }, focusEnable: true, isValidate: true
                    }, {
                        xtype: 'combo', isValidate: true, fieldLabel: '婚姻史', margin: '5 0 5 0', afterLabelTextTpl: '<font color=red>*</font>', emptyText: '请选择', bind: '{medical.Marriage}', store: appFactory.Data.getDataStore('EnumMarriage'), displayField: 'Text', valueField: 'Value'
                    }, {
                        xtype: 'combo', fieldLabel: '是否有病理检查', margin: '5 0 5 0', hidden: true, emptyText: '请选择', bind: '{medical.IsPathologicalExamination}', store: appFactory.Data.getDataStore('EnumIsDrugAllergy'), displayField: 'Text', valueField: 'Value'
                    }, {
                        xtype: 'textfield', fieldLabel: '病理号', margin: '5 0 5 0', bind: '{medical.PathologyCode}'
                    }, {
                        xtype: 'combo', fieldLabel: '有无药物过敏', margin: '5 0 5 0', emptyText: '请选择', hidden: true, bind: '{medical.IsDrugAllergy}', store: appFactory.Data.getDataStore('EnumIsDrugAllergy'), displayField: 'Text', valueField: 'Value'//, listeners: { change: 'onChange' }
                    }, {
                        xtype: 'combo', fieldLabel: '过敏药物类别', margin: '5 0 5 0', emptyText: '请选择', bind: '{medical.AllergyDrugCode}', store: appFactory.Data.getDataStore('AllergicDrug'), id: 'allergyDrugCode', displayField: 'Text', valueField: 'Code', listeners: { select: function (obj, record) { Ext.getCmp('allergyDrugName').setValue(record.data.Text); } }
                    }, {
                        xtype: 'textfield', id: 'allergyDrugName', margin: '5 0 5 0', fieldLabel: '过敏药物名称', hidden: true, bind: {
                            value: '{medical.AllergyDrugName}'
                            //, disabled: '{textDisable}'
                        }
                    }, {
                        xtype: 'numberfield', margin: '5 0 5 0', minValue: 0, decimalPrecision: 0, id: 'bearPregnancy', fieldLabel: '生育史(怀孕次数)', bind: '{medical.BearPregnancy}'
                    }, {
                        xtype: 'numberfield', margin: '5 0 5 0', minValue: 0, decimalPrecision: 0, fieldLabel: '生育史(生产次数)', bind: '{medical.BearYie}'//, listeners: { change: 'keyDownBearYie' }
                    }, {
                        xtype: 'textfield', fieldLabel: '出院床位号', margin: '5 0 5 0', bind: '{medical.OutBedNum}'
                    }, {
                        xtype: 'combo', fieldLabel: '血型(首位代码)', margin: '5 0 5 0', emptyText: '请选择', bind: '{medical.BloodTypeS}', store: appFactory.Data.getDataStore('BloodAbo'), displayField: 'Text', valueField: 'Code'
                    }, {
                        xtype: 'combo', fieldLabel: '血型(末位代码)', margin: '5 0 5 0', emptyText: '请选择', bind: '{medical.BloodTypeE}', store: appFactory.Data.getDataStore('BloodRh'), displayField: 'Text', valueField: 'Code'
                    }, {
                        xtype: 'textfield', minValue: 0, fieldLabel: '身高(厘米)', margin: '5 0 5 0', bind: '{medical.Height}'
                    }, {
                        xtype: 'textfield', minValue: 0, fieldLabel: '体重(千克)', margin: '5 0 5 0', bind: '{medical.Weight}'
                    }, {
                        xtype: 'datefield', fieldLabel: '新生儿出生日期', editable: true, margin: '5 0 5 0', bind: '{medical.NewbornDate}', format: "Y-m-d", name: 'NewbornDate'
                    }, {
                        xtype: 'numberfield', margin: '5 0 5 0', minValue: 0, decimalPrecision: 0, fieldLabel: '新生儿出生体重(克)', bind: '{medical.NewbornWeight}', name: 'NewbornWeight'
                    }, {
                        xtype: 'numberfield', margin: '5 0 5 0', minValue: 0, decimalPrecision: 0, fieldLabel: '新生儿当前体重(克)', bind: '{medical.NewbornCurrentWeight}', name: 'NewbornCurrentWeight'
                    }
                ]
            }, {
                xtype: 'fieldset',
                title: '诊断信息',
                layout: 'column', margin: '5 0 5 0',// bodyPadding: 10,
                defaults: {
                    // editable: false//margin: '0 0 0 0'//,// labelWidth: 115//, width: 255  //anchor: '90%'
                },
                collapsible: false,
                //collapsed: true,
                items: [
                    {
                        xtype: 'textfield', fieldLabel: '入院诊断', margin: '5 0 5 0', afterLabelTextTpl: '<font color=red>*</font>', hidden: true, bind: '{medical.AdmissionDiseaseId}', name: 'admissionDiseaseId'
                    }, {
                        xtype: 'shared_diagnosiscombo', margin: '5 0 5 0', afterLabelTextTpl: '<font color=red>*</font>', emptyText: '请选择', multiSelect: false, name: 'admissionDiseaseName', fieldLabel: '入院诊断', bind: '{medical.AdmissionDiseaseName}',
                        listeners: {
                            change: 'setAdmissionDiseaseId'
                        }, focusEnable: true, isValidate: true
                    }, {
                        xtype: 'combo', fieldLabel: '入院诊断方位', margin: '5 0 5 0', emptyText: '请选择', bind: '{medical.DiagnosePosition1}', store: appFactory.Data.getDataStore('EnumPosition'), displayField: 'Text', valueField: 'Value'
                    }, {
                        xtype: 'textfield', fieldLabel: '出院诊断', margin: '5 0 5 0', afterLabelTextTpl: '<font color=red>*</font>', hidden: true, bind: '{medical.DischargeDiseaseId}', name: 'dischargeDiseaseId'
                    }, {
                        xtype: 'shared_diagnosiscombo', margin: '5 0 5 0', afterLabelTextTpl: '<font color=red>*</font>', emptyText: '请选择', multiSelect: false, name: 'dischargeDiseaseName', fieldLabel: '出院诊断', bind: '{medical.DischargeDiseaseName}',
                        diseaseMain: true,
                        listeners: {
                            change: 'setDischargeDiseaseId'
                        }, focusEnable: true, isValidate: true
                    }, {
                        xtype: 'combo', fieldLabel: '出院诊断方位', margin: '5 0 5 0', emptyText: '请选择', bind: '{medical.DiagnosePosition2}', store: appFactory.Data.getDataStore('EnumPosition'), displayField: 'Text', valueField: 'Value'
                    }, {
                        xtype: 'combo', fieldLabel: '是否院内感染', margin: '5 0 5 0', emptyText: '请选择', hidden: true, bind: '{medical.IsHospitalInfected}', store: appFactory.Data.getDataStore('EnumIsHospitalInfected'), displayField: 'Text', valueField: 'Value'// listeners: { change: 'isFectedChange' }
                    }, {
                        xtype: 'shared_diagnosiscombo', margin: '5 0 5 0', emptyText: '请选择', multiSelect: false, displayField: 'GenericName', valueField: 'GenericCode', id: 'hospitalInfectedCode', fieldLabel: '院内感染诊断', bind: {
                            value: '{medical.HospitalInfectedCode}'
                        }, focusEnable: true, isValidate: true
                    }, {
                        xtype: 'textfield', fieldLabel: '诊断1', margin: '5 0 5 0', hidden: true, bind: '{medical.DiagnosisCode1}', name: 'diagnosisCode1'
                    }, {
                        xtype: 'shared_diagnosiscombo', emptyText: '请选择', margin: '5 0 5 0', multiSelect: false, name: 'diagnosisName1', fieldLabel: '诊断1', bind: '{medical.DiagnosisName1}',
                        listeners: {
                            change: 'setDiagnosisCode1'
                        }, focusEnable: true, isValidate: true
                    }, {
                        xtype: 'textfield', fieldLabel: '诊断2', margin: '5 0 5 0', hidden: true, bind: '{medical.DiagnosisCode2}', name: 'diagnosisCode2'
                    }, {
                        xtype: 'shared_diagnosiscombo', emptyText: '请选择', margin: '5 0 5 0', multiSelect: false, name: 'diagnosisName2', fieldLabel: '诊断2', bind: '{medical.DiagnosisName2}',
                        listeners: {
                            change: 'setDiagnosisCode2'
                        }, focusEnable: true, isValidate: true
                    }, {
                        xtype: 'textfield', fieldLabel: '诊断3', margin: '5 0 5 0', hidden: true, bind: '{medical.DiagnosisCode3}', name: 'diagnosisCode3'
                    }, {
                        xtype: 'shared_diagnosiscombo', emptyText: '请选择', margin: '5 0 5 0', multiSelect: false, name: 'diagnosisName3', fieldLabel: '诊断3', bind: '{medical.DiagnosisName3}',
                        listeners: {
                            change: 'setDiagnosisCode3'
                        }, focusEnable: true, isValidate: true
                    }, {
                        xtype: 'textfield', fieldLabel: '诊断4', margin: '5 0 5 0', hidden: true, bind: '{medical.DiagnosisCode4}', name: 'diagnosisCode4'
                    }, {
                        xtype: 'shared_diagnosiscombo', emptyText: '请选择', margin: '5 0 5 0', multiSelect: false, name: 'diagnosisName4', fieldLabel: '诊断4', bind: '{medical.DiagnosisName4}',
                        listeners: {
                            change: 'setDiagnosisCode4'
                        }, focusEnable: true, isValidate: true
                    }, {
                        xtype: 'textfield', fieldLabel: '诊断5', margin: '5 0 5 0', hidden: true, bind: '{medical.DiagnosisCode5}', name: 'diagnosisCode5'
                    }, {
                        xtype: 'shared_diagnosiscombo', emptyText: '请选择', margin: '5 0 5 0', multiSelect: false, name: 'diagnosisName5', fieldLabel: '诊断5', bind: '{medical.DiagnosisName5}',
                        listeners: {
                            change: 'setDiagnosisCode5'
                        }, focusEnable: true, isValidate: true
                    }, {
                        xtype: 'textfield', fieldLabel: '诊断6', margin: '5 0 5 0', hidden: true, bind: '{medical.DiagnosisCode6}', name: 'diagnosisCode6'
                    }, {
                        xtype: 'shared_diagnosiscombo', emptyText: '请选择', margin: '5 0 5 0', multiSelect: false, name: 'diagnosisName6', fieldLabel: '诊断6', bind: '{medical.DiagnosisName6}',
                        listeners: {
                            change: 'setDiagnosisCode6'
                        }, focusEnable: true, isValidate: true
                    }, {
                        xtype: 'textfield', fieldLabel: '诊断7', margin: '5 0 5 0', hidden: true, bind: '{medical.DiagnosisCode7}', name: 'diagnosisCode7'
                    }, {
                        xtype: 'shared_diagnosiscombo', emptyText: '请选择', margin: '5 0 5 0', multiSelect: false, name: 'diagnosisName7', fieldLabel: '诊断7', bind: '{medical.DiagnosisName7}',
                        listeners: {
                            change: 'setDiagnosisCode7'
                        }, focusEnable: true, isValidate: true
                    }, {
                        xtype: 'textfield', fieldLabel: '诊断8', margin: '5 0 5 0', hidden: true, bind: '{medical.DiagnosisCode8}', name: 'diagnosisCode8'
                    }, {
                        xtype: 'shared_diagnosiscombo', emptyText: '请选择', margin: '5 0 5 0', multiSelect: false, name: 'diagnosisName8', fieldLabel: '诊断8', bind: '{medical.DiagnosisName8}',
                        listeners: {
                            change: 'setDiagnosisCode8'
                        }, focusEnable: true, isValidate: true
                    }, {
                        xtype: 'textfield', fieldLabel: '诊断9', margin: '5 0 5 0', hidden: true, bind: '{medical.DiagnosisCode9}', name: 'diagnosisCode9'
                    }, {
                        xtype: 'shared_diagnosiscombo', emptyText: '请选择', margin: '5 0 5 0', multiSelect: false, name: 'diagnosisName9', fieldLabel: '诊断9', bind: '{medical.DiagnosisName9}',
                        listeners: {
                            change: 'setDiagnosisCode9'
                        }, focusEnable: true, isValidate: true
                    }, {
                        xtype: 'textfield', fieldLabel: '诊断10', margin: '5 0 5 0', hidden: true, bind: '{medical.DiagnosisCode10}', name: 'diagnosisCode10'
                    }, {
                        xtype: 'shared_diagnosiscombo', emptyText: '请选择', margin: '5 0 5 0', multiSelect: false, name: 'diagnosisName10', fieldLabel: '诊断10', bind: '{medical.DiagnosisName10}',
                        listeners: {
                            change: 'setDiagnosisCode10'
                        }, focusEnable: true, isValidate: true
                    }, {
                        xtype: 'textfield', fieldLabel: '诊断11', margin: '5 0 5 0', hidden: true, bind: '{medical.DiagnosisCode11}', name: 'diagnosisCode11'
                    }, {
                        xtype: 'shared_diagnosiscombo', emptyText: '请选择', margin: '5 0 5 0', multiSelect: false, name: 'diagnosisName11', fieldLabel: '诊断11', bind: '{medical.DiagnosisName11}',
                        listeners: {
                            change: 'setDiagnosisCode11'
                        }, focusEnable: true, isValidate: true
                    }, {
                        xtype: 'textfield', fieldLabel: '诊断12', margin: '5 0 5 0', hidden: true, bind: '{medical.DiagnosisCode12}', name: 'diagnosisCode12'
                    }, {
                        xtype: 'shared_diagnosiscombo', emptyText: '请选择', margin: '5 0 5 0', multiSelect: false, name: 'diagnosisName12', fieldLabel: '诊断12', bind: '{medical.DiagnosisName12}',
                        listeners: {
                            change: 'setDiagnosisCode12'
                        }, focusEnable: true, isValidate: true
                    }, {
                        xtype: 'textfield', fieldLabel: '诊断13', margin: '5 0 5 0', hidden: true, bind: '{medical.DiagnosisCode13}', name: 'diagnosisCode13'
                    }, {
                        xtype: 'shared_diagnosiscombo', emptyText: '请选择', margin: '5 0 5 0', multiSelect: false, name: 'diagnosisName13', fieldLabel: '诊断13', bind: '{medical.DiagnosisName13}',
                        listeners: {
                            change: 'setDiagnosisCode13'
                        }, focusEnable: true, isValidate: true
                    }, {
                        xtype: 'textfield', fieldLabel: '诊断14', margin: '5 0 5 0', hidden: true, bind: '{medical.DiagnosisCode14}', name: 'diagnosisCode14'
                    }, {
                        xtype: 'shared_diagnosiscombo', emptyText: '请选择', margin: '5 0 5 0', multiSelect: false, name: 'diagnosisName14', fieldLabel: '诊断14', bind: '{medical.DiagnosisName14}',
                        listeners: {
                            change: 'setDiagnosisCode14'
                        }, focusEnable: true, isValidate: true
                    }, {
                        xtype: 'textfield', fieldLabel: '诊断15', margin: '5 0 5 0', hidden: true, bind: '{medical.DiagnosisCode15}', name: 'diagnosisCode15'
                    }, {
                        xtype: 'shared_diagnosiscombo', emptyText: '请选择', margin: '5 0 5 0', multiSelect: false, name: 'diagnosisName15', fieldLabel: '诊断15', bind: '{medical.DiagnosisName15}',
                        listeners: {
                            change: 'setDiagnosisCode15'
                        }, focusEnable: true, isValidate: true
                    }, {
                        xtype: 'textfield', fieldLabel: '诊断16', margin: '5 0 5 0', hidden: true, bind: '{medical.DiagnosisCode16}', name: 'diagnosisCode16'
                    }, {
                        xtype: 'shared_diagnosiscombo', emptyText: '请选择', margin: '5 0 5 0', multiSelect: false, name: 'diagnosisName16', //valueField: 'GenericName',
                        fieldLabel: '诊断16', bind: '{medical.DiagnosisName16}',
                        listeners: {
                            change: 'setDiagnosisCode16'
                        }, focusEnable: true, isValidate: true
                    }
                ]
            }, {
                xtype: 'textareafield', margin: '5 0 5 0', height: 150, width: '100%', fieldLabel: '主诉', bind: '{medical.ChiefComplaint}',
                disabled: false, editable: me.formEditable
            }, {
                xtype: 'textareafield', height: 150, margin: '5 0 5 0', width: '100%', fieldLabel: '手术史', bind: '{medical.SurgeryHistory}',
                disabled: false, editable: me.formEditable
            }, {
                xtype: 'textareafield', height: 150, margin: '5 0 5 0', width: '100%', fieldLabel: '输血史', bind: '{medical.BloodTransHistory}',
                disabled: false, editable: me.formEditable
            }, {
                xtype: 'textareafield', height: 150, margin: '5 0 5 0', width: '100%', fieldLabel: '现病史', bind: '{medical.MedicalHistory}',
                disabled: false, editable: me.formEditable
            }

            );
        me.buttons = [];
        me.buttons.push('->', { text: '保  存', handler: 'addMedical', formBind: true, hidden: !me.formEditable });
        if (!me.formEditable) {
            me.defaults = {
                disabled: !me.formEditable
            }
        }
        me.getViewModel().data.enableListener = !me.formEditable;
        me.callParent(arguments);
    }
});