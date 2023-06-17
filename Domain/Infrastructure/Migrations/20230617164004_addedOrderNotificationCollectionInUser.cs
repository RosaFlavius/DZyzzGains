using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Infrastructure.Migrations
{
    public partial class addedOrderNotificationCollectionInUser : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateIndex(
                name: "IX_OrdersNotifications_UserId",
                table: "OrdersNotifications",
                column: "UserId");

            migrationBuilder.AddForeignKey(
                name: "FK_OrdersNotifications_Users_UserId",
                table: "OrdersNotifications",
                column: "UserId",
                principalTable: "Users",
                principalColumn: "UserId",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_OrdersNotifications_Users_UserId",
                table: "OrdersNotifications");

            migrationBuilder.DropIndex(
                name: "IX_OrdersNotifications_UserId",
                table: "OrdersNotifications");
        }
    }
}
