/* ***********************************************
 * author :  韩奎奎
 * function: 
 * history:  created by 韩奎奎 2017/5/16 13:51:56
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
    public class TaskCompletedEventData:EventData
    {
        public int TaskId { get; set; }
    }
}
