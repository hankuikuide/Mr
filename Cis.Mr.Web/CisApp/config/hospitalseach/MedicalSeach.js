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