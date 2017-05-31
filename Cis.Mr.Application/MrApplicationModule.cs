using System.Reflection;
using Abp.AutoMapper;
using Abp.Modules;
using System;
using Cis.Mr.Setting;

namespace Cis.Mr
{
    [DependsOn(typeof(MrCoreModule), typeof(AbpAutoMapperModule))]
    public class MrApplicationModule : AbpModule
    {
        public override void PreInitialize()
        {
            Configuration.Modules.AbpAutoMapper().Configurators.Add(mapper =>
            {
                //Add your custom AutoMapper mappings here...
                //mapper.CreateMap<,>()
            });

            Configuration.Settings.Providers.Add<GeneralSettingProvider>();

        }

        public override void Initialize()
        {
            IocManager.RegisterAssemblyByConvention(Assembly.GetExecutingAssembly());


            //为所有缓存配置有效期
            Configuration.Caching.ConfigureAll(cache =>
            {
                cache.DefaultSlidingExpireTime = TimeSpan.FromHours(2);
            });

            //为特定的缓存配置有效期
            Configuration.Caching.Configure("MyCache", cache =>
            {
                cache.DefaultSlidingExpireTime = TimeSpan.FromHours(8);
            });

            // DynamicApiControllerBuilder
        }
    }
}
