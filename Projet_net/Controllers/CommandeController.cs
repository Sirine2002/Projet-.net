using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Projet_net.Models.Repository;
using Projet_net.Models;
using Microsoft.AspNetCore.Authorization;

namespace Projet_net.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CommandeController : ControllerBase
    {
        private readonly IUnitOfWork _unitOfWork;

        public CommandeController(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }

        [HttpGet]
        [Authorize(Roles = "Admin,Client")]
        public async Task<IActionResult> GetAllCommandes()
        {
            var commandes = await _unitOfWork.CommandeRepository.GetAllAsync();
            return Ok(commandes);
        }

        [HttpGet("{id}")]
        [Authorize(Roles = "Admin,Client")]
        public async Task<IActionResult> GetCommandeById(int id)
        {
            var commande = await _unitOfWork.CommandeRepository.GetByIdAsync(id);
            if (commande == null) return NotFound();
            return Ok(commande);
        }

        [HttpPost]
        [Authorize(Roles = "Client")]
        public async Task<IActionResult> CreateCommande(Commande commande)
        {
            if (commande == null)
            {
                return BadRequest("Les données de la commande sont invalides.");
            }
            await _unitOfWork.CommandeRepository.AddAsync(commande);
            await _unitOfWork.SaveAsync();
            return CreatedAtAction(nameof(GetCommandeById), new { id = commande.CommandeId }, commande);
        }

        //[HttpPut("{id}")]
        //public async Task<IActionResult> UpdateCommande(int id, Commande commande)
        //{
        //    var existingCommande = await _unitOfWork.CommandeRepository.GetByIdAsync(id);
        //    if (existingCommande == null) return NotFound();

        //    existingCommande.ApplicationUserId = commande.ApplicationUserId;
        //    existingCommande.TotalPrice = commande.TotalPrice;
        //    existingCommande.OrderDate = commande.OrderDate;

        //    _unitOfWork.CommandeRepository.Update(existingCommande);
        //    await _unitOfWork.SaveAsync();
        //    return NoContent();
        //}

        //[HttpDelete("{id}")]
        //public async Task<IActionResult> DeleteCommande(int id)
        //{
        //    var commande = await _unitOfWork.CommandeRepository.GetByIdAsync(id);
        //    if (commande == null) return NotFound();

        //    _unitOfWork.CommandeRepository.Delete(commande);
        //    await _unitOfWork.SaveAsync();
        //    return NoContent();
        //}
    }

}
