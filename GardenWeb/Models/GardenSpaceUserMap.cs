using System;

namespace GardenWeb.Models
{
    public class GardenSpaceUserMap
    {
        public int Id { get; set; }
        public int GardenSpaceId { get; set; }
        public int UserId { get; set; }
        public DateTime ParticiDate { get; set; }        
    }
}
