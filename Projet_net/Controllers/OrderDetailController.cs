using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Projet_net.Models.Repository;
using Projet_net.Models;
using Microsoft.AspNetCore.Authorization;

namespace Projet_net.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class OrderDetailController : ControllerBase
    {
        private readonly IUnitOfWork _unitOfWork;

        public OrderDetailController(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }

        [HttpGet]
        [Authorize(Roles = "Admin,Client")]
        public async Task<IActionResult> GetAllOrderDetails()
        {
            var orderDetails = await _unitOfWork.OrderDetailRepository.GetAllAsync();
            return Ok(orderDetails);
        }

        [HttpGet("orderdetails/{id}")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> GetOrderDetailById(int id)
        {
            var orderDetail = await _unitOfWork.OrderDetailRepository.GetByIdAsync(id);
            if (orderDetail == null) return NotFound();
            return Ok(orderDetail);
        }

        [HttpGet("{CommandeId}")]
        public async Task<IActionResult> GetOrderDetailsByCommandeId(int CommandeId)
        {
            var orderDetails = await _unitOfWork.OrderDetailRepository.GetOrderDetailsByCommandeIdAsync(CommandeId);

            if (orderDetails == null || !orderDetails.Any())
            {
                return NotFound(); // Retourner NotFound si aucune donnée n'est trouvée
            }

            return Ok(orderDetails); // Retourner les OrderDetails filtrés
        }

        [HttpGet("GetOrderDetailsByUserId/{ApplicationUserId}")]
        public async Task<IActionResult> GetOrderDetailsByUserIdAsync(string ApplicationUserId)
        {
            var orderDetails = await _unitOfWork.OrderDetailRepository.GetOrderDetailsByUserIdAsync(ApplicationUserId);

            if (orderDetails == null || !orderDetails.Any())
            {
                return NotFound(new { Message = "No order details found for the specified user." });
            }

            return Ok(orderDetails); // Return the fetched OrderDetails
        }



        [HttpPost]
        [Authorize(Roles = "Client")]
        public async Task<IActionResult> CreateOrderDetail(ICollection<OrderDetail> OrderDetails)
        {
            await _unitOfWork.OrderDetailRepository.AddRangeAsync(OrderDetails);
            await _unitOfWork.SaveAsync();
            return CreatedAtAction(nameof(GetOrderDetailsByCommandeId), new { commandeId = OrderDetails.FirstOrDefault().OrderDetailId }, OrderDetails);
        }

        [HttpPut("{id}")]
        [Authorize(Roles = "Client")]
        public async Task<IActionResult> UpdateOrderDetail(int id, OrderDetail orderDetail)
        {
            var existingOrderDetail = await _unitOfWork.OrderDetailRepository.GetByIdAsync(id);
            if (existingOrderDetail == null) return NotFound();

            existingOrderDetail.OrderDetailId = orderDetail.OrderDetailId;
            existingOrderDetail.ArticleId = orderDetail.ArticleId;
            existingOrderDetail.Quantity = orderDetail.Quantity;
            existingOrderDetail.Price = orderDetail.Price;

            _unitOfWork.OrderDetailRepository.Update(existingOrderDetail);
            await _unitOfWork.SaveAsync();
            return NoContent();
        }

        [HttpDelete("{id}")]
        [Authorize(Roles = "Client")]
        public async Task<IActionResult> DeleteOrderDetail(int id)
        {
            var orderDetail = await _unitOfWork.OrderDetailRepository.GetByIdAsync(id);
            if (orderDetail == null) return NotFound();

            _unitOfWork.OrderDetailRepository.Delete(orderDetail);
            await _unitOfWork.SaveAsync();
            return NoContent();
        }
    }

}
