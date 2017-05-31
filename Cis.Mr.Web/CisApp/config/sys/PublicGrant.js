/* ***********************************************
 * author :  alex
 * function: 
 * history:  created by alex 2017年3月30日09:27:23
 * ***********************************************/

Ext.ns('CisApp.Config.sys.PublicGrant');
CisApp.Config.sys.PublicGrant = {
    GrantList: function () {
        return [
            { xtype: 'rownumberer', configIndex: 0, text: '序号',width:50 },
            { configIndex: 1, text: Fm.Lang.SearchMonth || "预拨月份", dataIndex: 'GrantMonth'},
            { configIndex: 2, text: '机构编号', dataIndex: 'HospitalId' },
            { configIndex: 3, text: '机构名称', dataIndex: 'HospitalName', showTip: true,width: 150},
            { configIndex: 4, text: '上传授权', dataIndex: 'IsGroupView', renderer:Fm.Common.Util.dataTextRender(CisApp.Server.Datas.EnumFundPublicity)},
            { configIndex: 5, text: '授权时间', dataIndex: 'OperDate', renderer: Fm.Common.Util.dateRender() },
            { configIndex: 6, text: '授权人', dataIndex: 'GrantName' },
            { configIndex: 7, text: '授权截止日期', dataIndex: 'BackEndDate',minWidth:120, renderer: Fm.Common.Util.dateTextRender(),flex:1 }
            //, { configIndex: 8, text: '结算授权', dataIndex: 'IsFundView', align: 'center', minWidth: 80, renderer: 'IsGrantRender', flex: 2 }
        ]
    },
    AddColumns: function () {
        return [
            //{ configIndex: 0, text: '序号', xtype: 'rownumberer', width: 50, flex: 1},
            { configIndex: 1, text: '机构编号', dataIndex: 'Id', align: 'left', minWidth: 100, flex: 2 },
            { configIndex: 2, text: '机构名称', dataIndex: 'Name', align: 'left', minWidth: 150, flex: 4 },
            { configIndex: 3, text: '机构类型', dataIndex: 'Type', minWidth: 80, flex: 2, renderer: Fm.Common.Util.dataTextRender(CisApp.Server.Datas.EnumHospitalType) },
             { configIndex: 4, text: '机构级别', dataIndex: 'P_Level', minWidth: 80, flex: 2, renderer: Fm.Common.Util.dataTextRender(CisApp.Server.Datas.EnumHospitalLevel) }
        ];
    }
}