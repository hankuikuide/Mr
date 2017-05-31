/* ***********************************************
 * author :  韩奎奎
 * function: 
 * history:  created by 韩奎奎 2017/5/9 16:23:54
 * ***********************************************/

namespace Cis.Mr.EntityFramework.Repositories
{
    using Menus;
    using Repositories;
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Text;
    using System.Threading.Tasks;
    using Abp.EntityFramework;
    using Abp.Domain.Repositories;
    using System.Linq.Expressions;

    /// <summary>
    /// TODO: Update summary.
    /// </summary>
    public class MenuRepository: MrRepositoryBase<Menu>, IMenuRepository
    {
        public MenuRepository(IDbContextProvider<MrDbContext> dbContextProvider) : base(dbContextProvider)
        {
        }

        public List<Menu> GetMenuWithRole(string role)
        {
            throw new NotImplementedException();
        }
    }
}
