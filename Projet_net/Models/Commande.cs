using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace Projet_net.Models
{
    public class Commande
    {
        public int CommandeId { get; set; }
        public string ApplicationUserId { get; set; } // Type modifié pour correspondre à ApplicationUser.Id

        [ForeignKey(nameof(ApplicationUserId))]
        public virtual ApplicationUser? ApplicationUser { get; set; }
        public decimal TotalPrice { get; set; }
        public DateTime OrderDate { get; set; }
        [JsonIgnore]
        public ICollection<OrderDetail> OrderDetails { get; set; } = new List<OrderDetail>();
    }
}
