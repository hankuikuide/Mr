/* ***********************************************
 * author :  单梦琪
 * function: 分组调整审核-手术信息 config
 * history:  created by 单梦琪 2016/5/11 10:48:48 
 * ***********************************************/
Ext.ns('CisApp.Config.share.Operation');
CisApp.Config.share.Operation = {
    ColumnsList: function () {
        return [
        { configIndex: 0, xtype: 'rownumberer', width: 50, text: '序号' },
        { configIndex: 1, text: '手术记录序号', dataIndex: 'OperationRecordNo' },
        {
            configIndex: 2, text: '手术医师', dataIndex: 'OperationDoctorName',
            renderer: function (value, metaData) {
                if (metaData) {
                    metaData.tdAttr = 'data-qtip="' + value + '"';
                }
                return value;
            }, width: 100, showTip: true
        },
        {
            configIndex: 3, text: '手术医师I助', dataIndex: 'FirstOperDoctorName',
            renderer: function (value, metaData) {
                if (metaData) {
                    metaData.tdAttr = 'data-qtip="' + value + '"';
                }
                return value;
            }, width: 100
        },

        {
            configIndex: 4, text: '手术医师II助', dataIndex: 'SecondOperDoctorName',
            renderer: function (value, metaData) {
                if (metaData) {
                    metaData.tdAttr = 'data-qtip="' + value + '"';
                }
                return value;
            }, width: 100
        },
        { configIndex: 5, text: '麻醉师', dataIndex: 'AnesthesiologistName', showTip: true },
        { configIndex: 11, text: '记录医师', width: 100, dataIndex: 'RecordDoctorName', showTip: true },
        { configIndex: 6, text: '执行开始时间', width: 200, dataIndex: 'OperationDate', renderer: Fm.Common.Util.dateRender(), showTip: true },
        { configIndex: 7, text: '执行结束时间', width: 200, dataIndex: 'OperationFinishDate', renderer: Fm.Common.Util.dateRender(), showTip: true },
        {
            configIndex: 8, text: '麻醉方式', dataIndex: 'AnaesthesiaTypeName',
            renderer: function (value, metaData) {
                if (metaData) {
                    metaData.tdAttr = 'data-qtip="' + value + '"';
                }
                return value;
            }, showTip: true
        },
        {
            configIndex: 9, text: '并发症', width: 200, dataIndex: 'ComplicationName',
            renderer: function (value, metaData) {
                if (metaData) {
                    metaData.tdAttr = 'data-qtip="' + value + '"';
                }
                return value;
            }, showTip: true
        },
        {
            configIndex: 10, text: '手术记录', dataIndex: 'OperationRecord',
            xtype: 'widgetcolumn',
            widget: {
                xtype: 'label',
                cisBindProperty: {
                    html: {
                        dataIndex: 'OperationRecord',
                        renderer: function (v) {
                            if (v == null) {
                                v = "";
                            }
                            return '<a href="javascript:void(0)">' + v + '</a>';
                        }
                    }
                },
                handler: 'showRemarkContent', showTip: true
            },
            minWidth:100,
            flex:1
        }

        ]
    }
}