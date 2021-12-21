using System.ComponentModel.DataAnnotations.Schema;

namespace GardenWeb.Models
{
    public class BaseBranchType
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public int BaseRootTypeId { get; set; }
        [ForeignKey("BaseRootTypeId")]
        public BaseRootType BaseRootType { get; set; }
        public string Color { get; set; }

    }
}
