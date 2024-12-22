using Microsoft.AspNetCore.Mvc;
using Projet_net.Models.Repository;
using Projet_net.Models;
using Microsoft.AspNetCore.Authorization;

namespace Projet_net.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    //[Authorize(Roles = "Client")]
    public class CartItemController : ControllerBase
    {
        private readonly IUnitOfWork _unitOfWork;

        public CartItemController(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }

        [HttpGet]
        public async Task<IActionResult> GetAllCartItems()
        {
            var cartItems = await _unitOfWork.CartItemRepository.GetAllAsync();
            return Ok(cartItems);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetCartItemById(int id)
        {
            var cartItem = await _unitOfWork.CartItemRepository.GetByIdAsync(id);
            if (cartItem == null) return NotFound();
            return Ok(cartItem);
        }

        [HttpPost]
        public async Task<IActionResult> CreateCartItem(CartItem cartItem)
        {
            await _unitOfWork.CartItemRepository.AddAsync(cartItem);
            await _unitOfWork.SaveAsync();
            return CreatedAtAction(nameof(GetCartItemById), new { id = cartItem.CartItemId }, cartItem);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateCartItem(int id, CartItem cartItem)
        {
            var existingCartItem = await _unitOfWork.CartItemRepository.GetByIdAsync(id);
            if (existingCartItem == null) return NotFound();

            existingCartItem.CartItemId = cartItem.CartItemId;
            existingCartItem.ArticleId = cartItem.ArticleId;
            existingCartItem.Quantity = cartItem.Quantity;

            _unitOfWork.CartItemRepository.Update(existingCartItem);
            await _unitOfWork.SaveAsync();
            return Ok(existingCartItem);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteCartItem(int id)
        {
            var cartItem = await _unitOfWork.CartItemRepository.GetByIdAsync(id);
            if (cartItem == null) return NotFound();

            _unitOfWork.CartItemRepository.Delete(cartItem);
            await _unitOfWork.SaveAsync();
            return NoContent();
        }
    }

}
