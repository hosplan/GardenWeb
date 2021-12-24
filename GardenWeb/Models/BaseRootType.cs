using System.ComponentModel.DataAnnotations;

namespace GardenWeb.Models
{
    public class BaseRootType
    {
        [Key]
        public int Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
    }
}
