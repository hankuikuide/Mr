/* ***********************************************
 * author :  孙强
 * function: 医疗机构查询
 * history:  created by 孙强 2015/10/19 
 * ***********************************************/
Ext.define('CisApp.view.shared.hospital.HospitalController', {
    extend: 'Fm.base.GridController',
    alias: 'controller.hospital',
    autoLoad:true,
    onKeyUp: function (records, e) {
        var me = this,
            view = me.getView(),
            vm = view.getViewModel(),
            store = vm.getStore('hospital');
        store.clearFilter(false);
        store.filter([
            {
                filterFn: function (item) {
                    return item.get('DetailName').indexOf(e)>=0 || item.get('DetailId').indexOf(e) >= 0;
                }
            }
        ]);
    },

    getRefreshParams: function () {
        var me = this,
            vm = me.getViewModel();
     
        return vm.data;
    },
    getGridStore: function () {
        var me = this;
        var store = me.getStore('hospital');
        return store;
    },
    refreshByParams: function (params) {
        var me = this,
            isCanRefresh = me.addParams(),
            winIsCache = null,
            comboIsCache=null,
        store = me.getStore('hospital');
        if (me.getView().up('window')) {
            winIsCache = me.getView().up('window').isCache;
        }
        if (me.getView().up('shared_hospitalcombo')) {
            comboIsCache = me.getView().up('shared_hospitalcombo').isCache;
        }
        var isCache = me.getView().isCache || winIsCache || comboIsCache;
        var hospitalCache = isCache ? CisApp.Cache['shared_hospitalcombo_Hospital'] : null;
       if (!hospitalCache) {
                if (isCanRefresh !== false) {
                    setTimeout(function () {
                    store.loadPage(1,
                          {
                              callback: function (data) {
                                  if (isCache) {
                                      CisApp.Cache['shared_hospitalcombo_Hospital'] = data;
                                  }
                              }
                          });
                    }, 10);
                }
            } else {
                store.loadData(hospitalCache);
            }
    }
});