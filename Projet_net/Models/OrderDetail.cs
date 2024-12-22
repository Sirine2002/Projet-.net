using System.ComponentModel.DataAnnotations.Schema;

namespace Projet_net.Models
{
    public class OrderDetail 
    {
        public int OrderDetailId { get; set; }
        public int CommandeId { get; set; }

        [ForeignKey(nameof(CommandeId))]
        public virtual Commande? Commande { get; set; }

        public int ArticleId { get; set; }

        [ForeignKey(nameof(ArticleId))]
        public virtual Article? Article { get; set; }

        public int Quantity { get; set; }
        public decimal Price { get; set; }
    }
}
