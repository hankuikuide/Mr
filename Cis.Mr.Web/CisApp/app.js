

Ext.application({
    name: 'CisApp',
    appFolder: 'CisApp',
    extend: 'Ext.app.Application',
    enabled: true,
    requires: [
        'Ext.window.MessageBox'
    ],
    autoCreateViewport: 'CisApp.view.main.Main',
    launch: function () {
        Ext.tip.QuickTipManager.init();
        application = this;

        application.globalMask = new Ext.LoadMask({
            msg: AppConfig.maskHtml,
            style: {
                backgroundColor: 'rgba(255, 255, 255, 0.5);',
                zIndex: '90000000'
            },
            border: false,
            target: application.getMainView()
        });

        document.getElementById('start_main').style.display = "none";

    }
});