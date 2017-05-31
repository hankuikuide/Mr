/* ***********************************************
 * author :  likeyi
 * function: 无结算查询
 * history:  created by likeyi 2016/8/27 10:17:34 
 * ***********************************************/
Ext.define('CisApp.view.drgsapi.hospitalseach.HospitalSeachController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.CisApp_drgsapi_hospitalseach',
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
    //alias: 'controller.CisApp_drgsapi_hospitalseach',
    ////South折叠
    //onSouthFold: function () {
    //    var me = this,
    //        view = me.getView(),
    //        tabpanel = view.down('tabpanel[selftype=drgsapi_report_tab]'),
    //        maximize = tabpanel.down('[type=maximize]'),
    //        restore = tabpanel.down('[type=restore]');

    //    var isMaximize = maximize.isHidden();
    //    maximize.setHidden(!isMaximize);
    //    restore.setHidden(isMaximize);

    //    view.foldPanel("s");
    //},
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