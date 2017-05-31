///* ***********************************************
// * author :  苗建龙
// * function: 
// * history:  created by FeiLong 2015/5/11 16:21:57 
// * ***********************************************/
Ext.ns('CisApp.Common').Util = {
    //drgs 需要提示 加参数 true 为显示 默认空不显示
    getCcFlagClassify: function (tips) {
        return function (data, metadata, record) {
            var value = data.replace("0", "无").replace("1", "普通").replace("2", "严重");
            if (tips && metadata !== null) {
                metadata.tdAttr = 'data-qtip="' + value + '"';
            }
            return value;
        }
    },
    //drgs 需要添加drgs 类型
    getDrgType: function (tips) {
        return function (data, metadata, record) {
            var value = data.replace("M", "内科").replace("S", "外科");
            if (tips && metadata !== null) {
                metadata.tdAttr = 'data-qtip="' + value + '"';
            }
            return value;
        }
    },
    //CodeToText
    dataCodeToTextRender: function (datas) {
        return function (v) {
            if (v !== undefined && v !== null && v !== "") {
                var _item = Ext.Array.findBy(datas, function (item, index) {
                    return item.Code == v;
                });
                if (_item) {
                    return _item.Text
                }
            }
            return '';
        }
    },
    jsonDataToTextRender: function (datas) {
        return function (jsonData) {
            var values = Ext.decode(jsonData);
            var res = "";
            if (values) {
                for (var prop in values) {
                    var _item = Ext.Array.findBy(datas, function (item, index) {
                        return item.Value == prop;
                    });
                    if (_item) {
                        var _value = values[prop];
                        if (_value.trim() !== "") {
                            if (_item.IsEnum) {
                                _value = CisApp.Common.Util.dataCodeToTextRender(Ext.ns("CisApp.Server.Datas")[_item.EnumName])(values[prop]);
                            }
                        } else {
                            _value = "修改为空";
                        }
                        res += _item.Text + ":" + _value + ";";
                    }
                }
                if (res.length < 1) {
                    res = "未修改内容";
                }
            } else {
                res = "未修改内容";
            }
            return res;
        }
    }
}
///* ***********************************************
// * author :  苗建龙
// * function: 
// * history:  created by FeiLong 2015/5/11 16:21:57 

//调用示例  var data = fmAppFactory.Data.getDataStore('key');
//var fmAppFactory = fmCommonFactory({ appName: 'CisApp' });

var appFactory = fmCommonFactory({ appName: 'CisApp' });
/* ***********************************************
 * author :  
 * function: 
 * history:  created by   
 * ***********************************************/
Ext.ns('CisApp.Common').Core = {
    Shared: {
        getMenuData: function () {
            var _data = CisApp.Server.Datas.Menus;

            var getSub = function (_pid, noIcon) {
                var _temp = Ext.Array.filter(_data, function (item, index) {
                    return item.ParentId === _pid && item.Name !== '_';
                });

                for (var i = 0; i < _temp.length; i++) {
                    var item = _temp[i];
                    if (!noIcon) {
                        if (item.Icon && Ext.String.trim(item.Icon) != '') {
                            item.iconCls = item.Icon;
                        } else {
                            item.iconCls = 'fa fa-chevron-right';
                        }
                    }
                    //item.Icon = undefined;
                    if (item.ViewParams && typeof item.ViewParams === 'string') {
                        item.ViewParams = Ext.JSON.decode(item.ViewParams);
                    }
                    item.text = item.Name;

                    var _sub = getSub(item.Id, true);
                    if (_sub.length > 0) {
                        item.children = _sub
                    } else {
                        item.leaf = true;
                    }
                }
                return _temp;
            }

            return getSub(0);
        },
        getForData: function (data) {
            var getarray = function (data, _text) {
                if (!data) {
                    return;
                }
                var cg = [];
                for (var i = 0; i < data.length; i++) {
                    if (Ext.isArray(data[i].Value)) {
                        cg[i] = {
                            text: data[i].Text,
                            leaf: false,
                            checked: false,
                            children: getarray(data[i].Value, data[i].Text)
                        };
                    } else {
                        var childen = [];
                        for (var j = 0; j < data.length; j++) {
                            childen[j] = {
                                GroupRuleBit: _text + '|' + data[j].RuleBit,
                                RuleBit: data[j].RuleBit,
                                value: data[j].RuleBit,
                                text: data[j].Name,
                                Id: data[j].Id,
                                leaf: true,
                                checked: false
                            };
                        }
                        return childen;
                    }
                }
                return cg;
            };
            return getarray(data);

        }
    }
}
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
/* ***********************************************
 * author :  李克一
 * function: 
 * history:  created by 李克一 
 * ***********************************************/
Ext.ns("CisApp.Config.drgsyb.Drgsyb");
CisApp.Config.drgsyb.Drgsyb = {
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
                     bind: '{seachData.OrgCode}'
                 }, {
                     configIndex: 2,
                     xtype: 'monthdatefield',
                     fieldLabel: '结算月份',
                     bind: '{seachData.YearMonth}',
                     format: "Y-m",
                     editable: false
                 }, {
                     configIndex: 3,
                     xtype: 'combo',
                     fieldLabel: '人员类别',
                     bind: '{seachData.BenefitGroup}',
                     store: appFactory.Data.getDataStore('BenefitGroupsParent'),
                     displayField: 'Text',
                     valueField: 'Value',
                     emptyText: '请选择'
                 }
        ]
    }
}
/* ***********************************************
 * author :  李克一
 * function: 
 * history:  created by 李克一 
 * ***********************************************/
Ext.ns("CisApp.Config.drgsyb.DrgsybChart");
CisApp.Config.drgsyb.DrgsybChart = {
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
                     bind: '{seachData.OrgCode}'
                 },
                 {
                     configIndex: 2,
                     xtype: 'monthdatefield',
                     fieldLabel: '结算月份',
                     bind: '{seachData.YearMonth}',
                     format: "Y-m",
                     editable: false
                 }
                 //, {
                 //    configIndex: 3,
                 //    xtype: 'combo',
                 //    fieldLabel: '人员类别',
                 //    bind: '{seachData.BenefitGroup}',
                 //    store: appFactory.Data.getDataStore('BenefitGroupsParent'),
                 //    displayField: 'Text',
                 //    valueField: 'Value',
                 //    emptyText: '请选择'
                 //}
        ]
    }
}
/* ***********************************************
 * author :  李克一
 * function: 
 * history:  created by 李克一 
 * ***********************************************/
Ext.ns("CisApp.Config.hospitalseach.MedicalSeach");
CisApp.Config.hospitalseach.MedicalSeach = {
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
                fieldLabel: '住院号',
                bind: '{seachData.AdmissionNo}'
            }, {
                configIndex: 4,
                xtype: 'daterange',
                fieldLabel: '上传时间',
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
            }
        ]
    }
}
/* ***********************************************
 * author :  单梦琪
 * function: 分组调整审核-检查单 config
 * history:  created by 单梦琪 2016/5/11 10:48:48 
 * ***********************************************/
Ext.ns('CisApp.Config.share.Check');
CisApp.Config.share.Check = {
    ColumnsList: function () {
        return [
        { configIndex: 0, xtype: 'rownumberer', width: 50, text: '序号' },
        { configIndex: 1, text: '检查单号', dataIndex: 'CheckId',width:100 },
        //{ configIndex: 2, text: '申请科室代码', dataIndex: 'DepartmentCode',width:120 },
        { configIndex: 3, text: '申请科室名称', dataIndex: 'DepartmentName', width: 120 },
        //{
        //    configIndex: 4, text: '临床诊断编码', dataIndex: 'DiagnosticCode',
        //    renderer: function (value, metaData) {
        //        if (metaData) {
        //            metaData.tdAttr = 'data-qtip="' + value + '"';
        //        }
        //        return value;
        //    },width:100
        //},
        //{
        //    configIndex: 5, text: '临床诊断名称', dataIndex: 'DiagnosticName',
        //    renderer: function (value, metaData) {
        //        if (metaData) {
        //            metaData.tdAttr = 'data-qtip="' + value + '"';
        //        }
        //        return value;
        //    }, width: 120
        //},
        {
            configIndex: 6, text: '申请项目编码', dataIndex: 'ApplyProjectCode',
            renderer: function (value, metaData) {
                if (metaData) {
                    metaData.tdAttr = 'data-qtip="' + value + '"';
                }
                return value;
            }, width: 120
        },
        {
            configIndex: 7, text: '申请项目名称', dataIndex: 'ApplyProjectName',
            renderer: function (value, metaData) {
                if (metaData) {
                    metaData.tdAttr = 'data-qtip="' + value + '"';
                }
                return value;
            }, width: 120, showTip: true
        },
        { configIndex: 8, text: '申请医师编码', dataIndex: 'ApplyDoctor', width: 100 },
        { configIndex: 14, text: '申请医师名称', dataIndex: 'ApplyDoctorName', width: 100 },
        { configIndex: 9, text: '申请时间', dataIndex: 'ApplyDatetime', renderer: Fm.Common.Util.dateRender(), width: 150 },
        { configIndex: 10, text: '报告时间', dataIndex: 'ReportDatetime', renderer: Fm.Common.Util.dateRender(), width: 150 },
        { configIndex: 11, text: '检查部位', dataIndex: 'CheckPositionCodeName', width: 100, showTip: true },
        {
            configIndex: 12, text: '报告结果', dataIndex: 'Result',
            renderer: function (value, metaData) {
                if (metaData) {
                    metaData.tdAttr = 'data-qtip="' + value + '"';
                }
                return value;
            }, width: 100, showTip: true
        },
        {
            configIndex: 13, text: '异常提示', dataIndex: 'AbnormalName',
            renderer: function (value, metaData) {
                if (metaData) {
                    metaData.tdAttr = 'data-qtip="' + value + '"';
                }
                return value;
            }, minWidth: 100,
            flex: 1, showTip: true
        }
        ]
    }
}
/* ***********************************************
 * author :  sunqiang
 * function: 疾病查询配置
 * history:  created by sunqiang 
 * ***********************************************/

Ext.ns('CisApp.Config.share.Diagnosis');
CisApp.Config.share.Diagnosis = {
    Lists: function () {
        return [
            { configIndex: 0, header: '序号', dataIndex: 'NumRow', width: 50, align: 'center', configMustShow: true },
            { configIndex: 1, header: '编码', dataIndex: 'GenericCode', flex: 2, configMustShow: true, showTip: true },
            { configIndex: 2, header: '名称', dataIndex: 'GenericName', flex: 2, align: 'left', configMustShow: true, showTip: true },
            { configIndex: 3, header: '拼音缩写', dataIndex: 'MnemonicCode', flex: 2, align: 'left', configMustShow: true }//,
            //{ configIndex: 4, header: '疾病分类', dataIndex: 'DiseaseClass', flex: 2, align: 'left', configMustShow: true }
            //{ configIndex: 5, header: '慢性病编码', dataIndex: 'SpecialCode', width: 120, configMustShow: true },
            //{ configIndex: 6, header: '慢性病名称', dataIndex: 'SpecialName', width: 120, configMustShow: true },
            //{
            //    configIndex: 7, header: '备注', dataIndex: 'Remark', width: 120,
            //    renderer: function (value, metaData) {
            //        if (metaData) { metaData.tdAttr = 'data-qtip="' + value + '"'; }
            //        return value;
            //    }, configMustShow: true
            //}
        ];
    }
};
/* ***********************************************
 * author :  单梦琪
 * function: 分组调整审核-手术信息 config
 * history:  created by 单梦琪 2016/5/11 10:48:48 
 * ***********************************************/
Ext.ns('CisApp.Config.share.Operation');
CisApp.Config.share.Operation = {
    ColumnsList: function () {
        return [
        { configIndex: 0, xtype: 'rownumberer', width: 50, text: '序号' },
        { configIndex: 1, text: '手术记录序号', dataIndex: 'OperationRecordNo' },
        {
            configIndex: 2, text: '手术医师', dataIndex: 'OperationDoctorName',
            renderer: function (value, metaData) {
                if (metaData) {
                    metaData.tdAttr = 'data-qtip="' + value + '"';
                }
                return value;
            }, width: 100, showTip: true
        },
        {
            configIndex: 3, text: '手术医师I助', dataIndex: 'FirstOperDoctorName',
            renderer: function (value, metaData) {
                if (metaData) {
                    metaData.tdAttr = 'data-qtip="' + value + '"';
                }
                return value;
            }, width: 100
        },

        {
            configIndex: 4, text: '手术医师II助', dataIndex: 'SecondOperDoctorName',
            renderer: function (value, metaData) {
                if (metaData) {
                    metaData.tdAttr = 'data-qtip="' + value + '"';
                }
                return value;
            }, width: 100
        },
        { configIndex: 5, text: '麻醉师', dataIndex: 'AnesthesiologistName', showTip: true },
        { configIndex: 11, text: '记录医师', width: 100, dataIndex: 'RecordDoctorName', showTip: true },
        { configIndex: 6, text: '执行开始时间', width: 200, dataIndex: 'OperationDate', renderer: Fm.Common.Util.dateRender(), showTip: true },
        { configIndex: 7, text: '执行结束时间', width: 200, dataIndex: 'OperationFinishDate', renderer: Fm.Common.Util.dateRender(), showTip: true },
        {
            configIndex: 8, text: '麻醉方式', dataIndex: 'AnaesthesiaTypeName',
            renderer: function (value, metaData) {
                if (metaData) {
                    metaData.tdAttr = 'data-qtip="' + value + '"';
                }
                return value;
            }, showTip: true
        },
        {
            configIndex: 9, text: '并发症', width: 200, dataIndex: 'ComplicationName',
            renderer: function (value, metaData) {
                if (metaData) {
                    metaData.tdAttr = 'data-qtip="' + value + '"';
                }
                return value;
            }, showTip: true
        },
        {
            configIndex: 10, text: '手术记录', dataIndex: 'OperationRecord',
            xtype: 'widgetcolumn',
            widget: {
                xtype: 'label',
                cisBindProperty: {
                    html: {
                        dataIndex: 'OperationRecord',
                        renderer: function (v) {
                            if (v == null) {
                                v = "";
                            }
                            return '<a href="javascript:void(0)">' + v + '</a>';
                        }
                    }
                },
                handler: 'showRemarkContent', showTip: true
            },
            minWidth:100,
            flex:1
        }

        ]
    }
}
/* ***********************************************
 * author :  单梦琪
 * function: 分组调整审核-手术详细信息 config
 * history:  created by 单梦琪 2016/5/11 10:48:48 
 * ***********************************************/
Ext.ns('CisApp.Config.share.OperationDetail');
CisApp.Config.share.OperationDetail = {
    ColumnsList: function () {
        return [
        { configIndex: 0, xtype: 'rownumberer', text: '序号', width: 50 },
        { configIndex: 1, text: '手术序号', dataIndex: 'OperationNo' },
        //{ configIndex: 2, text: '手术编码', dataIndex: 'OperationCode' },
        { configIndex: 3, text: '手术名称', dataIndex: 'OperationDetailName', showTip: true },
        { configIndex: 4, text: '手术等级', dataIndex: 'OperationLevel', renderer: Fm.Common.Util.dataTextRender('EnumOperationLevel'), showTip: true },
        { configIndex: 5, text: '手术切口分类', dataIndex: 'OperationIncisionClassName', showTip: true },
        { configIndex: 6, text: '手术愈合分级', dataIndex: 'OperationHealClass', showTip: true },
        { configIndex: 7, text: '主次标志', dataIndex: 'IsMajorIden', renderer: Fm.Common.Util.dataTextRender('EnumMajorIden') },
        { configIndex: 8, text: '是否医源性手术', dataIndex: 'IsIatrogenic', renderer: Fm.Common.Util.dataTextRender('EnumIsIatrogenic'), flex: 1 }
        ]
    }
}
/* ***********************************************
 * author :  alex
 * function: 
 * history:  created by alex 2017年3月30日09:27:23
 * ***********************************************/

Ext.ns('CisApp.Config.sys.PublicGrant');
CisApp.Config.sys.PublicGrant = {
    GrantList: function () {
        return [
            { xtype: 'rownumberer', configIndex: 0, text: '序号',width:50 },
            { configIndex: 1, text: Fm.Lang.SearchMonth || "预拨月份", dataIndex: 'GrantMonth'},
            { configIndex: 2, text: '机构编号', dataIndex: 'HospitalId' },
            { configIndex: 3, text: '机构名称', dataIndex: 'HospitalName', showTip: true,width: 150},
            { configIndex: 4, text: '上传授权', dataIndex: 'IsGroupView', renderer:Fm.Common.Util.dataTextRender(CisApp.Server.Datas.EnumFundPublicity)},
            { configIndex: 5, text: '授权时间', dataIndex: 'OperDate', renderer: Fm.Common.Util.dateRender() },
            { configIndex: 6, text: '授权人', dataIndex: 'GrantName' },
            { configIndex: 7, text: '授权截止日期', dataIndex: 'BackEndDate',minWidth:120, renderer: Fm.Common.Util.dateTextRender(),flex:1 }
            //, { configIndex: 8, text: '结算授权', dataIndex: 'IsFundView', align: 'center', minWidth: 80, renderer: 'IsGrantRender', flex: 2 }
        ]
    },
    AddColumns: function () {
        return [
            //{ configIndex: 0, text: '序号', xtype: 'rownumberer', width: 50, flex: 1},
            { configIndex: 1, text: '机构编号', dataIndex: 'Id', align: 'left', minWidth: 100, flex: 2 },
            { configIndex: 2, text: '机构名称', dataIndex: 'Name', align: 'left', minWidth: 150, flex: 4 },
            { configIndex: 3, text: '机构类型', dataIndex: 'Type', minWidth: 80, flex: 2, renderer: Fm.Common.Util.dataTextRender(CisApp.Server.Datas.EnumHospitalType) },
             { configIndex: 4, text: '机构级别', dataIndex: 'P_Level', minWidth: 80, flex: 2, renderer: Fm.Common.Util.dataTextRender(CisApp.Server.Datas.EnumHospitalLevel) }
        ];
    }
}