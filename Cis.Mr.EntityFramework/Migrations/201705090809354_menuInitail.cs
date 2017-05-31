namespace Cis.Mr.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class menuInitail : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.Menus",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        MenuId = c.Decimal(nullable: false, precision: 18, scale: 2),
                        MenuName = c.String(unicode: false),
                        MenuCode = c.String(unicode: false),
                        MenuType = c.String(unicode: false),
                        Sort = c.Decimal(nullable: false, precision: 18, scale: 2),
                        ParentId = c.Decimal(nullable: false, precision: 18, scale: 2),
                        Remark = c.String(unicode: false),
                        State = c.String(unicode: false),
                        EMenuName = c.String(unicode: false),
                        MenuCodeNew = c.String(unicode: false),
                    })
                .PrimaryKey(t => t.Id);
            
        }
        
        public override void Down()
        {
            DropTable("dbo.Menus");
        }
    }
}
