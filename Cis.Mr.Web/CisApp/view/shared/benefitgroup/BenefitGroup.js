/* ***********************************************
 * author :  hankk
 * function: 
 * history:  created by hankk 2016/7/1 14:45:48 
 * ***********************************************/
Ext.define("CisApp.view.shared.benefitgroup.BenefitGroup", {
    extend: 'Fm.ux.form.ComboTreeField',
    alias: 'widget.shared_benefitgroup',
    requires: [
        'CisApp.view.shared.benefitgroup.BenefitGroupController',
        'CisApp.view.shared.benefitgroup.BenefitGroupModel'
    ],
    controller: 'shared_benefitgroup',
    viewModel: {
        type: 'shared_benefitgroup'
    },
    fieldLabel: '人员类别',
    emptyText: '全部',
    queryMode: 'local',
    displayField: 'text',
    valueField: 'value',
    showClearTriggers: true,
    minPickerWidth: 250,
    selectModel: ['p-c','c-p'],
    needSearch: false,
    isPublic: false,
    isDelArtificialCheck: false,//是否启用人工抽查
    isViewStatus:false,
    innerGrid: {
        height: 300,
        notEnabledCopy: true,
        bind: {
            store: '{benefitgroup}'
        },
        xtype: "treepanel"
    }
});