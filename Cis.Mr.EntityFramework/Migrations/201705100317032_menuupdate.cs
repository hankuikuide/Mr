namespace Cis.Mr.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class menuupdate : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.Menus", "Name", c => c.String(unicode: false));
            AddColumn("dbo.Menus", "ViewParams", c => c.String(unicode: false));
            AddColumn("dbo.Menus", "ValidateCode", c => c.String(unicode: false));
            AddColumn("dbo.Menus", "Handler", c => c.String(unicode: false));
            AddColumn("dbo.Menus", "MenuView", c => c.String(unicode: false));
            AddColumn("dbo.Menus", "OperationType", c => c.String(unicode: false));
            AddColumn("dbo.Menus", "SysAppKey", c => c.String(unicode: false));
            DropColumn("dbo.Menus", "MenuId");
            DropColumn("dbo.Menus", "MenuName");
            DropColumn("dbo.Menus", "MenuCode");
            DropColumn("dbo.Menus", "EMenuName");
            DropColumn("dbo.Menus", "MenuCodeNew");
        }
        
        public override void Down()
        {
            AddColumn("dbo.Menus", "MenuCodeNew", c => c.String(unicode: false));
            AddColumn("dbo.Menus", "EMenuName", c => c.String(unicode: false));
            AddColumn("dbo.Menus", "MenuCode", c => c.String(unicode: false));
            AddColumn("dbo.Menus", "MenuName", c => c.String(unicode: false));
            AddColumn("dbo.Menus", "MenuId", c => c.Int(nullable: false));
            DropColumn("dbo.Menus", "SysAppKey");
            DropColumn("dbo.Menus", "OperationType");
            DropColumn("dbo.Menus", "MenuView");
            DropColumn("dbo.Menus", "Handler");
            DropColumn("dbo.Menus", "ValidateCode");
            DropColumn("dbo.Menus", "ViewParams");
            DropColumn("dbo.Menus", "Name");
        }
    }
}
