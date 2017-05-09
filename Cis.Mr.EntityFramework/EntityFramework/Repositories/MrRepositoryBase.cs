using Abp.Domain.Entities;
using Abp.EntityFramework;
using Abp.EntityFramework.Repositories;

namespace Cis.Mr.EntityFramework.Repositories
{
    public abstract class MrRepositoryBase<TEntity, TPrimaryKey> : EfRepositoryBase<MrDbContext, TEntity, TPrimaryKey>
        where TEntity : class, IEntity<TPrimaryKey>
    {
        protected MrRepositoryBase(IDbContextProvider<MrDbContext> dbContextProvider)
            : base(dbContextProvider)
        {

        }

        //add common methods for all repositories
    }

    public abstract class MrRepositoryBase<TEntity> : MrRepositoryBase<TEntity, int>
        where TEntity : class, IEntity<int>
    {
        protected MrRepositoryBase(IDbContextProvider<MrDbContext> dbContextProvider)
            : base(dbContextProvider)
        {

        }

        //do not add any method here, add to the class above (since this inherits it)
    }
}
