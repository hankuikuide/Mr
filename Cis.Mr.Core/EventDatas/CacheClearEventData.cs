/* ***********************************************
 * author :  韩奎奎
 * function: 
 * history:  created by 韩奎奎 2017/5/23 14:24:16
 * ***********************************************/

namespace Cis.Mr.EventDatas
{
    using Abp.Events.Bus;
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Text;
    using System.Threading.Tasks;

    /// <summary>
    /// TODO: Update summary.
    /// </summary>
    public class CacheClearEventData: EventData
    {
        public string CacheName { get; set; }
    }
}
