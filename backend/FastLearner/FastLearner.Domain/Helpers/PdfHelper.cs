using FastLearner.Db.DomainModels;
using iTextSharp.text.pdf;
using System.IO;

namespace FastLearner.Domain.Helpers
{
    public static class PdfHelper
    {
        public static byte[] GeneratePdf(Course course, User user)
        {
            string pdfTemplate = @"C:\Users\w58989\Desktop\CetificateExample.pdf";
            PdfReader pdfReader = new PdfReader(pdfTemplate);

            byte[] fileArray;
            using (var ms = new MemoryStream())
            {
                PdfStamper pdfStamper = new PdfStamper(pdfReader, ms);
                AcroFields pdfFormFields = pdfStamper.AcroFields;

                pdfFormFields.SetField("studentEmail", user.Email);
                pdfFormFields.SetFieldProperty("studentEmail", "setfflags", PdfFormField.FF_READ_ONLY, null);

                pdfFormFields.SetField("studentFirstName", user.FirstName);
                pdfFormFields.SetFieldProperty("studentFirstName", "setfflags", PdfFormField.FF_READ_ONLY, null);

                pdfFormFields.SetField("courseTitle", course.Title);
                pdfFormFields.SetFieldProperty("courseTitle", "setfflags", PdfFormField.FF_READ_ONLY, null);

                pdfFormFields.SetField("studentLastName", user.LastName);
                pdfFormFields.SetFieldProperty("studentLastName", "setfflags", PdfFormField.FF_READ_ONLY, null);

                pdfStamper.FormFlattening = false;
                pdfStamper.Close();
                fileArray = ms.ToArray();

                File.WriteAllBytes(@"C:\Users\w58989\Desktop\Certificate.pdf", fileArray);
            }
            return fileArray;
        }
    }
}
