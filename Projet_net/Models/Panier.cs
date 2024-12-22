using System.ComponentModel.DataAnnotations.Schema;

namespace Projet_net.Models
{
    public class Panier
    {

        public int PanierId { get; set; }
        public string ApplicationUserId { get; set; }
        [ForeignKey(nameof(ApplicationUserId))]
        public virtual ApplicationUser? ApplicationUser { get; set; }

        public ICollection<CartItem> CartItems { get; set; } = new List<CartItem>();
    }
}
