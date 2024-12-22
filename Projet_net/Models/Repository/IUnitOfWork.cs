namespace Projet_net.Models.Repository
{
    public interface IUnitOfWork: IDisposable
    {
        IGenericRepository<Category> CategoryRepository { get; }
        IGenericRepository<Article> ArticleRepository { get; }
        IGenericRepository<CartItem> CartItemRepository { get; }
        IGenericRepository<Commande> CommandeRepository { get; }
        IGenericRepository<OrderDetail> OrderDetailRepository { get; }
        IGenericRepository<Panier> PanierRepository { get; }

        Task SaveAsync();

    }
}
