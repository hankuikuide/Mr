/* ***********************************************
 * author :  韩奎奎
 * function: 
 * history:  created by 韩奎奎 2017/5/16 12:31:19
 * ***********************************************/

namespace Cis.Mr.Setting
{
    using Abp.Configuration;
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Text;
    using System.Threading.Tasks;

    /// <summary>
    /// 系统通用配置.
    /// </summary>
    public class GeneralSettingProvider : SettingProvider
    {
        public override IEnumerable<SettingDefinition> GetSettingDefinitions(SettingDefinitionProviderContext context)
        {
            return new[]
                 {
                    new SettingDefinition(
                        "title",
                        "新版本审核系统",scopes:SettingScopes.Application | SettingScopes.Tenant |SettingScopes.User,isVisibleToClients:true
                        ),

                    new SettingDefinition(
                        "PassiveUsersCanNotLogin",
                        "true",
                        scopes: SettingScopes.Application | SettingScopes.Tenant
                        ),

                    new SettingDefinition(
                        "SiteColorPreference",
                        "red",
                        scopes: SettingScopes.User,
                        isVisibleToClients: true
                        )

                };
        }
    }
}
