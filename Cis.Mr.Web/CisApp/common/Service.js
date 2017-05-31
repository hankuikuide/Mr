/* ***********************************************
 * author :  苗建龙
 * function: 
 * history:  created by 苗建龙 2015/12/9 17:08:39 
 * ***********************************************/
Ext.ns('CisApp.Common').Service = {
    Sys: {
        isPermission: function (key) {
            return Ext.Array.findBy(fmAppFactory.Data.getDatas("Privileges"), function (item) {
                return item.Value === key && item.IsAlloted;
            }) != null;
        }
    }
}