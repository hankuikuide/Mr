using System;
using System.Collections.Generic;
using Abp.Domain.Entities;
using Abp.EntityFramework;
using Abp.EntityFramework.Repositories;
using Cis.Mr.Menus;
using EntityFramework.Utilities;
using System.Data.Entity;
using System.Linq.Expressions;

namespace Cis.Mr.EntityFramework.Repositories
{
    public abstract class MrRepositoryBase<TEntity, TPrimaryKey> : EfRepositoryBase<MrDbContext, TEntity, TPrimaryKey>, IMrRepository<TEntity>
        where TEntity : class, IEntity<TPrimaryKey>
    {
        protected MrRepositoryBase(IDbContextProvider<MrDbContext> dbContextProvider)
            : base(dbContextProvider)
        {
            
        }

        public void BatchDelete(IEnumerable<TEntity> entities, Expression<Func<TEntity, bool>> predicate)
        {
            EFBatchOperation.For(Context, Context.GetPropValue(typeof(TEntity)) as IDbSet<TEntity>).Where(predicate).Delete();
        }
        

        public void BatchInsert(IEnumerable<TEntity> entities)
        {
            EFBatchOperation.For(Context, Context.GetPropValue(typeof(TEntity)) as IDbSet<TEntity>).InsertAll(entities);
        }

        public void BatchUpdate(IEnumerable<TEntity> entities, params Expression<Func<TEntity, object>>[] predicate)
        {
            EFBatchOperation.For(Context, Context.GetPropValue(typeof(TEntity)) as IDbSet<TEntity>).UpdateAll(entities, x=>x.ColumnsToUpdate(predicate));
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
