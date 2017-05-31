/* ***********************************************
 * author :  fei85
 * function: 
 * history:  created by fei85 2016/3/3 15:38:09 
 * ***********************************************/
UE.Editor.prototype.getActionUrl = function (action) {
    var actionName = this.getOpt(action) || action,
        imageUrl = this.getOpt('imageUrl'),
        serverUrl = this.getOpt('serverUrl');

    if (!serverUrl && imageUrl) {
        serverUrl = imageUrl.replace(/^(.*[\/]).+([\.].+)$/, '$1controller$2');
    }

    //if (action==='uploadimage') {
    //    serverUrl = '/shared/FileUpload/Upload?guid=' + CisApp.Common.Util.Guid().replace(/\s/g, '');
    //}

    if (serverUrl) {
        serverUrl = serverUrl + '/' + (actionName || '');
        return UE.utils.formatUrl(serverUrl);
    } else {
        return '';
    }
}