/* ***********************************************
 * author :  likeyi
 * function: 病案页面
 * history:  created by likeyi 2016/7/1 10:21:35 
 * ***********************************************/
Ext.define('CisApp.view.drgsapi.report.medical.medicalform.MedicalFormController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.drgsapi_report_medical_medicalform',
    //添加
    addMedical: function () {
        var me = this;
        var billView = this.getView().up('drgsapi_report').down('drgsapi_medical');
        var billViewM = billView.getViewModel();
        var bill = billViewM.get('focus');
        var billStore = billView.getStore('gridstore');
        var billController = billView.getController();
        if (me.getViewModel().data.enableListener) {
            return false;
        }
        if (bill == null) {
            Fm.msg.info("请选择结算信息");
            return;
        }
        var record = me.getView().getViewModel().data.medical;
      
        var isUpload = bill.get('IsUpload');
        if (isUpload == null || isUpload == undefined) {
            Fm.msg.info('请选择结算信息');
            return;
        }
        //判断新生儿出生日期、新生儿出生体重、新生儿当前体重是否一致必填与非必填
        var NewbornDate = me.getView().down('datefield[name=NewbornDate]'),
            NewbornWeight = me.getView().down('numberfield[name=NewbornWeight]'),
            NewbornCurrentWeight = me.getView().down('numberfield[name=NewbornCurrentWeight]');
        var NewBornArray = [NewbornDate, NewbornWeight, NewbornCurrentWeight];
        var iden = 0;
        if (record.get('NewbornDate') === null && record.get('NewbornWeight') === '' && record.get('NewbornCurrentWeight') === '') {
            iden = 1;
        }
        if (record.get('NewbornDate') && record.get('NewbornWeight') && record.get('NewbornCurrentWeight')) {
            iden = 1;
        }
        if (iden === 0) {
            for (var i = 0, lenght = NewBornArray.length; i < lenght; i++) {
                if (NewBornArray[i].value === null || NewBornArray[i].value === '') {
                    NewBornArray[i].setActiveError('新生儿出生日期、出生体重、当前体重为全必填或者全非必填');
                }

            }
            Fm.msg.info('新生儿出生日期、出生体重、当前体重为全必填或者全非必填');
            return;
        }
        record.set('IsHospitalInfected', '0');
        record.set('IsDrugAllergy', '0');
        record.set('IsPathologicalExamination', '0');
        if (record.get('HospitalInfectedCode') != null && record.get('HospitalInfectedCode') != '') {
            record.set('IsHospitalInfected', '1');
        }
        if (record.get('AllergyDrugCode') != null && record.get('AllergyDrugCode') != '') {
            record.set('IsDrugAllergy', '1');
        }
        if (record.get('PathologyCode') != null && record.get('PathologyCode') != '') {
            record.set('IsPathologicalExamination', '1');
        }
        document.getElementById('start_layer_2').style.display = 'block';
        var changeValues = record.getChanges();
        if (changeValues) {
            delete changeValues._rowclassclick
        }
        if (isUpload == '-1') {
            record.set('HospitalId', Fm.Server.CurrentUser.OrgId);
            record.set('OperId', Fm.Server.CurrentUser.Code);
            Ext.Ajax.request({
                url: '/group/Medical/AddMedicalByOne',//AddMedicalByOne//AddMedical
                method: 'post',
                params: { iParams: Ext.util.JSON.encode(record.data), webLogParam: Ext.util.JSON.encode({ OperContent: Ext.util.JSON.encode(changeValues) }) },
                success: function (res) {
                    var resText = Ext.util.JSON.decode(res.responseText);
                    if (resText.StatusCode === 0) {
                        Fm.msg.info('添加病案主页成功');
                        record.set('AId', resText.Result);
                        bill.set('IsUpload', '0');
                        bill.set('DataValidateFlagName', '合规');
                        bill.set('AId', resText.Result);
                        bill.commit();
                        billViewM.set('uploadDelete', '');
                        billViewM.set('valid', null);
                        billStore.commitChanges();
                        me.refreshInfo();
                        record.commit();
                    }
                    document.getElementById('start_layer_2').style.display = 'none';
                }
            });

        } else if (isUpload == '0') {
            record.set('HospitalId', Fm.Server.CurrentUser.OrgId);
            Ext.Ajax.request({
                url: '/group/Medical/UpdateMedical',//UpdateMedicalByAdmissionNo//UpdateMedical
                method: 'post',
                params: { uParams: Ext.util.JSON.encode([record.data]), webLogParam: Ext.util.JSON.encode({ OperContent: Ext.util.JSON.encode(changeValues) }) },
                success: function (res) {
                    var resText = Ext.util.JSON.decode(res.responseText);
                    if (resText.StatusCode === 0) {
                        Fm.msg.info('修改病案主页成功');
                        record.commit();
                    }
                    document.getElementById('start_layer_2').style.display = 'none';
                }
            });
        } else {
            document.getElementById('start_layer_2').style.display = 'none';
            Fm.msg.info("病案已填报完成无法修改");
        }

    },
    //选择入院时间
    selectSDate: function () {
        var me = this,
            sDateComp = me.getView().down('datetimefield[name=sDate]'),
            eDateComp = me.getView().down('datetimefield[name=eDate]');
        var startDate = sDateComp.getValue();
        var endDate = eDateComp.getValue();
        if (endDate)
            if (startDate > endDate) {
                sDateComp.setValue('');
                Fm.msg.error('入院时间不能大于出院时间');
            }
    },
    //选择出院时间
    selectEDate: function () {
        var me = this,
           sDateComp = me.getView().down('datetimefield[name=sDate]'),
           eDateComp = me.getView().down('datetimefield[name=eDate]');
        var startDate = sDateComp.getValue();
        var endDate = eDateComp.getValue();
        if (endDate < startDate) {
            eDateComp.setValue('');
            Fm.msg.error('入院时间不能大于出院时间');
        }
    },
    refreshInfo: function () {
        var me = this,
       vm = me.getView().up('drgsapi_report').down('drgsapi_medical').getViewModel(),
       focus = vm.get('focus'),
       topview = this.getView().up("drgsapi_report"),
             operation = topview.down('drgsapi_report_operation'),
           operationVm = operation.getViewModel().set('medicalRecord', focus)
        checkView = topview.down('CisApp_drgsapi_report_check'),
        checkViewVm = checkView.getViewModel().set('medicalRecord', focus);
        operation.getController().refresh();
        checkView.getController().refresh();
    },

    setAdmissionDiseaseId: function (obj, value) {
        if (value != null && typeof (value) == 'string') {
            var str = value.split('>||<');
            if (str.length === 2) {
                var diagnosisCode = this.getView().down('textfield[name=admissionDiseaseId]');
                var diagnosisName = this.getView().down('textfield[name=admissionDiseaseName]');
                diagnosisCode.setValue(str[0]);
                diagnosisName.setValue(str[1]);
            }
        }
    },
    setDischargeDiseaseId: function (obj, value) {
        if (value != null && typeof (value) == 'string') {
            var str = value.split('>||<');
            if (str.length === 2) {
                var diagnosisCode = this.getView().down('textfield[name=dischargeDiseaseId]');
                var diagnosisName = this.getView().down('textfield[name=dischargeDiseaseName]');
                diagnosisCode.setValue(str[0]);
                diagnosisName.setValue(str[1]);
            }
        }
    },
    //16个诊断
    setDiagnosisCode1: function (obj, value) {
        if (value != null && typeof (value) == 'string') {
            var str = value.split('>||<');
            if (str.length === 2) {
                var diagnosisCode = this.getView().down('textfield[name=diagnosisCode1]');
                var diagnosisName = this.getView().down('textfield[name=diagnosisName1]');
                diagnosisCode.setValue(str[0]);
                diagnosisName.setValue(str[1]);
            }
        }
    },
    setDiagnosisCode2: function (obj, value) {
        if (value != null && typeof (value) == 'string') {
            var str = value.split('>||<');
            if (str.length === 2) {
                var diagnosisCode = this.getView().down('textfield[name=diagnosisCode2]');
                var diagnosisName = this.getView().down('textfield[name=diagnosisName2]');
                diagnosisCode.setValue(str[0]);
                diagnosisName.setValue(str[1]);
            }
        }
    },
    setDiagnosisCode3: function (obj, value) {
        if (value != null && typeof (value) == 'string') {
            var str = value.split('>||<');
            if (str.length === 2) {
                var diagnosisCode = this.getView().down('textfield[name=diagnosisCode3]');
                var diagnosisName = this.getView().down('textfield[name=diagnosisName3]');
                diagnosisCode.setValue(str[0]);
                diagnosisName.setValue(str[1]);
            }
        }
    },
    setDiagnosisCode4: function (obj, value) {
        if (value != null && typeof (value) == 'string') {
            var str = value.split('>||<');
            if (str.length === 2) {
                var diagnosisCode = this.getView().down('textfield[name=diagnosisCode4]');
                var diagnosisName = this.getView().down('textfield[name=diagnosisName4]');
                diagnosisCode.setValue(str[0]);
                diagnosisName.setValue(str[1]);
            }
        }
    },
    setDiagnosisCode5: function (obj, value) {
        if (value != null && typeof (value) == 'string') {
            var str = value.split('>||<');
            if (str.length === 2) {
                var diagnosisCode = this.getView().down('textfield[name=diagnosisCode5]');
                var diagnosisName = this.getView().down('textfield[name=diagnosisName5]');
                diagnosisCode.setValue(str[0]);
                diagnosisName.setValue(str[1]);
            }
        }
    },
    setDiagnosisCode6: function (obj, value) {
        if (value != null && typeof (value) == 'string') {
            var str = value.split('>||<');
            if (str.length === 2) {
                var diagnosisCode = this.getView().down('textfield[name=diagnosisCode6]');
                var diagnosisName = this.getView().down('textfield[name=diagnosisName6]');
                diagnosisCode.setValue(str[0]);
                diagnosisName.setValue(str[1]);
            }
        }
    },
    setDiagnosisCode7: function (obj, value) {
        if (value != null && typeof (value) == 'string') {
            var str = value.split('>||<');
            if (str.length === 2) {
                var diagnosisCode = this.getView().down('textfield[name=diagnosisCode7]');
                var diagnosisName = this.getView().down('textfield[name=diagnosisName7]');
                diagnosisCode.setValue(str[0]);
                diagnosisName.setValue(str[1]);
            }
        }
    },
    setDiagnosisCode8: function (obj, value) {
        if (value != null && typeof (value) == 'string') {
            var str = value.split('>||<');
            if (str.length === 2) {
                var diagnosisCode = this.getView().down('textfield[name=diagnosisCode8]');
                var diagnosisName = this.getView().down('textfield[name=diagnosisName8]');
                diagnosisCode.setValue(str[0]);
                diagnosisName.setValue(str[1]);
            }
        }
    },
    setDiagnosisCode9: function (obj, value) {
        if (value != null && typeof (value) == 'string') {
            var str = value.split('>||<');
            if (str.length === 2) {
                var diagnosisCode = this.getView().down('textfield[name=diagnosisCode9]');
                var diagnosisName = this.getView().down('textfield[name=diagnosisName9]');
                diagnosisCode.setValue(str[0]);
                diagnosisName.setValue(str[1]);
            }
        }
    },
    setDiagnosisCode10: function (obj, value) {
        if (value != null && typeof (value) == 'string') {
            var str = value.split('>||<');
            if (str.length === 2) {
                var diagnosisCode = this.getView().down('textfield[name=diagnosisCode10]');
                var diagnosisName = this.getView().down('textfield[name=diagnosisName10]');
                diagnosisCode.setValue(str[0]);
                diagnosisName.setValue(str[1]);
            }
        }
    },
    setDiagnosisCode11: function (obj, value) {
        if (value != null && typeof (value) == 'string') {
            var str = value.split('>||<');
            if (str.length === 2) {
                var diagnosisCode = this.getView().down('textfield[name=diagnosisCode11]');
                var diagnosisName = this.getView().down('textfield[name=diagnosisName11]');
                diagnosisCode.setValue(str[0]);
                diagnosisName.setValue(str[1]);
            }
        }
    },
    setDiagnosisCode12: function (obj, value) {
        if (value != null && typeof (value) == 'string') {
            var str = value.split('>||<');
            if (str.length === 2) {
                var diagnosisCode = this.getView().down('textfield[name=diagnosisCode12]');
                var diagnosisName = this.getView().down('textfield[name=diagnosisName12]');
                diagnosisCode.setValue(str[0]);
                diagnosisName.setValue(str[1]);
            }
        } 
    },
    setDiagnosisCode13: function (obj, value) {
        if (value != null && typeof (value) == 'string') {
            var str = value.split('>||<');
            if (str.length === 2) {
                var diagnosisCode = this.getView().down('textfield[name=diagnosisCode13]');
                var diagnosisName = this.getView().down('textfield[name=diagnosisName13]');
                diagnosisCode.setValue(str[0]);
                diagnosisName.setValue(str[1]);
            }
        }
    },
    setDiagnosisCode14: function (obj, value) {
        if (value != null && typeof (value) == 'string') {
            var str = value.split('>||<');
            if (str.length === 2) {
                var diagnosisCode = this.getView().down('textfield[name=diagnosisCode14]');
                var diagnosisName = this.getView().down('textfield[name=diagnosisName14]');
                diagnosisCode.setValue(str[0]);
                diagnosisName.setValue(str[1]);
            }
        }
    },
    setDiagnosisCode15: function (obj, value) {
        if (value != null && typeof (value) == 'string') {
            var str = value.split('>||<');
            if (str.length === 2) {
                var diagnosisCode = this.getView().down('textfield[name=diagnosisCode15]');
                var diagnosisName = this.getView().down('textfield[name=diagnosisName15]');
                diagnosisCode.setValue(str[0]);
                diagnosisName.setValue(str[1]);
            }
        }
    },
    setDiagnosisCode16: function (obj, value) {
        if (value != null && typeof (value) == 'string') {
            var str = value.split('>||<');
            if (str.length === 2) {
                var diagnosisCode = this.getView().down('textfield[name=diagnosisCode16]');
                var diagnosisName = this.getView().down('textfield[name=diagnosisName16]');
                diagnosisCode.setValue(str[0]);
                diagnosisName.setValue(str[1]);
            }
        }
    },
    //医生
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
    //键盘事件
    keyMap: function (obj) {
        var me = this;
        var keyMap = new Ext.util.KeyMap({
            target: me.getView().getEl(),//Ext.getBody(),
            binding: [{
                key: Ext.event.Event.DOWN,
                fn: function () { },
                defaultEventAction: "stopEvent"
            },
            {
                key: Ext.event.Event.S,
                ctrl: true,
                fn: function () {
                    if (me.getView('form').isValid()) {
                        me.addMedical();
                    }
                    return;
                },
                defaultEventAction: "stopEvent"
            }]
        });
        keyMap.enable();
    },
    activateFocus: function () {
        var me = this;
        me.getView().down('combo[name=Tsbllbs]').focus();
    }
});