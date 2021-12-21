using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace GardenWeb.Models
{
    public class GardenBranchType
    {
        [Key]
        public int Id { get; set; }
        [Required]
        public string Name { get; set; }
        public string Description { get; set; }
        public int RootTypeId { get; set; }
        [ForeignKey("RootTypeId")]
        public GardenRootType RootType { get; set; }
    }
}
