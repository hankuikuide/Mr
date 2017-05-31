/* ***********************************************
 * author :  苗建龙
 * function: 主框架
 * history:  created by 苗建龙 2015/7/31 13:54:07 
 * ***********************************************/
Ext.define('CisApp.view.main.MainController', {
    extend: 'Ext.app.ViewController',

    alias: 'controller.main',
    xtypeStartWith: 'CisApp',
    /**
     * main render后执行
     */
    mainRender: function () {
        var me = this;

        Ext.History.init();
        Ext.History.on('change', function (code) {
            var mid = code;
            if (!mid) {
                mid = 0;
            }
            me.openNewTab(mid);
        });

        var code = Ext.History.getToken();
        if (!code || code.toString() === '0') {
            code = AppConfig.defaultMenuId;
        }

        if (code) {
            var exp = setInterval(function () {
                if (application) {
                    clearInterval(exp);
                    me.openNewTab(code);
                }
            }, 30);
        }
    },
    /**
     * 左菜单点击
     */
    leftMenuItemClick: function (view, record) {
        var me = this,
            treelist = view,
            record = record.get ? record : record.item.getNode();

        var _isLeaf = record.get('leaf') || false;
        if (_isLeaf) {
            if (record.get('Handler') === 'openNewTab') {

                Ext.History.add(record.get('Id'));
            } else if (record.get('Handler') === 'chooseTheme') {
                me.chooseTheme(view, record);
            } else if (record.get('Handler') === 'downLoadFile') {

                me.downLoadFile(record.get('ViewParams'));
            }
        }
    },
    /**
   * 根据菜单编号打开一个标签
   */
    openNewTab: function (menuId, data) {
        var me = this,
            view = me.getView(),
            menuData,
            main = view.down(me.xtypeStartWith + "-maintab"),
            treelist = view.down(me.xtypeStartWith + '-mainleft').down('treelist'),
            store = treelist.getStore(),
            record;

        me.deSelectMenuById(me.lastSelectedRecord);

        if (menuId.toString() === '0') {
            main.setActiveTab(Ext.getCmp('main_tab_0'));
            return false;
        }

        menuData = Ext.Array.findBy(CisApp.Server.Datas.Menus, function (item) {
            return item.Id.toString() === menuId.toString();
        });

        if (!menuData) {
            //Fm.msg.error('没有权限查看此页面。');
            return false;
        }

        if (menuData.ParentId !== 0) {
            record = store.getAt(store.findBy(function (record) {
                return record.get('Id') == menuData.ParentId;
            }));

            if (record) {
                treelist.getItem(record).expand();
            }
        }

        me.selectMenuById(menuId);

        var id = 'main_tab_' + menuData['Id'];

        var panel = Ext.getCmp(id);
        try {
            if (!panel) {
                application.globalMask.show();
                setTimeout(function () {
                    try {
                        panel = Ext.create(menuData['MenuView'], {
                            id: id,
                            menuId: menuId,
                            closable: true,
                            //glyph: menuData['glyph'],
                            iconCls: menuData['iconCls'],
                            closeAction: 'destroy',
                            autoDestroy: true,
                            title: menuData['Name'],
                            cls: 'cis-panel-default',
                            frame: false,
                            border: false,
                            maskParam: (menuData['ViewParams'] || {}).maskParam,
                            viewParams: menuData['ViewParams'],
                            listeners: {
                                afterrender: function (v) {
                                    application.globalMask.hide();
                                    if (data && panel[data.event]) {
                                        panel[data.event].call(panel, data.params)
                                    }
                                }
                            }
                        });
                    } catch (e) {
                        Ext.log.error(e.stack);
                    }

                    if (panel) {
                        main.add(panel);
                        main.setActiveTab(panel);
                    }
                }, 10);
            } else {
                main.setActiveTab(panel);
                if (data && panel[data.event]) {
                    panel[data.event].call(panel, data.params)
                }
            }
        } catch (e) {
            Ext.log.error(e.stack);
        }
    },
    deSelectMenuById: function (record) {
        var me = this,
            treelist = me.getView().down('treelist');

        if (record) {
            treelist.getItem(record).updateSelected(false);
        }
    },
    selectMenuById: function (mid) {
        var me = this,
            treelist = me.getView().down('treelist'),
            treelistStore = treelist.getStore(),
            record;

        record = treelistStore.getAt(treelistStore.findBy(function (record) {
            return record.get('Id') == mid;
        }));

        if (record) {
            treelist.getItem(record).updateSelected(true);
            me.lastSelectedRecord = record;
        }
    },
    /**
 * 标签切换
 */
    tabChange: function (v, tab) {
        var me = this,
            view = me.getView(),
            msgarea;

        if (tab.menuId !== null && tab.menuId !== undefined) {
            var code = tab.menuId;
            Ext.History.add(code);
            try {
                var msgarea = view.down('container[msgarea=msgarea]');
                msgarea.removeAll(true);
                if (tab.msgItems) {
                    msgarea.add(tab.msgItems);
                }
            } catch (e) { }
            return false;
        }
    },
    /*
     * 
     * 下载帮助附件 
     */
    downLoadFile: function (param) {
        var docName = "";
        var outPutName = "";
        var uType = Fm.Server.CurrentUser.UserType;

        //系统日志提取
        if (param && param.viewKey === "syslog") {
            window.open(param.actionPath);
            return;
        }

        if (uType === "2") {//医院
            docName = "病案信息填报系统-用户手册.doc";
            //outPutName = CisApp.Lang.PublicHelpName;
        } else if (uType === "1") {
            docName = "病案信息填报系统-用户手册.doc";
            //outPutName = CisApp.Lang.MedReviewHelpName;
        }

        var helpDocUrl = AppConfig.urlStartWith + "shared/BaseData/GetFileFullPathByFileName?fileName=" + encodeURIComponent(docName)
            + "&fileClass=Doc&outPutName=" + encodeURIComponent(outPutName);

        window.open(helpDocUrl);
    }
});