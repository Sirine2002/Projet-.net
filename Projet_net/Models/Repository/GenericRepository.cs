using Microsoft.EntityFrameworkCore;
using System.ComponentModel.Design;

namespace Projet_net.Models.Repository
{
    public class GenericRepository<T> : IGenericRepository<T> where T : class
    {
        private readonly Context _context;
        private readonly DbSet<T> _dbSet;

        public GenericRepository(Context context)
        {
            _context = context; // Assign the parameter to the private field
            _dbSet = _context.Set<T>();
        }

        public async Task<IEnumerable<T>> GetAllAsync() => await _dbSet.ToListAsync();

        public async Task<T> GetByIdAsync(int id) => await _dbSet.FindAsync(id);

        public async Task AddAsync(T entity) => await _dbSet.AddAsync(entity);
        public async Task AddRangeAsync(IEnumerable<T> entities)
        {
            await _dbSet.AddRangeAsync(entities); 
            await _context.SaveChangesAsync(); 
        }

        public void Update(T entity) => _dbSet.Update(entity);

        public void Delete(T entity) => _dbSet.Remove(entity);

        public async Task<IEnumerable<OrderDetail>> GetOrderDetailsByCommandeIdAsync(int commandeId)
        {
            return await _context.OrderDetails
                                 .Where(od => od.CommandeId == commandeId)
                                 .ToListAsync();
        }

        public async Task<IEnumerable<OrderDetail>> GetOrderDetailsByUserIdAsync(string userId)
        {
            var commandeIds = await _context.Commandes
                .Where(c => c.ApplicationUserId == userId)
                .Select(c => c.CommandeId)
                .ToListAsync();

            // Fetch the OrderDetails corresponding to the Commande IDs
            return await _context.OrderDetails
                .Where(od => commandeIds.Contains(od.CommandeId))
                .Include(od => od.Article)
                .Include(od => od.Commande)
                .ToListAsync();
        }

        

    }
}
