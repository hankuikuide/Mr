/* ***********************************************
 * author :  李克一
 * function: 检查单
 * history:  created by 李克一 2016/4/15 14:06:53 
 * ***********************************************/
Ext.define('CisApp.store.drgsapi.report.Check', {
    extend: 'Fm.base.Store',
    alias: 'store.check',
    model: 'CisApp.model.drgsapi.report.Check',
    proxy: {
        type: "ajax",
        api: {
            read: '/group/Check/GetCheck'
        } 
    }
});