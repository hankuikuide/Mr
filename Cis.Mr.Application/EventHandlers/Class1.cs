/* ***********************************************
 * author :  韩奎奎
 * function: 
 * history:  created by 韩奎奎 2017/6/9 11:35:19
 * ***********************************************/

namespace Cis.Mr.EventHandlers
{
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Text;
    using System.Threading.Tasks;

    /// <summary>
    /// 单例模式.
    /// </summary>
    public sealed class Singleton
    {
        private static readonly Singleton instance = null;

        /// <summary>
        /// 静态初始化是在 .NET 中实现 Singleton 的首选方法
        /// </summary>
        static Singleton()
        {
            instance = new Singleton();
        }
        private Singleton()
        {
        }
        public static Singleton Instance
        {
            get
            {
                return instance;
            }
        }
    }
}
