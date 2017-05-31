/* ***********************************************
 * author :  李辛
 * function: 手术界面
 * history:  created by 李辛 2016/4/25 15:48:44 
 * ***********************************************/
Ext.define('CisApp.view.drgsapi.report.operation.operationoper.OperationOperController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.drgsapi_report_operation_operationoper',
    //关闭窗口
    closeWin: function () {
        this.getView().up('window').close();
    },
    setComplicationCode: function (obj, value) {
        if (value != null && typeof (value) == 'string') {
            var str = value.split('>||<');
            if (str.length === 2) {
                var complicationCode = this.getView().down('textfield[name=complicationCode]');
                var complicationName = this.getView().down('textfield[name=complicationName]');
                complicationCode.setValue(str[0]);
                complicationName.setValue(str[1]);
            }
        }
    },
    //设置时间
    selectSDate: function () {
        var me = this,
           sDateComp = me.getView().down('datetimefield[name=sDate]'),
           eDateComp = me.getView().down('datetimefield[name=eDate]');
        var startDate = sDateComp.getValue();
        var endDate = eDateComp.getValue();
        if (endDate)
            if (startDate >= endDate) {
                sDateComp.setValue('');
                Fm.msg.error('执行开始时间不能大于执行结束时间');
            }
    },
    //设置时间
    selectEDate: function () {
        var me = this,
           sDateComp = me.getView().down('datetimefield[name=sDate]'),
           eDateComp = me.getView().down('datetimefield[name=eDate]');
        var startDate = sDateComp.getValue();
        var endDate = eDateComp.getValue();
        if (endDate <= startDate) {
            eDateComp.setValue('');
            Fm.msg.error('执行开始时间不能大于执行结束时间');
        }
    },
    setOperationDoctor: function (obj, value) {
        if (value != null && typeof (value) == 'string') {
            var str = value.split('>||<');
            if (str.length === 2) {
                var docCode = this.getView().down('textfield[name=operationDoctorCode]');
                var docName = this.getView().down('textfield[name=operationDoctorName]');
                docCode.setValue(str[0]);
                docName.setValue(str[1]);
            }
        }
    },
    setRecordDoctor: function (obj, value) {
        if (value != null && typeof (value) == 'string') {
            var str = value.split('>||<');
            if (str.length === 2) {
                var docCode = this.getView().down('textfield[name=recordDoctorCode]');
                var docName = this.getView().down('textfield[name=recordDoctorName]');
                docCode.setValue(str[0]);
                docName.setValue(str[1]);
            }
        }
    },
    setAnesthesiologist: function (obj, value) {
        if (value != null && typeof (value) == 'string') {
            var str = value.split('>||<');
            if (str.length === 2) {
                var docCode = this.getView().down('textfield[name=anesthesiologistCode]');
                var docName = this.getView().down('textfield[name=anesthesiologistName]');
                docCode.setValue(str[0]);
                docName.setValue(str[1]);

            }
        }
    },
    setFirstOperdoctor: function (obj, value) {
        if (value != null && typeof (value) == 'string') {
            var str = value.split('>||<');
            if (str.length === 2) {
                var docCode = this.getView().down('textfield[name=firstOperdoctorCode]');
                var docName = this.getView().down('textfield[name=firstOperdoctorName]');
                docCode.setValue(str[0]);
                docName.setValue(str[1]);
            }
        }
    },
    setSecondOperdoctor: function (obj, value) {
        if (value != null && typeof (value) == 'string') {
            var str = value.split('>||<');
            if (str.length === 2) {
                var docCode = this.getView().down('textfield[name=secondOperdoctorCode]');
                var docName = this.getView().down('textfield[name=secondOperdoctorName]');
                docCode.setValue(str[0]);
                docName.setValue(str[1]);
            }
        }
    },
    //添加手术
    addOperation: function () {
        if (this.getView('form').isValid()) {
            this.getView('form').callBack();
        }
    },
    //afterRender键盘事件
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
                    me.addOperation();
                    //}
                },
                defaultEventAction: "stopEvent"
            }]
        });
        keyMap.enable();
        view.items.items[0].items.items[0].focus();
    }
});