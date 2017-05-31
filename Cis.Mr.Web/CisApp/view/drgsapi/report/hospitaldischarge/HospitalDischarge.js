/* ***********************************************
 * author :  sunqiang
 * function: 出院小结
 * history:  created by sunqiang 2016/4/19 16:44:18 
 * ***********************************************/
Ext.define("CisApp.view.drgsapi.report.hospitaldischarge.HospitalDischarge", {
    extend: 'Fm.base.Grid',
    alias: 'widget.drgsapi_report_hospitaldischarge',
    xtype: 'fieldset',
    requires: [
        'CisApp.view.drgsapi.report.hospitaldischarge.HospitalDischargeController',
        'CisApp.view.drgsapi.report.hospitaldischarge.HospitalDischargeModel',
        'Fm.ux.grid.plugin.ClickSelection'
    ],
    controller: 'drgsapi_report_hospitaldischarge',
    viewModel: {
        type: 'drgsapi_report_hospitaldischarge'
    },
    plugins: [{
        ptype: 'clickselection'
    }],
    bind: {
        store: '{hostpitalDischarge}',
        clickSelection: '{hostpitalDischargeRecord}'
    },
    loadMask: false,
    isPage: false,
    columns: [
        { xtype: 'rownumberer', text: '序号' },
        { header: '出院转归', dataIndex: 'DischargeOutcome', renderer: Fm.Common.Util.dataTextRender('EnumDischargeOutcome') },
        {
            header: '入院情况', dataIndex: 'HospitalizationSituation'
            //,
            //renderer: function (value, metaData) {
            //    if (metaData) {
            //        metaData.tdAttr = 'data-qtip="' + value + '"';
            //    }
            //    return value;
            //}
        },
        {
            header: '诊疗过程', dataIndex: 'DtProcess'
            //,
            //renderer: function (value, metaData) {
            //    if (metaData) {
            //        metaData.tdAttr = 'data-qtip="' + value + '"';
            //    }
            //    return value;
            //}
        },
        {
            header: '出院情况', dataIndex: 'LeaveHospitalStatus'
            //,
            //renderer: function (value, metaData) {
            //    if (metaData) {
            //        metaData.tdAttr = 'data-qtip="' + value + '"';
            //    }
            //    return value;
            //}
        },
        {
            header: '出院医嘱', dataIndex: 'LeaveDoctorAdvice'
            //,
            //renderer: function (value, metaData) {
            //    if (metaData) {
            //        metaData.tdAttr = 'data-qtip="' + value + '"';
            //    }
            //    return value;
            //}
        }
    ],
    listeners: {
        itemdblclick: 'onChange'
    },
    buttons: [{
        xtype: 'button',
        text: '新增',
        handler: 'onAdd',
        bind: {
            disabled: '{btnDisabledAdd}'
        }
    }, {
        xtype: 'button',
        text: '修改',
        handler: 'onChange',
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
    initComponent: function () {
        var me = this;

        me.callParent(arguments);
    }
});