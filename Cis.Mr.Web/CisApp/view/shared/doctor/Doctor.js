/* ***********************************************
 * author :  韩奎奎
 * function: 医生
 * history:  created by 韩奎奎 
 * ***********************************************/
Ext.define('CisApp.view.shared.doctor.Doctor', {
    extend: 'Fm.base.Grid',
    requires: [
        'CisApp.view.shared.doctor.DoctorController',
        'CisApp.view.shared.doctor.DoctorModel'
    ],
    alias: 'widget.shared_doctor',
    controller: 'shared_doctor',
    viewModel: {
        type: 'shared_doctor'
    },
    //isPage: true,
    autoLoad:true,
    loadMask: true,
    bind: {
        store: '{doctorStore}'
    },
    height: 400,
    dockedItems: {
        xtype: 'toolbar',
        dock: 'top',
        modelValidation: true,
        padding: AppConfig.Design.SearchPanel.Padding,
        defaults: {
            labelWidth: 40,
            margin: '5 5 5 5'
        },
        items: [
                {
                    xtype: 'textfield',
                    bind: '{searchModel.DoctorCode}',
                    fieldLabel: '医生',
                    emptyText:'姓名、编码、拼音缩写',
                    focusEnable: true,
                    width: 180,
                    labelWidth: 30,
                    listeners: {
                        specialkey: function (f, e) {
                            if (e.getKey() == e.ENTER) {
                                var btn = f.up('toolbar').down('button');
                                btn.fireEvent('click');
                            }
                        }
                    }
                },
                {
                    xtype: 'button',
                    text: '查询',
                    width: 70,
                    listeners: {
                        "click": 'refresh'
                    }
                   // handler: 'refresh'
                }
        ]
    },
    columns: [
        {
            configIndex: 0, header: '医生编码', dataIndex: 'DoctorCode', flex: 1,
            renderer: function (value, metaData) {
                metaData.tdAttr = 'data-qtip="' + value + '"';
                return value;
            }
        },
        {
            configIndex: 1, header: '医生姓名', dataIndex: 'DoctorName', flex: 1,
            renderer: function (value, metaData) {
                metaData.tdAttr = 'data-qtip="' + value + '"';
                return value;
            }
        }, {
            configIndex: 2, header: '隐藏字段', hidden: true, dataIndex: 'CombineName', flex: 1,
            renderer: function (value, metaData) {
                metaData.tdAttr = 'data-qtip="' + value + '"';
                return value;
            }
        }, {
            configIndex: 3, header: '医院名称', dataIndex: 'HospitalName', flex: 1
        }, {
            configIndex: 4, header: '性别', dataIndex: 'DoctorSex', flex: 1,
            renderer: Fm.Common.Util.dataTextRender(CisApp.Server.Datas.EnumDoctorSex)
        }, {
            configIndex: 5, header: '医师级别', dataIndex: 'DoctorLevel', flex: 1,
            renderer: Fm.Common.Util.dataTextRender(CisApp.Server.Datas.EnumDoctorLevel)
        }, {
            configIndex: 6, header: '医师职称', dataIndex: 'DoctorTitle', flex: 1,
            renderer: Fm.Common.Util.dataTextRender(CisApp.Server.Datas.EnumDoctorTitle)
        }, {
            configIndex: 7, header: '拼音缩写', dataIndex: 'MemoricCode', flex: 1
        }
    ]
});


/* ***********************************************
 * author :  韩奎奎
 * function: 医生
 * history:  created by 韩奎奎 
 * ***********************************************/
Ext.define('CisApp.view.shared.doctor.DoctorCombo', {
    extend: 'Fm.ux.form.WindowField',
    alias: 'widget.shared_doctorcombo',
    fieldLabel: '医生',
    multiSelect: false,
    winHeight: 400,
    winWidth: 600,
    showClearTriggers: true,//是否显示清除按钮
    minPickerWidth: 500,
    displayField: 'DoctorName',
    valueField: 'CombineName',
    triggerCls: Ext.baseCSSPrefix + 'cis-doctor-trigger',
    isPopWindow: true,
    innerGrid: {
        xtype: 'shared_doctor'
    }
});

