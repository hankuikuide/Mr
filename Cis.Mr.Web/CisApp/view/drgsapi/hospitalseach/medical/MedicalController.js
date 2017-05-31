/* ***********************************************
 * author :  likeyi
 * function: 无结算查询
 * history:  created by likeyi 2016/8/27 10:42:28 
 * ***********************************************/
Ext.define('CisApp.view.drgsapi.hospitalseach.medical.MedicalController', {
    extend: 'Fm.base.GridController',
    alias: 'controller.CisApp_drgsapi_hospitalseach_medical',
    //选择无结算病案
    selectItem: function () {
        var me = this,
           vm = me.getViewModel(),
           store = vm.getStore('gridstore'),
           record = vm.get('focus');
        this.clearMedicalAndLeval();
        var vmformh = me.getView().up("CisApp_drgsapi_hospitalseach").down('drgsapi_report_hospitaldischarge_HospitaldischargeForm').getViewModel(),
            operationVm = me.getView().up("CisApp_drgsapi_hospitalseach").down('drgsapi_report_operation').getViewModel();
        Ext.Ajax.request({
            url: '/group/LeaveHospital/GetLeaveHospital',
            method: 'post',
            params: { sParam: Ext.util.JSON.encode({ MedicalId: record.get('AId') }) },
            success: function (res) {
                var resText = Ext.util.JSON.decode(res.responseText);
                if (resText.StatusCode === 0) {
                    if (resText.Result.length === 0) {
                        vmformh.set('hostpitaldischarge', Ext.create("CisApp.model.drgsapi.report.HostpitalDischarge"));
                    } else {
                        var getData = Ext.create("CisApp.model.drgsapi.report.HostpitalDischarge");
                        getData.set(resText.Result[0]);
                        getData.set('DischargeOutcome', CisApp.Common.Util.dataCodeToTextRender(CisApp.Server.Datas.EnumDischargeOutcome)(getData.get('DischargeOutcome')));
                        vmformh.set('hostpitaldischarge', getData);
                    }
                }
            }
        });
        var vmformhData = Ext.create("CisApp.model.drgsapi.report.Medical");
        vmformhData.set(record.data);
        vmformh.set('billRecord', vmformhData);
        operationVm.set('medicalRecord', record);
        me.getView().up('CisApp_drgsapi_hospitalseach').getController().tab();
        this.refreshInfo();
    },
    getRefreshParams: function () {
        this.refreshInfoByClear();
        this.clearMedicalAndLeval();
        var me = this,
            view = me.getView(),
            viemController = view.getController(),
            store = view.getView().getStore(),
            seachData = me.getView().up("CisApp_drgsapi_hospitalseach").down('CisApp_drgsapi_hospitalseach_medical_medicalseach').getViewModel().data.seachData.data;
        return seachData;
    },
    beforeDataload: function () {
        document.getElementById('start_layer_2').style.display = 'block';
    },
    dataLoaded: function () {
        document.getElementById('start_layer_2').style.display = 'none';
    },
    //清空所有明细单，主单去清空
    refreshInfoByClear: function () {
        var topview = this.getView().up("CisApp_drgsapi_hospitalseach"),
            operation = topview.down('drgsapi_report_operation'),
            checkView = topview.down("CisApp_drgsapi_report_check");
        operation.getController().clearStore();
        checkView.getController().clearStore();
    },
    //清空病案和出院小结
    clearMedicalAndLeval: function () {
        var vmformL = this.getView().up("CisApp_drgsapi_hospitalseach").down('drgsapi_report_hospitaldischarge_HospitaldischargeForm').getViewModel();
        vmformL.set('hostpitaldischarge', Ext.create("CisApp.model.drgsapi.report.HostpitalDischarge"));
    },
    //刷新所有明细单
    refreshInfo: function () {
        var me = this,
        vm = me.getViewModel(),
        focus = vm.get('focus'),
        topview = me.getView().up("CisApp_drgsapi_hospitalseach"),
            operation = topview.down('drgsapi_report_operation'),
        checkView = topview.down("CisApp_drgsapi_report_check"),
        checkViewVm = checkView.getViewModel().set('medicalRecord', focus);
        operationdetailVm = me.getView().up("CisApp_drgsapi_hospitalseach").down('drgsapi_report_operationdetail').getViewModel();
        operationdetailVm.set('medicalRecord', focus);
        operation.getController().refresh();
        checkView.getController().refresh();
    },
    //显示验证信息
    showRemarkContent: function (col, event) {
        var record = col.getWidgetRecord(),
            me = this;
        if (record.get('DataValidateRemark') == '' || record.get('DataValidateRemark') == null) {
            return;
        }
        Ext.create('CisApp.view.shared.richbox.RichBox', {
            content: record.get('DataValidateRemark'),
            isReadOnly: true,
            isApi: true
        }).show();
    },
    //主诉
    showChiefComplaint: function (col, event) {
        var record = col.getWidgetRecord(),
         me = this;
        if (record.get('ChiefComplaint') == '' || record.get('ChiefComplaint') == null) {
            return;
        }
        Ext.create('CisApp.view.shared.richbox.RichBox', {
            content: record.get('ChiefComplaint'),
            isReadOnly: true,
            isApi: true
        }).show();
    },
    //手术史
    showSurgeryHistory: function (col, event) {
        var record = col.getWidgetRecord(),
         me = this;
        if (record.get('SurgeryHistory') == '' || record.get('SurgeryHistory') == null) {
            return;
        }
        Ext.create('CisApp.view.shared.richbox.RichBox', {
            content: record.get('SurgeryHistory'),
            isReadOnly: true,
            isApi: true
        }).show();
    },
    //输血史
    showBloodTransHistory: function (col, event) {
        var record = col.getWidgetRecord(),
         me = this;
        if (record.get('BloodTransHistory') == '' || record.get('BloodTransHistory') == null) {
            return;
        }
        Ext.create('CisApp.view.shared.richbox.RichBox', {
            content: record.get('BloodTransHistory'),
            isReadOnly: true,
            isApi: true
        }).show();
    },
    //现病史
    showMedicalHistory: function (col, event) {
        var record = col.getWidgetRecord(),
         me = this;
        if (record.get('MedicalHistory') == '' || record.get('MedicalHistory') == null) {
            return;
        }
        Ext.create('CisApp.view.shared.richbox.RichBox', {
            content: record.get('MedicalHistory'),
            isReadOnly: true,
            isApi: true
        }).show();
    }
});