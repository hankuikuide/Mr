/* ***********************************************
 * author :  李克一
 * function: 病案主页面
 * history:  created by 李克一 2016/4/18 10:53:03 
 * ***********************************************/
Ext.define("CisApp.view.drgsapi.report.medical.Medical", {
    extend: 'Fm.base.Grid',
    alias: 'widget.drgsapi_medical',
    requires: [
        'CisApp.view.drgsapi.report.medical.MedicalController',
        'CisApp.view.drgsapi.report.medical.MedicalModel',
        'Fm.ux.form.ComboGrid',
        'Fm.ux.grid.plugin.ClickSelection',
        'Fm.ux.DateRange'
    ],
    //plugins: [
    //    {
    //        ptype: 'clickselection'
    //    }
    //],
    bind: {
        store: '{gridstore}',
        clickSelection: '{focus}',
        selection: '{selectionFocus}'
    },
    selModel: {
        selType: 'checkboxmodel',
        injectCheckbox: 0,
        mode: 'simple',
        checkOnly: true
    },
    bbarHidden: false,
    modelValidation: true,
    controller: 'drgsapi_medical',
    viewModel: { type: 'drgsapi_medical' },
    isPage: true,
    listeners: {
        itemclick: 'selectItem',
        itemkeydown: 'griditemkeydown'
    },
    initComponent: function () {
        var me = this;
        me.buttons = [];
        me.columns = [];
        me.columns.push({ xtype: 'rownumberer', text: '序号', hasCustomRenderer: true },
        {
            text: '状态', dataIndex: 'IsUpload', //renderer: Fm.Common.Util.dataTextRender(CisApp.Server.Datas.EnumIsUpload)
        },
        { text: '机构号', dataIndex: 'HospitalId', showTip: true },
        { text: '机构名称', dataIndex: 'HospitalName', showTip: true },
        //{ text: '校验结果', dataIndex: 'DataValidateFlag', renderer: Fm.Common.Util.dataTextRender(CisApp.Server.Datas.EnumValidateFlag) },
        { text: '校验结果', dataIndex: 'DataValidateFlagName', showTip: true },
        { text: '住院号', dataIndex: 'AdmissionNo', showTip: true },
        { text: '参保类型', dataIndex: 'BenefitTypeName', showTip: true },
        { text: '社保卡号', dataIndex: 'SciCardNo', showTip: true },
        { text: '参保人', dataIndex: 'PatientName', showTip: true },
        { text: '人员类别', dataIndex: 'BenefitGroupName', showTip: true },
        { text: '出院诊断', dataIndex: 'DischargeDiseaseName', showTip: true },
        { text: '入院诊断', dataIndex: 'AdmissionDiseaseName', showTip: true },
        { text: '结算日期', dataIndex: 'BillDate', renderer: Fm.Common.Util.dateTextRender(), width: 150, showTip: true },
        { text: '医保金额', dataIndex: 'BmiConveredAmount', renderer: Fm.Common.Util.moneyRender("c93d3d") },
        { text: '单据总金额', dataIndex: 'TotalAmont', renderer: Fm.Common.Util.moneyRender("c93d3d") },
        { text: '入院时间', dataIndex: 'AdmissionDate', renderer: Fm.Common.Util.dateTextRender(), width: 150, showTip: true },
        { text: '出院时间', dataIndex: 'DischargeDate', renderer: Fm.Common.Util.dateTextRender(), width: 150, showTip: true }
        //{
        //    text: '验证信息',
        //    dataIndex: 'DataValidateRemark',
        //    width: 150,
        //    ignoreExport: true,
        //    xtype: 'widgetcolumn',
        //    widget: {
        //        xtype: 'label',
        //        cls: 'x-link',
        //        handler: 'showRemarkContent'
        //    }

        //}
        );
        if (!me.bbarHidden) {
            me.buttons.push({
                xtype: 'button',
                text: '删除填报',
                width: 66,
                handler: 'toBatchDelete',
                name: 'btDelete'
            }, {
                xtype: 'button',
                width: 66,
                text: '填报完成',
                handler: 'toBatchUpLoad',
                name: 'btUpLoad'
            }, {
                xtype: 'button',
                text: '作废',
                width: 66,
                handler: 'toBatchValid',
                name: 'btValid'
            }, {

                margin: 0,
                xtype: 'button',
                text: '操作日志',
                width: 66,
                handler: 'showOperRecord',
                name: 'btValid'
            });

            //me.columns.push(
            //    {
            //    text: '操作日志',
            //    xtype: 'widgetcolumn',
            //    widget: {
            //        xtype: 'label',
            //        cisBindProperty: {
            //            html: {
            //                dataIndex: 'IsUpload',
            //                renderer: function (v) {
            //                    if (v !== "-1")
            //                        return '<a href="javascript:void(0)">' + '日志查看' + '</a>';
            //                }
            //            }
            //        },
            //        handler: 'showOperRecord'
            //    }, minWidth: 200, flex: 1
            //});
        }

        me.callParent(arguments);
    }
});