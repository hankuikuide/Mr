/* ***********************************************
 * author :  likeyi
 * function: 
 * history:  created by likeyi 2016/7/27 17:35:55 
 * ***********************************************/
Ext.define('CisApp.view.shared.department.DepartmentModel', {
    extend: 'Ext.app.ViewModel',
    requires: [
    ],
    stores: {
        folderSort: true,
        departmentList: Ext.create('Ext.data.TreeStore', {
            root: {
                children: (function () {
                    var data = CisApp.Server.Datas.departmentTree;
                    var getarray = function (data, _text) {
                        var cg = [];
                        if (data) {
                            for (var i = 0; i < data.length; i++) {
                                if (Ext.isArray(data[i].Children)) {
                                    cg[i] = {
                                        DepartmentText: data[i].Name,
                                        DepartmentValue: data[i].Code + ">||<" + data[i].Name,
                                        leaf: false,
                                        expanded: false,
                                        // checked: false,
                                        children: getarray(data[i].Children, data[i].Name)
                                    };
                                } else {
                                    cg[i] = {
                                        DepartmentValue: data[i].Code + ">||<" + data[i].Name,
                                        DepartmentText: data[i].Name,
                                        leaf: true,
                                        // checked: false
                                    };
                                }
                            }
                        }
                        return cg;
                    };
                    return getarray(data);

                })()
            }
        })
    },
    alias: 'viewmodel.shared_department'
});