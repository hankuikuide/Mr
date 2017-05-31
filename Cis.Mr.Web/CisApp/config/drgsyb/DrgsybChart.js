/* ***********************************************
 * author :  李克一
 * function: 
 * history:  created by 李克一 
 * ***********************************************/
Ext.ns("CisApp.Config.drgsyb.DrgsybChart");
CisApp.Config.drgsyb.DrgsybChart = {
    Items: function () {
        return [
                 {
                     configIndex: 1,
                     xtype: 'shared_hospitalcombo',
                     fieldLabel: '医疗机构',
                     multiSelect: false,
                     editable: true,
                     isPopWindow: true,
                     configMustShow: true,
                     bind: '{seachData.OrgCode}'
                 },
                 {
                     configIndex: 2,
                     xtype: 'monthdatefield',
                     fieldLabel: '结算月份',
                     bind: '{seachData.YearMonth}',
                     format: "Y-m",
                     editable: false
                 }
                 //, {
                 //    configIndex: 3,
                 //    xtype: 'combo',
                 //    fieldLabel: '人员类别',
                 //    bind: '{seachData.BenefitGroup}',
                 //    store: appFactory.Data.getDataStore('BenefitGroupsParent'),
                 //    displayField: 'Text',
                 //    valueField: 'Value',
                 //    emptyText: '请选择'
                 //}
        ]
    }
}