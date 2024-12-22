using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.DependencyInjection;
using Projet_net.Models;
using System;
using System.Threading.Tasks;

namespace Projet_net.Data
{
    public class SeederData
    {
        public static void Seed(IApplicationBuilder application)
        {
            using (var serviceScope = application.ApplicationServices.CreateScope())
            {
                var roleManager = serviceScope.ServiceProvider.GetRequiredService<RoleManager<IdentityRole>>();
                var userManager = serviceScope.ServiceProvider.GetRequiredService<UserManager<ApplicationUser>>();
                var context = serviceScope.ServiceProvider.GetService<Context>();

                // Assurez-vous que la base de données est créée
                context.Database.EnsureCreated();

                // Créer les rôles et administrateur par défaut
                SeedRolesAndAdminAsync(roleManager, userManager).Wait();
            }
        }

        public static async Task SeedRolesAndAdminAsync(RoleManager<IdentityRole> roleManager, UserManager<ApplicationUser> userManager)
        {
            // Définir les rôles
            var roles = new[] { "Admin", "Client" };

            // Assurez-vous que les rôles existent
            foreach (var role in roles)
            {
                if (!await roleManager.RoleExistsAsync(role))
                {
                    var result = await roleManager.CreateAsync(new IdentityRole(role));
                    if (!result.Succeeded)
                    {
                        throw new InvalidOperationException($"Failed to create role {role}: {string.Join(", ", result.Errors)}");
                    }
                }
            }

            // Créer l'utilisateur Admin
            string adminEmail = "admin@example.com";
            string adminPassword = "Admin@123";
            string adminName = "Admin";

            var adminUser = await userManager.FindByNameAsync(adminName);
            if (adminUser == null)
            {
                adminUser = new ApplicationUser
                {
                    UserName = adminName,
                    Email = adminEmail,
                    EmailConfirmed = true
                };

                var createResult = await userManager.CreateAsync(adminUser, adminPassword);
                if (!createResult.Succeeded)
                {
                    throw new InvalidOperationException($"Failed to create admin user: {string.Join(", ", createResult.Errors)}");
                }

                var addToRoleResult = await userManager.AddToRoleAsync(adminUser, "Admin");
                if (!addToRoleResult.Succeeded)
                {
                    throw new InvalidOperationException($"Failed to add admin user to 'Admin' role: {string.Join(", ", addToRoleResult.Errors)}");
                }

                Console.WriteLine("Administrateur créé avec succès.");
            }
            else
            {
                Console.WriteLine("L'administrateur existe déjà.");
            }
        }
    }
}
