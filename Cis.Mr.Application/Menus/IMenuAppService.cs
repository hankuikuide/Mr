/* ***********************************************
 * author :  韩奎奎
 * function: 
 * history:  created by 韩奎奎 2017/5/9 14:11:19
 * ***********************************************/

namespace Cis.Mr.Menus
{
    using Abp.Application.Services;
    using Dto;
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Text;
    using System.Threading.Tasks;

    /// <summary>
    /// 菜单管理.
    /// </summary>
    public interface IMenuAppService : IApplicationService
    {
        /// <summary>
        /// 获取全部菜单app service
        /// </summary>
        /// <returns></returns>
        List<MenuResult> GetMenus();

        /// <summary>
        /// 创建菜单
        /// </summary>
        /// <param name="menu"></param>
        void CreateMenu(MenuResult menu);

        /// <summary>
        /// 更新菜单
        /// </summary>
        /// <param name="menu"></param>
        void UpdateMenu(MenuResult menu);

        /// <summary>
        /// 删除菜单app service
        /// </summary>
        /// <param name="menuId"></param>
        void DeleteMenu(string menuId);
    }
}
