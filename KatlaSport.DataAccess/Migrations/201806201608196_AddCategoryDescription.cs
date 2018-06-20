namespace KatlaSport.DataAccess.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class AddCategoryDescription : DbMigration
    {
        public override void Up()
        {
            RenameColumn(table: "dbo.product_categories", name: "creatted_utc", newName: "created_utc");
        }
        
        public override void Down()
        {
            RenameColumn(table: "dbo.product_categories", name: "created_utc", newName: "creatted_utc");
        }
    }
}
