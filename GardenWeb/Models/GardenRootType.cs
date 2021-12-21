using System;
using System.ComponentModel.DataAnnotations;

namespace GardenWeb.Models
{
    public class GardenRootType
    {
        [Key]
        public int Id { get; set; }
        [Required]
        public string Name { get; set; }
        public string Description { get; set; }

        //public int GardenId { get; set;}
    }
}
