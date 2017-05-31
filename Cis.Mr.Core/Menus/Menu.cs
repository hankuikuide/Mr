/* ***********************************************
 * author :  韩奎奎
 * function: 
 * history:  created by 韩奎奎 2017/5/9 15:35:16
 * ***********************************************/

namespace Cis.Mr.Menus
{
    using Abp.Domain.Entities;
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Text;
    using System.Threading.Tasks;

    public class Menu: Entity
    {
        /// <summary>
        /// 菜单名称
        /// </summary>
        public string Name { get; set; }

        /// <summary>
        /// 菜单类型
        /// </summary>
        public string MenuType { get; set; }

        /// <summary>
        /// 排序号
        /// </summary>
        public int Sort { get; set; }

        /// <summary>
        /// 父菜单
        /// </summary>
        public int ParentId { get; set; }

        /// <summary>
        /// 备注
        /// </summary>
        public string Remark { get; set; }

        /// <summary>
        /// 状态
        /// </summary>
        public string State { get; set; }

        /// <summary>
        /// 英文名
        /// </summary>
        public string ViewParams { get; set; }

        /// <summary>
        /// 菜单权限验证码
        /// </summary>
        public string ValidateCode { get; set; }

        /// <summary>
        /// 菜单事件
        /// </summary>
        public string Handler { get; set; }

        /// <summary>
        /// 菜单视图
        /// </summary>
        public string MenuView { get; set; }

        /// <summary>
        /// 菜单图标
        /// </summary>
        public string Icon { get; set; }

        /// <summary>
        /// 是否为功能
        /// </summary>
        public string OperationType { get; set; }

        /// <summary>
        /// 管理员菜单标识
        /// </summary>
        public string SysAppKey { get; set; }
    }
}
