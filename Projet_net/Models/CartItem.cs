using System.ComponentModel.DataAnnotations.Schema;

namespace Projet_net.Models
{
    public class CartItem
    {
        public int CartItemId { get; set; }
        public int PanierId { get; set; }

        [ForeignKey(nameof(PanierId))]
        public virtual Panier Panier { get; set; }

        public int ArticleId { get; set; }

        [ForeignKey(nameof(ArticleId))]
        public virtual Article Article { get; set; }

        public int Quantity { get; set; }

        public string ApplicationUserId { get; set; }
        [ForeignKey(nameof(ApplicationUserId))]
        public virtual ApplicationUser? ApplicationUser { get; set; }
    }
}
