/* ***********************************************
 * author :  韩奎奎
 * function: 
 * history:  created by 韩奎奎 2017/5/23 14:51:42
 * ***********************************************/

namespace Cis.Mr.EventHandlers
{
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Text;
    using System.Threading.Tasks;
    using EventDatas;
    using Abp.Runtime.Caching;
    using Castle.Core.Logging;

    /// <summary>
    /// TODO: Update summary.
    /// </summary>
    public class CacheEventHandler : ICacheEventHandler
    {
        #region Fields

        public ICacheManager CacheManager { get; set; }
        public ILogger Logger { get; set; }

        #endregion

        #region Constructors and Destructors

        #endregion

        #region Public Methods and Operators

        #endregion
        public void HandleEvent(CacheClearEventData cache)
        {
            if (CacheManager!= null && CacheManager.GetCache("sys")!=null)
            {
                CacheManager.GetCache("sys").Remove(cache.CacheName);
            }
            
        }
    }
}
