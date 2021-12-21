using GardenWeb.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace GardenWeb.Data
{
    public class GardenWebContext : DbContext
    {
        public GardenWebContext (DbContextOptions<GardenWebContext> options) : base(options)
        {

        }

        public DbSet<GardenUser> GardenUser { get; set; }
        public DbSet<GardenRole> GardenRole { get; set; }
        public DbSet<UserRoleMap> UserRoleMaps { get; set; }
    }
}
