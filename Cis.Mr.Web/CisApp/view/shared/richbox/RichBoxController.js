/* ***********************************************
 * author :  huyakun
 * function: 富文本控件
 * history:  created by huyakun 2016/5/18
 * ***********************************************/
Ext.define('CisApp.view.shared.richbox.RichBoxController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.shared_richbox',

    //只读状态加载富文本显示内容
    frameAfterRender: function (obj) {
        var me = this,
            vm = me.getViewModel(),
            htmlContent = vm.get('content');
        if (htmlContent) {
            obj.setHtmlContent(htmlContent);
        }
    },
    //保存操作调用回调函数
    save: function () {
        var me = this,
            view = me.getView(),
            vm = me.getViewModel(),
            content = view.down('ueditor').getValue();

        if (view.down('form').isValid()) {
            if (view.backFn) {
                view.backFn.call(view.backFnScope || me, view, vm.get('summary'), content || '');
            }
        }
    }
});