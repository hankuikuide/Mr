/* ***********************************************
 * author :  Vinge
 * function: 
 * history:  created by Vinge 2016/04/15 13:37:07 
 * ***********************************************/
Ext.define('CisApp.view.drgsapi.report.ReportController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.drgsapi_report',
    //South折叠
    onSouthFold: function () {
        var me = this,
            view = me.getView(),
            tabpanel = view.down('tabpanel[selftype=drgsapi_report_tab]'),
            maximize = tabpanel.down('[type=maximize]'),
            restore = tabpanel.down('[type=restore]');

        var isMaximize = maximize.isHidden();
        maximize.setHidden(!isMaximize);
        restore.setHidden(isMaximize);

        view.foldPanel("s");
    },
    //键盘快捷键
    keyMap: function (obj) {
        var me = this;
        var keyMap = new Ext.util.KeyMap({
            target: Ext.getBody(),
            binding: [{
                key: Ext.event.Event.ALT,
                ctrl: false,
                fn: function () { handleCtrlTab(me, true); },
                defaultEventAction: "stopEvent"
            }, {
                key: Ext.event.Event.F3,
                ctrl: false,
                fn: function () {
                    me.getView().down('drgsapi_medical').focus();
                    return;
                },
                defaultEventAction: "stopEvent"
            }
                ,
            {
                key: Ext.event.Event.F1,
                fn: function () {
                    //document.getElementsByName("bmiNo")[0].click();
                    document.getElementsByName("bmiNo")[0].focus();
                    window.onhelp = function () { return false; }
                },
                defaultEventAction: "stopEvent"
            }, {
                key: Ext.event.Event.D,
                ctrl: true,
                fn: function () { me.onSouthFold(); },
                defaultEventAction: "stopEvent"
            }
            ]
        });
        keyMap.enable();
        // 实现tabpanel的切换  
        function handleCtrlTab(me, isToRight) {
            var targetTabPanel = me.getView().down('[selftype=drgsapi_report_tab]');
            var curTab = targetTabPanel.getActiveTab();
            var curIndex = targetTabPanel.items.indexOf(curTab);
            var nextTabIndex;
            var itemSize = targetTabPanel.items.length;
            if (isToRight) {
                nextTabIndex = curIndex + 1;
                if (nextTabIndex >= itemSize) {
                    nextTabIndex = 0;
                }
            } else {
                nextTabIndex = curIndex - 1;
                if (nextTabIndex <= -1) {
                    nextTabIndex = itemSize - 1;
                }
            }
            targetTabPanel.setActiveTab(nextTabIndex);
            console.dir(targetTabPanel.getActiveTab());
            if (targetTabPanel.getActiveTab().xtype === 'drgsapi_report_medical_medicalform'
                || targetTabPanel.getActiveTab().xtype === 'drgsapi_report_hospitaldischarge_HospitaldischargeForm') {
                targetTabPanel.getActiveTab().items.items[0].focus();
            }
            //if (targetTabPanel.getActiveTab().itemId && targetTabPanel.getActiveTab().itemId === 'operationTab') {//存在itemId手术tab页面
            //   // targetTabPanel.getActiveTab().items.items[0].items.items[0].focus();

            //} else {
            //targetTabPanel.getActiveTab().items.items[0].focus();
            //}
        }
    },
    tab: function () {
        var me = this;
        var tabPanel = me.getView().down('[selftype=drgsapi_report_tab]');
        if (tabPanel.getActiveTab().xtype === 'drgsapi_report_hospitaldischarge_HospitaldischargeForm') {
            tabPanel.getActiveTab().items.items[0].focus();
        } else if (tabPanel.getActiveTab().xtype === 'drgsapi_report_medical_medicalform') {
            tabPanel.getActiveTab().items.items[0].items.items[0].focus();
        }
    }
});