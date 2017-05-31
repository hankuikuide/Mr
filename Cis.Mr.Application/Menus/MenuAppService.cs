/* ***********************************************
 * author :  韩奎奎
 * function: 
 * history:  created by 韩奎奎 2017/5/9 14:13:33
 * ***********************************************/

namespace Cis.Mr.Menus
{
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Text;
    using System.Threading.Tasks;
    using Dto;
    using Abp.Domain.Repositories;
    using Castle.Core.Logging;
    using Abp.AutoMapper;
    using Abp.Runtime.Caching;
    using Abp.Configuration;
    using Abp.Events.Bus;
    using EventDatas;

    /// <summary>
    /// 菜单管理.
    /// </summary>
    public class MenuAppService : MrAppServiceBase, IMenuAppService
    {
        /// <summary>
        /// 属性注入 缓存对象
        /// </summary>
        public ICacheManager CacheManager { get; set; }

        /// <summary>
        /// 属性注入 EventBus
        /// </summary>
        public IEventBus EventBus { get; set; }

        private IMenuRepository menuRepository;

        /// <summary>
        /// 构造器
        /// </summary>
        /// <param name="repository"></param>
        public MenuAppService(IMenuRepository repository)
        {
            this.menuRepository = repository;
        }

        public void CreateMenu(MenuResult menu)
        {
            Logger.Debug("添加菜单");
            menuRepository.Insert(menu.MapTo<Menu>());
            EventBus.Trigger(new CacheClearEventData { CacheName = "menus" });

        }

        /// <summary>
        /// 我们都不需要调用Update方法
        /// 因为应用服务层的方法默认开启了工作单元模式（Unit of Work）
        /// ABP框架会工作单元完成时自动保存对实体的所有更改，除非有异常抛出。有异常时会自动回滚，因为工作单元默认开启数据库事务。
        /// </summary>
        /// <param name="menu"></param>
        public void UpdateMenu(MenuResult menu)
        {
            Logger.Debug("更新菜单");
            var result = menuRepository.Get(menu.Id);
            
            result.Icon = menu.Icon;
            result.Handler = menu.Handler;
            result.MenuView = menu.MenuView;
            result.Name = menu.Name;
            result.ParentId = menu.ParentId;

            EventBus.Trigger(new CacheClearEventData { CacheName = "menus" });

            // menuRepository.Update(menu.MapTo<Menu>());
        }

        /// <summary>
        /// 删除菜单app service
        /// </summary>
        /// <param name="menuId"></param>
        public void DeleteMenu(string menuId)
        {
            Logger.Debug("删除菜单");
            menuRepository.Delete(new Menu() { Id = int.Parse(menuId) });

            EventBus.Trigger(new CacheClearEventData { CacheName = "menus" });

        }

        /// <summary>
        /// 获取全部菜单app service
        /// </summary>
        /// <returns></returns>
        public List<MenuResult> GetMenus()
        {
            EventBus.Trigger(new TaskCompletedEventData { TaskId = 42 });

            var title = SettingManager.GetSettingValue("title");

            // 获取缓存对象，如果不存在则调用方法，获取数据 然后再存入缓存对象中
            //ICache sysCache = CacheManager.GetCache("sys");   两种方式获取缓存对象
            ITypedCache<string, List<MenuResult>> sysCache = CacheManager.GetCache("sys").AsTyped<string, List<MenuResult>>();
            List<MenuResult> result = sysCache.Get("menus", () => GetMenusFromDB());

            return result;
        }

        private List<MenuResult> GetMenusFromDB()
        {
            Logger.Error("获取所有菜单");
            
            List<Menu> menus = menuRepository.GetAll().ToList();

            List<MenuResult> result = menus.MapTo<List<MenuResult>>();

            return result;
        }
    }
}
