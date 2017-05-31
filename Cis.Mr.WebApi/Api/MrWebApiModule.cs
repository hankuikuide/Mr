using System.Reflection;
using System.Web.Http;
using Abp.Application.Services;
using Abp.Configuration.Startup;
using Abp.Modules;
using Abp.WebApi;
using Swashbuckle.Application;
using System.Linq;
using Abp.WebApi.Controllers.Dynamic.Builders;
using Newtonsoft.Json;
using Newtonsoft.Json.Serialization;
using System;
using Abp.WebApi.Configuration;

namespace Cis.Mr.Api
{
    [DependsOn(typeof(AbpWebApiModule), typeof(MrApplicationModule))]
    public class MrWebApiModule : AbpModule
    {
        public override void PostInitialize()
        {
            var httpConfiguration = IocManager.Resolve<IAbpWebApiConfiguration>().HttpConfiguration;

            httpConfiguration.Formatters.JsonFormatter.SerializerSettings.ContractResolver = new DefaultContractResolver();
        }

        public override void Initialize()
        {
            IocManager.RegisterAssemblyByConvention(Assembly.GetExecutingAssembly());

            Configuration.Modules.AbpWebApi().DynamicApiControllerBuilder
                .ForAll<IApplicationService>(typeof(MrApplicationModule).Assembly, "CisApi")
                .Build();

            Configuration.Modules.AbpWebApi().HttpConfiguration.Filters.Add(new HostAuthenticationFilter("Bearer"));

            ConfigureSwaggerUi();

        }

        private void ConfigureSwaggerUi()
        {
            Configuration.Modules.AbpWebApi().HttpConfiguration
                .EnableSwagger(c =>
                {
                    c.SingleApiVersion("v1", "新版审核系统.WebApi");
                    c.ResolveConflictingActions(apiDescriptions => apiDescriptions.First());
                    c.IncludeXmlComments(GetXmlCommentsPath());
                })
                .EnableSwaggerUi("apis/{*assetPath}",c =>
                {
                  //  c.InjectJavaScript(Assembly.GetAssembly(typeof(MrApplicationModule)), "Cis.Mr.WebApi.Scripts.Swagger-Custom.js");
                    c.InjectJavaScript(Assembly.GetExecutingAssembly(), "Cis.Mr.Scripts.Swagger_lang.js");
                });
        }
        private static string GetXmlCommentsPath()
        {
            return string.Format("{0}/bin/SwaggerDemo.XML", System.AppDomain.CurrentDomain.BaseDirectory);
        }
    }
}
