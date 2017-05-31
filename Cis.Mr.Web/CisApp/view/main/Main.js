/* ***********************************************
 * author :  苗建龙
 * function: 主框架
 * history:  created by 苗建龙 2015/7/1 14:12:21 
 * ***********************************************/

Ext.define('CisApp.view.main.Top', {
    extend: 'Ext.toolbar.Toolbar',
    requires: [
       // 'FmApp.view.sys.suspend.Suspend'
    ],
    xtype: 'CisApp-top',
    border: false,
    frame: false,
    height: 48,
    padding: 0,
    cls: 'cisapp-main-top',
    defaults: {
        style: {
            backgroundColor: 'transparent'
        },
        focusable: false,
        border: 0,
        listeners: {
            mouseover: function () {
                if (this.menu && this.menu.hidden) {
                    this.showMenu();
                }
            }
        }
    },
    items: [{
        xtype: 'label',
        html: [
            '<span class="main-top-span">',
                //'<b class="fa fa-cogs fa-cogs-icon"></b>',
                '<div class="main-top-logo">',
                    '<svg width="34" height="34"><image xlink:href="/images/128x128_api.png" src="/images/logo34x34.png" width="34" height="34" alt="新版本审核系统" /></svg>',
                '</div>',
                '<div class="main-top-title">新版本审核系统</div>',
                '<div class="main-top-version">V7.5</div>',
            '</span>'
        ]
    }
    ,
    '->',
    {
        xtype: 'button',
        menuAlign: 'tr-br?',
        text: '<i class="iconfont icon-user x_fa_user"></i>' + "User",
        menu: {
            items: [
                {
                    //xtype: 'fmsys_suspend',
                    //showModifyUser: true,
                    //showHelpDoc: false,
                    //helpDocUrl: AppConfig.urlStartWith + "shared/BaseData/GetFileFullPathByFileName?fileName=" + encodeURIComponent('病案信息填报系统-用户手册.doc') + "&fileClass=Doc"
                }
            ],
            listeners: {
                mouseleave: function () {
                    this.hide();
                }
            }
        }
    }]
});

Ext.define('CisApp.view.main.Left', {
    extend: 'Ext.panel.Panel',
    xtype: 'CisApp-mainleft',
    requires: [
       // 'Fm.ux.button.ImageButton'
    ],
    padding: 0,
    //隐藏左侧菜单
    //hidden: true,
    //listeners: {
    //    afterRender: function () {
    //        Cookie.set("main-left-panel-api", 'true');
    //    },
    //},
    border: false,
    scrollable: 'y',
    collapsible: false,
    cls: 'main-left-panel',
    width: 220,
    dockedItems: [{
        xtype: 'toolbar',
        dock: 'top',
        padding: 0,
        maigin: 0,
        height: 33,
        items: ['->', {
            xtype: 'button',
            handler: 'toggleMenu',
            scale: 'large',
            width: 44,
            cls: 'main-left-panel-togglemenu',
            iconCls: 'fa fa-angle-left',
            overCls: '',
            focusCls: '',
            margin: '0 0 0 -20',
            style: { backgroundColor: 'black' }
        }]
    }
    ],
    items: [
        {
            xtype: "treelist",
            ui: "nav",
            store: Ext.create('Ext.data.TreeStore', {
                root: {
                    expanded: true,
                    children: CisApp.Common.Core.Shared.getMenuData()
                }
            }),
            singleExpand: true,
            expanderOnly: false,
            selected: true,
            selectedParent: true,
            //micro: AppConfig.Design.Menu.Pressed,
            listeners: {
                itemclick: "leftMenuItemClick"
            },
            defaults: {
                xtype: 'treelistitem',
                isSelectionEvent: function (e) {
                    var me = this,
                        owner = this.getOwner();

                    owner.fireEvent('itemclick', owner, me.getNode());
                    return false;
                }
            },
            floatItem: function (item, byHover) {
                var me = this,
                    floater;

                if (item.getFloated()) {
                    return;
                }

                me.unfloatAll();

                me.activeFloater = floater = item;
                me.floatedByHover = byHover;

                item.setFloated(true);

                if (byHover) {
                    item.getToolElement().on('mouseleave', me.checkForMouseLeave, me);
                    floater.element.on('mouseleave', me.checkForMouseLeave, me);
                } else {
                    Ext.on('mousedown', me.checkForOutsideClick, me);
                }

                //修正IE下不影藏浮动菜单的问题
                //if (Ext.isIE()) {
                floater.element.on('mouseout', me.checkForMouseLeave, me);
                //}
            }
        }
    ]
});

Ext.define("CisApp.view.main.Tab", {
    extend: 'Ext.tab.Panel',
    requires: [
        //'Fm.ux.TabCloseMenu'
    ],
    xtype: 'CisApp-maintab',
    id: "ViewPortCoreTab",
    activeTab: 0,
    //隐藏title
    //hidden:true,
    enableTabScroll: true,
    autoScroll: false,
    //分辨率不能低于1024
    minWidth: 800,
    //tabPosition: "left",
    cls: 'CisApp-maintab',
    //ui: "cis",
    items: [
    {
        id: 'main_tab_0',
        menuId: 0,
        title: "首页",
        xtype: 'container',
        border: false,
        frame: false,
        hidden: false
    }],
    plugins: [
        Ext.create('Fm.ux.TabCloseMenu', {
            closeTabText: '关闭面板',
            closeOthersTabsText: '关闭其他面板',
            closeAllTabsText: '关闭所有面板'
        })
    ],
    listeners: {
        tabchange: 'tabChange'
    }
});

Ext.define('CisApp.view.main.Bottom', {
    extend: 'Ext.toolbar.Toolbar',
    xtype: 'CisApp-mainbottom',
    border: 0,
    frame: false,
    items: [{
        xtype: 'container', msgarea: 'msgarea', items: []
    }, '->', {
        xtype: 'label',
        text: '版权所有:中公网医疗信息技术有限公司 版本:v7.5'
    }]
});

Ext.define('CisApp.view.main.Main', {
    extend: 'Ext.container.Container',
    requires: [
        "CisApp.view.main.MainController",
        "CisApp.view.main.MainModel"
    ],
    xtype: 'CisApp-main',
    controller: 'main',
    viewModel: {
        type: 'main'
    },
    layout: {
        type: 'border'
    },
    listeners: {
         afterRender: 'mainRender',
        // resize: 'mainResize'
    },
    items: [
        {
            xtype: 'CisApp-top',
            region: 'north',
            split: false
        }, {
            xtype: 'CisApp-mainleft',
            region: 'west',
            split: false
        }, {
            xtype: 'CisApp-maintab',
            region: "center",
            padding: '0 8 8'
        }, {
            xtype: 'CisApp-mainbottom',
            region: 'south',
            border: 1
        }
    ]
});
