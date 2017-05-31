using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Cis.Mr.Web.Controllers.Results
{
    public class IndexResult
    {
        /// <summary>
        /// 字典数据
        /// </summary>
        public Dictionary<string, object> Datas { get; set; } = new Dictionary<string, object>();

        /// <summary>
        /// 用户配置
        /// </summary>
        public Dictionary<string, object> Config { get; set; } = new Dictionary<string, object>();
    }
}