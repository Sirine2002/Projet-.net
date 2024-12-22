//using Microsoft.AspNetCore.Http;
//using Microsoft.AspNetCore.Mvc;
//using Projet_net.Models.Repository;
//using Projet_net.Models;
//using Microsoft.AspNetCore.Authorization;

//namespace Projet_net.Controllers
//{
//    [Route("api/[controller]")]
//    [ApiController]
//    public class ArticleController : ControllerBase
//    {
//        private readonly IUnitOfWork _unitOfWork;

//        public ArticleController(IUnitOfWork unitOfWork)
//        {
//            _unitOfWork = unitOfWork;
//        }

//        [HttpGet]
//        //[Authorize(Roles = "Admin,Client")]
//        public async Task<IActionResult> GetAllArticles()
//        {
//            var articles = await _unitOfWork.ArticleRepository.GetAllAsync();
//            return Ok(articles);
//        }

//        [HttpGet("{id}")]
//        [Authorize(Roles = "Admin")]
//        public async Task<IActionResult> GetArticleById(int id)
//        {
//            var article = await _unitOfWork.ArticleRepository.GetByIdAsync(id);
//            if (article == null) return NotFound();
//            return Ok(article);
//        }

//        [HttpPost]
//        [Authorize(Roles = "Admin")]
//        public async Task<IActionResult> CreateArticle(Article article)
//        {
//            await _unitOfWork.ArticleRepository.AddAsync(article);
//            await _unitOfWork.SaveAsync();
//            return CreatedAtAction(nameof(GetArticleById), new { id = article.ArticleId }, article);
//        }

//        [HttpPut("{id}")]
//        [Authorize(Roles = "Admin")]
//        public async Task<IActionResult> UpdateArticle(int id, Article article)
//        {
//            var existingArticle = await _unitOfWork.ArticleRepository.GetByIdAsync(id);
//            if (existingArticle == null) return NotFound();

//            existingArticle.Name = article.Name;
//            existingArticle.Price = article.Price;
//            existingArticle.CategoryId = article.CategoryId;

//            _unitOfWork.ArticleRepository.Update(existingArticle);
//            await _unitOfWork.SaveAsync();
//            return NoContent();
//        }

//        [HttpDelete("{id}")]
//        [Authorize(Roles = "Admin")]
//        public async Task<IActionResult> DeleteArticle(int id)
//        {
//            var article = await _unitOfWork.ArticleRepository.GetByIdAsync(id);
//            if (article == null) return NotFound();

//            _unitOfWork.ArticleRepository.Delete(article);
//            await _unitOfWork.SaveAsync();
//            return NoContent();
//        }
//    }
//}
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Projet_net.Models.Repository;
using Projet_net.Models;
using Microsoft.AspNetCore.Authorization;
using System.IO;
using System.Threading.Tasks;
using Microsoft.Extensions.FileProviders;

namespace Projet_net.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ArticleController : ControllerBase
    {
        private readonly IUnitOfWork _unitOfWork;

        public ArticleController(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }

        // Récupérer tous les articles
        [HttpGet]
        //[Authorize(Roles = "Admin,Client")]
        public async Task<IActionResult> GetAllArticles()
        {
            var articles = await _unitOfWork.ArticleRepository.GetAllAsync();
            return Ok(articles);
        }

        // Récupérer un article par son ID
        [HttpGet("{id}")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> GetArticleById(int id)
        {
            var article = await _unitOfWork.ArticleRepository.GetByIdAsync(id);
            if (article == null) return NotFound();

            // Si l'article contient une image, renvoyer l'image avec le bon type MIME
            if (article.Image != null && article.Image.Length > 0)
            {
                string fileExtension = Path.GetExtension(article.Image.ToString());
                string mimeType = GetMimeType(fileExtension);

                return File(article.Image, mimeType); // Retourner l'image avec le bon type MIME
            }

            return Ok(article); // Retourner l'article sans l'image
        }

        // Créer un nouvel article
        [HttpPost]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> CreateArticle([FromForm] Article article, IFormFile picture)
        {
            if (picture != null)
            {
                // Convertir l'image en tableau de bytes
                using (var memoryStream = new MemoryStream())
                {
                    await picture.CopyToAsync(memoryStream);
                    article.Image = memoryStream.ToArray(); // Assigner l'image en tant que tableau de bytes
                }
            }

            // Enregistrer l'article dans la base de données
            await _unitOfWork.ArticleRepository.AddAsync(article);
            await _unitOfWork.SaveAsync();
            return Ok(article);
        }

        // Mettre à jour un article existant
        [HttpPut("{id}")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> UpdateArticle(int id, [FromForm] Article article, IFormFile picture)
        {
            var existingArticle = await _unitOfWork.ArticleRepository.GetByIdAsync(id);
            if (existingArticle == null) return NotFound();

            existingArticle.Name = article.Name;
            existingArticle.Price = article.Price;
            existingArticle.CategoryId = article.CategoryId;

            if (picture != null)
            {
                // Convertir la nouvelle image en tableau de bytes
                using (var memoryStream = new MemoryStream())
                {
                    await picture.CopyToAsync(memoryStream);
                    existingArticle.Image = memoryStream.ToArray(); // Mettre à jour l'image en tant que tableau de bytes
                }
            }

            // Mettre à jour l'article dans la base de données
            _unitOfWork.ArticleRepository.Update(existingArticle);
            await _unitOfWork.SaveAsync();
            return Ok(existingArticle);
        }

        // Supprimer un article
        [HttpDelete("{id}")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> DeleteArticle(int id)
        {
            var article = await _unitOfWork.ArticleRepository.GetByIdAsync(id);
            if (article == null) return NotFound();

            // Supprimer l'image (ici, vous pourriez vouloir enlever l'image ou la garder dans la base de données, selon vos besoins)
            article.Image = null; // Supprimer l'image

            // Supprimer l'article de la base de données
            _unitOfWork.ArticleRepository.Delete(article);
            await _unitOfWork.SaveAsync();
            return NoContent();
        }

        // Méthode pour obtenir le type MIME de l'image en fonction de son extension
        private string GetMimeType(string fileExtension)
        {
            switch (fileExtension.ToLower())
            {
                case ".jpg":
                case ".jpeg":
                    return "image/jpeg";
                case ".png":
                    return "image/png";
                case ".gif":
                    return "image/gif";
                case ".bmp":
                    return "image/bmp";
                case ".webp":
                    return "image/webp";
                default:
                    return "application/octet-stream"; // Type par défaut pour les fichiers inconnus
            }
        }
    }
}
