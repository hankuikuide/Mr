/* ***********************************************
 * author :  sunqiang
 * function: 
 * history:  created by sunqiang 2016/6/30 16:07:45 
 * ***********************************************/
Ext.define('CisApp.view.shared.diagnosis.DiagnosisController', {
    extend: 'Fm.base.GridController',
    alias: 'controller.shared_diagnosis',
    autoLoad: true,
    getRefreshParams: function () {
        var me = this,
        searchForm = me.lookupReference('searchform'),
        search = me.getView().getViewModel().get('searchModel');
        if (search && searchForm.isValid()) {
            return search.data;
        }
        return '';
    },
    getGridStore: function () {
        var me = this;
        if (me.getView().diseaseMain) {
            return me.getStore('diseaseMainList');
        } else {
            return me.getStore('diseaseList');
        }
    }
});