/* ***********************************************
 * author :  localadmin
 * function: 
 * history:  created by localadmin 2016/4/15 14:09:35 
 * ***********************************************/
Ext.define('CisApp.view.drgsapi.report.check.checkoper.CheckOperController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.check_checkoper',
    //关闭窗口
    closeWin: function () {
        this.getView().up('window').close();
    },
    //添加检查单
    addCheck: function () {
        if (this.getView('form').isValid()) {
            this.getView('form').callBack();
        }
    },
    //设置医生姓名和编码
    setDoc: function (obj, value) {
        if (value != null && typeof (value) == 'string') {
            var str = value.split('>||<');
            if (str.length === 2) {
                var docCode = this.getView().down('textfield[name=docCode]');
                var docName = this.getView().down('textfield[name=docName]');
                docCode.setValue(str[0]);
                docName.setValue(str[1]);
            }
        }

    },
    //申请科室
    setDepartment: function (obj, record) {
        var me = this;
        if (record != null && typeof (record) == 'string') {
            var str = record.split('>||<');
            if (str.length === 2) {
                var code = me.getView().down('[name=departmentCode]'),
                    name = me.getView().down('[name=departmentName]');
                code.setValue(str[0]);
                name.setValue(str[1]);
            }
        }
    },
    //选择时间
    selectSDate: function () {
        var me = this,
            sDateComp = me.getView().down('datetimefield[name=sDate]'),
            eDateComp = me.getView().down('datetimefield[name=eDate]');
        var startDate = sDateComp.getValue();
        var endDate = eDateComp.getValue();
        if (endDate)
            if (startDate >= endDate) {
                sDateComp.setValue('');
                Fm.msg.error('申请时间不能大于报告时间');
            }
    },
    //选择时间
    selectEDate: function () {
        var me = this,
           sDateComp = me.getView().down('datetimefield[name=sDate]'),
           eDateComp = me.getView().down('datetimefield[name=eDate]');
        var startDate = sDateComp.getValue();
        var endDate = eDateComp.getValue();
        if (endDate <= startDate) {
            eDateComp.setValue('');
            Fm.msg.error('申请时间不能大于报告时间');
        }
    },
    //afterRender事件
    keyMap: function (obj) {
        var me = this,
            view = me.getView();
        var keyMap = new Ext.util.KeyMap({
            target: me.getView().getEl(),
            binding: [{
                key: Ext.event.Event.S,
                ctrl: true,
                fn: function () {
                    //if (me.getView('form').isValid()) {
                    // 此处需要判断是增加还是修改
                    me.addCheck();
                    //}
                },
                defaultEventAction: "stopEvent"
            }]
        });
        keyMap.enable();
        view.items.items[0].items.items[0].focus();
    }
    //,
    //init: function () {
    //    var me = this;
    //    setTimeout(function () {
    //        var view = me.getView();
    //        view.items.items[0].items.items[0].focus();
    //    }, 10);
    //}
});