/* ***********************************************
 * author :  韩奎奎
 * function: 参保人
 * history:  created by 韩奎奎 
 * ***********************************************/
Ext.define('CisApp.view.shared.patient.Patient', {
    extend: 'Fm.base.Grid',
    requires: [
        'CisApp.view.shared.patient.PatientController',
        'CisApp.view.shared.patient.PatientModel'
    ],
    alias: 'widget.shared_patient',
    controller: 'shared_patient',
    viewModel: {
        type: 'shared_patient'
    },
    //isPage: true,
    loadMask: true,
    bind: {
        store: '{patientStore}'
    },
    height: 400,
    tbar: [
            {
                width: '100%',
                xtype: 'form',
                layout: 'column',
                border: false,
                modelValidation: true,
                defaults: {
                    margin: '5 5 5 5',
                    width: 160,
                    labelAlign: 'right',
                    labelWidth: 62
                },
                items: [
                    //'->',
                    {
                        xtype: 'textfield',
                        bind: '{searchModel.Name}',
                        fieldLabel: '参保人',
                        focusable:true,
                        width: 180,
                        labelWidth: 60
                    },
                    {
                        xtype: 'button',
                        text: '查询',
                        width: 80,
                        handler: 'refresh'

                    }
                ]
            }],
    columns: [
        {  header: '参保人ID', dataIndex: 'PatientId', flex: 1 },
        {  header: '姓名', dataIndex: 'Name', flex: 1 },
        { header: '人员类别', dataIndex: 'BenefitGroupName', flex: 1 },
        { header: '性别', dataIndex: 'Gender', flex: 1 ,renderer:Fm.Common.Util.dataTextRender('EnumSex')}
    ]
});

/* ***********************************************
 * author :  韩奎奎
 * function: 参保人下拉框
 * history:  created by 韩奎奎 
 * ***********************************************/
Ext.define('CisApp.view.shared.patient.PatientCombo', {
    extend: 'Fm.ux.form.ComboGrid',
    alias: 'widget.shared_patientcombo',
    fieldLabel: '参保人',
    editable: false,
    multiSelect: false,
    winHeight: 400,
    winWidth: 600,
    showClearTriggers: true,//是否显示清除按钮
    minPickerWidth: 500,
    displayField: 'Name',
    valueField: 'PatientId',
    isPopWindow: false,
    innerGrid: {
        xtype: 'shared_patient'
    }
});