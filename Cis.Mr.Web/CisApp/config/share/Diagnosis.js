/* ***********************************************
 * author :  sunqiang
 * function: 疾病查询配置
 * history:  created by sunqiang 
 * ***********************************************/

Ext.ns('CisApp.Config.share.Diagnosis');
CisApp.Config.share.Diagnosis = {
    Lists: function () {
        return [
            { configIndex: 0, header: '序号', dataIndex: 'NumRow', width: 50, align: 'center', configMustShow: true },
            { configIndex: 1, header: '编码', dataIndex: 'GenericCode', flex: 2, configMustShow: true, showTip: true },
            { configIndex: 2, header: '名称', dataIndex: 'GenericName', flex: 2, align: 'left', configMustShow: true, showTip: true },
            { configIndex: 3, header: '拼音缩写', dataIndex: 'MnemonicCode', flex: 2, align: 'left', configMustShow: true }//,
            //{ configIndex: 4, header: '疾病分类', dataIndex: 'DiseaseClass', flex: 2, align: 'left', configMustShow: true }
            //{ configIndex: 5, header: '慢性病编码', dataIndex: 'SpecialCode', width: 120, configMustShow: true },
            //{ configIndex: 6, header: '慢性病名称', dataIndex: 'SpecialName', width: 120, configMustShow: true },
            //{
            //    configIndex: 7, header: '备注', dataIndex: 'Remark', width: 120,
            //    renderer: function (value, metaData) {
            //        if (metaData) { metaData.tdAttr = 'data-qtip="' + value + '"'; }
            //        return value;
            //    }, configMustShow: true
            //}
        ];
    }
};