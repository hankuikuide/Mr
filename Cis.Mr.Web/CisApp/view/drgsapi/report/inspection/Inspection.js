/* ***********************************************
 * author :  李辛
 * function: 
 * history:  created by 李辛 2016/4/18 14:30:54 
 * ***********************************************/
Ext.define("CisApp.view.drgsapi.report.inspection.Inspection", {
    extend: 'Fm.base.Grid',
    alias: 'widget.drgsapi_inspection',
    requires: [
        'CisApp.view.drgsapi.report.inspection.InspectionController',
        'CisApp.view.drgsapi.report.inspection.InspectionModel',
        'Fm.ux.form.ComboGrid',
        'Fm.ux.grid.plugin.ClickSelection'
    ],
    controller: 'drgsapi_inspection',

    viewModel: {
        type: 'drgsapi_inspection'
    },
    plugins: [{
        ptype: 'clickselection'
    }], 
    bind: {
        store: '{gridstore}',
        selection: '{focus}',
        clickSelection: '{clickRecord}'
    }, 
    isPage: false,
    columns: [
        { xtype: 'rownumberer', text: '序号' },
        { text: '检验单号', dataIndex: 'CheckId',width:150 },
        { text: '申请科室代码', dataIndex: 'DepartmentCode', width: 100 },
        { text: '申请科室名称', dataIndex: 'DepartmentName', width: 100 },
        { text: '临床诊断编码', dataIndex: 'DiagnosticCode', width: 100 },
        { text: '临床诊断名称', dataIndex: 'DiagnosticName', width: 200 },
        { text: '申请项目编码', dataIndex: 'ApplyProjectCode', width: 100 },
        { text: '申请项目名称', dataIndex: 'ApplyProjectName', width: 200 },
        { text: '申请医师编码', dataIndex: 'ApplyDoctor', width: 100 },
        { text: '申请医师姓名', dataIndex: 'ApplyDoctorName', width: 100 },
        { text: '申请时间', dataIndex: 'ApplyDatetime', renderer: CisApp.Common.Util.dateTextRender(), width: 180 },
        { text: '报告时间', dataIndex: 'ReportDatetime', renderer: CisApp.Common.Util.dateTextRender(), width: 180 },
        { text: '标本名称', dataIndex: 'SpecimenCodeName', width: 200 }
        //{ text: '标本名称', dataIndex: 'SpecimenName', width: 150 }
    ],
    buttons: [{
        xtype: 'button',
        text: '新增',
        handler: 'add',
        bind: {
            disabled: '{btnDisabledAdd}'
        }
    }, {
        xtype: 'button',
        text: '修改',
        handler: 'modify',
        bind: {
            disabled: '{btnDisabled}'
        }
    }, {
        xtype: 'button',
        text: '删除',
        handler: "toDelete",
        bind: {
            disabled: '{btnDisabled}'
        }
    }
    ],
    listeners: {
        itemdblclick: 'modify',
        itemclick:'select'
    },
    initComponent: function () {
        var me = this;

        me.callParent(arguments);
    }
});