namespace Cis.Mr.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class menutypeInitail : DbMigration
    {
        public override void Up()
        {
            AlterColumn("dbo.Menus", "MenuId", c => c.Int(nullable: false));
            AlterColumn("dbo.Menus", "Sort", c => c.Int(nullable: false));
            AlterColumn("dbo.Menus", "ParentId", c => c.Int(nullable: false));
        }
        
        public override void Down()
        {
            AlterColumn("dbo.Menus", "ParentId", c => c.Decimal(nullable: false, precision: 18, scale: 2));
            AlterColumn("dbo.Menus", "Sort", c => c.Decimal(nullable: false, precision: 18, scale: 2));
            AlterColumn("dbo.Menus", "MenuId", c => c.Decimal(nullable: false, precision: 18, scale: 2));
        }
    }
}
