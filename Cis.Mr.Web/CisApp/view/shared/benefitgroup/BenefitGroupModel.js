/* ***********************************************
 * author :  hankk
 * function: 
 * history:  created by hankk 2016/7/1 14:45:48 
 * ***********************************************/
Ext.define('CisApp.view.shared.benefitgroup.BenefitGroupModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.shared_benefitgroup',
    stores: {
        benefitgroup: Ext.create('Ext.data.TreeStore')
    }
});