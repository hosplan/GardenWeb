using System;

namespace GardenWeb.Models
{
    public class GardenSpace
    {
        public int Id { get; set; }
        public string SpaceName { get; set; }
        public string BranchId { get; set; }
        public DateTime CreateDate { get; set; }
        public int AllowCount { get; set; }        
        public bool IsPrivate { get; set; }
        public bool OnlyInvite { get; set; }
    }

}
