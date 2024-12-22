namespace Projet_net.Models.Repository
{
    public interface IGenericRepository<T> where T : class
    {
        Task<IEnumerable<T>> GetAllAsync();
        Task<T> GetByIdAsync(int id);
        Task AddAsync(T entity);
        Task AddRangeAsync(IEnumerable<T> entities);
        Task<IEnumerable<OrderDetail>> GetOrderDetailsByCommandeIdAsync(int commandeId);
        Task<IEnumerable<OrderDetail>> GetOrderDetailsByUserIdAsync(string userId);
        
        void Update(T entity);
        void Delete(T entity);
        
    }
}
