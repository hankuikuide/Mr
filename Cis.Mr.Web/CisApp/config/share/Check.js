/* ***********************************************
 * author :  单梦琪
 * function: 分组调整审核-检查单 config
 * history:  created by 单梦琪 2016/5/11 10:48:48 
 * ***********************************************/
Ext.ns('CisApp.Config.share.Check');
CisApp.Config.share.Check = {
    ColumnsList: function () {
        return [
        { configIndex: 0, xtype: 'rownumberer', width: 50, text: '序号' },
        { configIndex: 1, text: '检查单号', dataIndex: 'CheckId',width:100 },
        //{ configIndex: 2, text: '申请科室代码', dataIndex: 'DepartmentCode',width:120 },
        { configIndex: 3, text: '申请科室名称', dataIndex: 'DepartmentName', width: 120 },
        //{
        //    configIndex: 4, text: '临床诊断编码', dataIndex: 'DiagnosticCode',
        //    renderer: function (value, metaData) {
        //        if (metaData) {
        //            metaData.tdAttr = 'data-qtip="' + value + '"';
        //        }
        //        return value;
        //    },width:100
        //},
        //{
        //    configIndex: 5, text: '临床诊断名称', dataIndex: 'DiagnosticName',
        //    renderer: function (value, metaData) {
        //        if (metaData) {
        //            metaData.tdAttr = 'data-qtip="' + value + '"';
        //        }
        //        return value;
        //    }, width: 120
        //},
        {
            configIndex: 6, text: '申请项目编码', dataIndex: 'ApplyProjectCode',
            renderer: function (value, metaData) {
                if (metaData) {
                    metaData.tdAttr = 'data-qtip="' + value + '"';
                }
                return value;
            }, width: 120
        },
        {
            configIndex: 7, text: '申请项目名称', dataIndex: 'ApplyProjectName',
            renderer: function (value, metaData) {
                if (metaData) {
                    metaData.tdAttr = 'data-qtip="' + value + '"';
                }
                return value;
            }, width: 120, showTip: true
        },
        { configIndex: 8, text: '申请医师编码', dataIndex: 'ApplyDoctor', width: 100 },
        { configIndex: 14, text: '申请医师名称', dataIndex: 'ApplyDoctorName', width: 100 },
        { configIndex: 9, text: '申请时间', dataIndex: 'ApplyDatetime', renderer: Fm.Common.Util.dateRender(), width: 150 },
        { configIndex: 10, text: '报告时间', dataIndex: 'ReportDatetime', renderer: Fm.Common.Util.dateRender(), width: 150 },
        { configIndex: 11, text: '检查部位', dataIndex: 'CheckPositionCodeName', width: 100, showTip: true },
        {
            configIndex: 12, text: '报告结果', dataIndex: 'Result',
            renderer: function (value, metaData) {
                if (metaData) {
                    metaData.tdAttr = 'data-qtip="' + value + '"';
                }
                return value;
            }, width: 100, showTip: true
        },
        {
            configIndex: 13, text: '异常提示', dataIndex: 'AbnormalName',
            renderer: function (value, metaData) {
                if (metaData) {
                    metaData.tdAttr = 'data-qtip="' + value + '"';
                }
                return value;
            }, minWidth: 100,
            flex: 1, showTip: true
        }
        ]
    }
}