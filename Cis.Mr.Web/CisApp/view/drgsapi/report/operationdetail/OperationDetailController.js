/* ***********************************************
 * author :  sunqiang
 * function: 手术详细界面
 * history:  created by sunqiang 2016/6/21 15:12:57 
 * ***********************************************/
Ext.define('CisApp.view.drgsapi.report.operationdetail.OperationDetailController', {
    extend: 'Fm.base.GridController',
    alias: 'controller.drgsapi_report_operationdetail',
    requires: [
        'CisApp.view.drgsapi.report.operationdetail.operationdetailoper.OperationDetailOper'
    ],
    getRefreshParams: function () {
        var me = this,
           view = me.getView(),
           vm = me.getViewModel(),
           medicalRecord = vm.get('medicalRecord');
        operationRecord = vm.get('operation');
        if (medicalRecord != null && operationRecord != null) {
            return {
                sParam: Ext.util.JSON.encode({
                    OperationId: operationRecord.get('AId')
                })
            };
        }
        return false;
    },
    clearStore: function () {
        var me = this,
           view = me.getView(),
        vm = me.getViewModel();
        view.store.removeAll();
        vm.set('operation', null);
    },
    //添加手术明细
    addOperationDetail: function () {
        var me = this,
               vm = me.getViewModel(),
               medicalRecord = vm.get('medicalRecord'),
               store = vm.getStore('gridstore'),
               operation = vm.get('operation'),
               record = Ext.create('CisApp.model.drgsapi.report.OperationDetail', {
                   AdmissionNo: medicalRecord.get('AdmissionNo'),
                   HospitalId: medicalRecord.get('HospitalId'),
                   PersonalNo: medicalRecord.get('PersonalNo'),
                   OperationId: operation.get('AId'),
                   OperationRecordNo: operation.get('OperationRecordNo'),
                   OperId: Fm.Server.CurrentUser.Code
               });

        var win = Ext.create('Ext.window.Window', {
            title: '添加手术明细',
            resizable: false,
            modal: true,
            width: 350,
            height: 320,
            layout: 'fit',
            items: {
                xtype: 'drgsapi_report_operationdetail_operationdetailoper',
                paramModel: record,
                callBack: function () {

                    var changeValues = record.getChanges();
                    if (changeValues) {
                        delete changeValues._rowclassclick
                    }

                    Ext.Ajax.request({
                        url: '/group/operationdetail/AddOperationdetail',
                        method: 'post',
                        params: { iParams: Ext.util.JSON.encode(record.data), webLogParam: Ext.util.JSON.encode({ OperContent: Ext.util.JSON.encode(changeValues) }) },
                        success: function (res) {
                            var resText = Ext.util.JSON.decode(res.responseText);
                            if (resText.StatusCode === 0) {
                                record.set('AId', resText.Result);
                                store.add(record);
                                record.commit();
                                Fm.msg.info('添加手术明细信息成功');
                                win.close();
                            }
                        }
                    });
                }
            }
        });
        win.show();
    },
    //修改手术明细
    modifyOperationDetail: function () {
        var me = this,
            vm = me.getViewModel(),
            medicalRecord = vm.get('medicalRecord');
        if (medicalRecord == null || medicalRecord.get('IsUpload') == '1') {
            return false;
        }
        if (me.getViewModel().data.enableListener) {
            return false;
        }
        var store = vm.getStore('gridstore'),
            record = vm.get('focus'),
            win = Ext.create('Ext.window.Window', {
                title: '修改手术明细',
                resizable: false,
                modal: true,
                width: 350,
                height: 320,
                layout: 'fit',
                listeners: {
                    beforeclose: function () {
                        store.rejectChanges();
                        record.commit();
                    }
                },
                items: {
                    xtype: 'drgsapi_report_operationdetail_operationdetailoper',
                    paramModel: record,
                    callBack: function () {
                        if (record.data.DiagnosePosition === null) {
                            record.set('DiagnosePosition', '');
                        }
                        var changeValues = record.getChanges();
                        if (changeValues) {
                            delete changeValues._rowclassclick
                        }
                        Ext.Ajax.request({
                            url: '/group/operationdetail/UpdateOperationdetail',
                            method: 'post',
                            params: {
                                uParams: Ext.util.JSON.encode([record.data]),
                                webLogParam: Ext.util.JSON.encode({ OperContent: Ext.util.JSON.encode(changeValues) })
                            },
                            success: function (res) {
                                var resText = Ext.util.JSON.decode(res.responseText);
                                if (resText.StatusCode === 0) {
                                    Fm.msg.info('修改手术信息成功');
                                   // record.commit();
                                    win.close();
                                }
                            }
                        });
                    }
                }
            });
        win.show();
    },
    //删除手术明细
    deleteOperationDetail: function () {
        var me = this,
            view = me.getView(),
            vm = me.getViewModel(),
            store = view.getStore(),
            record = me.getViewModel().get('focus'),
            medicalRecord = vm.get('medicalRecord');
        Ext.Msg.confirm('提示', '请确认是否删除此条信息！', function (choice) {
            if (choice === 'yes') {
                var changeValues = record.getChanges();
                if (changeValues) {
                    delete changeValues._rowclassclick
                }
                Ext.Ajax.request({
                    url: '/group/operationdetail/DeletedOperationdetailById',
                    method: 'post',
                    params: { dParam: Ext.util.JSON.encode({ AId: record.get('AId') })},
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
    griditemkeydown: function (me, record, item, index, e, eOpts) {
        if (e.getKey() == Ext.event.Event.ENTER) {
            var me = this;
            var view = me.getView();
            view.setSelection(record);
            item.click();
        }
    }
});