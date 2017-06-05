using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Cis.Mr
{
    public interface ISqlExecuter
    {        /// 

        /// 执行给定的命令
        /// 

        /// 命令字符串
        /// 要应用于命令字符串的参数
        /// 执行命令后由数据库返回的结果
        int Execute(string sql, params object[] parameters);        /// 

        /// 创建一个原始 SQL 查询，该查询将返回给定泛型类型的元素。
        /// 

        /// 查询所返回对象的类型
        /// SQL 查询字符串
        /// 要应用于 SQL 查询字符串的参数
        /// 
        IQueryable<T> SqlQuery<T>(string sql, params object[] parameters);
    }
}
