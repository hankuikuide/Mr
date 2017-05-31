/* ***********************************************
 * author :  sunqiang
 * function: 住院医嘱
 * history:  created by sunqiang 2016/4/19 13:46:04 
 * ***********************************************/
Ext.define("CisApp.view.drgsapi.report.hostpitaladvice.HostpitalAdvice", {
    extend: 'Fm.base.Grid',
    alias: 'widget.drgsapi_report_hostpitalAdvice',
    requires: [
        'CisApp.view.drgsapi.report.hostpitaladvice.HostpitalAdviceController',
        'CisApp.view.drgsapi.report.hostpitaladvice.HostpitalAdviceModel',
        'Fm.ux.grid.plugin.ClickSelection'
    ],
    controller: 'drgsapi_report_hostpitalAdvice',
    viewModel: {
        type: 'drgsapi_report_hostpitalAdvice'
    },
    plugins: [{
        ptype: 'clickselection'
    }],
    bind: {
        store: '{hostpitalAdvice}',
        clickSelection: '{hospitaladviceRecord}'
    },
    loadMask: false,
    isPage: false, 
    columns: [
        { xtype: 'rownumberer', text: '序号' },
        //{ header: '序号', header:'', 'Id' },
        //{ header: '定点机构编码', header:'', 'OrgCode' },
        //{ header: '社保卡号', header:'', 'PatientId' },
        //{ header: '住院号', header:'', 'AdmissionNo' },
        //{ header: '医嘱序号', header:'', 'DoctorAdviceNo' },
        //{ header: '医嘱子序号', header:'', 'DoctorAdviceSNo' },
        //{ header: '交易流水号', header:'', 'TradeNo' },
        //{ header: '是否上传', header:'', 'IsUpload' },
        //{ header: '定点机构编码', dataIndex: 'OrgCode' },// 定点机构编码*
        //{ header: '社保卡号', dataIndex: 'PatientId' },// 社保卡号*
        //{ header: '住院号', dataIndex: 'AdmissionNo' },// 住院号*
        { header: '医嘱序号', dataIndex: 'DoctorAdviceNo' },// 医嘱序号
        { header: '医嘱子序号', dataIndex: 'DoctorAdviceSNo' },// 医嘱子序号
        { header: '医嘱状态', dataIndex: 'DoctorAdviceState' },// 医嘱状态
        { header: '长期医嘱标识', dataIndex: 'IsLDoctorAdvice' },// 长期医嘱标识
        { header: '医嘱类别', dataIndex: 'DoctorAdviceType' },// 医嘱类别
        { header: '医嘱正文', dataIndex: 'DoctorAdviceContent' },// 医嘱正文
        { header: '医嘱代码', dataIndex: 'DoctorAdviceCode' },// 医嘱代码
        { header: '药品一次使用剂量', dataIndex: 'DrugsMetering' },// 药品一次使用剂量
        { header: '剂量单位', dataIndex: 'MeteringUnit' },// 剂量单位
        { header: '给药途径', dataIndex: 'MeteringChannelName' },// 给药途径
        { header: '起始日期时间', dataIndex: 'StartDate', renderer: CisApp.Common.Util.dateTextRender(), width: 150 },// 起始日期时间
        { header: '停止日期时间', dataIndex: 'EndDate', renderer: CisApp.Common.Util.dateTextRender(), width: 150 },// 停止日期时间
        { header: '持续时间', dataIndex: 'ContinuedDate' },// 持续时间
        { header: '持续时间单位', dataIndex: 'ContinuedDateUnit' },// 持续时间单位
        { header: '使用频次', dataIndex: 'FrequencyName' },// 使用频次
        { header: '开医嘱科室', dataIndex: 'Department' },// 开医嘱科室
        { header: '开医嘱医生编码', dataIndex: 'StartDepartmentDoctor' },// 开医嘱医生
        { header: '开医嘱医生姓名', dataIndex: 'StartDepartmentDoctorName' },// 开医嘱医生
        { header: '停医嘱医生编码', dataIndex: 'EndDepartmentDoctor' },// 停医嘱医生
        { header: '停医嘱医生姓名', dataIndex: 'EndDepartmentDoctorName' },// 停医嘱医生
        { header: '开医嘱校对护士姓名', dataIndex: 'StartDepartmentNurse' },// 开医嘱校对护士姓名
        { header: '停医嘱校对护士姓名', dataIndex: 'EndDepartmentNurse' },// 停医嘱校对护士姓名
        { header: '开医嘱录入日期时间', dataIndex: 'StartDoctorAdviceDate', renderer: CisApp.Common.Util.dateTextRender(), width: 150 },// 开医嘱录入日期时间
        { header: '停医嘱录入日期时间', dataIndex: 'EndDoctorAdviceDate', renderer: CisApp.Common.Util.dateTextRender(), width: 150 },// 停医嘱录入日期时间
        { header: '交易流水号', dataIndex: 'TradeNo' }// 交易流水号*
    ],
    listeners: {
        itemdblclick: 'onChange'
    },
    buttons: [{
        xtype: 'button',
        text: '新增',
        handler: 'onAdd',
        bind: {
            disabled: '{btnDisabledAdd}'
        }
    }, {
        xtype: 'button',
        text: '修改',
        handler: 'onChange',
        bind: {
            disabled: '{btnDisabled}'
        }
    }, {
        xtype: 'button',
        text: '删除',
        handler: "toDelete",
        bind: {
            disabled: '{btnDisabled}'
        }
    }
    ],
    initComponent: function() {
        var me = this;
        me.callParent(arguments);
    }
});