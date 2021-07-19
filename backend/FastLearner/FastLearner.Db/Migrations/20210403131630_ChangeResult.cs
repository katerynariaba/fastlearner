using Microsoft.EntityFrameworkCore.Migrations;

namespace FastLearner.Db.Migrations
{
    public partial class ChangeResult : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Results_Questions_QuestionId",
                table: "Results");

            migrationBuilder.RenameColumn(
                name: "dateTime",
                table: "Results",
                newName: "DateTime");

            migrationBuilder.RenameColumn(
                name: "QuestionId",
                table: "Results",
                newName: "QuestionnaireId");

            migrationBuilder.RenameIndex(
                name: "IX_Results_QuestionId",
                table: "Results",
                newName: "IX_Results_QuestionnaireId");

            migrationBuilder.AddForeignKey(
                name: "FK_Results_Questionnaires_QuestionnaireId",
                table: "Results",
                column: "QuestionnaireId",
                principalTable: "Questionnaires",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Results_Questionnaires_QuestionnaireId",
                table: "Results");

            migrationBuilder.RenameColumn(
                name: "DateTime",
                table: "Results",
                newName: "dateTime");

            migrationBuilder.RenameColumn(
                name: "QuestionnaireId",
                table: "Results",
                newName: "QuestionId");

            migrationBuilder.RenameIndex(
                name: "IX_Results_QuestionnaireId",
                table: "Results",
                newName: "IX_Results_QuestionId");

            migrationBuilder.AddForeignKey(
                name: "FK_Results_Questions_QuestionId",
                table: "Results",
                column: "QuestionId",
                principalTable: "Questions",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
