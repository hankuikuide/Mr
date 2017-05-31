/* ***********************************************
 * author :  localadmin
 * function: 手术界面
 * history:  created by localadmin 2016/4/25 15:47:08 
 * ***********************************************/
Ext.define('CisApp.view.drgsapi.report.operation.OperationController', {
    extend: 'Fm.base.GridController',
    alias: 'controller.drgsapi_report_operation',
    requires: [
       'CisApp.view.drgsapi.report.operation.operationoper.OperationOper'
    ],
    getRefreshParams: function () {
        var me = this,
            view = me.getView(),
            vm = me.getViewModel(),
            topView = view.up('CisApp-maintab'),
            //medicalView = topView.down('drgsapi_medical'),
            operationdetail = topView.down("drgsapi_report_operationdetail"),
            medicalRecord = vm.get('medicalRecord');
        operationdetail.getViewModel().set('medicalRecord', medicalRecord);//病案信息传递到手术明细
        operationdetail.getController().clearStore();  // 清空检验明细
        if (medicalRecord == null || medicalRecord.get('AId') == '') {
            view.store.removeAll();
        } else {
            return {
                sParam: Ext.util.JSON.encode({
                    'MedicalId': medicalRecord.get('AId')
                })
            };
        }
    },
    // 清空数据
    clearStore: function () {
        var me = this,
            view = me.getView(),
            vm = me.getViewModel(),
            topView = view.up('CisApp-maintab'),
            operationdetail = topView.down("drgsapi_report_operationdetail");;
        view.store.removeAll();
        vm.set('medicalRecord', null);
        operationdetail.getController().clearStore();
    },
    //添加手术
    addOperation: function () {
        var me = this,
            view = me.getView(),
               vm = me.getViewModel(),
               medicalRecord = vm.get('medicalRecord'),
               store = vm.getStore('gridstore'),
               record = Ext.create('CisApp.model.drgsapi.report.Operation', {
                   AId: medicalRecord.get('AId'),
                   MedicalId: medicalRecord.get('AId'),
                   AdmissionDate: medicalRecord.get('AdmissionDate'),
                   AdmissionNo: medicalRecord.get('AdmissionNo'),
                   DischargeDate: medicalRecord.get('DischargeDate'),
                   OutBedNum: medicalRecord.get('OutBedNum'),
                   OperationId: '',
                   DiagnosePosition: '',
                   OperId: Fm.Server.CurrentUser.Code,
                   PersonalNo: medicalRecord.get('PersonalNo'),
                   HospitalId: medicalRecord.get('HospitalId')
               });
        var view = me.getView(),
            cmp = view.getView(), //Ext.getCmp('drgsapi_report_operation'),
            model = cmp.getSelectionModel();

        var win = Ext.create('Ext.window.Window', {
            title: '添加手术单',
            resizable: false,
            modal: true,
            width: 630,
            height: 400,
            layout: 'fit',
            items: {
                xtype: 'drgsapi_report_operation_operationoper',
                paramModel: record,
                callBack: function () {
                    if (record.get('ComplicationCode') != null && record.get('ComplicationCode') != '') {
                        record.set('IsComplication', '1');
                    } else {
                        record.set('IsComplication', '0');
                    }

                    var changeValues = record.getChanges();
                    if (changeValues) {
                        delete changeValues._rowclassclick
                    }
                    Ext.Ajax.request({
                        url: '/group/operation/AddOperation',
                        method: 'post',
                        params: { iParams: Ext.util.JSON.encode(record.data), webLogParam: Ext.util.JSON.encode({ OperContent: Ext.util.JSON.encode(changeValues) }) },
                        success: function (res) {
                            var resText = Ext.util.JSON.decode(res.responseText);
                            if (resText.StatusCode === 0) {
                                record.set('AId', resText.Result);
                                store.add(record);
                                record.commit();
                                Fm.msg.info('添加手术信息成功');
                                win.close();
                                var index = cmp.getStore().indexOf(record);
                                cmp.getRow(index).childNodes[0].click();
                            }
                        }
                    });
                }
            }
        });
        win.show();
    },
    //修改手术
    modifyOperation: function () {
        var me = this,
            vm = me.getViewModel(),
            medicalRecord = vm.get('medicalRecord');
        if (medicalRecord == null || medicalRecord.get('IsUpload') == '1') {
            return false;
        }
        var view = me.getView(),
            cmp = view.getView(),//Ext.getCmp('drgsapi_report_operation'),
            model = cmp.getSelectionModel();
        if (me.getViewModel().data.enableListener) {
            return false;
        }
        var store = vm.getStore('gridstore'),
            record = vm.get('focus'),
            win = Ext.create('Ext.window.Window', {
                title: '修改手术单',
                resizable: false,
                modal: true,
                width: 630,
                height: 400,
                layout: 'fit',
                listeners: {
                    beforeclose: function () {
                        store.rejectChanges();
                    }
                },
                items: {
                    xtype: 'drgsapi_report_operation_operationoper',
                    paramModel: record,
                    callBack: function () {
                        if (record.get('ComplicationCode') != null && record.get('ComplicationCode') != '') {
                            record.set('IsComplication', '1');
                        } else {
                            record.set('IsComplication', '0');
                        }
                        var changeValues = record.getChanges();
                        if (changeValues) {
                            delete changeValues._rowclassclick
                        }
                        Ext.Ajax.request({
                            url: '/group/operation/UpdateOperation',
                            method: 'post',
                            params: { uParams: Ext.util.JSON.encode([record.data]), webLogParam: Ext.util.JSON.encode({ OperContent: Ext.util.JSON.encode(changeValues) }) },
                            success: function (res) {
                                var resText = Ext.util.JSON.decode(res.responseText);
                                if (resText.StatusCode === 0) {
                                    Fm.msg.info('修改手术信息成功');
                                    var index = cmp.getStore().indexOf(model.getSelection()[0]);
                                    record.commit();
                                    win.close();
                                    cmp.getRow(index).childNodes[0].click();
                                }
                            }
                        });
                    }
                }
            });
        win.show();
    },
    //删除手术
    deleteOperation: function () {
        var me = this,
            view = me.getView(),
            vm = me.getViewModel(),
            store = view.getStore(),
            record = me.getViewModel().get('focus'),
            medicalRecord = vm.get('medicalRecord');
        Ext.Msg.confirm('提示', '请确认是否删除此条信息！', function (choice) {
            if (choice === 'yes') {
                Ext.Ajax.request({
                    url: '/group/operation/DeletedOperationById',
                    method: 'post',
                    params: { dParam: Ext.util.JSON.encode({ AId: record.get('AId') }) },
                    callback: function (req, sta, res) {
                        var resText = Ext.util.JSON.decode(res.responseText);
                        if (sta && resText.StatusCode === 0) {
                            Fm.msg.info('删除成功！');
                            me.refresh();
                        }
                    }
                });
            }
        });
    },
    itemclick: function () {

        var me = this,
           view = me.getView(),
           vm = me.getViewModel(),
           topView = view.up('container'),
           hisView = topView.down('drgsapi_report_operationdetail'),
           hisViewModel = hisView.getViewModel();
        hisViewModel.set('operation', vm.get('clickRecord'));

        hisView.getController().refresh();
    },
    showRemarkContent: function (col, event) {
        var record = col.getWidgetRecord(),
            me = this;
        if (record.get('OperationRecord') == '' || record.get('OperationRecord') == null) {
            return;
        }
        Ext.create('CisApp.view.shared.richbox.RichBox', {
            content: record.get('OperationRecord'),//详细信息
            isReadOnly: true,
            isApi: true
        }).show();
    },

    ///回车
    griditemkeydown: function (me, record, item, index, e, eOpts) {
        if (e.getKey() == Ext.event.Event.ENTER) {
            var me = this;
            var view = me.getView();
            view.setSelection(record);
            item.click();
        }
    },
    dataLoaded: function () {
        var me = this,
           row = me.getView().getView().getRow(0);
        if (row) {
            row.childNodes[0].click();
        }
    }
});