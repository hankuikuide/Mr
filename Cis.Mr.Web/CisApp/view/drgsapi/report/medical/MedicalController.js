/* ***********************************************
 * author :  localadmin
 * function: 
 * history:  created by localadmin 2016/4/18 10:53:03 
 * ***********************************************/
Ext.define('CisApp.view.drgsapi.report.medical.MedicalController', {
    extend: 'Fm.base.GridController',
    alias: 'controller.drgsapi_medical',
    requires: [
        'CisApp.view.drgsapi.report.medical.log.MedicalLog'
    ],
    //选择结算数据
    selectItem: function () {
        var me = this,
           vm = me.getViewModel(),
           store = vm.getStore('gridstore'),
           form = this.getView().up("drgsapi_report").down('drgsapi_report_medical_medicalform'),
           record = vm.get('focus');
        if (record.get('IsUpload') == '-1') {
            vm.set('uploadDelete', null);
            vm.set('valid', null);
            var getData = Ext.create("CisApp.model.drgsapi.report.Medical");
            getData.set(record.data);
            var vmform = form.getViewModel();
            //form.resetAll();//双击清空数据问题所在
            vmform.set('medical', getData);
            //提交
            vmform.get('medical').commit();
            this.refreshInfoByClear();
        } else {
            if (record.get('IsUpload') == '0') {
                vm.set('uploadDelete', '');
                vm.set('valid', null);
            } else if (record.get('IsUpload') == '1') {
                vm.set('uploadDelete', null);
                vm.set('valid', '');
            } else {
                vm.set('uploadDelete', null);
                vm.set('valid', null);
            }
           // this.refreshInfo();
           // document.getElementById('start_layer_2').style.display = 'block';
            //Ext.Ajax.request({
            //    url: '/group/Medical/GetAllMedical',
            //    method: 'post',
            //    params: { sParam: Ext.util.JSON.encode({ AId: record.get('AId'), HospitalId: record.get('HospitalId') }) },
            //    success: function (res) {
            //        var resText = Ext.util.JSON.decode(res.responseText);
            //        if (resText.StatusCode === 0) {
            //            var getData = Ext.create("CisApp.model.drgsapi.report.Medical");
            //            getData.set(resText.Result[0]);
            //            var vmform = me.getView().up("drgsapi_report").down('drgsapi_report_medical_medicalform').getViewModel();
            //            vmform.set('medical', getData);
            //            vmform.get('medical').commit();
            //        }
            //        document.getElementById('start_layer_2').style.display = 'none';
            //    }
            //});
        }
        var vmformh = me.getView().up("drgsapi_report").down('drgsapi_report_hospitaldischarge_HospitaldischargeForm').getViewModel(),
            operationdetailVm = me.getView().up("drgsapi_report").down('drgsapi_report_operationdetail').getViewModel();
        if (record.get('LId') == '-1') {
            vmformh.set('hostpitaldischarge', Ext.create("CisApp.model.drgsapi.report.HostpitalDischarge"));
        } else {
            //Ext.Ajax.request({
            //    url: '/group/LeaveHospital/GetLeaveHospital',
            //    method: 'post',
            //    params: { sParam: Ext.util.JSON.encode({ MedicalId: record.get('AId') }) },
            //    success: function (res) {
            //        var resText = Ext.util.JSON.decode(res.responseText);
            //        if (resText.StatusCode === 0) {
            //            var getData = Ext.create("CisApp.model.drgsapi.report.HostpitalDischarge");
            //            getData.set(resText.Result[0]);
            //            vmformh.set('hostpitaldischarge', getData);
            //            vmformh.get('hostpitaldischarge').commit();
            //        }
            //    }
            //});
        }
        var vmformhData = Ext.create("CisApp.model.drgsapi.report.Medical");
        vmformhData.set(record.data);
        vmformh.set('billRecord', vmformhData);//billRecord
        operationdetailVm.set('medicalRecord', record);//medicalRecord
        me.getView().up('drgsapi_report').getController().tab();
    },
    getRefreshParams: function () {
        var me = this,
           vm = me.getViewModel();
        vm.set('uploadDelete', null);
        vm.set('valid', null);
       // document.getElementById('start_layer_2').style.display = 'block';
        var vmform = this.getView().up("drgsapi_report").down('drgsapi_report_medical_medicalform').getViewModel();
        vmform.set('medical', Ext.create("CisApp.model.drgsapi.report.Medical"));
        var lform = this.getView().up("drgsapi_report").down('drgsapi_report_hospitaldischarge_HospitaldischargeForm').getViewModel();
        lform.set('hostpitaldischarge', Ext.create("CisApp.model.drgsapi.report.HostpitalDischarge"));

        this.refreshInfoByClear();
        var me = this,
            view = me.getView(),
            viemController = view.getController(),
            store = view.getView().getStore(),
            seachData = me.getView().up("drgsapi_report").down('drgsapi_report_medical_medicalseach').getViewModel().data.seachData.data;
        return seachData;
    },
    beforeload: function () {
      //  document.getElementById('start_layer_2').style.display = 'block';
    },
    dataLoaded: function () {
        var me = this,
               vm = me.getViewModel();
        vm.set('uploadDelete', null);
        vm.set('valid', null);
        me.refreshInfoByClear();
        me.clearMedicalAndLeval();
       // document.getElementById('start_layer_2').style.display = 'none';

        var row = me.getView().getView().getRow(0);
        if (row) {
            row.childNodes[1].click();
        }
    },
    queryByMedical: function () {
        this.refreshInfoByClear();
        var me = this,
            view = me.getView(),
            store = view.getView().getStore(),
            seachData = me.getView().getViewModel().data.seachData.data;
        seachData.HospitalId = Fm.Server.CurrentUser.OrgId;
        store.load({ params: { sParam: Ext.util.JSON.encode(seachData) } });
    },
    //删除填报信息
    toDelete: function () {
        var me = this,
            view = me.getView(),
            vm = me.getView().getViewModel(),
            store = view.getStore(),
            medicalform = me.getView().up("drgsapi_report").down('drgsapi_report_medical_medicalform'),
            seachData = me.getView().up("drgsapi_report").down('drgsapi_report_medical_medicalseach').getViewModel().data.seachData.data,
            record = me.getViewModel().get('focus');
        if (record == null) {
            Fm.msg.info('请选择数据');
            return;
        }
        if (record.get('IsUpload') != '0') {
            Fm.msg.info('删除失败，请选择填报中的数据进行删除');
            return;
        }
        Ext.Msg.confirm('提示', '请确认是否删除填报信息！', function (choice) {
            if (choice === 'yes') {
                document.getElementById('start_layer_2').style.display = 'block';
                me.refreshInfoByClear();
                Ext.Ajax.request({
                    url: '/group/Medical/DeletedMedicalById',//DeletedMedical//DeletedMedicalById
                    method: 'post',
                    params: { dTraddeParam: Ext.util.JSON.encode({ IsUpload: record.get('IsUpload'), AId: record.get('AId') }) },
                    callback: function (req, sta, res) {
                        var resText = Ext.util.JSON.decode(res.responseText);
                        if (sta && resText.StatusCode === 0) {
                            vm.set('uploadDelete', null);
                            vm.set('valid', null);
                            Fm.msg.info('删除成功');
                            record.set('IsUpload', '-1');
                            record.set('LId', '-1');
                            record.commit();
                            me.refreshInfoByClear();
                            me.clearMedicalAndLeval();
                            var vmform = medicalform.getViewModel();
                            medicalform.down('shared_doctorcombo').reset();
                            medicalform.down('shared_diagnosiscombo').reset();//shared_diagnosiscombo
                            var getData = Ext.create("CisApp.model.drgsapi.report.Medical");
                            getData.set(record.data);
                            vmform.set('medical', getData);
                        }
                        document.getElementById('start_layer_2').style.display = 'none';
                    }
                });
            }
        });
    },
    //上传完成填报信息
    toUpLoad: function () {
        var me = this,
            view = me.getView(),
            vm = me.getView().getViewModel(),
            store = view.getStore(),
            seachData = me.getView().up("drgsapi_report").down('drgsapi_report_medical_medicalseach').getViewModel().data.seachData.data,
            record = me.getViewModel().get('focus');
        if (record == null) {
            Fm.msg.info('请选择数据');
            return;
        }
        if (record.get('IsUpload') != '0') {
            Fm.msg.info('操作失败，请选择填报中的数据进行删除');
            return;
        }
        document.getElementById('start_layer_2').style.display = 'block';
        Ext.Ajax.request({
            url: '/group/Medical/ValidateLeavaHosptial',
            method: 'post',
            params: { AId: record.get('AId') },
            callback: function (req, sta, res) {
                document.getElementById('start_layer_2').style.display = 'none';
                var resText = Ext.util.JSON.decode(res.responseText);
                if (sta && resText.StatusCode === 0) {
                    Ext.Msg.confirm('提示', '填报完成后无法修改此病案信息和添加此病案的明细单！你是否继续进行操作？', function (choice) {
                        if (choice === 'yes') {
                            document.getElementById('start_layer_2').style.display = 'block';
                            me.refreshInfoByClear();
                            Ext.Ajax.request({
                                url: '/group/Medical/UpdateMedicalByUpload',
                                method: 'post',
                                params: { uParams: Ext.util.JSON.encode([{ AId: record.get('AId') }]) },
                                callback: function (req, sta, res) {
                                    var resText = Ext.util.JSON.decode(res.responseText);
                                    if (sta && resText.StatusCode === 0) {
                                        vm.set('uploadDelete', null);
                                        vm.set('valid', '');
                                        Fm.msg.info('填报完成');
                                        record.set('IsUpload', '1');
                                        record.commit();
                                        me.refreshInfo();
                                    }
                                    document.getElementById('start_layer_2').style.display = 'none';
                                }
                            });
                        }
                    });
                }
            }
        });

    },
    //作废填报信息
    toValid: function () {
        //this.refreshInfoByClear();
        var me = this,
            view = me.getView(),
            vm = me.getView().getViewModel(),
            store = view.getStore(),
            form = me.getView().up("drgsapi_report").down('drgsapi_report_medical_medicalseach'),
            medicalform = me.getView().up("drgsapi_report").down('drgsapi_report_medical_medicalform'),
            seachData = form.getViewModel().data.seachData.data,
            record = me.getViewModel().get('focus');
        if (record == null) {
            Fm.msg.info('请选择数据');
            return;
        }
        if (record.get('IsUpload') != '1') {
            Fm.msg.info('作废失败，请选择填报完成的数据进行作废');
            return;
        }
        Ext.Msg.confirm('提示', '此条病案主页即将作废，同时关联的信息也将作废，你是否继续进行操作？', function (choice) {
            if (choice === 'yes') {
                document.getElementById('start_layer_2').style.display = 'block';
                me.refreshInfoByClear();
                Ext.Ajax.request({
                    url: '/group/Medical/UpdateMedicalByValid',
                    method: 'post',
                    params: { uParams: Ext.util.JSON.encode([{ AId: record.get('AId'), Operator: Fm.Server.CurrentUser.Code, OperatingDate: new Date() }]) },
                    callback: function (req, sta, res) {
                        var resText = Ext.util.JSON.decode(res.responseText);
                        if (sta && resText.StatusCode === 0) {
                            Fm.msg.info('作废成功');
                            record.set('IsUpload', '-1');
                            record.set('LId', '-1');
                            record.commit();
                            vm.set('uploadDelete', null);
                            vm.set('valid', null);
                            me.refreshInfoByClear();
                            me.clearMedicalAndLeval();
                            var vmform = medicalform.getViewModel();
                            medicalform.down('shared_doctorcombo').reset();//shared_diagnosiscombo
                            medicalform.down('shared_diagnosiscombo').reset();//shared_diagnosiscombo 
                            var getData = Ext.create("CisApp.model.drgsapi.report.Medical");
                            getData.set(record.data);
                            vmform.set('medical', getData);

                        }
                        document.getElementById('start_layer_2').style.display = 'none';
                    }
                });
            }
        });
    },
    //批量作废填报信息
    toBatchValid: function () {
        //this.refreshInfoByClear();
        var me = this,
            view = me.getView(),
            vm = me.getView().getViewModel(),
            store = view.getStore(),
            form = me.getView().up("drgsapi_report").down('drgsapi_report_medical_medicalseach'),
            medicalform = me.getView().up("drgsapi_report").down('drgsapi_report_medical_medicalform'),
            seachData = form.getViewModel().data.seachData.data,
            record = me.getViewModel().get('focus'),
            selectedRecodrs = me.getViewModel().get('selectionFocus'),
            toDoRecords = [],
            uParams = [];

        if (selectedRecodrs == null) { // 需要选中结算单据
            Fm.msg.info('请选择【填报完成】的单据进行操作');
            return;
        }

        Ext.Array.forEach(selectedRecodrs, function (item) {
            if (item.get('IsUpload') === '1') {
                toDoRecords.push(item);
                uParams.push({ AId: item.get('AId'), Operator: Fm.Server.CurrentUser.Code, OperatingDate: new Date() });
            }
        });


        if (toDoRecords.length == 0) {//选中的计算单据必须包含 填报完成的单据
            Fm.msg.info('请选择【填报完成】的单据进行操作');
            return;
        } else {
            Ext.Msg.confirm('提示', '确认对选中单据中【填报完成】的病案进行作废操作？', function (choice) {
                if (choice === 'yes') {//确认向下
                    document.getElementById('start_layer_2').style.display = 'block';
                    me.refreshInfoByClear();
                    Ext.Ajax.request({
                        url: '/group/Medical/UpdateMedicalByValid',
                        method: 'post',
                        params: { uParams: Ext.util.JSON.encode(uParams) },
                        callback: function (req, sta, res) {
                            var resText = Ext.util.JSON.decode(res.responseText);
                            if (sta && resText.StatusCode === 0) {
                                Fm.msg.info(resText.Result);
                                me.refreshByParams({ params: seachData });
                            }
                            document.getElementById('start_layer_2').style.display = 'none';
                        }
                    });
                }
            });
        }
    },
    //清空所有明细单，主单去清空
    refreshInfoByClear: function () {
        var topview = this.getView().up("drgsapi_report"),
            operation = topview.down('drgsapi_report_operation'),
            checkView = topview.down("CisApp_drgsapi_report_check");
        operation.getController().clearStore();
        checkView.getController().clearStore();
    },
    //清空病案和出院小结
    clearMedicalAndLeval: function () {
        var vmformM = this.getView().up("drgsapi_report").down('drgsapi_report_medical_medicalform').getViewModel();
        vmformM.set('medical', Ext.create("CisApp.model.drgsapi.report.Medical"));
        var vmformL = this.getView().up("drgsapi_report").down('drgsapi_report_hospitaldischarge_HospitaldischargeForm').getViewModel();
        vmformL.set('hostpitaldischarge', Ext.create("CisApp.model.drgsapi.report.HostpitalDischarge"));
    },
    //刷新所有明细单
    refreshInfo: function () {
        var me = this,
       vm = me.getViewModel(),
       focus = vm.get('focus'),
       topview = this.getView().up("drgsapi_report"),
          operation = topview.down('drgsapi_report_operation'),
            operationVm = operation.getViewModel().set('medicalRecord', focus)
        checkView = topview.down("CisApp_drgsapi_report_check"),
        checkViewVm = checkView.getViewModel().set('medicalRecord', focus);
        operation.getController().refresh();
        checkView.getController().refresh();
    },
    griditemkeydown: function (me, record, item, index, e, eOpts) {
        if (e.getKey() == Ext.event.Event.ENTER) {
            var me = this;
            var view = me.getView();
            view.setSelection(record);
            //me.select();
            item.click();
        }
    },
    //批量填报完成
    toBatchUpLoad: function () {
        var me = this,
            seachData = me.getView().up("drgsapi_report").down('drgsapi_report_medical_medicalseach').getViewModel().data.seachData.data,
            record = me.getViewModel().get('selectionFocus'),
            uParams = [];
        if (record === null) {
            Fm.msg.info('请选择【填报中】单据进行操作');
            return;
        }
        Ext.Array.forEach(record, function (item) {
            if (item.get('IsUpload') === '0') {
                uParams.push({ AId: item.get('AId') });
            }
        });
        if (uParams.length === 0) {
            Fm.msg.info('请选择【填报中】单据进行操作');
            return;
        }
        Ext.Msg.confirm('提示', '填报完成后无法修改病案信息和添加病案的明细单！你是否继续进行操作？', function (choice) {
            if (choice === 'yes') {
                document.getElementById('start_layer_2').style.display = 'block';
                me.refreshInfoByClear();
                Ext.Ajax.request({
                    url: '/group/Medical/BatchUpdateMedicalByUpload',
                    method: 'post',
                    params: { uParams: Ext.util.JSON.encode(uParams) },
                    callback: function (req, sta, res) {
                        var resText = Ext.util.JSON.decode(res.responseText);
                        if (sta && resText.StatusCode === 0) {
                            Fm.msg.info(resText.Result);
                            me.refreshByParams({ params: seachData });
                        }
                        document.getElementById('start_layer_2').style.display = 'none';
                    }
                });
            }
        });
    },
    //批量删除
    toBatchDelete: function () {
        var me = this,
            seachData = me.getView().up("drgsapi_report").down('drgsapi_report_medical_medicalseach').getViewModel().data.seachData.data,
            record = me.getViewModel().get('selectionFocus'),
            params = [];
        if (record === null) {
            Fm.msg.info('请选择【填报中】单据进行操作');
            return;
        }
        Ext.Array.forEach(record, function (item) {
            if (item.get('IsUpload') === '0') {
                params.push({ AId: item.get('AId') });
            }
        });
        if (params.length === 0) {
            Fm.msg.info('请选择【填报中】单据进行操作');
            return;
        }
        Ext.Msg.confirm('提示', '请确认是否删除填报信息！', function (choice) {
            if (choice === 'yes') {
                document.getElementById('start_layer_2').style.display = 'block';
                me.refreshInfoByClear();
                Ext.Ajax.request({
                    url: '/group/Medical/BatchDeletedMedicalById',
                    method: 'post',
                    params: { dTraddeParam: Ext.util.JSON.encode(params) },
                    callback: function (req, sta, res) {
                        var resText = Ext.util.JSON.decode(res.responseText);
                        if (sta && resText.StatusCode === 0) {
                            Fm.msg.info(resText.Result);
                            me.refreshByParams({ params: seachData });
                        }
                        document.getElementById('start_layer_2').style.display = 'none';
                    }
                });
            }
        });
    },
    showRemarkContent: function (col, event) {
        var record = col.getWidgetRecord(),
            me = this;
        if (record.get('DataValidateRemark') == '' || record.get('DataValidateRemark') == null) {
            return;
        }
        Ext.create('CisApp.view.shared.richbox.RichBox', {
            content: record.get('DataValidateRemark'),//详细信息
            isReadOnly: true,
            isApi: true
        }).show();
    },
    //显示操作记录
    showOperRecord: function (col, event) {
        debugger
        var record = this.getViewModel().get('focus');
        var isUpload = record.getData().IsUpload;
        if (record == null || isUpload.trim() === '' || isUpload === '-1') {
            Fm.msg.info('请选择【填报中】或【填报完成】单据进行操作');
            return;
        }
        //var record = col.getWidgetRecord(),
        aId = record.getData().AId;
        var win = Ext.create('Ext.window.Window', {
            title: '操作日志',
            resizable: false,
            modal: true,
            width: 650,
            height: 520,
            layout: 'fit',
            items: {
                xtype: 'drgsapi_report_medical_log',
                webLogParams: { aId: aId }
            }
        });

        win.show();
        //Ext.Ajax.request({
        //    url: '/group/WebLog/GetMedicalLog',
        //    method: 'post',
        //    params: { aId: "" },
        //    success: function (res) {
        //        debugger;
        //        var resText = Ext.util.JSON.decode(res.responseText);
        //        if (resText.StatusCode === 0) {

        //            var win = Ext.create('Ext.window.Window', {
        //                title: '操作日志',
        //                resizable: false,
        //                modal: true,
        //                width: 350,
        //                height: 320,
        //                layout: 'fit',
        //                items: {
        //                    xtype: 'drgsapi_report_medical_log',
        //                    webLogParams: { aId: "" }
        //                }
        //            });

        //            win.show();

        //        }
        //    }
        //});

        //Ext.create('CisApp.view.shared.richbox.RichBox', {
        //    content: "操作记录",//详细信息
        //    isReadOnly: true,
        //    isApi: true
        //}).show();
    }

});