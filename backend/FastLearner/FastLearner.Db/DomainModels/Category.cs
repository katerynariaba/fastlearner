using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace FastLearner.Db.DomainModels
{
    public class Category
    {
        [Key]
        public int Id { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public string Image { get; set; }
    }
}
