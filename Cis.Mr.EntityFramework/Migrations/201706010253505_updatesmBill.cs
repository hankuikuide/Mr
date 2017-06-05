namespace Cis.Mr.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class updatesmBill : DbMigration
    {
        public override void Up()
        {
            DropColumn("dbo.TdSmBills", "DrgsRejectmoney");
            DropColumn("dbo.TdSmBills", "RejectPoint");
            DropColumn("dbo.TdSmBills", "SelfPayMoney");
            DropColumn("dbo.TdSmBills", "SelfCareMoney");
            DropColumn("dbo.TdSmBills", "FundType");
            DropColumn("dbo.TdSmBills", "SNumber01");
            DropColumn("dbo.TdSmBills", "SNumber02");
            DropColumn("dbo.TdSmBills", "SNumber03");
            DropColumn("dbo.TdSmBills", "SNumber04");
            DropColumn("dbo.TdSmBills", "SNumber05");
            DropColumn("dbo.TdSmBills", "SNumber06");
            DropColumn("dbo.TdSmBills", "SNumber07");
            DropColumn("dbo.TdSmBills", "SNumber08");
            DropColumn("dbo.TdSmBills", "SNumber09");
            DropColumn("dbo.TdSmBills", "SNumber10");
            DropColumn("dbo.TdSmBills", "SNumber11");
        }
        
        public override void Down()
        {
            AddColumn("dbo.TdSmBills", "SNumber11", c => c.Decimal(precision: 18, scale: 2));
            AddColumn("dbo.TdSmBills", "SNumber10", c => c.Decimal(precision: 18, scale: 2));
            AddColumn("dbo.TdSmBills", "SNumber09", c => c.Decimal(precision: 18, scale: 2));
            AddColumn("dbo.TdSmBills", "SNumber08", c => c.Decimal(precision: 18, scale: 2));
            AddColumn("dbo.TdSmBills", "SNumber07", c => c.Decimal(precision: 18, scale: 2));
            AddColumn("dbo.TdSmBills", "SNumber06", c => c.Decimal(precision: 18, scale: 2));
            AddColumn("dbo.TdSmBills", "SNumber05", c => c.Decimal(precision: 18, scale: 2));
            AddColumn("dbo.TdSmBills", "SNumber04", c => c.Decimal(precision: 18, scale: 2));
            AddColumn("dbo.TdSmBills", "SNumber03", c => c.Decimal(precision: 18, scale: 2));
            AddColumn("dbo.TdSmBills", "SNumber02", c => c.Decimal(precision: 18, scale: 2));
            AddColumn("dbo.TdSmBills", "SNumber01", c => c.Decimal(precision: 18, scale: 2));
            AddColumn("dbo.TdSmBills", "FundType", c => c.String(unicode: false));
            AddColumn("dbo.TdSmBills", "SelfCareMoney", c => c.Decimal(precision: 18, scale: 2));
            AddColumn("dbo.TdSmBills", "SelfPayMoney", c => c.Decimal(precision: 18, scale: 2));
            AddColumn("dbo.TdSmBills", "RejectPoint", c => c.Decimal(precision: 18, scale: 2));
            AddColumn("dbo.TdSmBills", "DrgsRejectmoney", c => c.Decimal(precision: 18, scale: 2));
        }
    }
}
