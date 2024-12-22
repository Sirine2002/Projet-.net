//using Microsoft.AspNetCore.Http;
//using Microsoft.AspNetCore.Mvc;
//using Projet_net.Models.Repository;
//using Projet_net.Models;
//using Microsoft.AspNetCore.Authorization;

//namespace Projet_net.Controllers
//{
//    [Route("api/[controller]")]
//    [ApiController]
//    //[Authorize(Roles = "Client")]
//    public class PanierController : ControllerBase
//    {
//        private readonly IUnitOfWork _unitOfWork;

//        public PanierController(IUnitOfWork unitOfWork)
//        {
//            _unitOfWork = unitOfWork;
//        }

//        [HttpGet]
//        public async Task<IActionResult> GetAllPaniers()
//        {
//            var paniers = await _unitOfWork.PanierRepository.GetAllAsync();
//            return Ok(paniers);
//        }

//        [HttpGet("{id}")]
//        public async Task<IActionResult> GetPanierById(int id)
//        {
//            var panier = await _unitOfWork.PanierRepository.GetByIdAsync(id);
//            if (panier == null) return NotFound();
//            return Ok(panier);
//        }

//        [HttpPost]
//        public async Task<IActionResult> CreatePanier(Panier panier)
//        {
//            await _unitOfWork.PanierRepository.AddAsync(panier);
//            await _unitOfWork.SaveAsync();
//            return CreatedAtAction(nameof(GetPanierById), new { id = panier.PanierId }, panier);
//        }

//        [HttpDelete("{id}")]
//        public async Task<IActionResult> DeletePanier(int id)
//        {
//            var panier = await _unitOfWork.PanierRepository.GetByIdAsync(id);
//            if (panier == null) return NotFound();

//            _unitOfWork.PanierRepository.Delete(panier);
//            await _unitOfWork.SaveAsync();
//            return NoContent();
//        }
//    }
//}
