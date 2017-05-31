/* ***********************************************
 * author :  huyakun
 * function: 富文本控件
 * history:  created by huyakun 2016/5/18
 * ***********************************************/
Ext.define("CisApp.view.shared.richbox.RichBox", {
    extend: 'Ext.window.Window',
    alias: 'widget.shared_richbox',
    requires: [
        'CisApp.view.shared.richbox.RichBoxController',
        'CisApp.view.shared.richbox.RichBoxModel',
        'Fm.ux.IFrame',
        'Fm.ux.form.UEditor'
    ],
    controller: 'shared_richbox',
    viewModel: {
        type: 'shared_richbox'
    },
    layout: 'fit',
    autoShow: false,
    modal: true,
    width: 800,
    height: 600,
    title: '详细信息',
    summary: '',//概述内容
    content: '',//详细信息
    hisId: '',//处理的hisID
    backFn: null,//保存回调函数
    backFnScope: null,//回调函数作用域
    isReadOnly: false,//是否为只读信息
    isApi:false,//是否为Api
    initComponent: function () {
        var me = this,
            vm = me.getViewModel();

        vm.set({ summary: me.summary, content: me.content, hisId: me.hisId });

        me.items = [
            {
                xtype: 'form',
                layout: 'border',
                defaults: {
                    margin: 5,
                    labelWidth: 60,
                    labelAlign: 'right'
                },
                items: [
                    {
                        xtype: 'textareafield',
                        name: 'reasonTitle',
                        fieldLabel: '概述',
                        region: 'north',
                        margin:'5 5 10 5',
                        allowBlank: false,
                        blankText: '概述不能为空',
                        maxLength: 512,
                        maxLengthText:'概述信息过长，请重新输入',
                        hidden: me.isReadOnly,
                        height: 50,
                        bind: '{summary}'
                    }, {
                        //只读状态下显示标题
                        xtype: 'textareafield',
                        border: false,
                        fieldLabel: '',
                        region: 'north',
                        margin: '5 5 10 5',
                        hidden: !me.isReadOnly || me.isApi,
                        readOnly: true,
                        height: 50,
                        bind: '{summary}'
                    },
                    {
                        name: "reasonContent",
                        fieldLabel: '详细信息',
                        hidden: me.isReadOnly,
                        region: 'center',
                        height: 380,
                        xtype: 'ueditor',
                        value: me.content
                    },
                    {
                        //只读状态下显示
                        hidden: !me.isReadOnly,
                        //region: 'center',
                        height: 380,
                        border: 1,
                        style: {
                            borderColor: '#ddd',
                            borderStyle:'solid'
                        },
                        xtype: 'uxiframe',
                        listeners: {
                            afterrender: 'frameAfterRender'
                        }
                    },{
                         xtype: 'hidden',
                         name: 'id',
                         bind: '{hisId}'
                    }
                ]
            }
        ];
        me.buttons = [
            {
                text: '保存',
                margin: '',
                handler: 'save',
                hidden: me.isReadOnly
            }, {
                text: '关闭',
                margin: '0 5 0 5',
                scope: this,
                handler: this.close
            }
        ];

        me.callParent(arguments);
        setTimeout(function () {
            me.focus();
            var form = me.down('uxiframe');
            form.focus();
        }, 200);
    }
});