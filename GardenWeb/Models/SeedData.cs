using GardenWeb.Data;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace GardenWeb.Models
{
    public class SeedData
    {
        public static void Initialize(IServiceProvider serviceProvider)
        {
            using(var context = new GardenWebContext(
                serviceProvider.GetRequiredService<DbContextOptions<GardenWebContext>>()))
            {                
                if(context.GardenRole.Any() == false)
                {
                    context.GardenRole.AddRange(
                        new GardenRole
                        {
                            RoleName = "System"
                        },
                        new GardenRole
                        {
                            RoleName = "Manager"
                        },
                        new GardenRole
                        {
                            RoleName = "User"
                        },

                        new GardenRole
                        {
                            RoleName = "Guest"
                        }
                    );
                    context.SaveChanges();
                }
            }

        }
    }
}
