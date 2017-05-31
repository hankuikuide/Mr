using System.Reflection;
using System.Web.Mvc;
using System.Web.Optimization;
using System.Web.Routing;
using Abp.Hangfire;
using Abp.Hangfire.Configuration;
using Abp.Modules;
using Abp.Web.Mvc;
using Abp.Web.SignalR;
using Abp.Zero.Configuration;
using Cis.Mr.Api;
using Hangfire;
using Abp.Configuration.Startup;

namespace Cis.Mr.Web
{
    [DependsOn(
        typeof(MrDataModule),
        typeof(MrApplicationModule),
        typeof(MrWebApiModule),
        typeof(AbpWebSignalRModule),
        //typeof(AbpHangfireModule), - ENABLE TO USE HANGFIRE INSTEAD OF DEFAULT JOB MANAGER
        typeof(AbpWebMvcModule))]
    public class MrWebModule : AbpModule
    {
        public override void PreInitialize()
        {
            //Enable database based localization
            Configuration.Modules.Zero().LanguageManagement.EnableDbLocalization();

            //Configure navigation/menu
            Configuration.Navigation.Providers.Add<MrNavigationProvider>();

            Configuration.Modules.AbpWeb().AntiForgery.IsEnabled = false;

            //Configure Hangfire - ENABLE TO USE HANGFIRE INSTEAD OF DEFAULT JOB MANAGER
            //Configuration.BackgroundJobs.UseHangfire(configuration =>
            //{
            //    configuration.GlobalConfiguration.UseSqlServerStorage("Default");
            //});

            //GlobalConfiguration.Configuration.Formatters.Clear();
            //var formatter = new JsonMediaTypeFormatter();
            //formatter.SerializerSettings.ContractResolver = new DefaultContractResolver();
            //formatter.SerializerSettings.DateFormatString = "yyyy-MM-dd HH:mm:ss";
            //GlobalConfiguration.Configuration.Formatters.Add(formatter);
            //GlobalConfiguration.Configuration.Formatters.Add(new PlainTextFormatter());
        }

        public override void Initialize()
        {
            IocManager.RegisterAssemblyByConvention(Assembly.GetExecutingAssembly());

            AreaRegistration.RegisterAllAreas();
            RouteConfig.RegisterRoutes(RouteTable.Routes);
            BundleConfig.RegisterBundles(BundleTable.Bundles);
        }
    }
}
