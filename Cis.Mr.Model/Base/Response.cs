/* ***********************************************
 * author :  韩奎奎
 * function: 
 * history:  created by 韩奎奎 2017/5/10 15:33:32
 * ***********************************************/

namespace Cis.Mr.Model.Base
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel;
    using System.Linq;
    using System.Text;
    using System.Threading.Tasks;

    /// <summary>
    /// 获取单个实体响应
    /// </summary>
    [Description("获取单个实体响应")]
    public class Response<T>
    {
        /// <summary>
        /// 错误码
        /// </summary>
        [Description("错误码")]
        public string ErrCode { get; set; }

        /// <summary>
        /// 错误信息
        /// </summary>
        [Description("错误信息")]
        public string ErrMsg { get; set; }

        /// <summary>
        /// 附加信息
        /// </summary>
        [Description("附加信息")]
        public object AttachedObject { get; set; }

        /// <summary>
        /// 响应结果是否错误
        /// </summary>
        [Description("响应结果是否成功")]
        public bool IsSuccess
        {
            get
            {
                return string.IsNullOrEmpty(this.ErrMsg);
            }
        }

        /// <summary>
        /// 子项
        /// </summary>
        [Description("子项")]
        public T Result { get; set; }
    }
}

