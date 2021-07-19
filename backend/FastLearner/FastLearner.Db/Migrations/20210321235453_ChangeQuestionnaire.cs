using Microsoft.EntityFrameworkCore.Migrations;

namespace FastLearner.Db.Migrations
{
    public partial class ChangeQuestionnaire : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Questionnaires_Lectures_LectureId",
                table: "Questionnaires");

            migrationBuilder.DropIndex(
                name: "IX_Questionnaires_LectureId",
                table: "Questionnaires");

            migrationBuilder.DropColumn(
                name: "LectureId",
                table: "Questionnaires");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "LectureId",
                table: "Questionnaires",
                type: "int",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Questionnaires_LectureId",
                table: "Questionnaires",
                column: "LectureId",
                unique: true,
                filter: "[LectureId] IS NOT NULL");

            migrationBuilder.AddForeignKey(
                name: "FK_Questionnaires_Lectures_LectureId",
                table: "Questionnaires",
                column: "LectureId",
                principalTable: "Lectures",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
