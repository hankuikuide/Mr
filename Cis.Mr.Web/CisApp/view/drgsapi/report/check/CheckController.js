/* ***********************************************
 * author :  localadmin
 * function: 
 * history:  created by localadmin 2016/4/15 14:04:43 
 * ***********************************************/
Ext.define('CisApp.view.drgsapi.report.check.CheckController', {
    extend: 'Fm.base.GridController',
    alias: 'controller.check',
    requires: [
      "CisApp.view.drgsapi.report.check.checkoper.CheckOper"
    ],
    getRefreshParams: function () {
        var me = this,
            view = me.getView(),
            vm = me.getViewModel(),
            medicalRecord = vm.get('medicalRecord');
        if (medicalRecord == null || medicalRecord.get('AId') == '')
            view.store.removeAll();
        else {
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
            vm = me.getViewModel();
        view.store.removeAll();
        vm.set('medicalRecord', null);
    },
    //添加检查单
    addCheck: function () {
        var me = this,
            vm = me.getViewModel(),
            medicalRecord = vm.get('medicalRecord'),
            store = vm.getStore('gridstore'),
            record = Ext.create('CisApp.model.drgsapi.report.Check', {
                MedicalId: medicalRecord.get('AId'),
                CheckId: '',
                OperId: Fm.Server.CurrentUser.Code,
                HospitalId: medicalRecord.get('HospitalId'),
                PersonalNo: medicalRecord.get('PersonalNo'),
                AdmissionNo: medicalRecord.get('AdmissionNo')
            })

        win = Ext.create('Ext.window.Window', {
            title: '添加检查单',
            resizable: false,
            modal: true,
            width: 620,
            height: 470,
            layout: 'fit',
            items: {
                xtype: 'check_checkoper',
                paramModel: record,
                callBack: function () {
                    var changeValues = record.getChanges();
                    if (changeValues) {
                        delete changeValues._rowclassclick
                    }
                    Ext.Ajax.request({
                        url: '/group/Check/AddCheck',
                        method: 'post',
                        params: { iParams: Ext.util.JSON.encode(record.data), webLogParam: Ext.util.JSON.encode({ OperContent: Ext.util.JSON.encode(changeValues) }) },
                        success: function (res) {
                            var resText = Ext.util.JSON.decode(res.responseText);
                            if (resText.StatusCode === 0) {

                                record.set('AId', resText.Result);
                                store.add(record);
                                record.commit();
                                Fm.msg.info('添加检查单成功');
                                win.close();
                            }
                        }
                    });
                }
            }
        });
        win.show();
    },
    //修改检查单
    modifyCheck: function () {
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
                title: '修改检查单',
                resizable: false,
                modal: true,
                width: 620,
                height: 470,
                layout: 'fit',
                listeners: {
                    beforeclose: function () {
                        store.rejectChanges();
                    }
                },
                items: {
                    xtype: 'check_checkoper',
                    paramModel: record,
                    callBack: function () {
                        // record.set('AId', medicalRecord.get('AId'));
                        var changeValues = record.getChanges();
                        if (changeValues) {
                            delete changeValues._rowclassclick
                        }
                        Ext.Ajax.request({
                            url: '/group/Check/UpdateCheck',
                            method: 'post',
                            params: { uParams: Ext.util.JSON.encode([record.data]), webLogParam: Ext.util.JSON.encode({ OperContent: Ext.util.JSON.encode(changeValues) }) },
                            success: function (res) {
                                var resText = Ext.util.JSON.decode(res.responseText);
                                if (resText.StatusCode === 0) {
                                    Fm.msg.info('修改检查单成功');
                                    record.commit();
                                    win.close();
                                } else {
                                    //  Fm.msg.info(resText.Msg);
                                }
                            }
                        });
                    }
                }
            });
        win.show();
    },
    //删除检查单
    deleteCheck: function () {
        var me = this,
            view = me.getView(),
            vm = me.getViewModel(),
            store = view.getStore(),
            record = me.getViewModel().get('focus'),
            medicalRecord = vm.get('medicalRecord');
        Ext.Msg.confirm('提示', '请确认是否删除此条信息！', function (choice) {
            if (choice === 'yes') {
                Ext.Ajax.request({
                    url: '/group/Check/DeletedCheckById',
                    method: 'post',
                    params: { dParam: Ext.util.JSON.encode({ AId: record.get('AId'), CheckId: record.get('CheckId') }) },
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
    //检查结果
    showRemarkContent: function (col, event) {
        var record = col.getWidgetRecord(),
            me = this;
        if (record.get('CheckResult') == '' || record.get('CheckResult') == null) {
            return;
        }
        Ext.create('CisApp.view.shared.richbox.RichBox', {
            content: record.get('CheckResult'),
            isReadOnly: true,
            isApi: true
        }).show();
    },
    //回车按键
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