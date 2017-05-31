/* ***********************************************
 * author :  sunqiang
 * function: 手术详细信息添加
 * history:  created by sunqiang 2016/6/21 15:13:55 
 * ***********************************************/
Ext.define('CisApp.view.drgsapi.report.operationdetail.operationdetailoper.OperationDetailOperController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.drgsapi_report_operationdetail_operationdetailoper',
    closeWin: function () {
        this.getView().up('window').close();
    },
    //添加手术明细
    addOperationDetail: function () {
        if (this.getView('form').isValid()) {
            this.getView('form').callBack();
        }
    },
    setOperation: function (obj, value) {
        if (value != null && typeof (value) == 'string') {
            var str = value.split('>||<');
            if (str.length === 2) {
                var operationCode = this.getView().down('textfield[name=operationCode]');
                var operationName = this.getView().down('textfield[name=operationName]');
                operationCode.setValue(str[0]);
                operationName.setValue(str[1]);
            }
        }
    },
    //键盘事件
    keyMap: function (obj) {
        var me = this,
            view = me.getView();
        var keyMap = new Ext.util.KeyMap({
            target: view.getEl(),
            binding: [{
                key: Ext.event.Event.S,
                ctrl: true,
                fn: function () {
                    //if (me.getView('form').isValid()) {
                    // 此处需要判断是增加还是修改
                    me.addOperationDetail();
                    //}
                },
                defaultEventAction: "stopEvent"
            }]
        });
        keyMap.enable();
        view.items.items[0].focus();
    }
});