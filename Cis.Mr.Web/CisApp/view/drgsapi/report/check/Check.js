/* ***********************************************
 * author :  李克一
 * function: 检查单主界面
 * history:  created by 李克一 2016/4/15 14:04:43 
 * ***********************************************/
Ext.define("CisApp.view.drgsapi.report.check.Check", {
    extend: 'Fm.base.Grid',
    alias: 'widget.CisApp_drgsapi_report_check',
    requires: [
        'CisApp.view.drgsapi.report.check.CheckController',
        'CisApp.view.drgsapi.report.check.CheckModel',
        'Fm.ux.form.ComboGrid',
        'Fm.ux.grid.plugin.ClickSelection'
    ],
    plugins: [{
        ptype: 'clickselection'
    }],
    controller: 'check',
    viewModel: {
        type: 'check'
    },
    bbarHidden: false,
    bind: {
        store: '{gridstore}',
        selection: '{focus}'
    },
    isPage: false,
    columns: [
        { xtype: 'rownumberer', text: '序号' },
        { text: '检查单号', dataIndex: 'CheckId' },
        //{
        //    text: '申请科室代码', dataIndex: 'DepartmentCode', renderer: function (value, data, record) {
        //        var text = (record.data.DepartmentCode !== null ? record.data.DepartmentCode : "")
        //            + (record.data.DepartmentCode1 !== null ? ("，" + record.data.DepartmentCode1) : "")
        //            + (record.data.DepartmentCode2 !== null ? ("，" + record.data.DepartmentCode2) : "")
        //            + (record.data.DepartmentCode3 !== null ? ("，" + record.data.DepartmentCode3) : "")
        //            + (record.data.DepartmentCode4 !== null ? ("，" + record.data.DepartmentCode4) : "")
        //            + (record.data.DepartmentCode5 !== null ? ("，" + record.data.DepartmentCode5) : "");
        //        data.tdAttr = 'data-qtip="' + text + '"';
        //        return text;
        //    },
        //    width: 100
        //},
        {
            text: '申请科室名称', dataIndex: 'DepartmentName', width: 250, showTip: true
        },
        {
            text: '检查部位', dataIndex: 'CheckPositionCode', renderer: function (value, data, record) {
                var name = CisApp.Common.Util.dataCodeToTextRender(CisApp.Server.Datas.CheckPoint)(value);
                var name1 = CisApp.Common.Util.dataCodeToTextRender(CisApp.Server.Datas.CheckPoint)(record.data.CheckPositionCode1);
                var name2 = CisApp.Common.Util.dataCodeToTextRender(CisApp.Server.Datas.CheckPoint)(record.data.CheckPositionCode2);
                var text = (name == '' ? '' : name)
                    + (name1 == '' ? '' : (',' + name1))
                    + (name2 == '' ? '' : (',' + name2));
                data.tdAttr = 'data-qtip="' + text + '"';
                return text;
            },
            width: 250
        },
        { text: '申请项目编码', dataIndex: 'ApplyProjectCode' },
        { text: '申请项目名称', dataIndex: 'ApplyProjectName', showTip: true },
        { text: '申请医师编码', dataIndex: 'ApplyDoctor' },
        { text: '申请医师名称', dataIndex: 'ApplyDoctorName', showTip: true },
        { text: '申请时间', dataIndex: 'ApplyDatetime', renderer: Fm.Common.Util.dateTextRender(), width: 150, showTip: true },
        { text: '报告时间', dataIndex: 'ReportDatetime', renderer: Fm.Common.Util.dateTextRender(), width: 150, showTip: true },
        {
            text: '异常提示', dataIndex: 'Abnormal', showTip: true,
           // renderer: CisApp.Common.Util.dataCodeToTextRender(CisApp.Server.Datas.AbnormalTip),
            showTip: true
        },
        {
            text: '报告结果',
            dataIndex: 'CheckResult',
            xtype: 'widgetcolumn',
            widget: {
                xtype: 'label',
                cls: 'x-link',
                handler: 'showRemarkContent'
            }, minWidth: 200, flex: 1
        }
    ],
    listeners: {
        itemdblclick: 'modifyCheck',
        itemkeydown: 'griditemkeydown',
        afterlayout: 'dataLoaded'
    },
    initComponent: function () {
        var me = this;
        me.buttons = [];
        if (!me.bbarHidden) {
            me.buttons.push({
                xtype: 'button',
                text: '新增',
                handler: 'addCheck',
                bind: {
                    disabled: '{btnDisabledAdd}'
                }
            }, {
                xtype: 'button',
                text: '修改',
                handler: 'modifyCheck',
                bind: {
                    disabled: '{btnDisabled}'
                }
            }, {
                xtype: 'button',
                text: '删除',
                handler: "deleteCheck",
                bind: {
                    disabled: '{btnDisabled}'
                }
            }); me.getViewModel().data.enableListener = false;
        } else {
            me.getViewModel().data.enableListener = true;
        }
        me.callParent(arguments);
    }
});