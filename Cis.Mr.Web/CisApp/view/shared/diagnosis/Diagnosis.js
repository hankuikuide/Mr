/* ***********************************************
 * author :  sunqiang
 * function: 
 * history:  created by sunqiang 2016/6/30 16:07:45 
 * ***********************************************/
Ext.define("CisApp.view.shared.diagnosis.Diagnosis", {
    extend: 'Fm.base.Grid',
    alias: 'widget.shared_diagnosis',
    requires: [
        'CisApp.view.shared.diagnosis.DiagnosisController',
        'CisApp.view.shared.diagnosis.DiagnosisModel',
        'Fm.ux.grid.plugin.ClickSelection'
    ],
    controller: 'shared_diagnosis',
    viewModel: {
        type: 'shared_diagnosis'
    },
    border: false,
    layout: 'fit',
    autoLoad: true,
    loadMask: true,

    plugins: [{
        ptype: 'clickselection'
    }],
    notAutoWidth: true,
    columns: appFactory.Config.getGridItems('share.Diagnosis.Lists'),
    tbar: {
        xtype: 'form',
        reference: 'searchform',
        border: false,
        modelValidation: true,
        layout: {
            type: 'table',
            columns: 2
        },
        defaults: {
            margin: '5 5 5 3',
            width: 200,
            labelAlign: 'right',
            labelWidth: 30
        },
        items: [
            {
                fieldLabel: '疾病',
                width: 200,
                bind: '{searchModel.GenericCode}',
                xtype: 'textfield',
                focusEnable: true,
                emptyText: '名称、编码、拼音缩写',
                listeners: {
                    specialkey: function (f, e) {
                        if (e.getKey() === e.ENTER) {
                            var btn = f.up('form').down('button');
                            btn.fireEvent('click');
                        }
                    }
                }
            },
            {
                xtype: 'button',
                text: '检索',
                listeners: {
                    "click": 'refresh'
                },
                //handler: 'refresh',
                width: 50
            }
        ]
    },
    //bind: {
    //    store: '{diseaseList}'
    //},
    diseaseMain: false,
    initComponent: function () {
        var me = this;
        if (me.diseaseMain) {
            me.setConfig({
                bind: {
                    store: '{diseaseMainList}'
                }
            });
        } else {
            me.setConfig({
                bind: {
                    store: '{diseaseList}'
                }
            });
        }
        //me.down('form').findByType('textfield')[0].focus(true, 1000);
        me.callParent(arguments);
    }
});

/* ***********************************************
 * author :  孙强
 * function: 疾病诊断
 * history:  created by 孙强 
 * ***********************************************/
Ext.define('CisApp.view.shared.diagnosis.DiagnosisCombo', {
    extend: 'Fm.ux.form.WindowField',
    alias: 'widget.shared_diagnosiscombo',
    fieldLabel: '疾病诊断',
    multiSelect: true,//控制单选多选
    valueIsString: false,
    windowTitle: '疾病编码',
    winHeight: 400,
    winWidth: 650,
    showClearTriggers: true,//是否显示清除按钮
    minPickerWidth: 500,
    displayField: 'GenericName', //显示的值CodeAndName GenericCode
    valueField: 'CodeAndName',//返回的值
    triggerCls: Ext.baseCSSPrefix + 'cis-diag-trigger',
    isPopWindow: true,
    diseaseMain: false,
    initComponent: function () {
        var me = this;
        me.innerGrid = {
            diseaseMain: me.diseaseMain,
            xtype: "shared_diagnosis",
            isShowCheck: me.multiSelect,
            width: 500,
            height: 400
        };
        me.callParent(arguments);
    }
});