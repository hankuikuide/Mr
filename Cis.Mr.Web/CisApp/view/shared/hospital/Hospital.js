/* ***********************************************
 * author :  孙强
 * function: 医疗机构查询
 * history:  created by 孙强 2015/10/19 
 * ***********************************************/
Ext.define('CisApp.view.shared.hospital.Hospital', {
    extend: 'Fm.base.Grid',
    alias: 'widget.shared_hospital',
    requires: [
        'CisApp.view.shared.hospital.HospitalController',
        'CisApp.view.shared.hospital.HospitalModel',
        'Fm.ux.grid.plugin.CisRowExpander',
        'Fm.ux.grid.plugin.ClickSelection',
        'Fm.ux.grid.feature.Grouping'
    ],
    loadMask: true,
    isPage: false,
    controller: 'hospital',
    viewModel: {
        type: 'hospital'
    },
    bind: {
        store: '{hospital}'
    },
    features: {
        ftype: 'cisgrouping',
        groupHeaderTpl: ' {name}({rows.length})'
    },
    tbar: [
        {
            fieldLabel: '机构编号\\名称',
            labelWidth:100,
            xtype: 'textfield',
            listeners: {
                change: 'onKeyUp'
            }
        }
    ],
    columns: [
        {
            dataIndex: 'DetailId',
            text: '机构编号',
            align: 'center',
            flex: 2
        }, {
            dataIndex: 'DetailName',
            text: '机构名称',
            align: 'center',
            flex: 2
        }, {
            dataIndex: 'Type',
            text: '机构类型',
            align: 'center',
            flex: 2
        }, {
            dataIndex: 'Level',
            text: '机构级别',
            align: 'center',
            renderer: Fm.Common.Util.dataTextRender(CisApp.Server.Datas.EnumHospitalLevel),
            flex: 2
        },
        {
            dataIndex: 'IsChecked',
            text: '机构级别',
            align: 'center',
            hidden:true,
            flex: 2
        }
    ],
    initComponent: function () {
        var me = this;
        me.features.isShowCheck = me.isShowCheck;
        me.callParent(arguments);
    }
});

/* ***********************************************
 * author :  孙强
 * function: 医疗机构
 * history:  created by 孙强 
 * ***********************************************/
Ext.define('CisApp.view.shared.hospital.HospitalCombo', {
    extend: 'Fm.ux.form.WindowField',
    alias: 'widget.shared_hospitalcombo',
    fieldLabel: '机构编号',
    multiSelect: true,
    isCache:true,//是否走缓存 如果有参数的话 不需要走
    valueIsString:false,
    winHeight: 400,
    winWidth: 600,
    showClearTriggers: true,//是否显示清除按钮
    minPickerWidth: 500,
    displayField: 'DetailId',
    valueField: 'DetailId',
    triggerCls: Ext.baseCSSPrefix + 'cis-medical-trigger',
    isPopWindow: true,
    initComponent: function () {
        var me = this;
        me.innerGrid = {
            xtype: "shared_hospital",
            isShowCheck: me.multiSelect,
            isCache:me.isCache,
            width: 500,
            height: 400
        };
        me.callParent(arguments);
    }
});

/* ***********************************************
 * author :  孙强
 * function: 医疗机构
 * history:  created by 孙强 
 * ***********************************************/
Ext.define('CisApp.view.shared.hospital.HospitalButton', {
    extend: 'Ext.button.Button',
    alias: 'widget.shared_hospitalbtn',
    text: '机构编号',
    fieldLabel: '机构编号',
    multiSelect: true,
    isCache: true,//是否走缓存 如果有参数的话 不需要走
    winHeight: 400,
    winWidth: 600,
    //triggerCls: Ext.baseCSSPrefix + 'cis-medical-trigger',
    initComponent: function () {
        var me = this,
            win,
            selModel,
            bbar = ['->'];
        me.innerGrid = {
            xtype: "shared_hospital",
            isShowCheck: me.multiSelect,
            isCache: me.isCache,
            width: 500,
            height: 400
        };
        if (me.multiSelect) {
            selModel = {
                mode: "SIMPLE",
                selType: "checkboxmodel",
                allowDeselect: true,
                bindCheckedField: 'IsChecked'
            };
        } else {
            selModel = {
                mode: "SINGLE",
                allowDeselect: true
            };
        }
        bbar.push({
            text: '选择',
            width: 70,
            handler: function (btn) {
                var win = btn.up('window[isWindow=is]'),
                    grid = win.down('cisgrid') || win.down('grid'),
                    records = grid.getSelection();
                if (me.callbackChecked) {
                    me.callbackChecked(records);
                }
                win.close();
            }
        }, {
            text: '取消',
            width: 70,
            handler: function (btn) {
                var win = btn.up('window[isWindow=is]');
                win.close();
            }
        });
      
        me.handler = function () {
            win = Ext.create('Ext.window.Window', {
                title: me.fieldLabel,
                height: me.winHeight,
                width: me.winWidth,
                modal: true,
                layout: 'fit',
                isWindow: 'is',
                items: [Ext.apply(me.innerGrid, { selModel: selModel })],
                buttons: bbar
            });
            win.show();
        };
        me.callParent(arguments);
    }
});