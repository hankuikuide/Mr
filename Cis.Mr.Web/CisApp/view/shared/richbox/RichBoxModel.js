/* ***********************************************
 * author :  huyakun
 * function: 富文本控件
 * history:  created by huyakun 2016/5/18
 * ***********************************************/
Ext.define('CisApp.view.shared.richbox.RichBoxModel', {
    extend: 'Ext.app.ViewModel',
    requires: [
    ],
    alias: 'viewmodel.shared_richbox',
    data: {
        summary: null,
        content: null,
        hisId: null
    }
});