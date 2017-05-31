using Abp.Runtime.Session;
using Abp.Web.Mvc.Controllers.Results;
using Cis.Mr.Menus;
using Cis.Mr.Menus.Dto;
using Cis.Mr.Web.Controllers;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace Cis.Mr.Web.Areas.Sys.Controllers
{
    /// <summary>
    ///  菜单管理
    /// </summary>
    public class MenuController : MrControllerBase
    {
        //构造器注入，由框架自动注入
        private IMenuAppService menuAppService;

        /// <summary>
        /// 构造器注入
        /// </summary>
        /// <param name="menuAppService"></param>
        public MenuController(IMenuAppService menuAppService)
        {
            this.menuAppService = menuAppService;
        }
        // GET: Sys/Menu
        public ActionResult Index()
        {
            return View();
        }

        /// <summary>
        /// 获取全部菜单
        /// </summary>
        /// <param name="name"></param>
        /// <returns></returns>
        public ActionResult GetMenus(string name)
        {
           var result =  menuAppService.GetMenus();

           // 依赖注入 继承父类 获取用户登录信息
           var userId = AbpSession.GetUserId();

            return AbpJson(result,null,null,JsonRequestBehavior.DenyGet,true,false,true);
        }

        /// <summary>
        /// 创建菜单
        /// </summary>
        /// <param name="menu"></param>
        /// <returns></returns>
        public ActionResult CreateMenu(MenuResult menu)
        {
            menuAppService.CreateMenu(menu);


            return AbpJson(true, null, null, JsonRequestBehavior.DenyGet, true, false, true);
        }

        /// <summary>
        /// 更新菜单
        /// </summary>
        /// <param name="menu"></param>
        /// <returns></returns>
        public ActionResult UpdateMenu(MenuResult menu)
        {
            menuAppService.UpdateMenu(menu);

            return AbpJson(true, null, null, JsonRequestBehavior.DenyGet, true, false, true);
        }

        /// <summary>
        /// 删除菜单
        /// </summary>
        /// <param name="menu"></param>
        /// <returns></returns>
        public ActionResult DeleteMenu(string menuId)
        {
            menuAppService.DeleteMenu(menuId);

            return AbpJson(true, null, null, JsonRequestBehavior.DenyGet, true, false, true);
        }

    }
}