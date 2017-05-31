/* ***********************************************
 * author :  李辛
 * function: 
 * history:  created by 李辛 2016/4/18 14:30:54 
 * ***********************************************/
Ext.define('CisApp.view.drgsapi.report.inspection.InspectionController', {
    extend: 'Fm.base.GridController',
    alias: 'controller.drgsapi_inspection',
    requires: [
        'CisApp.view.drgsapi.report.inspection.inspectionoper.InspectionOper'
    ],
    getRefreshParams: function () {
        var me = this,
            view = me.getView(),
            vm = me.getViewModel(),
            topView = view.up('drgsapi_report'),
            medicalView = topView.down('drgsapi_medical'),
            inspectiondetailview = topView.down("drgsapi_report_inspectiondetail"),
            medicalRecord = medicalView.getViewModel().get('clickRecord');
        vm.set('medicalRecord', medicalRecord);
        inspectiondetailview.getController().clearStore();  // 清空检验明细
        if (medicalRecord != null) {
            return {
                gParam: Ext.util.JSON.encode({
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
        topView = view.up('drgsapi_report'),
        inspectiondetailview = topView.down("drgsapi_report_inspectiondetail");
        view.store.removeAll();
        vm.set('medicalRecord', null);
        inspectiondetailview.getController().clearStore();
    },
    //添加
    add: function () {
        var me = this,
               vm = me.getViewModel(),
               medicalRecord = vm.get('medicalRecord'),
               record = Ext.create('CisApp.model.drgsapi.report.Inspection', {
                   MedicalId: medicalRecord.get('AId'), 
                   CheckId: '',
                   OperId: Fm.Server.CurrentUser.Code
               }),
               win = Ext.create('Ext.window.Window', {
                   title: '添加检验单',
                   resizable: false,
                   modal: true,
                   width: 350,
                   height: 400,
                   layout: 'fit',
                   items: {
                       xtype: 'drgsapi_inspection_inspectionoper',
                       paramModel: record,
                       callBack: function () {
                           //record.set('id', medicalRecord.get('Id'));
                           Ext.Ajax.request({
                               url: '/group/Inspection/AddInspection',
                               method: 'post',
                               params: { iParams: Ext.util.JSON.encode([record.data]) },
                               success: function (res) {
                                   var resText = Ext.util.JSON.decode(res.responseText);
                                   if (resText.StatusCode == '0') {
                                       CisApp.msg.info('添加检验单成功！');
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
            medicalRecord = vm.get('medicalRecord');
        if (medicalRecord == null || medicalRecord.get('IsUpload') == '1') {
            return false;
        }
        var win = Ext.create('Ext.window.Window', {
            title: '修改检验单',
            resizable: false,
            modal: true,
            width: 350,
            height: 400,
            layout: 'fit',
            listeners: {
                beforeclose: function () {
                    store.rejectChanges();
                }
            },
            items: {
                xtype: 'drgsapi_inspection_inspectionoper',
                paramModel: record,
                callBack: function () {
                    //record.set('MId', medicalRecord.get('MId')); 
                    record.set('TradeNo', medicalRecord.get('TradeNo'));
                    Ext.Ajax.request({
                        url: '/group/Inspection/UpdateInspection',
                        method: 'post',
                        params: { uParams: Ext.util.JSON.encode([record.data]) },
                        success: function (res) {
                            var resText = Ext.util.JSON.decode(res.responseText);
                            if (resText.StatusCode == '0') {
                                CisApp.msg.info('修改检验单成功！');
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
            record = vm.get('focus');
        Ext.Msg.confirm('提示', '选中检验单及其明细将全部删除！', function (choice) {
            if (choice === 'yes') {
                Ext.Ajax.request({
                    url: '/group/Inspection/DeletedInspectionById',
                    method: 'post',
                    params: { dParam: Ext.util.JSON.encode({ AId: record.get('AId') }) },
                    success: function (res) {
                        var resText = Ext.util.JSON.decode(res.responseText);
                        if (resText.StatusCode == '0') {
                            CisApp.msg.info('选中检验单及其明细删除成功！');
                            me.getController.refresh();
                        }
                        else {
                            CisApp.msg.info(resText.Msg);
                        }
                    }
                });
            }
        });
    },
    select: function () {
        var me = this,
               view = me.getView(),
               vm = view.getViewModel();
        var topview = view.up("drgsapi_report"),
             inspectiondetailview = topview.down("drgsapi_report_inspectiondetail");
        inspectiondetailview.getController().refresh();
    }
});