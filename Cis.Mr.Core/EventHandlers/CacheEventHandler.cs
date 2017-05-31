/* ***********************************************
 * author :  韩奎奎
 * function: 
 * history:  created by 韩奎奎 2017/5/16 13:53:41
 * ***********************************************/

namespace Cis.Mr.EventHandlers
{
    using Abp.Dependency;
    using Abp.Events.Bus.Handlers;
    using Abp.Runtime.Caching;
    using Castle.Core.Logging;
    using EventDatas;
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Text;
    using System.Threading.Tasks;

    /// <summary>
    /// TODO: Update summary.
    /// </summary>
    public interface ICacheEventHandler :IEventHandler<CacheClearEventData>, ITransientDependency
    {
        //public ICacheManager CacheManager { get; set; }
        //public ILogger Logger { get; set; }

        //void HandleEvent(CacheClearEventData eventData);
        
    }
}
