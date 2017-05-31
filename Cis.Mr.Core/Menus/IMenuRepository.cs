/* ***********************************************
 * author :  韩奎奎
 * function: 
 * history:  created by 韩奎奎 2017/5/9 16:25:41
 * ***********************************************/

namespace Cis.Mr.Menus
{
    using Abp.Domain.Repositories;
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Linq.Expressions;
    using System.Text;
    using System.Threading.Tasks;


    public interface IMrRepository<TEntity>
    {
        void BatchInsert(IEnumerable<TEntity> entities);
        void BatchUpdate(IEnumerable<TEntity> entities, params Expression<Func<TEntity, object>>[] predicate);
        void BatchDelete(IEnumerable<TEntity> entities, Expression<Func<TEntity, bool>> predicate);
    }
    /// <summary>
    /// TODO: Update summary.
    /// </summary>
    public interface IMenuRepository:IRepository<Menu>, IMrRepository<Menu>
    {
        List<Menu> GetMenuWithRole(string role);
    }
}
