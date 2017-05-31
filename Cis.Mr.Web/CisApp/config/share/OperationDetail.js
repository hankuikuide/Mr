/* ***********************************************
 * author :  单梦琪
 * function: 分组调整审核-手术详细信息 config
 * history:  created by 单梦琪 2016/5/11 10:48:48 
 * ***********************************************/
Ext.ns('CisApp.Config.share.OperationDetail');
CisApp.Config.share.OperationDetail = {
    ColumnsList: function () {
        return [
        { configIndex: 0, xtype: 'rownumberer', text: '序号', width: 50 },
        { configIndex: 1, text: '手术序号', dataIndex: 'OperationNo' },
        //{ configIndex: 2, text: '手术编码', dataIndex: 'OperationCode' },
        { configIndex: 3, text: '手术名称', dataIndex: 'OperationDetailName', showTip: true },
        { configIndex: 4, text: '手术等级', dataIndex: 'OperationLevel', renderer: Fm.Common.Util.dataTextRender('EnumOperationLevel'), showTip: true },
        { configIndex: 5, text: '手术切口分类', dataIndex: 'OperationIncisionClassName', showTip: true },
        { configIndex: 6, text: '手术愈合分级', dataIndex: 'OperationHealClass', showTip: true },
        { configIndex: 7, text: '主次标志', dataIndex: 'IsMajorIden', renderer: Fm.Common.Util.dataTextRender('EnumMajorIden') },
        { configIndex: 8, text: '是否医源性手术', dataIndex: 'IsIatrogenic', renderer: Fm.Common.Util.dataTextRender('EnumIsIatrogenic'), flex: 1 }
        ]
    }
}