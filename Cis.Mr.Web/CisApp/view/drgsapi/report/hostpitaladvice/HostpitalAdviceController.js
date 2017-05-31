/* ***********************************************
 * author :  sunqiang
 * function: 
 * history:  created by sunqiang 2016/4/19 13:46:04 
 * ***********************************************/
Ext.define('CisApp.view.drgsapi.report.hostpitaladvice.HostpitalAdviceController', {
    extend: 'Fm.base.GridController',
    alias: 'controller.drgsapi_report_hostpitalAdvice',
    requires: [
       'CisApp.view.drgsapi.report.hostpitaladvice.advicepopup.AdvicePopup'
    ],
    getRefreshParams: function () {
        var me = this,
            view = me.getView(),
            vm = me.getViewModel(),
            topView = view.up('drgsapi_report'),
            medicalView = topView.down('drgsapi_medical');
        vm.set('medicalRecord', medicalView.getViewModel().get('clickRecord')); 
        return {
            sParam: Ext.util.JSON.encode({
                'MedicalId': vm.get('medicalRecord').get('AId')
            })
        };
    },
    clearStore: function () {
        var me = this,
           view = me.getView(),
        vm = me.getViewModel();
        view.store.removeAll();
        vm.set('hospitaladviceRecord', null);
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

        var tempModel = Ext.create('CisApp.model.drgsapi.report.HospitalAdvice', {
            MedicalId: medicalRecord.get('AId'),  
            OutBedNum: '',
            OperId: Fm.Server.CurrentUser.Code
        });
        var windowParams = {
            title: '添加住院医嘱',
            url: '/group/Docadvice/AddDocadvice',
            msg: '添加住院医嘱成功',
            record: tempModel,
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
        if (!vm.get('hospitaladviceRecord')) {
            Fm.msg.error('请选择住院医嘱数据进行修改');
            return;
        }
        var hostpitalDischargeRecord = vm.get('hospitaladviceRecord');
        //console.dir(hostpitalDischargeRecord.get('TradeNo'));
        var tempModel = Ext.create('CisApp.model.drgsapi.report.HospitalAdvice', {
            AId: hostpitalDischargeRecord.get('AId'),
            MedicalId: hostpitalDischargeRecord.get('MedicalId'), 
            StartDepartmentNurse: hostpitalDischargeRecord.get('StartDepartmentNurse'),
            DoctorAdviceNo: hostpitalDischargeRecord.get('DoctorAdviceNo'),
            DoctorAdviceSNo: hostpitalDischargeRecord.get('DoctorAdviceSNo'),
            DoctorAdviceState: hostpitalDischargeRecord.get('DoctorAdviceState'),
            IsLDoctorAdvice: hostpitalDischargeRecord.get('IsLDoctorAdvice'),
            DoctorAdviceType: hostpitalDischargeRecord.get('DoctorAdviceType'),
            DoctorAdviceContent: hostpitalDischargeRecord.get('DoctorAdviceContent'),
            DoctorAdviceCode: hostpitalDischargeRecord.get('DoctorAdviceCode'),
            DrugsMetering: hostpitalDischargeRecord.get('DrugsMetering'),
            MeteringUnit: hostpitalDischargeRecord.get('MeteringUnit'),
            MeteringChannel: hostpitalDischargeRecord.get('MeteringChannel'),
            StartDate: hostpitalDischargeRecord.get('StartDate'),
            EndDate: hostpitalDischargeRecord.get('EndDate'),
            ContinuedDate: hostpitalDischargeRecord.get('ContinuedDate'),
            ContinuedDateUnit: hostpitalDischargeRecord.get('ContinuedDateUnit'),
            Frequency: hostpitalDischargeRecord.get('Frequency'),
            Department: hostpitalDischargeRecord.get('Department'),
            StartDepartmentDoctor: hostpitalDischargeRecord.get('StartDepartmentDoctor'),
            EndDepartmentDoctor: hostpitalDischargeRecord.get('EndDepartmentDoctor'),
            StartDepartmentDoctorName: hostpitalDischargeRecord.get('StartDepartmentDoctorName'),
            EndDepartmentDoctorName: hostpitalDischargeRecord.get('EndDepartmentDoctorName'),
            EndDepartmentNurse: hostpitalDischargeRecord.get('EndDepartmentNurse'),
            StartDoctorAdviceDate: hostpitalDischargeRecord.get('StartDoctorAdviceDate'),
            EndDoctorAdviceDate: hostpitalDischargeRecord.get('EndDoctorAdviceDate')
        });

        var windowParams = {
            title: '修改住院医嘱',
            url: '/group/Docadvice/UpdateDocadvice',
            msg: '修改住院医嘱成功',
            record: tempModel,
            params: 'uParams',
            taget: false
        };
        me.windowShow(windowParams);
    },
    toDelete: function () {
        var me = this,
                vm = me.getViewModel(),
                record = vm.get('hospitaladviceRecord');
        if (!vm.get('hospitaladviceRecord')) {
            Fm.msg.error('请选择住院医嘱数据进行删除');
            return;
        }
        var windowParams = {
               url: '/group/Docadvice/DeletedDocadviceById',
               msg: '删除住院医嘱成功'
        };
        Ext.Msg.confirm('提示', '请确认是否删除此条信息！', function (choice) {
            if (choice === 'yes') {
                Ext.Ajax.request({
                    url: windowParams.url,
                    method: 'post',
                    params: { dParam: Ext.util.JSON.encode({ AId: vm.get('hospitaladviceRecord').get('AId') }) },
                    success: function (res) {
                        var resText = Ext.util.JSON.decode(res.responseText);
                        if (resText.StatusCode === 0) {
                            CisApp.msg.info(windowParams.msg);
                            me.refresh();
                        } else {
                            CisApp.msg.info(resText.Msg);
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
            height: 550,
            width: 400,
            items: [
                {
                    xtype: 'drgsapi_report_hostpitaladvice_advicepopup',
                    medicalRecord: windowParams.record,
                    taget: windowParams.taget,
                    callBack: function (record) {
                        var tempparams = {};
                        tempparams[windowParams.params] = Ext.util.JSON.encode([record.data]);
                        Ext.Ajax.request({
                            url: windowParams.url,
                            method: 'post',
                            params: tempparams, //{ iParams: Ext.util.JSON.encode([record.data]) },
                            success: function (res) {
                                var resText = Ext.util.JSON.decode(res.responseText);
                                if (resText.StatusCode === 0) {
                                    CisApp.msg.info(windowParams.msg);
                                    me.refresh();
                                    win.close();
                                } else {
                                    CisApp.msg.info(resText.Msg);
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