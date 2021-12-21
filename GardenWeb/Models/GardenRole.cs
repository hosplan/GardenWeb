using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace GardenWeb.Models
{
    public class GardenRole
    {
        public int Id { get; set; }
        public string RoleName { get; set; }

        public ICollection<UserRoleMap> UserRoleMaps { get; set; }
    }
}
