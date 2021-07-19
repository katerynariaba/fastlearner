namespace FastLearner.Domain.Helpers
{
    public class AppSettings
    {
        public string Secret { get; set; }
        public EmailData EmailData { get; set; }

    }
    
    public class EmailData
    {
        public string Address { get; set; }
        public string Password { get; set; }
    }
}
