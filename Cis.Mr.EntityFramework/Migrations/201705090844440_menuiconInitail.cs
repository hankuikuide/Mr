namespace Cis.Mr.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class menuiconInitail : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.Menus", "Icon", c => c.String(unicode: false));
        }
        
        public override void Down()
        {
            DropColumn("dbo.Menus", "Icon");
        }
    }
}
