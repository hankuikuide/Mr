/* ***********************************************
 * author :  Vinge
 * function: 
 * history:  created by Vinge 2016/04/21 13:32:25 
 * ***********************************************/
Ext.define('CisApp.view.drgsapi.report.vitalsigns.VitalsignsController', {
    extend: 'Fm.base.GridController',
    alias: 'controller.drgsapi_report_vitalsigns',
    requires: [
        'CisApp.view.drgsapi.report.vitalsigns.vitalsignsoper.VitalsignsOper'
    ],
    getRefreshParams: function () {
        var me = this,
            view = me.getView(),
            vm = me.getViewModel(),
            topView = view.up('drgsapi_report'),
            medicalView = topView.down('drgsapi_medical'),
            medicalRecord = medicalView.getViewModel().get('clickRecord');
        vm.set('medicalRecord', medicalRecord);
        if (medicalRecord == null)
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

    add: function () {

        var me = this,
            vm = me.getViewModel(),
            medicalRecord = vm.get('medicalRecord'),
            store = vm.getStore('gridstore'),
            record = Ext.create('CisApp.model.drgsapi.report.Vitalsigns', {
                MId: medicalRecord.get('MId'),
                MedicalId: medicalRecord.get('AId'),  
                VitalsignsId: '',
                OperId: Fm.Server.CurrentUser.Code
            }),
            win = Ext.create('Ext.window.Window', {
                title: '添加生命体征信息',
                resizable: false,
                modal: true,
                width: 350,
                height: 360,
                layout: 'fit',
                items: {
                    xtype: 'drgsapi_report_vitalsigns_vitalsignsoper',
                    paramModel: record,
                    callBack: function () {
                        //record.set('id', medicalRecord.get('Id'));
                        Ext.Ajax.request({
                            url: '/group/Vitalsigns/AddVitalsigns',
                            method: 'post',
                            params: { iParams: Ext.util.JSON.encode([record.data]) },
                            success: function (res) {
                                var resText = Ext.util.JSON.decode(res.responseText);
                                if (resText.StatusCode == "0") {
                                    CisApp.msg.info('添加生命体征成功');
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
            medicalRecord = vm.get('medicalRecord');
        if (medicalRecord == null || medicalRecord.get('IsUpload') == '1')
            return false;
        var store = vm.getStore('gridstore'),
            record = vm.get('focus');
        var win = Ext.create('Ext.window.Window', {
            title: '修改生命体征',
            resizable: false,
            modal: true,
            width: 350,
            height: 360,
            layout: 'fit',
            listeners: {
                beforeclose: function () {
                    store.rejectChanges();
                }
            },
            items: {
                xtype: 'drgsapi_report_vitalsigns_vitalsignsoper',
                paramModel: record,
                callBack: function () {
                    //record.set('MId', medicalRecord.get('MId'));
                    Ext.Ajax.request({
                        url: '/group/Vitalsigns/UpdateVitalsigns',
                        method: 'post',
                        params: { uParams: Ext.util.JSON.encode([record.data]) },
                        success: function (res) {
                            var resText = Ext.util.JSON.decode(res.responseText);
                            if (resText.StatusCode == "0") {
                                CisApp.msg.info('修改生命体征成功');
                                me.refresh();
                                win.close();
                            } else {
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
            vm = me.getViewModel(),
            store = view.getStore(),
            record = me.getViewModel().get('focus'),
            medicalRecord = vm.get('medicalRecord');
        Ext.Msg.confirm('提示', '请确认是否删除此条信息！', function (choice) {
            if (choice === 'yes') {
                Ext.Ajax.request({
                    url: '/group/Vitalsigns/DeletedVitalsignsById',
                    method: 'post',
                    params: { dParam: Ext.util.JSON.encode({ AId: record.get('AId') }) },
                    callback: function (req, sta, res) {
                        if (sta && res.responseJson.StatusCode == "0") {
                            CisApp.msg.info('删除成功！');
                            me.refresh();
                        }
                        else {
                            CisApp.msg.info(res.responseJson.Msg);
                        }
                    }
                });
            }
        });
    }
});