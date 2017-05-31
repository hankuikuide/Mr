/* ***********************************************
 * author :  likeyi
 * function: 
 * history:  created by likeyi 2016/7/1 11:12:48 
 * ***********************************************/
Ext.define('CisApp.view.drgsapi.report.hospitaldischarge.HospitaldischargeForm.HospitaldischargeFormController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.drgsapi_report_hospitaldischarge_HospitaldischargeForm',
    close: function () {
        this.getView().up('window').close();
    },
    //添加或修改出院小结信息
    addLeaveHospital: function () {
        if (this.getViewModel().data.enableListener) {
            return false;
        }
        var bill = this.getView().up('drgsapi_report').down('drgsapi_medical').getViewModel().get('focus');
        if (bill == null) {
            Fm.msg.info("请选择结算信息");
            return;
        }
        var isUpload = bill.get('IsUpload');
        var lId = bill.get('LId');
        if (isUpload == '-1') {
            Fm.msg.info("请填写病案信息");
            return;
        } else if (isUpload == '1') {
            Fm.msg.info("病案已填报完成无法修改");
            return;
        }
        var me = this,
            view = me.getView(),
            viewModel = me.getView().getViewModel(),
            record = me.getView().getViewModel().data.hostpitaldischarge;
        var changeValues = record.getChanges();
        if (changeValues) {
            delete changeValues._rowclassclick
        }
        record.data.AId = bill.get('LId');// medicalRecord.get('AId');
        record.data.MedicalId = bill.get('AId');
        record.data.HospitalId = bill.get('HospitalId');
        record.data.PersonalNo = bill.get('PersonalNo');
        record.data.AdmissionNo = bill.get('AdmissionNo');
        record.data.OperId = Fm.Server.CurrentUser.Code;
        document.getElementById('start_layer_2').style.display = 'block';

        if (lId == '-1') {
            Ext.Ajax.request({
                url: '/group/LeaveHospital/AddLeaveHospitalByOne',//AddLeaveHospitalByOne//AddLeaveHospital
                method: 'post',
                params: { iParams: Ext.util.JSON.encode(record.data), webLogParam: Ext.util.JSON.encode({ OperContent: Ext.util.JSON.encode(changeValues) }) },
                success: function (res) {
                    var resText = Ext.util.JSON.decode(res.responseText);
                    if (resText.StatusCode === 0) {
                        Fm.msg.info('添加出院小结成功');
                        bill.set('LId', resText.Result);
                        bill.commit();
                        record.commit();
                    }
                    document.getElementById('start_layer_2').style.display = 'none';
                }
            });

        } else {
            Ext.Ajax.request({
                url: '/group/LeaveHospital/UpdateLeaveHospital',//AddLeaveHospitalByOne//AddLeaveHospital
                method: 'post',
                params: { uParams: Ext.util.JSON.encode([record.data]), webLogParam: Ext.util.JSON.encode({ OperContent: Ext.util.JSON.encode(changeValues) }) },
                success: function (res) {
                    var resText = Ext.util.JSON.decode(res.responseText);
                    if (resText.StatusCode === 0) {
                        Fm.msg.info('修改出院小结成功');
                        record.commit();
                    }
                    document.getElementById('start_layer_2').style.display = 'none';
                }
            });
        }
    },
    //选择起始时间
    selectSDate: function () {
        var startDate = Ext.getCmp('sDate').getValue();
        var endDate = Ext.getCmp('eDate').getValue();
        Ext.getCmp('eDate').setConfig({
            'minValue': startDate
        });
    },
    //选择结束时间
    selectEDate: function () {
        var startDate = Ext.getCmp('sDate').getValue();
        var endDate = Ext.getCmp('eDate').getValue();
        Ext.getCmp('sDate').setConfig({
            'maxValue': endDate
        });
    },
    //键盘事件
    keyMap: function (obj) {
        var me = this;
        var keyMap = new Ext.util.KeyMap({
            target: me.getView().getEl(),
            binding: [{
                key: Ext.event.Event.S,
                ctrl: true,
                fn: function () {
                    //if (me.getView('form').isValid()) {
                    // 此处需要判断是增加还是修改
                    if (me.getView('form').isValid()) {
                        me.addLeaveHospital();
                    }
                },
                defaultEventAction: "stopEvent"
            }]
        });
        keyMap.enable();
    },
    //获取焦点
    activateFocus: function () {
        var me = this;
        me.getView().down('combo[name=DischargeOutcome]').focus();
    },
});