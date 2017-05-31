/* ***********************************************
 * author :  李克一
 * function: 
 * history:  created by 李克一 
 * ***********************************************/
Ext.ns("CisApp.Config.drgsapi.MedicalSeach");
CisApp.Config.drgsapi.MedicalSeach = {
    Items: function () {
        return [
            {
                configIndex: 1,
                xtype: 'shared_hospitalcombo',
                fieldLabel: '医疗机构',
                multiSelect: false,
                editable: true,
                isPopWindow: true,
                configMustShow: true,
                bind: {
                    value: '{seachData.HospitalId}',
                    hidden: '{orgCode}'
                }
            }, {
                configIndex: 2,
                xtype: 'textfield',
                fieldLabel: '社保卡号',
                bind: '{seachData.BmiNo}',
                name: 'bmiNo'
            }, {
                configIndex: 3,
                xtype: 'textfield',
                fieldLabel: '住院号',
                bind: '{seachData.AdmissionNo}'
            }, {
                //    xtype: 'shared_patientcombo',
                //    bind: '{seachData.PatientId}',
                //    name: "PatientId"
                //}, {
                configIndex: 4,
                xtype: 'textfield',
                fieldLabel: '参保人',
                bind: '{seachData.PatientName}'
            }, {
                configIndex: 5,
                xtype: 'combo',
                fieldLabel: '填报状态',
                bind: '{seachData.IsUpload}',
                store: appFactory.Data.getDataStore('EnumIsUpload'),
                displayField: 'Text',
                valueField: 'Value',
                emptyText: '请选择',
                listeners: { change: 'isUploadSelected' }
            }, {
                configIndex: 6,
                xtype: 'combo',
                name: 'comboValidateSearchFlag',
                fieldLabel: '校验结果',
                store: appFactory.Data.getDataStore('EnumValidateFlagView'),
                displayField: 'Text',
                valueField: 'Value',
                emptyText: '请选择',
                disabled: true,
                bind: {
                    disabled: '{comboValidateEnabled}',
                    value: '{seachData.DataValidateFlag}'
                }
            },
            //{
            //    configIndex: 7,
            //    fieldLabel: '人员类别',
            //    xtype: 'shared_benefitgroup',
            //    bind: { value: '{seachData.BenefitGroupIds}' }
            //},
            {
                configIndex: 8,
                xtype: 'daterange',
                fieldLabel: '结算日期',
                width: 372,
                colspan: 2,
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
            }//,
        //'->',
        //{
        //    xtype: 'button',
        //    text: '查询',
        //    handler: 'query',
        //    margin: '0 0 0 10',
        //    width: 70,
        //    //bind: {
        //    //    disabled: true//'{btnQuery}'
        //    //},
        //    id: 'btselect'

        //}
        ]





        //  {
        //      configIndex: 0,
        //      xtype: 'textfield',
        //      fieldLabel: '住院号',
        //      bind: {
        //          value: '{searchModel.HisId}'
        //      },
        //      validator: function (val) {
        //          return /[<>&\\]/.test(val) ? '该输入项不能包含特殊字符(><&\\)!' : true;
        //      }
        //  },
        //  {
        //      configIndex: 1,
        //      xtype: 'shared_hospitalcombo',
        //      fieldLabel: '机构编号',
        //      editable: true,
        //      isPopWindow: true,
        //      configMustShow: true,
        //      bind: {
        //          value: '{searchModel.HospatilIds}'
        //      }
        //  },
        //  {
        //      configIndex: 2,
        //      xtype: 'monthdatefield',
        //      fieldLabel: Fm.Lang.SearchMonth,
        //      bind: '{searchModel.GrantMonth}',
        //      format: "Y-m",
        //      editable: false
        //  },
        //  {
        //      configIndex: 3,
        //      xtype: 'combo',
        //      fieldLabel: '审核状态',
        //      store: appFactory.Data.getDataStore('EnumDrgsAuditState'),
        //      displayField: 'Text',
        //      valueField: 'Value',
        //      queryMode: 'local',
        //      editable: false,
        //      multiSelect: true,
        //      configMustShow: true,
        //      bind: {
        //          value: '{searchModel.ApprovalStatus}'
        //      }
        //  },
        //  {
        //      configIndex: 4,
        //      fieldLabel: '人员类别',
        //      xtype: 'combo',
        //      editable: false,
        //      store: appFactory.Data.getAllDataStore('BenefitGroups'),
        //      name: 'BenefitGroupIds',
        //      valueField: 'Value',
        //      displayField: 'Text',
        //      queryMode: 'local',
        //      emptyText: '全部',
        //      multiSelect: true,
        //      labelAlign: 'right',
        //      bind: '{searchModel.BenefitGroupIds}',
        //      defaultListConfig: {
        //          //minWidth: 150,
        //          itemTpl: [
        //              '<div data-qtip="{Text}">',
        //              '{[values.Text.length>9 ?(values.Text.substring(0,8)+"...") : values.Text]}',
        //              '</div>'
        //          ]
        //      }
        //  },
        //{
        //    configIndex: 5,
        //    fieldLabel: Fm.Lang.FundType || '基金类型',
        //    xtype: 'combo',
        //    editable: false,
        //    store: appFactory.Data.getDataStore('FundTypeGroups'),
        //    name: 'FundType',
        //    valueField: 'Value',
        //    displayField: 'Text',
        //    queryMode: 'local',
        //    emptyText: '全部',
        //    multiSelect: true,
        //    bind: '{searchModel.FundType}'//,
        //    //listConfig: { minWidth: 120 }
        //}

    }
}