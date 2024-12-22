using Microsoft.EntityFrameworkCore;

namespace Projet_net.Models.Repository
{
    public class UnitOfWork: IUnitOfWork
    {
        private readonly Context _context;

        public IGenericRepository<Category> CategoryRepository { get; private set; }//private set
        public IGenericRepository<Article> ArticleRepository { get; private set; }
        public IGenericRepository<CartItem> CartItemRepository { get; private set; }
        public IGenericRepository<Commande> CommandeRepository { get; private set; }
        public IGenericRepository<OrderDetail> OrderDetailRepository { get; private set; }
        public IGenericRepository<Panier> PanierRepository { get; private set; }

        public UnitOfWork(Context context)
        {
            _context = context;
            CategoryRepository = new GenericRepository<Category>(_context);
            ArticleRepository = new GenericRepository<Article>(_context);
            CartItemRepository = new GenericRepository<CartItem>(_context);
            CommandeRepository = new GenericRepository<Commande>(_context);
            OrderDetailRepository = new GenericRepository<OrderDetail>(_context);
            PanierRepository = new GenericRepository<Panier>(_context);
        }

        public async Task SaveAsync() => await _context.SaveChangesAsync();

        public void Dispose() => _context.Dispose();




    }
}
