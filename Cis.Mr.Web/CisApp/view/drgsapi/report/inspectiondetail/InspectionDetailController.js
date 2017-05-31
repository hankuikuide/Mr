/* ***********************************************
 * author :  李辛
 * function: 
 * history:  created by 李辛 2016/4/20 16:07:16 
 * ***********************************************/
Ext.define('CisApp.view.drgsapi.report.inspectiondetail.InspectionDetailController', {
    extend: 'Fm.base.GridController',
    alias: 'controller.drgsapi_inspectiondetail',
    requires: [
        'CisApp.view.drgsapi.report.inspectiondetail.inspectiondetailoper.InspectiondetailOper'
    ],
    getRefreshParams: function () {
        var me = this,
            view = me.getView(),
            vm = me.getViewModel(),
            topView = view.up('drgsapi_report'),
            medicalView = topView.down('drgsapi_medical'),
            inspectionView = topView.down('drgsapi_inspection'),
            medicalRecord = medicalView.getViewModel().get('clickRecord');
        inspectionRecord = inspectionView.getViewModel().get('clickRecord');
        vm.set('medicalRecord', medicalRecord);
        vm.set('inspectionRecord', inspectionRecord);
        if (medicalRecord != null && inspectionRecord != null) {
            return {
                sParam: Ext.util.JSON.encode({
                    'CheckId': inspectionRecord.get('AId')
                    //, 'MId': medicalRecord.get('MId')

                })
            };
        }
    },
    clearStore: function () {
        var me = this,
           view = me.getView(),
        vm = me.getViewModel();
        view.store.removeAll();
        vm.set('inspectionRecord', null);
    },
    //添加
    add: function () {
        var me = this,
            vm = me.getViewModel(),
            medicalRecord = vm.get('medicalRecord'),
            inspectionRecord = vm.get('inspectionRecord'),
            record = Ext.create('CisApp.model.drgsapi.report.InspectionDetail', { 
                CheckId: inspectionRecord.get('AId'),
                CheckCode: '',
                OperId: Fm.Server.CurrentUser.Code
            }),
            win = Ext.create('Ext.window.Window', {
                title: '添加检验单明细',
                resizable: false,
                modal: true,
                width: 350,
                height: 280,
                layout: 'fit',
                items: {
                    xtype: 'drgsapi_report_inspectiondetail_inspectiondetailoper',
                    paramModel: record,
                    callBack: function () {
                        //record.set('id', medicalRecord.get('Id'));
                        Ext.Ajax.request({
                            url: '/group/InspectionDetail/AddInspectionDetail',
                            method: 'post',
                            params: { iParams: Ext.util.JSON.encode([record.data]) },
                            success: function (res) {
                                var resText = Ext.util.JSON.decode(res.responseText);
                                if (resText.StatusCode == '0') {
                                    CisApp.msg.info('添加检验单明细成功！');
                                    me.refresh();
                                    win.close();
                                }
                                else {
                                    CisApp.msg.info(resText.Msg);
                                }
                            }
                        });
                    }
                }
            });
        win.show();
    },
    //修改
    modify: function () {
        var me = this,
            vm = me.getViewModel(),
            store = vm.getStore('gridstore'),
            record = vm.get('focus'),
            medicalRecord = vm.get('medicalRecord'),
            inspectionRecord = vm.get('inspectionRecord');
        if (medicalRecord == null || medicalRecord.get('IsUpload') == '1') {
            return false;
        }
        var win = Ext.create('Ext.window.Window', {
            title: '修改检验单明细',
            resizable: false,
            modal: true,
            width: 350,
            height: 350,
            layout: 'fit',
            listeners: {
                beforeclose: function () {
                    store.rejectChanges();
                }
            },
            items: {
                xtype: 'drgsapi_report_inspectiondetail_inspectiondetailoper',
                paramModel: record,
                callBack: function () { 
                    //CheckId: inspectionRecord.get('CheckId');
                    Ext.Ajax.request({
                        url: '/group/InspectionDetail/UpdateInspectionDetail',
                        method: 'post',
                        params: { uParams: Ext.util.JSON.encode([record.data]) },
                        success: function (res) {
                            var resText = Ext.util.JSON.decode(res.responseText);
                            if (resText.StatusCode == '0') {
                                CisApp.msg.info('修改检验单明细成功！');
                                me.refresh();
                                win.close();
                            }
                            else {
                                CisApp.msg.info(resText.Msg);
                            }
                        }
                    });
                }
            }
        });
        win.show();
    },
    //删除
    toDelete: function () {
        var me = this,
            view = me.getView(),
            store = view.getStore(),
            vm = me.getViewModel(),
            record = vm.get('focus'),
            medicalRecord = vm.get('medicalRecord'),
            inspectionRecord = vm.get('inspectionRecord');
        Ext.Msg.confirm('提示', '请确认是否删除此条信息！', function (choice) {
            if (choice === 'yes') {
                Ext.Ajax.request({
                    url: '/group/InspectionDetail/DeletedInspectionDetail',
                    method: 'post',
                    params: { dParam: Ext.util.JSON.encode({ AId: record.get('AId') }) },
                    success: function (res) {
                        var resText = Ext.util.JSON.decode(res.responseText);
                        if (resText.StatusCode == '0') {
                            CisApp.msg.info('选中检验单明细删除成功！');
                            me.refresh();
                        }
                        else {
                            CisApp.msg.info(resText.Msg);
                        }
                    }
                });
            }
        });
    }

});