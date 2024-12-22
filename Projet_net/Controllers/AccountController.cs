using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using Projet_net.DTO;
using Projet_net.Models;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace Projet_net.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AccountController : ControllerBase
    {
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly SignInManager<ApplicationUser> _signInManager;
        private readonly IConfiguration _configuration;

        public AccountController(
            UserManager<ApplicationUser> userManager,
            SignInManager<ApplicationUser> signInManager,
            IConfiguration configuration)
        {
            _userManager = userManager;
            _signInManager = signInManager;
            _configuration = configuration;
        }

        // Méthode d'inscription
        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] RegisterDTO model)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            // Créer un nouvel utilisateur
            var user = new ApplicationUser { UserName = model.UserName, Email = model.Email };
            var result = await _userManager.CreateAsync(user, model.Password);

            if (result.Succeeded)
            {
                // Assigner le rôle "Client" au nouvel utilisateur
                await _userManager.AddToRoleAsync(user, "Client");
                return Ok("User registered successfully");
            }

            // Retourner les erreurs si l'inscription échoue
            return BadRequest(result.Errors);
        }

        // Méthode de connexion
        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginDTO model)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            // Trouver l'utilisateur par username
            var user = await _userManager.FindByNameAsync(model.UserName);
            if (user == null)
            {
                return Unauthorized("Invalid Username or password.");
            }

            // Vérification du mot de passe
            var result = await _signInManager.PasswordSignInAsync(user.UserName, model.Password, false, false);
            if (!result.Succeeded)
            {
                return Unauthorized("Invalid email or password.");
            }

            // Génération du jeton JWT
            var authClaims = new List<Claim>
            {
                new Claim(ClaimTypes.Name, user.UserName),
                new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
                new Claim(ClaimTypes.Email, user.Email)
            };

            var userRoles = await _userManager.GetRolesAsync(user);
            var userRole = userRoles.FirstOrDefault() ;
            foreach (var role in userRoles)
            {
                authClaims.Add(new Claim(ClaimTypes.Role, role));
            }

            var authSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["JWT:SecretKey"]));

            var token = new JwtSecurityToken(
                issuer: _configuration["JWT:Issuer"],
                audience: _configuration["JWT:Audience"],
                expires: DateTime.Now.AddHours(3),
                claims: authClaims,
                signingCredentials: new SigningCredentials(authSigningKey, SecurityAlgorithms.HmacSha256)
            );


            return Ok(new
            {
                token = new JwtSecurityTokenHandler().WriteToken(token),
                //expiration = token.ValidTo
                role = userRole,
                username = user.UserName,
                id = user.Id
            });
            
            }
        [HttpGet("usernames")]
        public async Task<IActionResult> GetAllUserNamesAsync()
        {
            var excludedUsers = new[] { "Admin" }; // Liste des noms à exclure

            var users = _userManager.Users
                .Where(user => !excludedUsers.Contains(user.UserName)) // Exclure les utilisateurs dans la liste
                .ToList();

            // Créer une liste d'objets anonymes contenant UserName et Id
            var userNamesWithId = users.Select(user => new { user.UserName, user.Id }).ToList();

            if (!userNamesWithId.Any())
            {
                return NotFound("No users found");
            }

            return Ok(userNamesWithId); // Retourner la liste d'objets { UserName, Id }
        }
    }

    // Nouvelle méthode pour récupérer les rôles d'un utilisateur par son email

}







