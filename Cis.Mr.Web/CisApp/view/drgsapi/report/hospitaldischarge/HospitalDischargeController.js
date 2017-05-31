/* ***********************************************
 * author :  sunqiang
 * function: 
 * history:  created by sunqiang 2016/4/19 16:44:18 
 * ***********************************************/
Ext.define('CisApp.view.drgsapi.report.hospitaldischarge.HospitalDischargeController', {
    extend: 'Fm.base.GridController',
    alias: 'controller.drgsapi_report_hospitaldischarge',
    requires: [
        'CisApp.view.drgsapi.report.hospitaldischarge.dischargepopup.DischargePopup'
    ],
    getRefreshParams: function () {
        var me = this,
            view = me.getView(),
            vm = me.getViewModel(),
            topView = view.up('drgsapi_report'),
            medicalView = topView.down('drgsapi_medical'),
            topViewData = medicalView.getViewModel().get('clickRecord');
        vm.set('medicalRecord', topViewData);
        return {
            sParam: Ext.util.JSON.encode({
                MedicalId: topViewData.get('AId')
            })
        };
    },
    clearStore: function () {
        var me = this,
            view = me.getView(),
            vm = me.getViewModel();
        view.store.removeAll();
        vm.set('hostpitalDischargeRecord', null);
        vm.set('medicalRecord', null);
    },
    onAdd: function () {
        var me = this,
            vm = me.getViewModel();

        if (!vm.get('medicalRecord')) {
            Fm.msg.error('请选择主页面数据');
            return;
        }
        var medicalRecord = vm.get('medicalRecord');
        var tempModel = Ext.create('CisApp.model.drgsapi.report.HostpitalDischarge', {
            AId: medicalRecord.get('AId'),
            MedicalId: medicalRecord.get('AId'),
            HospitalId: medicalRecord.get('HospitalId'),
            PersonalNo: medicalRecord.get('PersonalNo'),
            AdmissionNo: medicalRecord.get('AdmissionNo'),
            OperId: Fm.Server.CurrentUser.Code
        });
        var windowParams = {
            title: '添加出院小结',
            url: '/group/LeaveHospital/AddLeaveHospital',
            msg: '添加出院小结成功',
            dischargerecord: tempModel,
            params: 'iParams',
            taget: true
        };
        me.windowShow(windowParams);
    },
    onChange: function () {
        var me = this,
            vm = me.getViewModel(),
            medicalRecord = vm.get('medicalRecord');
        if (medicalRecord == null || medicalRecord.get('IsUpload') == '1')
            return false;
        if (!vm.get('hostpitalDischargeRecord')) {
            Fm.msg.error('请选择出院小结数据进行修改');
            return;
        }
        var hostpitalDischargeRecord = vm.get('hostpitalDischargeRecord'),
         medicalRecord = vm.get('medicalRecord');
        var tempModel = Ext.create('CisApp.model.drgsapi.report.HostpitalDischarge', {
            AId: hostpitalDischargeRecord.get('AId'),
            MedicalId: hostpitalDischargeRecord.get('MedicalId'),

            HospitalId: medicalRecord.get('HospitalId'),
            PersonalNo: medicalRecord.get('PersonalNo'),
            AdmissionNo: medicalRecord.get('AdmissionNo'),

            DischargeOutcome: hostpitalDischargeRecord.get('DischargeOutcome'),
            HospitalizationSituation: hostpitalDischargeRecord.get('HospitalizationSituation'),
            DtProcess: hostpitalDischargeRecord.get('DtProcess'),
            LeaveHospitalStatus: hostpitalDischargeRecord.get('LeaveHospitalStatus'),
            LeaveDoctorAdvice: hostpitalDischargeRecord.get('LeaveDoctorAdvice')
        });
        //console.dir(tempModel);

        var windowParams = {
            title: '修改出院小结',
            url: '/group/LeaveHospital/UpdateLeaveHospital',
            msg: '修改出院小结成功',
            dischargerecord: tempModel,
            params: 'uParams',
            taget: false
        };
        me.windowShow(windowParams);
    },
    toDelete: function () {
        var me = this,
                vm = me.getViewModel(),
                record = vm.get('hostpitalDischargeRecord');
        if (!vm.get('hostpitalDischargeRecord')) {
            Fm.msg.error('请选择出院小结数据进行删除');
            return;
        }
        var me = this,
           windowParams = {
               url: '/group/LeaveHospital/DeletedLeaveHospitalById',
               msg: '删除出院小结成功'
           };
        Ext.Msg.confirm('提示', '请确认是否删除此条信息！', function (choice) {
            if (choice === 'yes') {
                Ext.Ajax.request({
                    url: windowParams.url,
                    method: 'post',
                    params: { dParam: Ext.util.JSON.encode({ AId: vm.get('hostpitalDischargeRecord').get('AId') }) },
                    success: function (res) {
                        var resText = Ext.util.JSON.decode(res.responseText);
                        if (resText.StatusCode === 0) {
                            Fm.msg.info(windowParams.msg);
                            me.refresh();
                        } else {
                            Fm.msg.info(resText.Msg);
                        }
                    }
                });
            }
        });
    },
    windowShow: function (windowParams) {
        var me = this;
        var win = Ext.create('Ext.window.Window', {
            title: windowParams.title,
            layout: 'fit',
            isWindow: 'is',
            modal: true,
            resizble: true,
            height: 400,
            width: 400,
            items: [
                {
                    xtype: 'drgsapi_report_hospitaldischarge_dischargepopup',
                    medicalRecord: windowParams.dischargerecord,
                    taget: windowParams.taget,
                    callBack: function (record) {
                        var tempparams = {};
                        tempparams[windowParams.params] = Ext.util.JSON.encode([record.data]);
                        Ext.Ajax.request({
                            url: windowParams.url,
                            method: 'post',
                            params: tempparams,
                            success: function (res) {
                                var resText = Ext.util.JSON.decode(res.responseText);
                                if (resText.StatusCode === 0) {
                                    Fm.msg.info(windowParams.msg);
                                    me.refresh();
                                    win.close();
                                } else {
                                    Fm.msg.info(resText.Msg);
                                }
                            }
                        });
                    }
                }
            ]
        });
        win.show();
    }
});