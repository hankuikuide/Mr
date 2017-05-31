Ext.define("CisApp.view.shared.department.Department", {
    extend: 'Ext.tree.Panel',
    alias: 'widget.grid',
    requires: [
        'CisApp.view.shared.department.DepartmentController',
        'CisApp.view.shared.department.DepartmentModel'//,
        //'Fm.ux.grid.plugin.ClickSelection'
    ],
    controller: 'shared_department',
    viewModel: {
        type: 'shared_department'
    },
    id: 'shared_department',
    useArrows: true,
    rootVisible: false,
    multiSelect: true,
    singleExpand: true,
    border: false,
    layout: 'fit',
    bind: {
        store: '{departmentList}'
    },
    //plugins: [{
    //    ptype: 'clickselection'
    //}],
    notAutoWidth: true,
    columns: [
         {
             xtype: 'treecolumn',
             text: '科室名称',
             flex: 2,
             sortable: true,
             dataIndex: 'DepartmentText'
         }
         //,
         //{
         //    xtype: 'treecolumn', 
         //    text: '科室代码',
         //    flex: 2,
         //   // sortable: true,
         //    dataIndex: 'DepartmentValue'
         //}
    ],
    listeners: {
        afterrender: function () {
            setTimeout(function () {
                var cmp1 = Ext.getCmp('shared_department'),
                model1 = cmp1.getSelectionModel();
                var row1 = cmp1.getView().getRow(0);
                if (row1) {
                    row1.childNodes[0].click();
                }
            }, 10);
        }
    },
    initComponent: function () {
        var me = this;
        me.callParent(arguments);
    }
});
/* ***********************************************
 * author :  likeyi
 * function: 
 * history:  created by likeyi 2016/7/27 17:35:55 
 * ***********************************************/
Ext.define("CisApp.view.shared.department.DepartmentCombo", {
    alias: 'widget.shared_departmentcombo',
    extend: 'Fm.ux.form.WindowField',
    fieldLabel: '申请科室',
    multiSelect: false,//控制单选多选
    valueIsString: false,
    windowTitle: '申请科室',
    winHeight: 400,
    winWidth: 250,
    showClearTriggers: true,//是否显示清除按钮
    minPickerWidth: 500,
    displayField: 'DepartmentText', //显示的值CodeAndName GenericCode
    valueField: 'DepartmentValue',//返回的值
    triggerCls: Ext.baseCSSPrefix + 'cis-diag-trigger',
    isPopWindow: true,
    initComponent: function () {
        var me = this;
        me.innerGrid = {
            xtype: "grid",
            isShowCheck: me.multiSelect,
            width: 250,
            height: 400
        };
        me.callParent(arguments);
    }
});